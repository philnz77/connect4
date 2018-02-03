import React from "react";
import PropTypes from "prop-types";
import TurnMarker from "./TurnMarker";

const Players = ({ makeSetPlayerToBot, players }) => {
  return (
    <div>
      <h5>Players: </h5>
      <ul>
        {players.map(player => {
          const { playerIndex, hasTurn, isBot, name } = player;
          const onSetPlayerToBot = makeSetPlayerToBot(playerIndex, !isBot);
          return (
            <li key={playerIndex}>
              <input type="checkbox" onClick={onSetPlayerToBot} value={isBot} />{" "}
              {name} {hasTurn && <TurnMarker player={player} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Players.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      playerIndex: PropTypes.number.isRequired,
      hasTurn: PropTypes.bool.isRequired,
      isBot: PropTypes.bool.isRequired
    }).isRequired
  ),
  makeSetPlayerToBot: PropTypes.func
};
export default Players;
