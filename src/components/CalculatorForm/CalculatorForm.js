import React, { Component } from 'react';

import './CalculatorForm.css';

class CalculatorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arg1: '',
            arg2: '',
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
        if (this.state.arg1 && this.state.arg2 && this.state.operator) {
            const expr = {
                arg1: Number(this.state.arg1),
                arg2: Number(this.state.arg2),
                operator: this.state.operator
            };
            this.props.submitExpression(expr);
            this.clearInputs();
        }
    }

    clearInputs = () => {
        this.setState({
            arg1: '',
            arg2: '',
            operator: ''
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="number" name="arg1" onChange={this.handleChange} value={this.state.arg1} placeholder="argument 1" />
                <input type="button" className={this.state.operator === 'ADD' ? 'selectedOperator' : ''} onClick={this.setAddition} value="+" />
                <input type="button" className={this.state.operator === 'SUB' ? 'selectedOperator' : ''} onClick={this.setSubtraction} value="−" />
                <input type="button" className={this.state.operator === 'MUL' ? 'selectedOperator' : ''} onClick={this.setMultiplication} value="×" />
                <input type="button" className={this.state.operator === 'DIV' ? 'selectedOperator' : ''} onClick={this.setDivision} value="÷" />
                <input type="number" name="arg2" onChange={this.handleChange} value={this.state.arg2} placeholder="argument 2" />
                <input type="submit" value="=" />
                <input type="button" onClick={this.clearInputs} value="Clear" />
            </form>
        );
    }
}

export default CalculatorForm;
