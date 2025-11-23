
import React, { useState, useEffect } from 'react';

export const AiStatus: React.FC = () => {
  const [load, setLoad] = useState(34);
  const [tokens, setTokens] = useState(840);
  const [statusText, setStatusText] = useState("Standby");
  const [isHovered, setIsHovered] = useState(false);

  const activities = [
    "Neural optimization",
    "Pattern matching",
    "Stack analysis",
    "Allocating tensors",
    "Cache validation",
    "Heuristic scan",
    "Gemini 2.5 Idle"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate metrics
      setLoad(prev => {
        const target = isHovered ? 85 : 30; // Higher load on hover
        const noise = Math.random() * 10 - 5;
        return Math.min(99, Math.max(12, Math.floor(prev * 0.9 + target * 0.1 + noise)));
      });

      setTokens(prev => {
        const multiplier = isHovered ? 2 : 1;
        const noise = Math.floor(Math.random() * 50 - 25);
        return Math.max(100, prev + noise + (isHovered ? 100 : 0));
      });
    }, 800);

    const textInterval = setInterval(() => {
      setStatusText(activities[Math.floor(Math.random() * activities.length)]);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [isHovered]);

  return (
    <div 
      className="group relative inline-flex flex-col md:flex-row items-center gap-6 px-8 py-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 shadow-glass animate-fade-in-up mt-6 md:mt-0 hover:bg-white/60 transition-all duration-300 cursor-default select-none overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Decorative Gradient Background that pulses on hover */}
      <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 transition-opacity duration-700 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

      {/* Label & Icon */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="relative flex items-center justify-center h-4 w-4">
          <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 transition-colors duration-500 ${isHovered ? 'animate-ping bg-purple-500' : 'bg-slate-400'}`}></span>
          <svg className={`relative w-3 h-3 transition-colors duration-500 ${isHovered ? 'text-purple-600' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Neural Core</span>
      </div>

      <div className="hidden md:block w-px h-8 bg-slate-200 relative z-10"></div>

      {/* Activity Text (Typewriter-ish) */}
      <div className="flex flex-col items-center md:items-start w-32 relative z-10">
        <span className={`text-xs font-medium transition-colors duration-300 ${isHovered ? 'text-purple-600' : 'text-slate-700'}`}>
          {statusText}...
        </span>
        <div className="h-1 w-full bg-slate-200 rounded-full mt-2 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${isHovered ? 'bg-purple-500' : 'bg-slate-400'}`}
            style={{ width: `${load}%` }}
          />
        </div>
      </div>

      <div className="hidden md:block w-px h-8 bg-slate-200 relative z-10"></div>

      {/* Metrics */}
      <div className="flex gap-4 relative z-10">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-lg font-display font-bold text-slate-900 leading-none tabular-nums transition-all duration-300">
            {tokens}<span className="text-[10px] text-slate-400 font-sans ml-0.5">t/s</span>
          </div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
            Speed
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <div className={`text-lg font-display font-bold leading-none tabular-nums transition-colors duration-300 ${isHovered ? 'text-purple-600' : 'text-slate-900'}`}>
            {load}<span className="text-[10px] text-slate-400 font-sans ml-0.5">%</span>
          </div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
            Load
          </div>
        </div>
      </div>
    </div>
  );
};
