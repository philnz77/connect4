import { sortBy } from "ramda";
import makeEvaluateDrops from "./makeEvaluateDrops";
import { getPlayerIndexWithTurn } from "./reducer";
const randomFromArray = items =>
  items[Math.floor(Math.random() * items.length)];
export default props => {
  const evaluateDrops = makeEvaluateDrops(props);
  return state => {
    const evaluatedDrops = evaluateDrops(state)
      .map((dropEval, dropIndex) => ({ dropEval, dropIndex }))
      .filter(drop => drop.dropEval !== null);
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
