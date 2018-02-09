import { sortBy, sum } from "ramda";
import { startTimer } from "./util";
import { getPlayerIndexWithTurn } from "./reducer";
const min = -1;
const max = 1;

export const dontKnowEvaluation = players => new Array(players.length).fill(0);

export function normalizeEvaluation(evaluation) {
  const numPlayers = evaluation.length;
  const totalScore = sum(evaluation);
  if (totalScore === 0) {
    return new Array(evaluation.length).fill(0);
  }
  const averageScore = totalScore / numPlayers;
  const zeroSumEvaluation = evaluation.map(e => e - averageScore);
  const doubleMaxScore =
    2 * Math.max(10, Math.max(...zeroSumEvaluation.map(Math.abs)));
  if (doubleMaxScore === 0) {
    return new Array(evaluation.length).fill(0);
  }
  const zeroSum = zeroSumEvaluation.map(e => e / doubleMaxScore);
  return zeroSum;
}

export function winningEvaluation(players, winner) {
  const result = new Array(players.length).fill(min);
  result[winner.playerIndex] = max;
  return result;
}

export function evaluateAndChoose(
  evaluateDrops,
  pickFromBestEqual,
  state,
  props
) {
  const timeDiff = startTimer();
  const evaluatedDrops = evaluateDrops(state)
    .map((dropEval, dropIndex) => ({ dropEval, dropIndex }))
    .filter(drop => drop.dropEval !== null);
  if (evaluatedDrops.length === 0) {
    return null;
  }
  const playerWithTurn = getPlayerIndexWithTurn(state, props);
  const sortedDrops = sortBy(d => -d.dropEval[playerWithTurn], evaluatedDrops);
  const bestDrop = sortedDrops[0];
  const bestEqual = sortedDrops.filter(
    d => d.dropEval[playerWithTurn] === bestDrop.dropEval[playerWithTurn]
  );
  const finalPick = pickFromBestEqual(bestEqual);

  return {
    dropEval: finalPick.dropEval[playerWithTurn],
    dropIndex: finalPick.dropIndex,
    time: timeDiff()
  };
}
