import { range, sortBy } from "ramda";
import _getWinner from "./getWinner";

import _getPotentials from "./getPotentials";
import { getTurn, dropInCol, getPlayerIndexWithTurn } from "./reducer";

import {
  winningEvaluation,
  dontKnowEvaluation,
  evaluateAndChoose,
  normalizeEvaluation
} from "./strategyUtil";

export default props => {
  const { botDepth, players, numCols } = props;

  const getWinner = _getWinner(props);

  const getPotentials = _getPotentials(props);

  const evaluateDrops = currentState => {
    const currentTurn = getTurn(currentState);

    const evaluatePosition = state => {
      const winner = getWinner(state);
      if (winner) {
        return winningEvaluation(players, winner);
      }

      const turn = getTurn(state);
      const canRecurse = turn - currentTurn < botDepth;
      if (!canRecurse) {
        const potentials = getPotentials(state);
        const normalizedPotentials = normalizeEvaluation(potentials);
        return normalizedPotentials;
      }
      const playerWithTurn = getPlayerIndexWithTurn(state, props);
      const drops = _evaluateDrops(state).filter(d => d !== null);
      if (drops.length === 0) {
        return dontKnowEvaluation(players);
      }
      return drops.reduce((best, curr) => {
        return best[playerWithTurn] > curr[playerWithTurn] ? best : curr;
      }, drops[0]);
    };
    const _evaluateDrops = state => {
      const evaluatedDrops = range(0, numCols).map(colIndex => {
        const newState = dropInCol(colIndex)(state, props);
        if (state === newState) {
          return null;
        }
        const evaluatedPositions = evaluatePosition(newState);
        return evaluatedPositions;
      });
      return evaluatedDrops;
    };
    return _evaluateDrops(currentState);
  };
  return state => {
    const playerWithTurn = getPlayerIndexWithTurn(state, props);
    function finalPick(drops) {
      const sortedDrops = sortBy(d => {
        const dropIndex = d.dropIndex;
        const newState = dropInCol(dropIndex)(state, props);
        const potentials = getPotentials(newState);
        const normalizedPotentials = normalizeEvaluation(potentials);
        const scoreForPlayer = normalizedPotentials[playerWithTurn];
        return -scoreForPlayer;
      }, drops);
      return sortedDrops[0];
    }
    return evaluateAndChoose(evaluateDrops, finalPick, state, props);
  };
};
