import React, { useEffect, useRef } from 'react';

interface ConsoleLogProps {
  logs: string[];
}

export const ConsoleLog: React.FC<ConsoleLogProps> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="font-mono text-sm text-neon-dim opacity-70 h-full overflow-y-auto scrollbar-hide">
      {logs.map((log, index) => (
        <div key={index} className="mb-1">
          <span className="mr-2 text-xs opacity-50">
            {new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            .{Math.floor(Math.random() * 999).toString().padStart(3, '0')}
          </span>
          <span className="text-neon-dim">
            {log}
          </span>
          <span className="float-right text-xs opacity-50">
            [OK]
          </span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
