import { range } from "ramda";
import { randomFromArray } from "./util";
import _getWinner from "./getWinner";
import { getTurn, dropInCol, getPlayerIndexWithTurn } from "./reducer";

import {
  winningEvaluation,
  dontKnowEvaluation,
  evaluateAndChoose
} from "./strategyUtil";

export default props => {
  const getWinner = _getWinner(props);
  const { botDepth, players, numCols } = props;

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
        return dontKnowEvaluation(players);
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
      return range(0, numCols).map(colIndex => {
        const newState = dropInCol(colIndex)(state, props);
        if (state === newState) {
          return null;
        }
        return evaluatePosition(newState);
      });
    };
    return _evaluateDrops(currentState);
  };
  return state => {
    return evaluateAndChoose(evaluateDrops, randomFromArray, state, props);
  };
};
