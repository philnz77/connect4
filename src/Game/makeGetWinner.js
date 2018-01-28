import { range, xprod, groupBy, values, unnest } from "ramda";
import { getPlayerAt } from "./reducer";
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

function getGroupings({ connect, numRows, numCols }) {
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

export default props => {
  const groupings = getGroupings(props);
  const { connect } = props;
  return state => {
    for (let g = 0; g < groupings.length; g++) {
      const grouping = groupings[g];
      let player = null;
      let streak = 0;
      for (let i = 0; i < grouping.length; i++) {
        const { row, col } = grouping[i];
        const playerAtCell = getPlayerAt(state, col, row);
        if (playerAtCell === null) {
          player = null;
          streak = 0;
        } else if (player === playerAtCell) {
          streak++;
        } else {
          player = playerAtCell;
          streak = 1;
        }
        if (streak === connect) {
          return {
            player,
            cells: grouping.slice(i + 1 - connect, i + 1)
          };
        }
      }
    }
  };
};
