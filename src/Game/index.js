import React, { Component } from "react";
import { range } from "ramda";

import { defaultState, dropInCol, back } from "./reducer";
import Col from "./Col";
import Winner from "./Winner";
import Players from "./Players";
import BotResult from "./BotResult";
import makeGetWinner from "./makeGetWinner";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState(props);
    this.getWinner = makeGetWinner(props);
  }

  render() {
    const { numCols } = this.props;
    const winner = this.getWinner(this.state);
    return (
      <div>
        <div>
          {range(0, numCols).map(colIndex => {
            const dropIn = dropInCol(colIndex);
            return (
              <Col
                {...this.props}
                state={this.state}
                key={colIndex}
                colIndex={colIndex}
                onClick={() => winner || this.setState(dropIn)}
                winner={winner}
              />
            );
          })}
        </div>
        <div style={{ display: "inline-block", textAlign: "left", width: 120 }}>
          {winner && <Winner {...this.props} winner={winner} />}
          <Players {...this.props} state={this.state} />
          <button onClick={() => this.setState(back)}>Back</button>
          <BotResult {...this.props} state={this.state} />
        </div>
      </div>
    );
  }
}

export default Game;
