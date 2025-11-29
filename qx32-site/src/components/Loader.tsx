import React, { useEffect, useState, useRef } from 'react';
import { playLoadingSound, stopLoadingSound } from '../utils/sound';

interface LoaderProps {
  steps: string[];
  willError: boolean;
  onComplete: () => void;
  onStepComplete: (step: string, status: 'OK' | 'FAIL') => void;
}

export const Loader: React.FC<LoaderProps> = ({ steps, willError, onComplete, onStepComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [currentStepStatus, setCurrentStepStatus] = useState<'OK' | 'FAIL'>('OK');
  const [glitchActive, setGlitchActive] = useState(false);
  const [glitchText, setGlitchText] = useState('');
  
  const timeoutRef = useRef<number | null>(null);
  const glitchTimeoutRef = useRef<number | null>(null);
  const failedStepsRef = useRef<Set<number>>(new Set());

  // Determine which steps should fail when error occurs
  useEffect(() => {
    if (willError && steps.length > 0) {
      const numFailures = Math.min(Math.floor(steps.length * 0.3), Math.max(2, Math.floor(steps.length / 3)));
      const failed = new Set<number>();
      
      // Randomly select steps to fail (avoid first and last steps)
      while (failed.size < numFailures) {
        const index = Math.floor(Math.random() * (steps.length - 2)) + 1; // Skip first (0) and last
        failed.add(index);
      }
      
      failedStepsRef.current = failed;
    }
  }, [willError, steps]);

  // Play sound when loader starts
  useEffect(() => {
    playLoadingSound();
    
    return () => {
      stopLoadingSound();
      if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
    };
  }, []);

  // Random glitch effects
  useEffect(() => {
    if (!currentText) return;

    // Random chance of glitch (30% chance every 200-800ms)
    const scheduleGlitch = () => {
      const delay = Math.random() * 600 + 200;
      glitchTimeoutRef.current = setTimeout(() => {
        if (Math.random() < 0.3 && currentText.length > 0) {
          setGlitchActive(true);
          // Corrupt some characters
          const corrupted = currentText
            .split('')
            .map((char, i) => {
              if (Math.random() < 0.15 && char !== ' ') {
                const glitchChars = ['█', '▓', '▒', '░', '▄', '▀', '■', '□'];
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
              }
              return char;
            })
            .join('');
          setGlitchText(corrupted);
          
          // Remove glitch after short time
          setTimeout(() => {
            setGlitchActive(false);
            setGlitchText('');
            scheduleGlitch();
          }, 50 + Math.random() * 100);
        } else {
          scheduleGlitch();
        }
      }, delay) as unknown as number;
    };

    scheduleGlitch();

    return () => {
      if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
    };
  }, [currentText]);

  useEffect(() => {
    if (currentStepIndex >= steps.length) {
      onComplete();
      return;
    }

    const targetText = steps[currentStepIndex];
    
    // Calculate timing to ensure total duration is ~7 seconds
    const TOTAL_DURATION = 7000;
    const stepDuration = TOTAL_DURATION / steps.length;
    const pauseDuration = stepDuration * 0.3; // 30% of time for pause
    const typingTimeAvailable = stepDuration * 0.7; // 70% of time for typing
    const charDelay = typingTimeAvailable / (targetText.length || 1);

    if (isPaused) {
      // Pause after line completion
      const stepStatus = failedStepsRef.current.has(currentStepIndex) ? 'FAIL' : 'OK';
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false);
        onStepComplete(targetText, stepStatus);
        setCurrentText('');
        setCurrentStepIndex(prev => prev + 1);
      }, pauseDuration) as unknown as number;
      return;
    }

    if (currentText.length < targetText.length) {
      // Typing effect
      timeoutRef.current = setTimeout(() => {
        setCurrentText(targetText.slice(0, currentText.length + 1));
      }, charDelay) as unknown as number;
    } else {
      // Line finished typing
      const stepStatus = failedStepsRef.current.has(currentStepIndex) ? 'FAIL' : 'OK';
      setCurrentStepStatus(stepStatus);
      setIsPaused(true);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentText, currentStepIndex, isPaused, steps, onComplete, onStepComplete]);

  return (
    <div className="font-mono text-neon text-lg md:text-xl relative glitch-text-corrupt">
      <span className="mr-2">
        {currentStepIndex < steps.length ? '>' : ''}
      </span>
      <span className="relative">
        {glitchActive ? (
          <span className="text-red-400 opacity-80">{glitchText}</span>
        ) : (
          currentText
        )}
      </span>
      <span className="typewriter-cursor ml-1"></span>
      {isPaused && (
        <span className={`ml-4 text-sm animate-pulse ${
          currentStepStatus === 'FAIL' 
            ? 'text-red-400' 
            : 'text-neon-dim'
        }`}>
          [{currentStepStatus}]
        </span>
      )}
    </div>
  );
};
