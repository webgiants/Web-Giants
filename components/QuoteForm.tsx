
import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { CardVariant } from '../types';

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: 'web' | 'android' | 'both';
  details: string;
  budget: string;
}

interface QuoteFormProps {
  initialDetails?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ initialDetails }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: 'web',
    details: '',
    budget: ''
  });

  useEffect(() => {
    if (initialDetails) {
      setFormData(prev => ({ ...prev, details: initialDetails }));
    }
  }, [initialDetails]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const steps = [
    { title: "Introduction", subtitle: "Who are we working with?" },
    { title: "Concept", subtitle: "What's the big idea?" },
    { title: "Specifics", subtitle: "Timeline & investment." }
  ];

  const isStepValid = () => {
    if (step === 0) return formData.name && formData.email;
    if (step === 1) return formData.details.length > 5;
    if (step === 2) return formData.budget;
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:webgiants.enquiries@gmail.com?subject=Project Enquiry: ${formData.name}&body=Type: ${formData.projectType}%0D%0ADetails: ${encodeURIComponent(formData.details)}%0D%0ABudget: ${formData.budget}`;
  };

  const budgetOptions = [
    '₹500 - ₹1,000',
    '₹1,500 - ₹5,000',
    '₹10,000 - ₹50,000',
    '₹50,000 - ₹1,00,000',
    '₹1,00,000 - ₹3,00,000',
    '₹3,00,000+'
  ];

  return (
    <section id="quote" className="py-32 px-4 container mx-auto max-w-3xl scroll-mt-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">
          Start Your Project
        </h2>
        <p className="text-slate-500 text-lg">We'll get back to you within 24 hours.</p>
      </div>

      <GlassCard variant={CardVariant.DEFAULT} className="p-8 md:p-12">
        {/* Minimal Progress Bar */}
        <div className="flex justify-between items-center mb-12 px-2">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center relative z-10 group cursor-default">
              <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                i === step ? 'bg-slate-900 scale-125 ring-4 ring-slate-100' : 
                i < step ? 'bg-primary' : 'bg-slate-200'
              }`} />
              <span className={`absolute -bottom-6 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                i === step ? 'text-slate-900 opacity-100' : 'text-slate-400 opacity-0 group-hover:opacity-100'
              }`}>
                {s.title}
              </span>
            </div>
          ))}
          {/* Line behind dots */}
          <div className="absolute left-12 right-12 h-[2px] bg-slate-100 top-[60px] md:top-[76px] -z-0" />
        </div>

        <form onSubmit={handleSubmit} className="min-h-[320px] flex flex-col justify-between">
          <div className="animate-fade-in-up">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{steps[step].title}</h3>
              <p className="text-slate-400 text-sm">{steps[step].subtitle}</p>
            </div>

            {step === 0 && (
              <div className="space-y-5">
                <div className="group">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-lg font-medium text-slate-900 placeholder-slate-300 focus:border-slate-900 focus:outline-none transition-colors"
                  />
                </div>
                <div className="group">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-lg font-medium text-slate-900 placeholder-slate-300 focus:border-slate-900 focus:outline-none transition-colors"
                  />
                </div>
                <div className="group">
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company (Optional)"
                    className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-lg font-medium text-slate-900 placeholder-slate-300 focus:border-slate-900 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['web', 'android', 'both'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, projectType: type as any }))}
                      className={`py-4 px-2 rounded-2xl text-sm font-bold uppercase tracking-wide transition-all duration-300 ${
                        formData.projectType === type 
                          ? 'bg-slate-900 text-white shadow-lg scale-105' 
                          : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <textarea 
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full h-40 p-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/5 resize-none transition-all"
                  placeholder="Describe your vision. Core features, design preferences, or similar apps..."
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Estimated Budget</label>
                  <div className="space-y-3">
                    {budgetOptions.map((b) => (
                      <label key={b} className={`flex items-center p-4 rounded-xl cursor-pointer transition-all border ${
                        formData.budget === b 
                          ? 'border-slate-900 bg-slate-50 shadow-sm' 
                          : 'border-transparent hover:bg-slate-50'
                      }`}>
                        <input 
                          type="radio" 
                          name="budget" 
                          value={b}
                          checked={formData.budget === b}
                          onChange={handleChange}
                          className="mr-4 accent-slate-900 w-5 h-5" 
                        />
                        <span className={`font-medium ${formData.budget === b ? 'text-slate-900' : 'text-slate-600'}`}>{b}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-8 mt-4 border-t border-slate-50">
            <button 
              type="button"
              onClick={prevStep}
              className={`text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-wider ${step === 0 ? 'invisible' : ''}`}
            >
              Back
            </button>
            
            {step < steps.length - 1 ? (
              <button 
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-lg disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            ) : (
              <button 
                type="submit"
                disabled={!isStepValid()}
                className="bg-gradient-to-r from-secondary to-primary text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-[0_10px_30px_-5px_rgba(0,220,130,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-50"
              >
                Submit Request
              </button>
            )}
          </div>
        </form>
      </GlassCard>
    </section>
  );
};
