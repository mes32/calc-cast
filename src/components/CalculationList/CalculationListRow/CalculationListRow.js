import React from 'react';

function CalculationList(props) {
    const arg1 = props.expr.arg1;
    const arg2 = props.expr.arg2;
    const ans = props.expr.ans;
    const time = new Date(props.expr.time).toUTCString();

    let operator = '???';
    if (props.expr.operator === 'ADD') {
        operator = '+';
    } else if (props.expr.operator === 'SUB') {
        operator = '−';
    } else if (props.expr.operator === 'MUL') {
        operator = '×';
    } else if (props.expr.operator === 'DIV') {
        operator = '÷';
    }

    return (
        <tr>
            <td>{arg1} {operator} {arg2}</td>
            <td>{ans}</td>
            <td>{time}</td>
            <td><input type="button" onClick={() => props.deleteExpression(props.expr)} value="delete" /></td>
        </tr>
    );
}

export default CalculationList;
