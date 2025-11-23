import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#36e4da" />
            <stop offset="100%" stopColor="#00dc82" />
          </linearGradient>
        </defs>
        {/* The G shape */}
        <path 
          d="M50 10 C27.9 10 10 27.9 10 50 C10 72.1 27.9 90 50 90 C72.1 90 90 72.1 90 50 L 90 45 L 50 45 L 50 55 L 80 55 C 78 68 65 78 50 78 C 35 78 22 65 22 50 C 22 35 35 22 50 22 C 58 22 65 25 70 30 L 78 22 C 71 15 61 10 50 10 Z" 
          fill="url(#logoGradient)" 
        />
        {/* Android Antennas (stylized) */}
        <path d="M65 18 L 72 10" stroke="url(#logoGradient)" strokeWidth="5" strokeLinecap="round"/>
        <path d="M35 18 L 28 10" stroke="url(#logoGradient)" strokeWidth="5" strokeLinecap="round"/>
        
        {/* Code brackets inside the G negative space implication */}
        <path d="M82 35 L 92 45 L 82 55" stroke="#36e4da" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-display font-bold text-2xl tracking-tight text-slate-900">
        WEB<span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">GIANTS</span>
      </span>
    </div>
  );
};