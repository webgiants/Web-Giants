import React, { useState } from 'react';
import { generateProjectBlueprint } from '../services/gemini';
import { ProjectBlueprint, CardVariant } from '../types';
import { GlassCard } from './GlassCard';
import { ProjectComplexity } from '../types';

interface BlueprintWizardProps {
  onBookConsultation?: (details: string) => void;
}

export const BlueprintWizard: React.FC<BlueprintWizardProps> = ({ onBookConsultation }) => {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProjectBlueprint | null>(null);

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const blueprint = await generateProjectBlueprint(idea);
      setResult(blueprint);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const complexityColor = (c: ProjectComplexity) => {
    switch (c) {
      case ProjectComplexity.LOW: return 'bg-green-100 text-green-700';
      case ProjectComplexity.MEDIUM: return 'bg-yellow-100 text-yellow-700';
      case ProjectComplexity.HIGH: return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const handleConsultationClick = () => {
    if (result && onBookConsultation) {
      const details = `Generated Blueprint:\n\nTitle: ${result.title}\nComplexity: ${result.complexity}\nEst. Weeks: ${result.estimatedWeeks}\n\nStack: ${result.stack.join(', ')}\n\nFeatures:\n${result.keyFeatures.map(f => `- ${f}`).join('\n')}\n\nSummary: ${result.marketingBlurb}`;
      onBookConsultation(details);
    }
  };

  return (
    <section className="py-20 px-4 relative container mx-auto max-w-6xl scroll-mt-32" id="ai-wizard">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-slate-900 tracking-tight">
          AI Architect
        </h2>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Describe your dream. Our AI analyzes the requirements and generates a full technical stack instantly.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Input Section */}
        <div className="lg:col-span-5">
          <GlassCard variant={CardVariant.DEFAULT} className="p-8 h-full min-h-[500px] flex flex-col">
            <label className="block text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">
              Input
            </label>
            <textarea 
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="I want a Tinder-style app for adopting shelter dogs, with real-time video calls..."
              className="w-full flex-grow p-6 bg-slate-50 border-0 rounded-2xl text-lg text-slate-800 placeholder-slate-300 focus:ring-0 resize-none mb-6 transition-all font-medium leading-relaxed"
            />
            <button 
              onClick={handleGenerate}
              disabled={loading || !idea}
              className={`w-full py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 border border-slate-900/10
                ${loading || !idea 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-slate-900 text-white shadow-lg hover:shadow-xl hover:-translate-y-1'
                }`}
            >
              {loading ? 'Analyzing...' : 'Generate Blueprint'}
            </button>
          </GlassCard>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-7 h-full">
          <div className="relative h-full min-h-[500px]">
            {!result && !loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                <svg className="w-12 h-12 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <p className="text-slate-400 font-medium">Awaiting inputs...</p>
              </div>
            )}

            {loading && (
               <div className="absolute inset-0 flex items-center justify-center bg-white rounded-3xl border border-slate-100 shadow-sm">
                 <div className="space-y-6 w-full max-w-md px-12">
                   <div className="h-2 bg-slate-100 rounded-full animate-pulse w-full overflow-hidden">
                      <div className="h-full bg-slate-900/10 w-1/2 animate-[loading_1s_ease-in-out_infinite]"></div>
                   </div>
                   <div className="space-y-3">
                     <div className="h-2 bg-slate-100 rounded-full animate-pulse w-3/4"></div>
                     <div className="h-2 bg-slate-100 rounded-full animate-pulse w-5/6"></div>
                   </div>
                 </div>
               </div>
            )}

            {result && (
              <GlassCard variant={CardVariant.DEFAULT} className="p-8 h-full animate-fade-in-up border-t-4 border-t-slate-900 flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Project Title</span>
                    <h3 className="text-3xl font-display font-bold text-slate-900">{result.title}</h3>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase ${complexityColor(result.complexity)}`}>
                    {result.complexity}
                  </span>
                </div>
                
                <p className="text-lg text-slate-600 font-light leading-relaxed mb-8">
                  {result.marketingBlurb}
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.stack.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-50 text-slate-700 rounded-md text-sm font-medium border border-slate-100">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Est. Timeline</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-slate-900">{result.estimatedWeeks}</span>
                      <span className="text-slate-500 font-medium">Weeks to MVP</span>
                    </div>
                  </div>
                </div>

                <div className="mb-8 flex-grow">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Key Features</h4>
                  <ul className="space-y-3">
                    {result.keyFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                        <span className="text-sm font-medium leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={handleConsultationClick}
                  className="w-full py-4 mt-4 bg-slate-900 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <span>Build This Project</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};