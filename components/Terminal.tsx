import React, { useState } from 'react';

type Command = {
    command: string;
    result: string;
};

const Terminal: React.FC = () => {
    const [history, setHistory] = useState<Command[]>([]);
    const [input, setInput] = useState<string>('');

    const handleCommand = (command: string) => {
        const lowerCommand = command.toLowerCase();
        const output = executeCommand(lowerCommand);
        setHistory([...history, {command, result: output}]);
    };

    const executeCommand = (command: string): string => {
        const commands: { [key: string]: () => string } = {
            help: () => "Available commands: help, about, projects",
            about: () => "I'm a passionate developer from the Netherlands skilled in Laravel, NextJS, Java & more",
            projects: () => "Projects listed: \none \n two \nthree \nfour",
        };
        return commands[command] ? commands[command]() : "Command not found";
    };

    const onEnter = () => {
        handleCommand(input);
        setInput('');
    };

    return (
        <div className="terminal">
            {history.map((item, index) => (
                    <div key={index}>
                        <span>{item.command}</span>
                        <div>{item.result}</div>
                        </div>
                ))}
            <div className="input-line">
        <span>$</span>
        <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => e.key === 'Enter' && onEnter()}
    autoFocus
    />
    </div>
    </div>
);
}