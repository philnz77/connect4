import React from "react";
import PropTypes from "prop-types";

const Winner = ({ winner }) => {
  return <div>Winner is {winner.player.name}</div>;
};

Winner.propTypes = {
  winner: PropTypes.shape({
    player: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  })
};

export default Winner;
