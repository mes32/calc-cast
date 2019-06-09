import React from 'react';
import './App.css';

import CalculationList from '../CalculationList/CalculationList';
import CalculatorForm from '../CalculatorForm/CalculatorForm';

function App() {
    return (
        <div className="App">
            <CalculatorForm />
            <CalculationList />
        </div>
    );
}

export default App;
