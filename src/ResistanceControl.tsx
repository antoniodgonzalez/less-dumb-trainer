import React, { useState } from 'react';

export const ResistanceControl = () => {
    const [value, setValue] = useState(0);
    const [status, setStatus] = useState('');

    const changeValue = (value: number) => {
        fetch(`http://${window.location.hostname}:4000/resistance`, {
            method: "PUT",
            body: JSON.stringify({ value }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                setValue(data.value);
                setStatus('');
            }).catch(err => setStatus(`error: ${err}`));
    };

    const max = 100;
    const buttonStep = 5;

    return (
        <div>
            <p>Resistance is at {value}%</p>
            <button onClick={() => changeValue(Math.max(value - buttonStep, 0))}>-</button>
            <input type="range" value={value} min={0} max={max}
                onChange={e => changeValue(e.target.valueAsNumber)} />
            <button onClick={() => changeValue(Math.min(value + buttonStep, max))}>+</button>
            <p>{status}</p>
        </div>
    );
};