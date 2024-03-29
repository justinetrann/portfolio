import React, { useState, useEffect, useCallback} from 'react';
import './cmdPrompt.css';

const CommandPrompt = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);

    const getCommandOutput = useCallback((input) => {
        // Splitting the input to support commands with arguments
        const parts = input.split(' ');
        const command = parts[0];
        const args = parts.slice(1);

        // Simulated file system for demonstration (could be expanded and made more complex)
        const fileSystem = ['Education','EducationDetails.txt'];

        switch (command) {
            case 'help':
                return 'Available commands: help, clear, ls, cd, pwd, mkdir, touch, rm, nano, echo, cat';
            case 'cat':
                if (args[0].toLowerCase() === 'educationdetails.txt') {
                    return (
                        <div>
                            <span style={{paddingLeft: '2em'}}>School: </span><span style={{color: 'red'}}>University of Houston</span><span> | </span><span style={{color: 'red'}}>Fall 2023</span>
                            <br />
                            <span style={{paddingLeft: '2em'}}>Degree: </span><span style={{color: 'red'}}>Bachelor</span><span> of Science in </span><span style={{color: 'red'}}>Computer Science</span>
                            <br />
                            <span style={{paddingLeft: '2em'}}>Concentration: </span><span style={{color: 'red'}}>Software Design</span>
                        </div>
                    );
                }
                return `File ${args.join(' ')} not found.`;
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
    }, []);

    const processCommand = useCallback((input) => {
        if (input.trim().toLowerCase() === 'clear') {
            setOutput([]);
        } else {
            const commandOutput = getCommandOutput(input.trim().toLowerCase());
            setOutput((prevOutput) => [...prevOutput, `C:\\Users\\Guest> ${input}`, commandOutput]);
        }
    }, [getCommandOutput]); // Include getCommandOutput here

    useEffect(() => {
        processCommand('clear');
        processCommand('cat EducationDetails.txt');
    }, [processCommand]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            processCommand(input);
            setInput('');
        }
    };

    return (
        <div className='stylecmdprompt'>
            <h3 className="centerTitle">Command Prompt</h3>
            <div className="cmdPromptContainer">
                <div className="cmdPrompt">
                    <div className="cmdOutput">
                        {output.map((line, index) => (
                            <div key={index}>
                                {typeof line === 'string' ? line : line}
                            </div>
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
