import React from 'react';

import CalculationListRow from './CalculationListRow/CalculationListRow';

function CalculationList(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Expression</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                {props.expressionList.map(
                    expr => <CalculationListRow key={expr.id} expr={expr} />
                )}
            </tbody>
        </table>
    );
}

export default CalculationList;
