import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Characters to use for the decoding effect
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export default function GlitchText({ text, as: Component = 'span', className = '', speed = 50 }) {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(text
                .split('')
                .map((letter, index) => {
                    if (index < iteration) {
                        return text[index];
                    }
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join('')
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3; // Controls the "unscramble" speed
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return (
        <Component className={`relative inline-block ${className}`}>
            {/* Main Text */}
            <span className="relative z-10">{displayText}</span>

            {/* RGB Split Effect (Static/Subtle) */}
            <span className="absolute top-0 left-[-1px] -z-10 text-[var(--accent-red)] opacity-10 mix-blend-screen overflow-hidden clip-text h-full animate-pulse">
                {text}
            </span>
            <span className="absolute top-0 left-[1px] -z-10 text-[var(--primary-cyan)] opacity-30 mix-blend-screen overflow-hidden clip-text h-full animate-pulse" style={{ animationDelay: '0.1s' }}>
                {text}
            </span>
        </Component>
    );
}
