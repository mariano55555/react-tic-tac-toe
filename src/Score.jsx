import React, { Component } from 'react';
import "./Score.css";

export default class Score extends Component {
    
    render() {
        return (
            <table className="scoretable" cellSpacing="10">
                <thead>
                    <tr>
                        <td>Player 1:</td>
                        <td>Player 2:</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="scoreplayer1">{this.props.score.X}</td>
                        <td className="scoreplayer2">{this.props.score.O}</td>
                    </tr>
                </tbody>
            </table>
        )
    }

}