import React, { useState } from 'react';
import './cmdPrompt.css';

const CommandPrompt = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            processCommand(input);
            setInput('');
        }
    };

    const processCommand = (input) => {
        // Move the logic to handle 'clear' outside to avoid direct state manipulation inside switch
        if (input.trim().toLowerCase() === 'clear') {
            setOutput([]);
        } else {
            // Define command processing logic here
            const commandOutput = getCommandOutput(input.trim().toLowerCase());
            setOutput((prevOutput) => [...prevOutput, `C:\\Users\\Guest> ${input}`, commandOutput]);
        }
    };

    const getCommandOutput = (input) => {
        switch (input) {
            case 'help':
                return 'Available commands: help, clear';
            case '':
                return '';
            default:
                return `'${input}' is not recognized as an internal or external command.`;
        }
    };

    return (
        <div className='stylecmdprompt'>
            <h3 className="centerTitle">Command Prompt</h3>
            <div className="cmdPromptContainer">
                <div className="cmdPrompt">
                    <div className="cmdOutput">
                        {output.map((line, index) => (
                            <div key={index}>{line}</div>
                        ))}
                    </div>
                    <div className="cmdInputContainer">
                        <span className="cmdPrefix">C:\Users\Guest&gt;</span>
                        <input
                            type="text"
                            className="cmdInput"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommandPrompt;
