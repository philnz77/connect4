import React from "react";
import PropTypes from "prop-types";
import TurnMarker from "./TurnMarker";

const Players = ({ setPlayerToBot, players }) => {
  return (
    <div>
      <h5>Players: </h5>
      <ul>
        {players.map(player => {
          const { playerIndex, hasTurn, botStrategy, name } = player;
          const selectValue = botStrategy || "Human";
          const onSelectChange = event => {
            const { value } = event.target;
            const newStrategy = value === "Human" ? null : value;
            setPlayerToBot(playerIndex, newStrategy);
          };
          return (
            <li key={playerIndex}>
              {name}{" "}
              <select
                type="checkbox"
                onChange={onSelectChange}
                value={selectValue}
              >
                <option value="Human">Human</option>
                <option value="Tactics Only depth 3">
                  Tactics Only depth 3
                </option>
                <option value="Tactics Only depth 4">
                  Tactics Only depth 4
                </option>
                <option value="Tactics Only depth 5">
                  Tactics Only depth 5
                </option>
                <option value="Tactics Only depth 6">
                  Tactics Only depth 6
                </option>
                <option value="Alpha A depth 3">Alpha A depth 3</option>
                <option value="Alpha A depth 4">Alpha A depth 4</option>
                <option value="Alpha A depth 5">Alpha A depth 5</option>
                <option value="Alpha A depth 6">Alpha A depth 6</option>
                <option value="Alpha H depth 3">Alpha H depth 3</option>
                <option value="Alpha H depth 4">Alpha H depth 4</option>
                <option value="Alpha H depth 5">Alpha H depth 5</option>
                <option value="Alpha H depth 6">Alpha H depth 6</option>
              </select>{" "}
              {hasTurn && <TurnMarker player={player} />}
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
