import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';

import CalculationList from '../CalculationList/CalculationList';
import CalculatorForm from '../CalculatorForm/CalculatorForm';

class App extends Component {
    constructor() {
        super();
        this.socket = io();
        this.socket.on('time', timeString => {
            this.setState({ timeString: timeString + '' });
        });

        this.socket.on('list expressions', response => {
            console.log(`list expressions: ${response.expressionList}`);
            this.setState({ ...this.state, expressionList: response.expressionList });
        });
        this.state = {
            timeString: '',
            expressionList: []
        };
    }

    submitExpression = (expr) => {
        this.socket.emit('submit expression', expr);
    }

    render() {
        return (
            <div className="App">
                <h1>Calc Cast</h1>
                <CalculatorForm submitExpression={this.submitExpression} />
                <CalculationList list={this.state.expressionList} />
                {this.state.timeString}
            </div>
        );
    }
}

export default App;
