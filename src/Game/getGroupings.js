import { range, xprod, groupBy, values, unnest } from "ramda";

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

export default function getGroupings(connect, numRows, numCols) {
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
