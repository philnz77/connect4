import React, { Component } from "react";
import {
  defaultState,
  dropInCol,
  back,
  isBotTurn,
  areBotsPaused,
  unpauseBots,
  setPlayerToBot,
  getCols,
  getPlayersExtended
} from "./reducer";
import makeGetWinner from "./makeGetWinner";
import makeBotPick from "./makeBotPick";
import Presentation from "./Presentation";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState(props);
    this.getWinner = makeGetWinner(props);
    this.botPick = makeBotPick(props);
  }

  componentDidUpdate() {
    const state = this.state;
    const props = this.props;
    if (this._botShouldPlay) {
      setTimeout(() => {
        const botPicked = this.botPick(state, props);
        if (!isNaN(botPicked)) {
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

    const botTurn = isBotTurn(state, props);
    const paused = areBotsPaused(state);
    const humanShouldPlay = !botTurn && !winner;
    this._botShouldPlay = botTurn && !winner && !paused;

    const makeSetPlayerToBot = (playerIndex, isBot) => () =>
      this.setState(setPlayerToBot(playerIndex, isBot));
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
