import { sum, last, dropLast, values } from "ramda";
const initialColHistory = numCols => [new Array(numCols).fill([])];
export const defaultState = ({ numCols }) => {
  return {
    colsHistory: initialColHistory(numCols),
    botPickHistory: [],
    bots: {},
    botsPaused: false
  };
};

export const getBotPickHistory = state => state.botPickHistory;

const anyBots = state => values(state.bots).filter(v => v).length > 0;

export const areBotsPaused = state => state.botsPaused;

export const unpauseBots = state => ({ botsPaused: false });

export const getCols = state => last(state.colsHistory);

export const getTurn = state => sum(getCols(state).map(c => c.length));

export const getPlayerIndexWithTurn = (state, { players }) =>
  getTurn(state) % players.length;

export const getBotStrategy = (state, playerIndex) => state.bots[playerIndex];

export const getPlayersExtended = (state, props) => {
  const playerWithTurnIndex = getPlayerIndexWithTurn(state, props);
  const { players } = props;
  return players.map((player, playerIndex) => {
    const hasTurn = playerIndex === playerWithTurnIndex;
    const botStrategy = getBotStrategy(state, playerIndex);
    const isBot = Boolean(botStrategy);
    return {
      ...player,
      botStrategy,
      isBot,
      hasTurn,
      playerIndex
    };
  });
};

export const getCurrentPlayerExtended = (state, props) => {
  const playerIndex = getPlayerIndexWithTurn(state, props);
  return getPlayersExtended(state, props)[playerIndex];
};

export const setPlayerToBot = (playerIndex, chooserName) => (state, props) => {
  const stateDiff = {
    bots: {
      ...state.bots,
      [playerIndex]: chooserName
    }
  };
  const settingCurrentToBot =
    getPlayerIndexWithTurn(state, props) === playerIndex;
  if (settingCurrentToBot) {
    stateDiff.botsPaused = true;
  }
  return stateDiff;
};

export const dropInCol = colIndex => (state, props) => {
  const cols = getCols(state);
  const { numRows } = props;
  const player = getPlayerIndexWithTurn(state, props);
  const col = cols[colIndex];
  if (col.length >= numRows) {
    return state;
  }
  const newCol = [...col, player];
  const newCols = [...cols];
  newCols[colIndex] = newCol;
  const colsHistory = [...state.colsHistory, newCols];
  return {
    colsHistory
  };
};

export const dropBotPick = ({ dropEval, dropIndex, time }, player) => (
  state,
  props
) => {
  const dropInState = dropInCol(dropIndex)(state, props);
  const turn = getTurn(state);
  const histItem = { dropEval, dropIndex, player, turn, time };

  return {
    ...dropInState,
    botPickHistory: [...state.botPickHistory, histItem]
  };
};

export const clear = (state, { numCols }) => {
  return {
    colsHistory: initialColHistory(numCols),
    botPickHistory: []
  };
};

export const back = state => {
  if (state.colsHistory.length === 1) {
    return state;
  }
  return {
    colsHistory: dropLast(1, state.colsHistory),
    botsPaused: anyBots(state)
  };
};
