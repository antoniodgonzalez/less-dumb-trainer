import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ResistanceControl } from './ResistanceControl';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <ResistanceControl />
            </header>
        </div>
    );
}

export default App;
