import React from 'react';
import { GlassCard } from './GlassCard';
import { CardVariant } from '../types';

const projects = [
  {
    title: "Book Kreate",
    url: "https://book-kreate.vercel.app",
    desc: "AI-powered tool for authors. Streamlines the creative process from ideation to manuscript generation.",
    tags: ["AI Tool", "SaaS", "Productivity"]
  },
  {
    title: "Selvakumar",
    url: "https://selvakumar.vercel.app",
    desc: "A minimalist portfolio tailored for professionals. High-performance transitions with zero layout shifts.",
    tags: ["Next.js", "Animation", "Design"]
  },
  {
    title: "Fan Boi",
    url: "https://fan-boi-lm10.vercel.app",
    desc: "An immersive social platform designed for ultra-fans. Features real-time interactions and community-driven content feeds.",
    tags: ["React", "Social", "Real-time"]
  }
];

export const ProjectShowcase: React.FC = () => {
  return (
    <section id="projects" className="py-32 container mx-auto px-6 scroll-mt-32">
      <div className="flex flex-col items-center text-center mb-20">
         <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-2">Portfolio</span>
         <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-slate-900 tracking-tight">Selected Works</h2>
         <p className="text-slate-500 max-w-2xl text-lg font-light">
           Evidence of our craft. We deliver cheap, reliable, and premium software that stands the test of time.
         </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <a href={p.url} target="_blank" rel="noreferrer" key={i} className="group block">
            <GlassCard variant={CardVariant.DEFAULT} className="h-full flex flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-2 border-0 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)]">
              {/* Abstract Geometric Header */}
              <div className={`h-56 relative overflow-hidden p-6 flex flex-col justify-between ${
                 i === 0 ? 'bg-slate-900' : i === 1 ? 'bg-slate-800' : 'bg-slate-700'
              }`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/20 rounded-full blur-2xl transform -translate-x-5 translate-y-5"></div>
                
                <div className="relative z-10 flex justify-between items-start">
                  <span className="text-white/40 font-mono text-xs">0{i + 1}</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                     </svg>
                  </div>
                </div>
                
                <h3 className="relative z-10 text-2xl font-display font-bold text-white tracking-tight">{p.title}</h3>
              </div>

              <div className="p-8 flex-grow flex flex-col justify-between bg-white">
                <p className="text-slate-500 leading-relaxed mb-6 text-sm">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-slate-50 text-slate-500 uppercase tracking-wider rounded-sm border border-slate-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </a>
        ))}
      </div>
    </section>
  );
};