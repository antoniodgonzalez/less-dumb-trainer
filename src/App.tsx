import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ServoControl } from './ServoControl';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <ServoControl />
            </header>
        </div>
    );
}

export default App;
