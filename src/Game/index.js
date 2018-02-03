import React, { Component } from "react";
import { range } from "ramda";

import {
  defaultState,
  dropInCol,
  back,
  isBotTurn,
  areBotsPaused,
  unpauseBots,
  setPlayerToBot,
  getCols,
  getPlayerIndexWithTurn
} from "./reducer";
import Col from "./Col";
import Winner from "./Winner";
import Players from "./Players";
import makeGetWinner from "./makeGetWinner";
import makeBotPick from "./makeBotPick";

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
    const botTurn = isBotTurn(state, props);
    const paused = areBotsPaused(state);
    if (botTurn && !this._winner && !paused) {
      setTimeout(() => {
        const botPicked = this.botPick(state, props);
        this.setState(dropInCol(botPicked));
      }, 100);
    }
  }

  render() {
    const props = this.props;
    const state = this.state;
    const { numCols } = props;
    const winner = this.getWinner(state);
    this._winner = winner;
    const botTurn = isBotTurn(state, props);
    const paused = areBotsPaused(state);
    const makeSetPlayerToBot = (playerIndex, isBot) => () =>
      this.setState(setPlayerToBot(playerIndex, isBot));
    const cols = getCols(state);
    const playerWithTurnIndex = getPlayerIndexWithTurn(state, props);
    return (
      <div>
        <div>
          {range(0, numCols).map(colIndex => {
            const dropIn = dropInCol(colIndex);
            return (
              <Col
                {...props}
                cols={cols}
                key={colIndex}
                colIndex={colIndex}
                onClick={() => winner || botTurn || this.setState(dropIn)}
                winner={winner}
              />
            );
          })}
        </div>
        <div style={{ display: "inline-block", textAlign: "left", width: 160 }}>
          {winner && <Winner {...props} winner={winner} />}
          <Players
            {...props}
            state={state}
            makeSetPlayerToBot={makeSetPlayerToBot}
            playerWithTurnIndex={playerWithTurnIndex}
          />
          <button onClick={() => this.setState(back)}>Back</button>
          {paused && (
            <button onClick={() => this.setState(unpauseBots)}>Run bot</button>
          )}
        </div>
      </div>
    );
  }
}

export default Game;
