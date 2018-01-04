import React, { Component } from 'react';
import './App.css';
import Square from './Square';
import Winner from './Winner';
import Score from './Score';

class App extends Component {

  constructor() {
    super();
    this.state = {
      boardsize: 3,
      gameBoard:{},
      winner: null,
      canvas: Array.apply(null, Array(3)),
      score: {
        X: 0,
        O: 0
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="menu">
          <h1>Tic Tac Toe</h1>
          <Score score={this.state.score}/>
          <div className="turn">
            Turn: {this.state.turnPlayer}
          </div>
          <Winner winner={this.state.winner} />
        </div>
        <div className="tic-tac-toe">
         { this.state.canvas.map(function(value, row){
            return (
               this.state.canvas.map(function(val, column){
                return(
                  <Square
                  key={row+''+column}
                  row={row}
                  column={column}
                  winner={this.state.winner}
                  gameBoard={this.state.gameBoard}
                  value={this.state.gameBoard[row+''+column]}
                  boardsize={this.state.boardsize}
                  />
                )
              }.bind(this))
            )
          }.bind(this))}
        </div>
      </div>
    );
  }
}

export default App;
