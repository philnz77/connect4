import { sum, last, dropLast, values } from "ramda";
export const defaultState = ({ numCols }) => {
  return {
    colsHistory: [new Array(numCols).fill([])],
    bots: {},
    botsPaused: false
  };
};

const anyBots = state => values(state.bots).filter(v => v).length > 0;

export const areBotsPaused = state => state.botsPaused;

export const unpauseBots = state => ({ botsPaused: false });

export const getCols = state => last(state.colsHistory);

export const getTurn = state => sum(getCols(state).map(c => c.length));

export const getPlayerIndexWithTurn = (state, { players }) =>
  getTurn(state) % players.length;

export const isPlayerBot = (state, playerIndex) =>
  Boolean(state.bots[playerIndex]);

export const isBotTurn = (state, props) => {
  const player = getPlayerIndexWithTurn(state, props);
  return isPlayerBot(state, player);
};

export const setPlayerToBot = (playerIndex, isBot) => (state, props) => {
  const stateDiff = {
    bots: {
      ...state.bots,
      [playerIndex]: isBot
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

export const back = state => {
  if (state.colsHistory.length === 1) {
    return state;
  }
  return {
    colsHistory: dropLast(1, state.colsHistory),
    botsPaused: anyBots(state)
  };
};
