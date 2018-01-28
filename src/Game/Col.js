import React from "react";
import { range } from "ramda";
import Cell from "./Cell";
import { getPlayerAt } from "./reducer";
export default ({ colIndex, state, numRows, players, onClick, winner }) => {
  const cells = range(0, numRows)
    .reverse()
    .map(rowIndex => {
      const occupiedByPlayer = getPlayerAt(state, colIndex, rowIndex);
      const isWinner =
        winner &&
        winner.cells.find(c => c.row === rowIndex && c.col === colIndex);
      return (
        <Cell
          occupiedByPlayer={occupiedByPlayer}
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
