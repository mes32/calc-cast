import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';

import CalculationList from '../CalculationList/CalculationList';
import CalculatorForm from '../CalculatorForm/CalculatorForm';

let endpoint = 'http://localhost:5000'
if (process.env.HOST && process.env.PORT) {
    endpoint = process.env.HOST + ':' + process.env.PORT;
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            socket: socketIOClient(endpoint),
            expressionList: []
        };

        // const socket = socketIOClient(endpoint);
        // //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
        // socket.on("outgoing data", data => {
        //     this.setState({ response: data.num });
        //     console.log(`data.num = ${data.num}`);
        // });

        this.state.socket.on('list expressions', response => {
            console.log(`list expressions: ${response.expressionList}`);
            this.setState({ ...this.state, expressionList: response.expressionList });
        });
    }

    // componentDidMount() {
    //     const socket = socketIOClient(endpoint);
    //     // //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
    //     // socket.on("outgoing data", data => {
    //     //     this.setState({ response: data.num });
    //     //     console.log(`data.num = ${data.num}`);
    //     // });

    //     socket.on('time', timeString => {
    //         this.setState({ timeString: timeString + '' });
    //     });
    // }

    submitExpression = (expr) => {
        this.state.socket.emit('submit expression', expr);
    }

    render() {
        return (
            <div className="App">
                <h1>Calc Cast</h1>
                <CalculatorForm submitExpression={this.submitExpression} />
                <CalculationList list={this.state.expressionList} />
            </div>
        );
    }
}

export default App;
