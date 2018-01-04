import React, { Component } from 'react';
import './App.css';
import Square from './Square';

class App extends Component {

  constructor() {
    super();
    this.state = {
      boardsize: 3,
      gameBoard:{},
      canvas: Array.apply(null, Array(3)),
    }
  }

  render() {
    return (
      <div className="container">
        <div className="tic-tac-toe">
         { this.state.canvas.map(function(value, row){
            return (
               this.state.canvas.map(function(val, column){
                return(
                  <Square
                  key={row+''+column}
                  row={row}
                  column={column}
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
