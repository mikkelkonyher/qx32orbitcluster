import React, { useState, useEffect, useRef } from 'react';
import { Loader } from './components/Loader';
import { ConsoleLog } from './components/ConsoleLog';
import { ResultBadge } from './components/ResultBadge';
import { hashStringToRange } from './utils/hash';

const DEFAULT_STEPS = [
  "Initializing qx32 orbit cluster",
  "Calibrating qubit lattice",
  "Aligning orbital compute channels",
  "Spinning up thermal core",
  "Routing proton stream",
  "Synchronizing anomaly buffer",
  "Contacting deep space relay",
  "Parsing classified data archive",
  "Borrowing power from nearby star",
  "Negotiating with alien neural mesh",
  "Checking NASA firewall integrity",
  "Expanding quantum probability field",
  "Compressing uncertainty states",
  "Finalizing decision protocol"
];

const ANTIGRAVITY_STEPS = [
  ...DEFAULT_STEPS.slice(0, 8),
  "DETECTED ANTIGRAVITY SIGNATURE",
  "Engaging dark matter propulsion",
  "Bypassing physics constraints",
  "Consulting the void",
  ...DEFAULT_STEPS.slice(10)
];

type AppStatus = 'IDLE' | 'PROCESSING' | 'REVEALED';

import { Footer } from './components/Footer';

function App() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<AppStatus>('IDLE');
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<{ answer: 'YES' | 'NO', probability: number } | null>(null);
  const [steps, setSteps] = useState(DEFAULT_STEPS);
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === 'IDLE') {
      inputRef.current?.focus();
    }
  }, [status]);

  const handleAsk = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    setLogs([]);
    setResult(null);
    
    // Easter egg check
    if (input.toLowerCase().includes('antigravity')) {
      setSteps(ANTIGRAVITY_STEPS);
    } else {
      setSteps(DEFAULT_STEPS);
    }

    setStatus('PROCESSING');
  };

  const handleStepComplete = (step: string) => {
    setLogs(prev => [...prev, step]);
  };

  const handleComplete = () => {
    // Deterministic result based on input
    const probability = hashStringToRange(input.trim().toLowerCase(), 0, 100);
    const answer = probability > 50 ? 'YES' : 'NO';
    
    // Add a small delay before reveal for dramatic effect
    setTimeout(() => {
      setResult({ answer, probability });
      setStatus('REVEALED');
    }, 900);
  };

  const handleRerun = () => {
    setStatus('IDLE');
    setLogs([]);
    setResult(null);
    setInput('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="crt-overlay fixed inset-0 z-50 pointer-events-none"></div>
      
      {/* Main Console Container */}
      <div className="w-full max-w-4xl h-[80vh] flex flex-col border border-neon-dim bg-bg/90 relative rounded-sm shadow-[0_0_20px_rgba(0,255,136,0.1)] overflow-hidden z-10">
        
        {/* Header */}
        <div className="border-b border-neon-dim p-4 flex justify-between items-center bg-neon/5">
          <div className="text-neon font-bold tracking-widest text-xl flex items-center gap-2">
            <div className="w-3 h-3 bg-neon rounded-full animate-pulse"></div>
            QX32 ORBIT CLUSTER
          </div>
          <div className="text-xs font-mono text-neon-dim opacity-70">
            SYS.VER.9.2.1 // ONLINE
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          
          {/* Left/Top: Main Display */}
          <div className="flex-1 p-8 flex flex-col items-center justify-center relative z-10">
            {status === 'IDLE' && (
              <div className="w-full max-w-md text-center animate-fade-in">
                <div className="mb-6 text-center animate-pulse">
                  <div className="text-yellow-400 text-xs font-bold mb-1">⚠️ Warning, Operator ⚠️</div>
                  <div className="text-[10px] text-neon-dim/80 max-w-xs mx-auto leading-tight">
                    <div>Each query consumes more energy than a small city.</div>
                    <div className="mt-1">When engaging the QX32 ORBIT CLUSTER, there is a small chance the simulation you are currently in may experience glitches.</div>
                  </div>
                </div>
                <div className="mb-8 text-neon-dim font-mono text-sm opacity-80">
                  AWAITING INPUT QUERY...
                </div>
                <form onSubmit={handleAsk} className="relative group">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="ask qx32 anything..."
                    className="w-full bg-transparent border-b-2 border-neon-dim py-3 text-center text-xl md:text-2xl text-neon font-mono focus:outline-none focus:border-neon placeholder-neon-dim/30 transition-all"
                    autoComplete="off"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neon scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
                </form>
                <button 
                  onClick={() => handleAsk()}
                  className="mt-8 px-8 py-3 bg-neon/10 border border-neon text-neon hover:bg-neon hover:text-bg transition-all duration-300 font-mono tracking-wider uppercase text-sm"
                >
                  Ask The Cluster
                </button>
              </div>
            )}

            {status === 'PROCESSING' && (
              <div className="w-full max-w-lg">
                <Loader 
                  steps={steps} 
                  onStepComplete={handleStepComplete} 
                  onComplete={handleComplete} 
                />
              </div>
            )}

            {status === 'REVEALED' && result && (
              <ResultBadge 
                result={result.answer} 
                probability={result.probability} 
                onRerun={handleRerun} 
              />
            )}
          </div>

          {/* Right/Bottom: Telemetry Log (Sidebar on desktop, hidden/small on mobile) */}
          <div className={`
            border-t md:border-t-0 md:border-l border-neon-dim bg-black/20 
            flex flex-col transition-all duration-500
            ${status === 'IDLE' ? 'h-0 md:w-0 opacity-0' : 'h-48 md:h-auto md:w-80 opacity-100 p-4'}
          `}>
            <div className="text-xs font-mono text-neon-dim mb-2 uppercase tracking-wider border-b border-neon-dim/30 pb-1">
              System Telemetry
            </div>
            <ConsoleLog logs={logs} />
          </div>

        </div>

        {/* Footer Status Bar */}
        <div className="border-t border-neon-dim p-2 flex justify-between items-center text-[10px] md:text-xs font-mono text-neon-dim bg-neon/5">
          <div>MEM: 64TB // QUBITS: 4096 // TEMP: 2.4K</div>
          <div className="animate-pulse">CONNECTED TO DEEP SPACE RELAY</div>
        </div>

      </div>
      
      <Footer />
    </div>
  );
}

export default App;
