import React from "react";
import PropTypes from "prop-types";
const size = 40;
const borderWidth = 1;
const tokenSize = size - borderWidth * 2;
const halfSize = tokenSize / 2;

function Cell({ playerIndex, players, isWinner }) {
  const isOccupied = Number.isInteger(playerIndex);
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
            fill={players[playerIndex].color}
          />
        </svg>
      )}
    </div>
  );
}
Cell.propTypes = {
  playerIndex: PropTypes.number,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired
    })
  ).isRequired,
  isWinner: PropTypes.bool.isRequired
};
export default Cell;
