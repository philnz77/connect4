import { getCols } from "./reducer";
import { getGroupings } from "./getGroupings";

export default ({ connect, numRows, numCols }) => {
  const groupings = getGroupings(connect, numRows, numCols);
  return state => {
    for (let g = 0; g < groupings.length; g++) {
      const grouping = groupings[g];
      let playerIndex = null;
      let streak = 0;
      for (let i = 0; i < grouping.length; i++) {
        const { row, col } = grouping[i];
        const playerAtCell = getCols(state)[col][row];
        if (!Number.isInteger(playerAtCell)) {
          playerIndex = null;
          streak = 0;
        } else if (playerIndex === playerAtCell) {
          streak++;
        } else {
          playerIndex = playerAtCell;
          streak = 1;
        }
        if (streak === connect) {
          return {
            playerIndex,
            cells: grouping.slice(i + 1 - connect, i + 1)
          };
        }
      }
    }
  };
};
