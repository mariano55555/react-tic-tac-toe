import React, { Component } from 'react';
import './App.css';
import Square from './Square';
import Winner from './Winner';
import Score from './Score';
import ResetButton from './ResetButton';
import PlayButton from './PlayButton';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class App extends Component {

  constructor() {
    super();
    this.state = {
      showResult: false,
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


  resetBoard(){
    this.setState({
      showResult: false,
      gameBoard: {},
      canvas: Array.apply(null, Array(3)),
      boardsize:3,
      moves:0,
      turn: 'X',
      winner: null,
      selectedSquares: [],
      turnPlayer: 'Player 1',
      score: {
        X: 0,
        O: 0
      }
    })
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
        this.setState({turnPlayer: 'Player 2'});
        setTimeout(() => {
          this.setState({showResult: true});
        }, 500);
      }
    }, 200);

  }

  updateGrid() {
    this.setState({
        showResult: false,
        gameBoard: Array(Math.pow(this.state.boardsize, 2)).fill(null),
        canvas: Array.apply(null, Array(this.state.boardsize)),
        moves:0,
        turn: 'X',
        winner: null,
        selectedSquares: [],
        turnPlayer: 'Player 1',
    })
  }
  
  handleChange = (boardsize) => {
    this.setState({ 
      boardsize: parseInt(boardsize.value,10)
    }, function(){
      this.updateGrid();
    });
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
              setTimeout(() => {
                this.setState({showResult: true});
              }, 800);
              return true;
          }

          if (vertical_counter === this.state.boardsize) {
            this.setState({ selectedSquares: vertical_array });
            setTimeout(() => {
              this.setState({showResult: true});
            }, 800);
            return true;
          }

      }

      if (inverse_diagonal_counter === this.state.boardsize) {
          this.setState({ selectedSquares: inverse_diagonal_array });
          setTimeout(() => {
            this.setState({showResult: true});
          }, 800);
          return true;
      }

      if (diagonal_counter === this.state.boardsize) {  
        this.setState({ selectedSquares: diagonal_array });
        setTimeout(() => {
          this.setState({showResult: true});
        }, 800);
        return true;
      }

      

      //CHANGE TURN....
      this.setState({turn: (this.state.turn === 'X') ? 'O' : 'X' });
      this.setState({turnPlayer: (this.state.turn === 'X') ? 'Player 2' : 'Player 1' });   
      

      // NO WINNER...DRAW....
      return false;
  }



  render() {
    return (
      <div>
      <div className={"container container" + this.state.boardsize + ((this.state.showResult) ? " hidden" : " visible") }>
        <div className="menu">
          <h1>Tic Tac Toe</h1>
          <Score score={this.state.score}/>
          <div className="turn">
            Turn: {this.state.turnPlayer}
          </div>
          <ResetButton reset={this.resetBoard.bind(this)}/>
        </div>
        
       <Select
        name="form-field-name"
        value={this.state.boardsize}
        onChange={this.handleChange}
        clearable={false}
        searchable={false}
        autosize={false}
        options={[
          { value: '3', label: '3x3' },
          { value: '4', label: '4x4' },
          { value: '5', label: '5x5' },
        ]}
      />

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
                  updateBoard={this.updateBoard.bind(this)}
                  numbers={this.state.selectedSquares}
                  turn={this.state.turn} />
                )
              }.bind(this))
            )
          }.bind(this))}
        </div>
      </div>
      <div className={"containerwinner container" + this.state.boardsize  + ((this.state.showResult) ? " visible" : " hidden")}>
          <Winner winner={this.state.winner} />
          <Score score={this.state.score}/>
          <PlayButton play={this.updateGrid.bind(this)}/>
      </div>

      </div>
    );
  }
}

export default App;
