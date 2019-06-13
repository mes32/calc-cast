import React from 'react';

import './CalculationList.css';
import CalculationListRow from './CalculationListRow/CalculationListRow';

function CalculationList(props) {
    return (
        <div className="calculationListDiv">
            <h2>Calculation History:</h2>
            <table className="calculationListTable">
                <thead>
                    <tr>
                        <th>Expression</th>
                        <th>Result</th>
                        <th>Calculation Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {props.expressionList.map(
                        expr => <CalculationListRow key={expr.id} expr={expr} />
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CalculationList;
