import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
// import io from 'socket.io';
import './App.css';

import CalculationList from '../CalculationList/CalculationList';
import CalculatorForm from '../CalculatorForm/CalculatorForm';

let endpoint = 'http://127.0.0.1:5000'
// if (process.env.PORT) {
    // let endpoint = 'https://fast-castle-54694.herokuapp.com:' + process.env.PORT;
// }

class App extends Component {

    constructor() {
        super();
        this.state = {
            timeString: ''
        };
    }

    componentDidMount() {
        // const { endpoint } = this.state;
        // //Very simply connect to the socket
        const socket = socketIOClient(endpoint);
        // //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
        // socket.on("outgoing data", data => {
        //     this.setState({ response: data.num });
        //     console.log(`data.num = ${data.num}`);
        // });

        // var socket = io();

        socket.on('time', timeString => {
            console.log(timeString);
            this.setState({ timeString: timeString + '' });
        });

        // this.setState({ timeString: timeString + '' });
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
