import React, { useEffect, useState, useRef } from 'react';
import { playBeep } from '../utils/sound';

interface LoaderProps {
  steps: string[];
  onComplete: () => void;
  onStepComplete: (step: string) => void;
}

export const Loader: React.FC<LoaderProps> = ({ steps, onComplete, onStepComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (currentStepIndex >= steps.length) {
      onComplete();
      return;
    }

    const targetText = steps[currentStepIndex];
    
    if (isPaused) {
      // Pause after line completion
      const pauseDuration = 400 + Math.random() * 500; // 400-900ms
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false);
        onStepComplete(targetText);
        setCurrentText('');
        setCurrentStepIndex(prev => prev + 1);
      }, pauseDuration);
      return;
    }

    if (currentText.length < targetText.length) {
      // Typing effect
      const charDelay = 25 + Math.random() * 15; // 25-40ms
      timeoutRef.current = setTimeout(() => {
        setCurrentText(targetText.slice(0, currentText.length + 1));
        if (Math.random() > 0.7) playBeep(800 + Math.random() * 200, 0.03); // Random blip
      }, charDelay);
    } else {
      // Line finished typing
      playBeep(600, 0.1, 'sine'); // Line complete tone
      setIsPaused(true);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentText, currentStepIndex, isPaused, steps, onComplete, onStepComplete]);

  return (
    <div className="font-mono text-neon text-lg md:text-xl relative">
      <span className="mr-2">
        {currentStepIndex < steps.length ? '>' : ''}
      </span>
      {currentText}
      <span className="typewriter-cursor ml-1"></span>
      {isPaused && (
        <span className="ml-4 text-sm text-neon-dim animate-pulse">
           [OK]
        </span>
      )}
    </div>
  );
};
