import React, { Component } from 'react';
import './Winner.css';


export default class Winner extends Component {
    render() {
        return (
            <div className={"innerwinnercontainer " + ((this.props.winner)  ? "winner"+this.props.winner +" visible" : 'hidden') }>
                <h2>{ this.props.winner === "DRAW" ? "DRAW" : "WINNER: "+this.props.winner}</h2>
             </div>
        )
    }
}