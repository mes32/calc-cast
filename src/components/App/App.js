import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';

import CalculationList from '../CalculationList/CalculationList';
import CalculatorForm from '../CalculatorForm/CalculatorForm';

// let endpoint = 'https://fast-castle-54694.herokuapp.com';
// let endpoint = 'http://localhost';

class App extends Component {
    constructor() {
        super();
        this.socket = io('https://fast-castle-54694.herokuapp.com/');
        this.state = {
            timeString: '',
            expressionList: []
        };

        this.socket.on('time', timeString => {
            this.setState({ timeString: timeString + '' });
        });

        this.socket.on('list expressions', response => {
            console.log(`list expressions: ${response.expressionList}`);
            this.setState({ ...this.state, expressionList: response.expressionList });
        });
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
