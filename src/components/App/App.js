import React, { Component } from 'react';
import './App.css';

import CalculationList from '../CalculationList/CalculationList';
import CalculatorForm from '../CalculatorForm/CalculatorForm';
import ClientSocket from '../../classes/ClientSocket';

class App extends Component {
    constructor() {
        super();
        this.socket = new ClientSocket(this);
        this.state = {
            timeString: '',
            expressionList: []
        };
    }

    updateExpressionList = (newList) => {
        this.setState({
            ...this.state, 
            expressionList: newList 
        });
    }

    updateTime = (newTimeString) => {
        this.setState({ 
            ...this.state,
            timeString: newTimeString
        });
    }

    submitExpression = (expr) => {
        this.socket.emitExpression(expr);
    }

    render() {
        return (
            <div className="App">
                <h1>Calc Cast</h1>
                <CalculatorForm submitExpression={this.submitExpression} />
                <h2>Calculation History</h2>
                <CalculationList list={this.state.expressionList} />
                {this.state.timeString}
            </div>
        );
    }
}

export default App;
