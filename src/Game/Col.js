import React from "react";
import { range } from "ramda";
import Cell from "./Cell";
export default ({ colIndex, cols, numRows, players, onClick, winner }) => {
  const cells = range(0, numRows)
    .reverse()
    .map(rowIndex => {
      const occupiedByPlayer = cols[colIndex][rowIndex];
      const isWinner =
        winner &&
        winner.cells.find(c => c.row === rowIndex && c.col === colIndex);
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
};
