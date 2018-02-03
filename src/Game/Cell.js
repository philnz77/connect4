import React from "react";
const size = 40;
const borderWidth = 1;
const tokenSize = size - borderWidth * 2;
const halfSize = tokenSize / 2;

export default ({ occupiedByPlayer, players, isWinner }) => {
  const isOccupied = !isNaN(occupiedByPlayer);
  const style = {
    width: size,
    height: size,
    borderStyle: "solid",
    borderWidth,
    borderColor: "black",
    position: "relative",
    backgroundColor: isWinner ? "yellow" : "initial"
  };
  const svgStyle = {
    position: "absolute",
    top: 0,
    left: 0
  };
  return (
    <div style={style}>
      {isOccupied && (
        <svg style={svgStyle} height={tokenSize} width={tokenSize}>
          <circle
            cx={halfSize}
            cy={halfSize}
            r={halfSize - 4}
            stroke="black"
            fill={players[occupiedByPlayer].color}
          />
        </svg>
      )}
    </div>
  );
};
