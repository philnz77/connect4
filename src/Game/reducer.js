import { sum, last, dropLast } from "ramda";
export const defaultState = ({ numCols }) => {
  return {
    colsHistory: [new Array(numCols).fill([])]
  };
};

const getCols = state => last(state.colsHistory);
const getTurn = state => sum(getCols(state).map(c => c.length));

export const getPlayerWithTurn = (state, { players }) =>
  getTurn(state) % players.length;

export function getPlayerAt(state, colIndex, rowIndex) {
  const cols = getCols(state);
  const col = cols[colIndex];
  return rowIndex < col.length ? col[rowIndex] : null;
}

export const dropInCol = colIndex => (state, props) => {
  const cols = getCols(state);
  const { numRows } = props;
  const player = getPlayerWithTurn(state, props);
  const col = cols[colIndex];
  if (col.length >= numRows) {
    return {};
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
    return {};
  }
  return {
    colsHistory: dropLast(1, state.colsHistory)
  };
};
