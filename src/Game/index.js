import React, { Component } from 'react';
import { range } from 'ramda';

import { defaultState, dropInCol } from './reducer';
import Col from './Col';
import Winner from './Winner';
import Players from './Players';
import makeGetWinner from './makeGetWinner';

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
              />
            );
          })}
        </div>

        {winner && <Winner {...this.props} winner={winner} />}
        <Players {...this.props} state={this.state} />
      </div>
    );
  }
}

export default Game;
