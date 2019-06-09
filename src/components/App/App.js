import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';

import CalculationList from '../CalculationList/CalculationList';
import CalculatorForm from '../CalculatorForm/CalculatorForm';

class App extends Component {

    constructor() {
        super();
        this.state = {
            response: 0,
            endpoint: "http://127.0.0.1:5000"
        };
    }

    componentDidMount() {
        const { endpoint } = this.state;
        //Very simply connect to the socket
        const socket = socketIOClient(endpoint);
        //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
        socket.on("outgoing data", data => this.setState({ response: data.num }));
    }

    render() {
        return (
            <div className="App">
                <CalculatorForm />
                <CalculationList />
            </div>
        );
    }
}

export default App;
