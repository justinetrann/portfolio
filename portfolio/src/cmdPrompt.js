import React, { useState } from 'react';
import './cmdPrompt.css';

const CommandPrompt = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            const newOutput = processCommand(input);
            setOutput([...output, `> ${input}`, newOutput]);
            setInput(''); // Clear input
        }
    };

    const processCommand = (input) => {
        // Define command processing logic here
        switch (input.trim().toLowerCase()) {
            case 'help':
                return 'Available commands: help, about, reset...';
            default:
                return `Unknown command: ${input}`;
        }
    };

    return (
        <div className="cmdPrompt">
            <div className="cmdOutput">
                {output.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </div>
            <input
                type="text"
                className="cmdInput"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
            />
        </div>
    );
};

export default CommandPrompt;