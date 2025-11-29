import React, { useState, useEffect, useRef } from 'react';
import { Loader } from './components/Loader';
import { ConsoleLog } from './components/ConsoleLog';
import { ResultBadge } from './components/ResultBadge';
import { hashStringToRange } from './utils/hash';
import { isValidYesNoQuestion } from './utils/validation';

const DEFAULT_STEPS = [
  "Initializing qx32 orbit cluster",
  "Calibrating qubit lattice",
  "Aligning orbital compute channels",
  "Heating up quantum reactor core",
  "Routing proton stream",
  "Synchronizing anomaly buffer",
  "Parsing classified data archive",
  "Linking to extraterrestrial neural lattice",
  "Hacking NASA secure grid",
  "Expanding quantum probability field",
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

const ERROR_MESSAGES = [
  { code: "ALX-404-ZORG", message: "Neural tentacle not found" },
  { code: "XEN0-9001", message: "Quantum consciousness overload" },
  { code: "QNX-Δ13", message: "Probability field collapsed" },
  { code: "ZN-314-BETA", message: "Alien mesh refuses to cooperate" },
  { code: "ORP-Ξ42", message: "Dimensional rift in neural link" }
];

export type ResultType = 
  | { type: 'SUCCESS'; answer: 'YES' | 'NO'; probability: number }
  | { type: 'ERROR'; code: string; message: string };

type AppStatus = 'IDLE' | 'PROCESSING' | 'REVEALED';

export type LogEntry = {
  step: string;
  status: 'OK' | 'FAIL';
};

import { Footer } from './components/Footer';

function App() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<AppStatus>('IDLE');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [result, setResult] = useState<ResultType | null>(null);
  const [steps, setSteps] = useState(DEFAULT_STEPS);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [willError, setWillError] = useState(false);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (status === 'IDLE') {
      inputRef.current?.focus();
    }
  }, [status]);

  const handleAsk = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmedInput = input.trim();
    
    if (!trimmedInput) return;

    // Validate that it's a yes/no question
    if (!isValidYesNoQuestion(trimmedInput)) {
      setErrorMessage('QX32 only processes yes/no queries. Please try again.');
      // Clear error message after 5 seconds
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }

    // Clear any previous error
    setErrorMessage(null);
    setLogs([]);
    setResult(null);
    
    // Determine if there will be an error (15% chance)
    const isError = Math.random() < 0.15;
    setWillError(isError);
    
    // Easter egg check
    const currentSteps = trimmedInput.toLowerCase().includes('antigravity') ? ANTIGRAVITY_STEPS : DEFAULT_STEPS;
    setSteps(currentSteps);

    setStatus('PROCESSING');
  };

  const handleStepComplete = (step: string, stepStatus: 'OK' | 'FAIL') => {
    setLogs(prev => [...prev, { step, status: stepStatus }]);
  };

  const handleComplete = () => {
    if (willError) {
      const randomError = ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];
      setTimeout(() => {
        setResult({ type: 'ERROR', ...randomError });
        setStatus('REVEALED');
      }, 900);
      return;
    }

    // Deterministic result based on input
    const probability = hashStringToRange(input.trim().toLowerCase(), 0, 100);
    const answer = probability > 50 ? 'YES' : 'NO';
    
    // Add a small delay before reveal for dramatic effect
    setTimeout(() => {
      setResult({ type: 'SUCCESS', answer, probability });
      setStatus('REVEALED');
    }, 900);
  };

  const handleRerun = () => {
    setStatus('IDLE');
    setLogs([]);
    setResult(null);
    setInput('');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-2 md:p-4 relative supports-[min-height:100dvh]:min-h-[100dvh]">
      <div className="crt-overlay fixed inset-0 z-50 pointer-events-none"></div>
      
      {/* Glitch Flash Overlay - Only during processing */}
      {status === 'PROCESSING' && (
        <div className="fixed inset-0 z-40 pointer-events-none glitch-flash bg-neon/10"></div>
      )}
      
      {/* Main Console Container */}
      <div className={`w-full max-w-4xl flex flex-col border border-neon-dim bg-bg/90 relative rounded-sm shadow-[0_0_20px_rgba(0,255,136,0.1)] overflow-hidden z-10 transition-all duration-300 ${
        status === 'PROCESSING' ? 'glitch-shake' : ''
      }`}
      style={{
        height: 'calc(100dvh - 1rem)', // Fallback and mobile
        maxHeight: '80vh' // Desktop constraint
      }}>
        
        {/* Header */}
        <div className="border-b border-neon-dim p-3 md:p-4 flex justify-between items-center bg-neon/5 relative overflow-hidden shrink-0">
          {status === 'PROCESSING' && (
            <div className="absolute inset-0 glitch-distort bg-neon/5 pointer-events-none"></div>
          )}
          <div className={`text-neon font-bold tracking-widest text-lg md:text-xl flex items-center gap-2 relative z-10 ${
            status === 'PROCESSING' ? 'glitch-color' : ''
          }`}>
            <div className="w-2 h-2 md:w-3 md:h-3 bg-neon rounded-full animate-pulse"></div>
            QX32 ORBIT CLUSTER
          </div>
          <div className="text-[10px] md:text-xs font-mono text-neon-dim opacity-70 relative z-10">
            SYS.VER.9.2.1 // ONLINE
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          
          {/* Left/Top: Main Display */}
          <div className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center relative z-10 overflow-y-auto md:overflow-hidden scrollbar-hide">
            {status === 'IDLE' && (
              <div className="w-full max-w-md text-center animate-fade-in my-auto">
                <div className="mb-4 md:mb-6 text-center animate-pulse">
                  <div className="text-yellow-400 text-xs font-bold mb-1">⚠️ Warning, Operator ⚠️</div>
                  <div className="text-[10px] text-neon-dim/80 max-w-xs mx-auto leading-tight">
                    <div>Each query consumes more energy than a small city.</div>
                    <div className="mt-1">When engaging the QX32 ORBIT CLUSTER, there is a small chance the simulation you are currently in may experience glitches.</div>
                  </div>
                </div>
                <div className="mb-6 md:mb-8 text-neon-dim font-mono text-xs md:text-sm opacity-80">
                  AWAITING INPUT QUERY...
                </div>
                {errorMessage && (
                  <div className="mb-4 px-4 py-3 bg-red-500/10 border-2 border-red-500/50 text-red-400 font-mono text-sm text-center animate-pulse">
                    <div className="font-bold text-red-500 mb-2 text-base tracking-wider">ERROR</div>
                    <div className="leading-relaxed">{errorMessage}</div>
                  </div>
                )}
                <form onSubmit={handleAsk} className="relative group">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      // Clear error message when user starts typing
                      if (errorMessage) {
                        setErrorMessage(null);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleAsk();
                      }
                    }}
                    placeholder="ask qx32 anything..."
                    className="w-full bg-transparent py-3 text-center text-lg md:text-2xl text-neon font-mono focus:outline-none placeholder-neon-dim/30 transition-all resize-none overflow-hidden"
                    autoComplete="off"
                    rows={1}
                    style={{
                      minHeight: '3rem',
                      maxHeight: '12rem'
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = Math.min(target.scrollHeight, 192) + 'px';
                    }}
                  />
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-dim group-focus-within:bg-neon transition-colors duration-500"></div>
                </form>
                <button 
                  onClick={() => handleAsk()}
                  className="mt-6 md:mt-8 px-6 md:px-8 py-3 bg-neon/10 border border-neon text-neon hover:bg-neon hover:text-bg transition-all duration-300 font-mono tracking-wider uppercase text-xs md:text-sm active:bg-neon/20 touch-manipulation"
                >
                  Ask The Cluster
                </button>
              </div>
            )}

            {status === 'PROCESSING' && (
              <>
                <div className="absolute inset-0 glitch-distort pointer-events-none opacity-30"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-neon glitch-flash opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-neon glitch-flash opacity-50" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-full max-w-lg relative z-10 my-auto">
                  <Loader 
                    steps={steps} 
                    willError={willError}
                    onStepComplete={handleStepComplete} 
                    onComplete={handleComplete} 
                  />
                </div>
              </>
            )}

            {status === 'REVEALED' && result && (
              <div className="my-auto w-full flex justify-center">
                <ResultBadge 
                  result={result} 
                  onRerun={handleRerun} 
                />
              </div>
            )}
          </div>

          {/* Right/Bottom: Telemetry Log (Sidebar on desktop, hidden/small on mobile) */}
          <div className={`
            border-t md:border-t-0 md:border-l border-neon-dim bg-black/20 
            flex flex-col transition-all duration-500 shrink-0
            ${status === 'IDLE' ? 'h-0 md:w-0 opacity-0' : 'h-32 md:h-auto md:w-80 opacity-100 p-3 md:p-4'}
          `}>
            <div className="text-[10px] md:text-xs font-mono text-neon-dim mb-2 uppercase tracking-wider border-b border-neon-dim/30 pb-1">
              System Telemetry
            </div>
            <ConsoleLog logs={logs} />
          </div>

        </div>

        {/* Footer Status Bar */}
        <div className={`border-t border-neon-dim p-2 flex flex-col max-[375px]:flex-col sm:flex-row sm:justify-between sm:items-center text-[9px] max-[375px]:text-[8px] md:text-xs font-mono text-neon-dim bg-neon/5 relative overflow-hidden gap-1 sm:gap-0 shrink-0 ${
          status === 'PROCESSING' ? 'glitch-text-corrupt' : ''
        }`}>
          {status === 'PROCESSING' && (
            <div className="absolute inset-0 glitch-distort bg-neon/5 pointer-events-none"></div>
          )}
          <div className="relative z-10">MEM: 64TB // QUBITS: 4096 // TEMP: 2.4K</div>
          <div className={`relative z-10 ${status === 'PROCESSING' ? 'glitch-color animate-pulse' : 'animate-pulse'}`}>
            QEC LOOP ACTIVE // ENTANGL. ERROR RATE &lt; 10⁻⁶
          </div>
        </div>

      </div>
      
      <Footer />
    </div>
  );
}

export default App;
