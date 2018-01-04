import React, { Component } from 'react';
import "./Square.css";

export default class Square extends Component {
    tileClick(props){
        props.updateBoard(props.row, props.column, props.turn);
    }
    render() {
        return (
            <div className={"tile " + this.props.row+''+this.props.column +  ((this.props.winner) ? ( this.props.numbers.includes(this.props.row+''+this.props.column) ? " selectedWinner"+this.props.winner : "") : "") } onClick={() => this.tileClick(this.props)}>
                <p className={this.props.value ? "selected" : ""} >{this.props.gameBoard[this.props.row+''+this.props.column]}</p>
            </div>
        )
    }
}