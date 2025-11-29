import React, { useEffect, useState } from 'react';

interface ResultBadgeProps {
  result: 'YES' | 'NO';
  probability: number;
  onRerun: () => void;
}

export const ResultBadge: React.FC<ResultBadgeProps> = ({ result, probability, onRerun }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`transition-all duration-1000 transform ${show ? 'scale-100 opacity-100' : 'scale-90 opacity-0'} flex flex-col items-center justify-center`}>
      <div className="relative group">
        <div className="absolute inset-0 bg-neon opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500 rounded-lg"></div>
        <div className="relative border-4 border-neon bg-bg p-8 md:p-12 rounded-lg shadow-[0_0_30px_rgba(0,255,136,0.3)]">
          <div className="scanline opacity-20"></div>
          <h1 className="text-6xl md:text-9xl font-bold text-neon neon-glow tracking-widest mb-4 text-center">
            {result}
          </h1>
          <div className="text-center font-mono text-neon-dim text-sm md:text-base tracking-widest uppercase border-t border-neon-dim pt-4 mt-2">
            Probability: {probability}%
          </div>
        </div>
      </div>
      
      <button 
        onClick={onRerun}
        className="mt-12 px-6 py-2 border border-neon-dim text-neon-dim hover:bg-neon hover:text-bg transition-colors duration-300 font-mono text-sm uppercase tracking-wider opacity-60 hover:opacity-100"
      >
        Rerun Protocol
      </button>
    </div>
  );
};
