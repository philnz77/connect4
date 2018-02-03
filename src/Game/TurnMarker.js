import React from "react";
import PropTypes from "prop-types";

const tokenSize = 12;
const halfSize = tokenSize / 2;
const TurnMarker = ({ player }) => {
  return (
    <svg height={tokenSize} width={tokenSize}>
      <circle
        cx={halfSize}
        cy={halfSize}
        r={halfSize}
        stroke="black"
        fill={player.color}
      />
    </svg>
  );
};

TurnMarker.propTypes = {
  player: PropTypes.shape({
    color: PropTypes.string.isRequired
  }).isRequired
};

export default TurnMarker;
