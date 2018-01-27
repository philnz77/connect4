import React from 'react';

export default ({ winner, players }) => {
  const { name } = players[winner.player];

  return <div>Winner is {name}</div>;
};
