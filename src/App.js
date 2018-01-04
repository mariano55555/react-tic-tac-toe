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
      turn: 'X',
      moves: 0,
      selectedSquares: [],
      turnPlayer: 'Player 1',
      canvas: Array.apply(null, Array(3)),
      score: {
        X: 0,
        O: 0
      }
    }
  }

  checkWinner(turn) {
      var vertical_counter         = 0;
      var horizontal_counter       = 0;
      var inverse_diagonal_counter = 0;
      var diagonal_counter         = 0;
      var horizontal_array         = [];
      var vertical_array           = [];
      var diagonal_array           = [];
      var inverse_diagonal_array   = [];

      for (var i = 0; i < this.state.boardsize; i++) {

          vertical_counter   = 0;
          horizontal_counter = 0;
          vertical_array     = [];
          horizontal_array   = [];

          for (var j = 0; j < this.state.boardsize; j++) {

              if (this.state.gameBoard[i + '' + j] === turn) {
                  horizontal_array.push(i + '' + j);
                  horizontal_counter++;
              }

              if (this.state.gameBoard[j + '' + i] === turn) {
                  vertical_array.push(j + '' + i);
                  vertical_counter++;
              }

          }

          if (this.state.gameBoard[i + '' + i] === turn) {
              diagonal_array.push(i + '' + i);
              diagonal_counter++;
          }

          if (this.state.gameBoard[(this.state.boardsize - 1 - i) + '' + i] === turn) {
              inverse_diagonal_array.push((this.state.boardsize - 1 - i) + '' + i);
              inverse_diagonal_counter++;
          }

          
          if (horizontal_counter === this.state.boardsize) {
              this.setState({ selectedSquares: horizontal_array });
              return true;
          }

          if (vertical_counter === this.state.boardsize) {
            this.setState({ selectedSquares: vertical_array });
            return true;
          }

      }

      if (inverse_diagonal_counter === this.state.boardsize) {
          this.setState({ selectedSquares: inverse_diagonal_array });
          return true;
      }

      if (diagonal_counter === this.state.boardsize) {  
        return true;
      }

      

      //CHANGE TURN....
      this.setState({turn: (this.state.turn === 'X') ? 'O' : 'X' });
      this.setState({turnPlayer: (this.state.turn === 'X') ? 'Player 2' : 'Player 1' });   
      

      // NO WINNER...DRAW....
      return false;
  }


  updateBoard(row, column, player){

    this.setState({ moves: this.state.moves + 1 });

    if(this.state.gameBoard[row+''+column] === 'X' || this.state.gameBoard[row+''+column] === 'O' || this.state.winner){
      return;
    }

    // REIGTER THE TURN (X/O)
    this.setState({
        gameBoard: {
            ...this.state.gameBoard,
            [row+''+column]: this.state.turn
        }
    });
   
    // Set time to wait and calculate the winner in order to update the states..states are asynchronous!
    setTimeout(() => {
        if (this.checkWinner(this.state.turn)) {
          this.setState({winner: this.state.turn});
          this.setState({
              score: {
                  ...this.state.score,
                  [this.state.turn]: this.state.score[this.state.turn] + 1
              }
          });
        
      }else if (this.state.moves === Math.pow(this.state.boardsize, 2)){ 
        this.setState({winner:'DRAW'});
      }
    }, 200);

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
                  updateBoard={this.updateBoard.bind(this)}
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
