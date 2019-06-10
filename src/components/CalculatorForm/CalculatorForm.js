import React, { Component } from 'react';

class CalculatorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            argument1: '',
            argument2: '',
            operator: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    setAddition = () => {
        this.setState({
            ...this.state,
            operator: 'ADD'
        });
    }

    setSubtraction = () => {
        this.setState({
            ...this.state,
            operator: 'SUB'
        });
    }

    setMultiplication = () => {
        this.setState({
            ...this.state,
            operator: 'MUL'
        });
    }

    setDivision = () => {
        this.setState({
            ...this.state,
            operator: 'DIV'
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.argument1 && this.state.argument2 && this.state.operator) {
            const calculation = {
                arg1: this.state.argument1,
                arg2: this.state.argument2,
                operator: this.state.operator
            };
            this.props.socket.emit('calculation', calculation);
        }
    }

    clearInputs = () => {
        this.setState({
            argument1: '',
            argument2: '',
            operator: ''
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="number" name="argument1" onChange={this.handleChange} value={this.state.argument1} placeholder="argument 1" />
                <input type="button" onClick={this.setAddition} value="+" />
                <input type="button" onClick={this.setSubtraction} value="−" />
                <input type="button" onClick={this.setMultiplication} value="×" />
                <input type="button" onClick={this.setDivision} value="÷" />
                <input type="number" name="argument2" onChange={this.handleChange} value={this.state.argument2} placeholder="argument 2" />
                <input type="submit" value="=" />
                <input type="button" onClick={this.clearInputs} value="clear" />
            </form>
        );
    }
}

export default CalculatorForm;
