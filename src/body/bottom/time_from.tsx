import React, { useState, useEffect } from 'react';


const InputForm = ({ onFetch }) => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [catId, setCatId] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onFetch(start, end, catId);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={start}
                onChange={e => setStart(e.target.value)}
                placeholder="Start Date"
            />
            <input
                type="text"
                value={end}
                onChange={e => setEnd(e.target.value)}
                placeholder="End Date"
            />
            <input
                type="text"
                value={catId}
                onChange={e => setCatId(e.target.value)}
                placeholder="Cat ID"
            />
            <button type="submit">Fetch Data</button>
        </form>
    );
};

export default InputForm