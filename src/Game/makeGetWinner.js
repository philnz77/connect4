import { range, xprod, groupBy, values, unnest } from "ramda";
import { getCols } from "./reducer";
const rowGroup = ({ row }) => row;
const colGroup = ({ col }) => col;
const diagonalDownGroup = ({ row, col }) => row + col;
const diagonalUpGroup = ({ row, col }) => row - col;
const groupingFunctions = [
  rowGroup,
  colGroup,
  diagonalUpGroup,
  diagonalDownGroup
];

function getGroupings(connect, numRows, numCols) {
  const rows = range(0, numRows);
  const cols = range(0, numCols);
  const cells = xprod(rows, cols).map(([row, col]) => ({ row, col }));
  const groupingsPerFunction = groupingFunctions.map(gf =>
    values(groupBy(gf, cells))
  );
  return unnest(groupingsPerFunction).filter(
    grouping => grouping.length >= connect
  );
}

export default ({ connect, numRows, numCols }) => {
  const groupings = getGroupings(connect, numRows, numCols);
  return state => {
    for (let g = 0; g < groupings.length; g++) {
      const grouping = groupings[g];
      let playerIndex = null;
      let streak = 0;
      for (let i = 0; i < grouping.length; i++) {
        const { row, col } = grouping[i];
        const playerAtCell = getCols(state)[col][row];
        if (isNaN(playerAtCell)) {
          playerIndex = null;
          streak = 0;
        } else if (playerIndex === playerAtCell) {
          streak++;
        } else {
          playerIndex = playerAtCell;
          streak = 1;
        }
        if (streak === connect) {
          return {
            playerIndex,
            cells: grouping.slice(i + 1 - connect, i + 1)
          };
        }
      }
    }
  };
};
