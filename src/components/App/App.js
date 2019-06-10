import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
// import io from 'socket.io';
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
            timeString: ''
        };
    }

    componentDidMount() {
        const socket = socketIOClient(endpoint);
        // //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
        // socket.on("outgoing data", data => {
        //     this.setState({ response: data.num });
        //     console.log(`data.num = ${data.num}`);
        // });

        socket.on('time', timeString => {
            this.setState({ timeString: timeString + '' });
        });

    }

    render() {
        return (
            <div className="App">
                <CalculatorForm />
                <CalculationList />

                <p>timeString = {this.state.timeString} </p>
            </div>
        );
    }
}

export default App;
