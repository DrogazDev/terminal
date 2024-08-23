"use client"

import React, { useState, useEffect } from 'react';
import { SiNextdotjs, SiVercel, SiTypescript, SiWebstorm } from "react-icons/si";
import Image from 'next/image';
import webstorm from '../public/images/webstorm.png'

type Command = {
    command: string;
    result: string;
};

const Terminal: React.FC = () => {
    const [history, setHistory] = useState<Command[]>([]);
    const [input, setInput] = useState<string>('');
    const [displayedResult, setDisplayedResult] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const handleCommand = (command: string) => {
        const lowerCommand = command.toLowerCase();
        const output = executeCommand(lowerCommand);

        setIsTyping(true);  // Start typing effect
        setDisplayedResult('');  // Clear previous result display

        const newCommand = { command: "/ " + command, result: output };
        setHistory([...history, newCommand]);
        typeWriterEffect(output);
    };

    const typeWriterEffect = (text: string) => {
        let i = 0, type = () => i <= text.length ? (setDisplayedResult(text.slice(0, i++)), setTimeout(type, 25)) : setIsTyping(false);
        type();
    };

    const executeCommand = (command: string): string => {

        const commands: { [key: string]: () => string } = {
            about: () => "I'm a passionate developer from the Netherlands skilled in Laravel, NextJS, Java & more",
            projects: () => "Projects listed: \none \n two \nthree \nfour",
            clear: () => {
                const elements = document.getElementsByClassName('line');
                while (elements.length > 0) {
                    elements[0].parentNode?.removeChild(elements[0]);
                }
                setHistory([]);
                return '';
            },
        };

        commands.help = () => {
            const commandList = Object.keys(commands).join(', \n');

            return `Available commands: \n${commandList}`;
        }

        return commands[command] ? commands[command]() : "Command not found";
    };

    const onEnter = () => {
        if (!isTyping) {
            handleCommand(input);
            setInput('');
        }
    };

    const inputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Focus on the input field when any key is pressed
            if (inputRef.current) {
                inputRef.current.focus();
            }
        };
    });

    return (
        <div className="font-dm">
            <div className="flex justify-center items-start pt-3 text-[#f2f2f2]">
                <p>🐉 drogaz.nl: ~/portfolio/terminal/v1</p>
            </div>
            <div className="p-10">

                <div className="text text-[#56bdc9] font-bold pr-2">
                    <p>Welcome to my portfolio, type 'help' to get started</p>
                    <div className="inline-flex">
                        <p>Made with </p>
                        {/*<SiWebstorm className="mx-1 text-blue-400 mt-1"/>*/}
                        <Image src={webstorm} className="mx-1" width={23} height={25} alt="webstorm"/>
                        <SiTypescript className="mx-1 text-blue-500 mt-1"/>
                        <SiNextdotjs className="mx-1 text-white mt-1"/>
                        <SiVercel className="mx-1 text-black mt-1" />
                    </div>
                </div>

                {history.map((item, index) => (
                    <div key={index} className="line space-y-.5 text-[#999999]">
                        <span>{item.command}</span>
                        <div>{index === history.length - 1 ? displayedResult : item.result}</div>
                    </div>
                ))}
                <div className="pt-2">
                    <span className="text-[#97c278] pr-2 font-extrabold">→</span>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && onEnter()}
                        ref={inputRef}
                        autoFocus={true}
                        className="bg-transparent focus:outline-none"/>
                </div>
            </div>
        </div>
    );
};

// @ts-ignore
export default Terminal;