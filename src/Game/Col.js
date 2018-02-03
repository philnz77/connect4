import React from "react";
import PropTypes from "prop-types";
import { range } from "ramda";
import Cell from "./Cell";
function Col({ colIndex, cols, numRows, players, onClick, winner }) {
  const cells = range(0, numRows)
    .reverse()
    .map(rowIndex => {
      const occupiedByPlayer = cols[colIndex][rowIndex];
      const isWinner = Boolean(
        winner &&
          winner.cells.find(c => c.row === rowIndex && c.col === colIndex)
      );
      return (
        <Cell
          playerIndex={occupiedByPlayer}
          players={players}
          key={rowIndex}
          isWinner={isWinner}
        />
      );
    });
  return (
    <div onClick={onClick} style={{ display: "inline-block" }}>
      {cells}
    </div>
  );
}
Col.propTypes = {
  colIndex: PropTypes.number.isRequired,
  cols: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  numRows: PropTypes.number.isRequired,
  players: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  winner: PropTypes.shape({
    cells: PropTypes.arrayOf(
      PropTypes.shape({
        row: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired
      })
    )
  })
};

export default Col;
