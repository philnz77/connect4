import React, { Component } from 'react';
import './App.css';
import Game from './Game';

class App extends Component {
  render() {
    const players = [
      { color: 'red', name: 'red' },
      { color: 'black', name: 'black' },
    ];
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Connect4</h1>
        </header>
        <div className="App-intro">
          <Game numCols={7} numRows={6} players={players} connect={4} />
        </div>
      </div>
    );
  }
}

export default App;
