import { getCols } from "./reducer";
import { getGroupings, getHoleGroupings } from "./getGroupings";

export default ({
  connect,
  numRows,
  numCols,
  players,
  excludeColGroupings
}) => {
  const groupingsFn = excludeColGroupings ? getHoleGroupings : getGroupings;
  const groupings = groupingsFn(connect, numRows, numCols);
  return state => {
    const potentials = new Array(players.length).fill(0);
    for (let g = 0; g < groupings.length; g++) {
      const grouping = groupings[g];
      let playerIndex = null;
      let streak = 0;
      let coloredStreak = 0;
      let recordedStreak = false;
      for (let i = 0; i < grouping.length; i++) {
        const { row, col } = grouping[i];
        const playerAtCell = getCols(state)[col][row];
        if (!Number.isInteger(playerAtCell)) {
          streak++;
        } else if (playerIndex !== playerAtCell) {
          playerIndex = playerAtCell;
          streak = 1;
          coloredStreak = 1;
          recordedStreak = false;
        } else {
          streak++;
          coloredStreak++;
        }
        if (streak >= connect && coloredStreak > 0) {
          if (recordedStreak) {
            potentials[playerIndex] = potentials[playerIndex] + 1;
          } else {
            recordedStreak = true;
            potentials[playerIndex] = potentials[playerIndex] + coloredStreak;
          }
        }
      }
    }
    return potentials;
  };
};
