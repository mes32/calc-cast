import React from 'react';

function CalculatorForm() {
    return (
        <form>
            <input type="number" placeholder="argument 1" />
            <input type="button" value="+" />
            <input type="button" value="−" />
            <input type="button" value="×" />
            <input type="button" value="÷" />
            <input type="number" placeholder="argument 2" />
            <input type="button" value="=" />
            <input type="button" value="clear" />
        </form>
    );
}

export default CalculatorForm;
