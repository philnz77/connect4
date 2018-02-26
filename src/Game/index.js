import React, { Component } from "react";
import {
  defaultState,
  dropInCol,
  dropBotPick,
  back,
  getCurrentPlayerExtended,
  areBotsPaused,
  unpauseBots,
  setPlayerToBot,
  getCols,
  getPlayersExtended,
  getBotPickHistory,
  clear
} from "./reducer";
import getWinner from "./getWinner";
import tacticsOnlyStrategy from "./tacticsOnlyStrategy";
import alphaHeuristicStrategy from "./alphaHeuristicStrategy";
import Presentation from "./Presentation";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState(props);
    this.getWinner = getWinner(props);
    this.botStrategies = {
      "Tactics Only depth 3": tacticsOnlyStrategy({ ...props, botDepth: 3 }),
      "Tactics Only depth 4": tacticsOnlyStrategy({ ...props, botDepth: 4 }),
      "Tactics Only depth 5": tacticsOnlyStrategy({ ...props, botDepth: 5 }),
      "Tactics Only depth 6": tacticsOnlyStrategy({ ...props, botDepth: 6 }),
      "Alpha A depth 3": alphaHeuristicStrategy({ ...props, botDepth: 3 }),
      "Alpha A depth 4": alphaHeuristicStrategy({ ...props, botDepth: 4 }),
      "Alpha A depth 5": alphaHeuristicStrategy({ ...props, botDepth: 5 }),
      "Alpha A depth 6": alphaHeuristicStrategy({ ...props, botDepth: 6 }),
      "Alpha H depth 3": alphaHeuristicStrategy({
        ...props,
        botDepth: 3,
        excludeColGroupings: true
      }),
      "Alpha H depth 4": alphaHeuristicStrategy({
        ...props,
        botDepth: 4,
        excludeColGroupings: true
      }),
      "Alpha H depth 5": alphaHeuristicStrategy({
        ...props,
        botDepth: 5,
        excludeColGroupings: true
      }),
      "Alpha H depth 6": alphaHeuristicStrategy({
        ...props,
        botDepth: 6,
        excludeColGroupings: true
      })
    };
  }

  componentDidUpdate() {
    const state = this.state;
    const props = this.props;
    const botPlayerToPlay = this.botPlayerToPlay;
    if (botPlayerToPlay) {
      const strategy = this.botStrategies[botPlayerToPlay.botStrategy];
      setTimeout(() => {
        const botPicked = strategy(state, props);
        if (botPicked) {
          this.setState(dropBotPick(botPicked, botPlayerToPlay));
        }
      }, 100);
    }
  }

  render() {
    const props = this.props;
    const state = this.state;
    const { numCols, numRows } = props;
    const _winner = this.getWinner(state);
    const players = getPlayersExtended(state, props);

    const winner = _winner && {
      ..._winner,
      player: players[_winner.playerIndex]
    };
    const currentPlayer = getCurrentPlayerExtended(state, props);

    const botTurn = currentPlayer.isBot;
    const paused = areBotsPaused(state);
    const humanShouldPlay = !botTurn && !winner;
    this.botPlayerToPlay = botTurn && !winner && !paused ? currentPlayer : null;

    const _setPlayerToBot = (playerIndex, strategy) =>
      this.setState(setPlayerToBot(playerIndex, strategy));
    const cols = getCols(state);
    const onBack = () => this.setState(back);
    const onClear = () => this.setState(clear);
    const onUnpause = () => this.setState(unpauseBots);
    const makeOnColClick = colIndex => () =>
      humanShouldPlay && this.setState(dropInCol(colIndex));
    const botPickHistory = getBotPickHistory(state);
    return (
      <Presentation
        {...{
          numCols,
          makeOnColClick,
          numRows,
          players,
          cols,
          winner,
          setPlayerToBot: _setPlayerToBot,
          onBack,
          onUnpause,
          paused,
          botPickHistory,
          onClear
        }}
      />
    );
  }
}

export default Game;
