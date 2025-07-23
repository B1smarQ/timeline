import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface TypewriterMarkdownProps {
    content: string;
    speed?: number;
    className?: string;
    onComplete?: () => void;
}

export const TypewriterMarkdown: React.FC<TypewriterMarkdownProps> = ({
    content,
    speed = 25,
    className = '',
    onComplete
}) => {
    const [displayedContent, setDisplayedContent] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // Clean content for character-by-character display
    const cleanContent = useMemo(() => {
        return content.replace(/\n\s*\n/g, '\n\n'); // Normalize line breaks
    }, [content]);

    useEffect(() => {
        if (currentIndex < cleanContent.length && !isComplete) {
            const currentChar = cleanContent[currentIndex];

            // Adjust speed based on character type for more natural reading
            let charSpeed = speed;
            if (currentChar === ' ') charSpeed = speed * 0.3; // Faster for spaces
            if (currentChar === '\n') charSpeed = speed * 2; // Slower for line breaks
            if (currentChar === '.' || currentChar === '!' || currentChar === '?') charSpeed = speed * 3; // Pause at sentence endings
            if (currentChar === ',') charSpeed = speed * 1.5; // Brief pause at commas

            const timer = setTimeout(() => {
                setDisplayedContent(prev => prev + currentChar);
                setCurrentIndex(prev => prev + 1);
            }, charSpeed);

            return () => clearTimeout(timer);
        } else if (currentIndex >= cleanContent.length && !isComplete) {
            setIsComplete(true);
            if (onComplete) {
                setTimeout(onComplete, 500); // Small delay before marking complete
            }
        }
    }, [currentIndex, cleanContent, speed, onComplete, isComplete]);

    // Reset when content changes
    useEffect(() => {
        setDisplayedContent('');
        setCurrentIndex(0);
        setIsComplete(false);
    }, [content]);

    return (
        <div className={className}>
            <ReactMarkdown>{displayedContent}</ReactMarkdown>
            {!isComplete && (
                <motion.div
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                    className="inline-block w-0.5 h-5 bg-primary-500 ml-1 align-text-bottom"
                />
            )}
        </div>
    );
};