import React from 'react';
import { CardVariant } from '../types';

interface GlassCardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  variant = CardVariant.DEFAULT, 
  className = "",
  onClick 
}) => {
  // Base styles focus on rounded corners and smooth transitions
  const baseStyles = "rounded-3xl transition-all duration-500 ease-out relative overflow-hidden isolate";
  
  const variants = {
    // Default: Clean white card with very subtle border and shadow
    [CardVariant.DEFAULT]: "bg-white border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] hover:border-slate-200",
    
    // Glass: Heavy blur, low opacity white, premium frosted feel
    [CardVariant.GLASS]: "bg-white/70 backdrop-blur-2xl border border-white/50 shadow-glass hover:bg-white/80",
    
    // Outline: Minimalist, disappears into background until hovered
    [CardVariant.OUTLINE]: "bg-transparent border border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-50/50",
    
    // Neon: Subtle glow for emphasis, not harsh neon
    [CardVariant.NEON]: "bg-white border border-secondary/20 shadow-[0_0_40px_-10px_rgba(54,228,218,0.15)] hover:shadow-[0_0_50px_-5px_rgba(54,228,218,0.25)]"
  };

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${className} ${onClick ? 'cursor-pointer group' : ''}`}
      onClick={onClick}
    >
      {/* Gradient Sheen Effect on Hover for all cards */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white/40 to-transparent z-10" />
      
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  );
};