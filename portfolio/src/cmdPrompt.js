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
        if (input.trim().toLowerCase() === 'clear') {
            setOutput([]);
        } else {
            const commandOutput = getCommandOutput(input.trim().toLowerCase());
            setOutput((prevOutput) => [...prevOutput, `C:\\Users\\Guest> ${input}`, commandOutput]);
        }
    };

    const getCommandOutput = (input) => {
        // Splitting the input to support commands with arguments
        const parts = input.split(' ');
        const command = parts[0];
        const args = parts.slice(1);

        // Simulated file system for demonstration (could be expanded and made more complex)
        const fileSystem = ['Education','EducationDetails.txt'];

        switch (command) {
            case 'help':
                return 'Available commands: help, clear, ls, cd, pwd, mkdir, touch, rm, nano, echo';
            case 'ls':
                // Simple simulation: return a list of files/directories
                return fileSystem.join(' ');
            case 'cd':
                // Simulated change directory (doesn't actually change directories)
                return `Changed directory to ${args.join(' ')}`;
            case 'pwd':
                // Simulated print working directory
                return '/home/user/Guest';
            case 'mkdir':
                // Simulated make directory
                return `Directory ${args.join(' ')} created.`;
            case 'touch':
                // Simulated touch file (create or update a file's timestamp)
                return `File ${args.join(' ')} touched.`;
            case 'rm':
                // Simulated remove file/directory
                return `Removed ${args.join(' ')}`;
            case 'nano':
            case 'vim':
                // Simulated text editor opening
                return `Editing ${args.join(' ')} (simulation)`;
            case 'echo':
                // Simulated echo command
                return args.join(' ');
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
