import React, { Component } from 'react';
import './App.css';

import CalculationList from '../CalculationList/CalculationList';
import CalculatorForm from '../CalculatorForm/CalculatorForm';
import ClientSocket from '../../classes/ClientSocket';
import Header from '../Header/Header';
import ServerClock from '../ServerClock/ServerClock';

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
            expressionList: newList 
        });
    }

    updateTime = (timeString) => {
        this.setState({
            timeString: timeString
        });
    }

    submitExpression = (expr) => {
        this.socket.emitExpression(expr);
    }

    deleteExpression = (expr) => {
        this.socket.deleteExpression(expr);
    }

    render() {
        return (
            <div className="App">
                <Header />
                <CalculatorForm submitExpression={this.submitExpression} />
                <CalculationList expressionList={this.state.expressionList} deleteExpression={this.deleteExpression} />
                <ServerClock timeString={this.state.timeString} />
            </div>
        );
    }
}

export default App;
