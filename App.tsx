
import React, { useState, useEffect } from 'react';
import { Logo } from './components/Logo';
import { GlassCard } from './components/GlassCard';
import { BlueprintWizard } from './components/BlueprintWizard';
import { QuoteForm } from './components/QuoteForm';
import { ProjectShowcase } from './components/ProjectShowcase';
import { CardVariant } from './types';
import { DigitalClock } from './components/DigitalClock';
import { SystemMonitor } from './components/SystemMonitor';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [blueprintDetails, setBlueprintDetails] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBlueprintAction = (details: string) => {
    setBlueprintDetails(details);
    scrollToSection('quote');
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const services = [
    {
      title: "Android Native",
      desc: "High-performance native apps crafted with Kotlin. We engineer for fluidity, ensuring your application feels like a natural extension of the OS.",
      price: "From ₹45,000",
      features: ["Material Design 3", "Offline-First", "Play Store Launch"],
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      ),
    },
    {
      title: "Full-Stack Web",
      desc: "Robust web architectures utilizing React & Node.js. We deliver scalable, SEO-ready solutions that grow effortlessly with your business.",
      price: "From ₹30,000",
      features: ["Server-Side Rendering", "Responsive", "Secure API"],
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
    },
    {
      title: "AI & Intelligence",
      desc: "Empower your product with next-gen AI. From chatbots to predictive models, we integrate Gemini to make your software smarter.",
      price: "Custom Quote",
      features: ["LLM Integration", "Smart Analytics", "Automation"],
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
           <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
      ),
    }
  ];

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-slate-50">
      
      {/* Ambient Background Light */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 blur-[100px] opacity-60 animate-pulse-slow"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-l from-blue-200/20 to-purple-200/20 blur-[120px] opacity-50"></div>
      </div>

      {/* Navbar - Floating Island Style */}
      <nav className={`fixed top-6 left-0 right-0 z-50 flex justify-center transition-all duration-500 px-4`}>
        <div className={`w-full max-w-5xl flex justify-between items-center px-6 py-3 rounded-full transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40' : 'bg-transparent'}`}>
          <Logo size={32} />
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('services')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors tracking-wide cursor-pointer">
                Services
              </button>
              <button onClick={() => scrollToSection('projects')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors tracking-wide cursor-pointer">
                Projects
              </button>
              <button onClick={() => scrollToSection('quote')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors tracking-wide cursor-pointer">
                Quote
              </button>
            </div>
            <button 
              onClick={() => scrollToSection('quote')}
              className="px-5 py-2 bg-slate-900 text-white rounded-full font-medium text-sm hover:bg-slate-800 hover:shadow-lg transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              Start Building
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-40 pb-20">
        <div className="container mx-auto px-6 text-center max-w-6xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">Accepting New Projects</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-[0.95] tracking-tighter text-slate-900 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Digital Evolution <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-slate-900">
              For The People.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Web Giants democratizes premium software. We build exceptional <span className="text-slate-900 font-medium">Android</span> & <span className="text-slate-900 font-medium">Web Apps</span> that are robust, beautiful, and surprisingly affordable.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up w-full mb-16" style={{ animationDelay: '0.3s' }}>
            <button 
              onClick={() => scrollToSection('quote')}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all"
            >
              Get Your Quote
            </button>
          </div>

          <div className="flex flex-wrap gap-6 justify-center items-center">
            <DigitalClock />
            <SystemMonitor />
          </div>
        </div>
      </main>

      {/* Services Grid */}
      <section id="services" className="py-32 container mx-auto px-6 scroll-mt-32 border-t border-slate-200/50">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-secondary font-bold tracking-wider uppercase text-xs mb-2 block">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">Engineering Excellence.</h2>
          </div>
          <p className="text-slate-500 max-w-sm leading-relaxed">
             We don't just write code; we craft digital experiences that define brands and delight users.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <GlassCard 
              key={i} 
              variant={CardVariant.DEFAULT}
              className="p-8 h-full flex flex-col justify-between hover:-translate-y-2"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 mb-6">
                  {s.icon}
                </div>
                <h3 className="text-2xl font-display font-bold mb-3 text-slate-900">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-8 text-sm">{s.desc}</p>
              </div>
              
              <div className="pt-6 border-t border-slate-50">
                <div className="text-lg font-bold text-slate-900 mb-3">{s.price}</div>
                <div className="flex flex-wrap gap-2">
                  {s.features.map(f => (
                    <span key={f} className="px-2 py-1 rounded-md bg-slate-50 text-slate-500 text-xs font-medium border border-slate-100">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <ProjectShowcase />

      {/* AI Wizard */}
      <div className="py-20 bg-white border-y border-slate-100">
        <BlueprintWizard onBookConsultation={handleBlueprintAction} />
      </div>

      {/* Quote Form */}
      <div className="bg-gradient-to-b from-white to-slate-50">
        <QuoteForm initialDetails={blueprintDetails} />
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 bg-slate-50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <Logo size={28} />
            <p className="text-slate-400 text-xs mt-4 max-w-xs">
              © 2024 Web Giants. Defining the future of affordable digital craftsmanship.
            </p>
          </div>
          <div className="flex gap-8 text-sm font-medium">
             <a href="mailto:webgiants.enquirues@gmail.com" className="text-slate-600 hover:text-primary transition-colors">Support</a>
             <a href="#" className="text-slate-600 hover:text-primary transition-colors">Twitter</a>
             <a href="https://www.instagram.com/web.giants/" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-primary transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
