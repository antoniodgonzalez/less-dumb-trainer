import React, { useState } from 'react';

export const ServoControl = () => {
    const [value, setValue] = useState(0);
    const [status, setStatus] = useState('');

    const changeValue = (value: number) => {
        fetch(`http://${window.location.hostname}:4000/value`, {
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

    const max = 120;

    return (
        <div>
            <p>The value is {value}º</p>
            <button onClick={() => changeValue(Math.max(value - 5, 0))}>-</button>
            <input type="range" value={value} min={0} max={max}
                onChange={e => changeValue(e.target.valueAsNumber)} />
            <button onClick={() => changeValue(Math.min(value + 5, max))}>+</button>
            <p>{status}</p>
        </div>
    );
};