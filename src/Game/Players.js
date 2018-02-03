import React from "react";
import { getPlayerIndexWithTurn, isPlayerBot } from "./reducer";
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

export default ({ state, makeSetPlayerToBot, ...props }) => {
  const { players } = props;
  const playerWithTurnIndex = getPlayerIndexWithTurn(state, props);
  return (
    <div>
      <h5>Players: </h5>
      <ul>
        {players.map((player, playerIndex) => {
          const hasTurn = playerIndex === playerWithTurnIndex;
          const isBot = isPlayerBot(state, playerIndex);
          const onSetPlayerToBot = makeSetPlayerToBot(playerIndex, !isBot);
          return (
            <li key={playerIndex}>
              <input type="checkbox" onClick={onSetPlayerToBot} value={isBot} />{" "}
              {player.name} {hasTurn && <TurnMarker player={player} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
