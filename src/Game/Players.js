import React from 'react';
import { getPlayerWithTurn } from './reducer';
const tokenSize = 10;
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

export default ({ players, state }) => {
  const playerWithTurnIndex = getPlayerWithTurn(state, { players });
  return (
    <div>
      Players:
      <ul>
        {players.map((player, playerIndex) => {
          const hasTurn = playerIndex === playerWithTurnIndex;
          return (
            <li>
              {player.name} {hasTurn && <TurnMarker player={player} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
