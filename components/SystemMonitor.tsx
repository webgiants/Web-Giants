
import React, { useState, useEffect } from 'react';

export const SystemMonitor: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<number[]>(new Array(20).fill(50));
  const [latency, setLatency] = useState(24);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update Graph Data
      setDataPoints(prev => {
        const newPoint = Math.max(20, Math.min(80, prev[prev.length - 1] + (Math.random() - 0.5) * 30));
        return [...prev.slice(1), newPoint];
      });

      // Update Metrics randomly
      if (Math.random() > 0.7) {
        setLatency(Math.floor(20 + Math.random() * 15));
        setFps(Math.floor(58 + Math.random() * 3));
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Generate SVG Path for Sparkline
  const getPath = () => {
    return dataPoints.map((point, i) => {
      const x = i * (100 / (dataPoints.length - 1));
      const y = 100 - point;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <div className="group relative inline-flex flex-col md:flex-row items-center gap-6 px-8 py-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 shadow-glass animate-fade-in-up mt-6 md:mt-0 hover:bg-white/60 transition-all duration-300 cursor-default select-none overflow-hidden">
      
      {/* Decorative Background Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-secondary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Label */}
      <div className="flex items-center gap-2 relative z-10">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
        </div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Net Status</span>
      </div>

      <div className="hidden md:block w-px h-8 bg-slate-200 relative z-10"></div>

      {/* Live Sparkline Graph */}
      <div className="h-8 w-32 relative z-10 flex items-center">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="graphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#36e4da" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#36e4da" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path 
            d={`${getPath()} L 100 100 L 0 100 Z`} 
            fill="url(#graphGradient)" 
          />
          <path 
            d={getPath()} 
            fill="none" 
            stroke="#36e4da" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="drop-shadow-sm"
          />
        </svg>
      </div>

      <div className="hidden md:block w-px h-8 bg-slate-200 relative z-10"></div>

      {/* Metrics */}
      <div className="flex gap-4 relative z-10">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-lg font-display font-bold text-slate-900 leading-none tabular-nums">
            {latency}<span className="text-[10px] text-slate-400 font-sans ml-0.5">ms</span>
          </div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
            Ping
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <div className="text-lg font-display font-bold text-slate-900 leading-none tabular-nums">
            {fps}<span className="text-[10px] text-slate-400 font-sans ml-0.5">fps</span>
          </div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
            Render
          </div>
        </div>
      </div>
    </div>
  );
};
    