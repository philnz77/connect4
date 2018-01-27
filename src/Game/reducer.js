export const defaultState = ({ numCols }) => {
  return {
    turn: 0,
    cols: new Array(numCols).fill([]),
  };
};

export const getPlayerWithTurn = ({ turn }, { players }) =>
  turn % players.length;

export function getPlayerAt({ cols }, colIndex, rowIndex) {
  const col = cols[colIndex];
  return rowIndex < col.length ? col[rowIndex] : null;
}

export const dropInCol = colIndex => (state, props) => {
  const { cols, turn } = state;
  const { numRows } = props;
  const player = getPlayerWithTurn(state, props);
  const col = cols[colIndex];
  if (col.length >= numRows) {
    return {};
  }
  const newCol = [...col, player];
  const newCols = [...cols];
  newCols[colIndex] = newCol;
  return {
    cols: newCols,
    turn: turn + 1,
  };
};
