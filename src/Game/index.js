import React, { Component } from "react";
import {
  defaultState,
  dropInCol,
  back,
  getCurrentPlayerExtended,
  areBotsPaused,
  unpauseBots,
  setPlayerToBot,
  getCols,
  getPlayersExtended
} from "./reducer";
import getWinner from "./getWinner";
import tacticsOnlyStrategy from "./tacticsOnlyStrategy";
import Presentation from "./Presentation";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState(props);
    this.getWinner = getWinner(props);
    this.botStrategies = {
      "Tactics Only depth 3": tacticsOnlyStrategy({ ...props, botDepth: 3 })
    };
  }

  componentDidUpdate() {
    const state = this.state;
    const props = this.props;

    if (this.botPlayerToPlay) {
      const strategy = this.botStrategies[this.botPlayerToPlay.botStrategy];
      setTimeout(() => {
        const botPicked = strategy(state, props);
        if (Number.isInteger(botPicked)) {
          this.setState(dropInCol(botPicked));
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

    const makeSetPlayerToBot = (playerIndex, isBot) => () =>
      this.setState(
        setPlayerToBot(playerIndex, isBot ? "Tactics Only depth 3" : null)
      );
    const cols = getCols(state);
    const onBack = () => this.setState(back);
    const onUnpause = () => this.setState(unpauseBots);
    const makeOnColClick = colIndex => () =>
      humanShouldPlay && this.setState(dropInCol(colIndex));
    return (
      <Presentation
        {...{
          numCols,
          makeOnColClick,
          numRows,
          players,
          cols,
          winner,
          makeSetPlayerToBot,
          onBack,
          onUnpause,
          paused
        }}
      />
    );
  }
}

export default Game;
