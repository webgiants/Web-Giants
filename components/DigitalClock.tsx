
import React, { useState, useEffect } from 'react';

export const DigitalClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };

  return (
    <div className="inline-flex flex-col md:flex-row items-center gap-6 px-8 py-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 shadow-glass animate-fade-in-up mt-12 hover:bg-white/50 transition-colors cursor-default select-none">
      
      {/* Status Indicator */}
      <div className="flex items-center gap-2">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Systems Online</span>
      </div>

      <div className="hidden md:block w-px h-8 bg-slate-200"></div>

      {/* Time Display */}
      <div className="flex flex-col md:items-start items-center">
        <div className="text-4xl font-display font-bold text-slate-900 tracking-tighter tabular-nums leading-none">
          {formatTime(time)}
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
          Local Time
        </div>
      </div>

      <div className="hidden md:block w-px h-8 bg-slate-200"></div>

      {/* Date & Timezone */}
      <div className="flex flex-col md:items-start items-center text-center md:text-left">
        <div className="text-sm font-medium text-slate-700">
          {formatDate(time)}
        </div>
        <div className="text-xs font-medium text-slate-400">
          {getTimezone()}
        </div>
      </div>
    </div>
  );
};
