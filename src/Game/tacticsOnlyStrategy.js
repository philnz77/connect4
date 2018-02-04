import { sortBy, range } from "ramda";
import _getWinner from "./getWinner";
import { getTurn, dropInCol, getPlayerIndexWithTurn } from "./reducer";
const randomFromArray = items =>
  items[Math.floor(Math.random() * items.length)];

const min = -1;
const max = 1;
export default props => {
  const getWinner = _getWinner(props);
  const { botDepth, players, numCols } = props;
  const dontKnowEvaluation = new Array(players.length).fill(0);
  const winningEvaluation = winner => {
    const result = new Array(players.length).fill(min);
    result[winner.playerIndex] = max;
    return result;
  };
  const evaluateDrops = currentState => {
    const currentTurn = getTurn(currentState);

    const evaluatePosition = state => {
      const winner = getWinner(state);
      if (winner) {
        return winningEvaluation(winner);
      }

      const turn = getTurn(state);
      const canRecurse = turn - currentTurn < botDepth;
      if (!canRecurse) {
        return dontKnowEvaluation;
      }
      const playerWithTurn = getPlayerIndexWithTurn(state, props);
      const drops = _evaluateDrops(state).filter(d => d !== null);
      if (drops.length === 0) {
        return dontKnowEvaluation;
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
    const evaluatedDrops = evaluateDrops(state)
      .map((dropEval, dropIndex) => ({ dropEval, dropIndex }))
      .filter(drop => drop.dropEval !== null);
    if (evaluatedDrops.length === 0) {
      return null;
    }
    const playerWithTurn = getPlayerIndexWithTurn(state, props);
    const sortedDrops = sortBy(
      d => -d.dropEval[playerWithTurn],
      evaluatedDrops
    );
    const bestDrop = sortedDrops[0];
    const bestEqual = sortedDrops.filter(
      d => d.dropEval[playerWithTurn] === bestDrop.dropEval[playerWithTurn]
    );
    const bestRandom = randomFromArray(bestEqual);
    return bestRandom.dropIndex;
  };
};
