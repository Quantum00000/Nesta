import React, { useState } from 'react';
import { ArrowRight, Code2, Database, Layers, Rocket, Sparkles, LayoutDashboard, Wrench } from 'lucide-react';

export default function HeroIntroSection({ onNavigate, onOpenApiModal, onViewChange, isUltimateMode }) {
  const [activeStep, setActiveStep] = useState(1);

  const allSteps = [
    {
      step: 1,
      title: '1. Pick Frontend Framework',
      subtitle: 'React 19, Next.js 15, Vue, Svelte, Astro & more',
      icon: Code2,
      details: 'Select the visual foundation for your web app. Whether you need fullstack SSR or fast client reactivity.',
      actionText: 'Browse Frontend Options',
      target: 'frontends'
    },
    {
      step: 2,
      title: '2. Pick Backend Engine',
      subtitle: 'Express.js, FastAPI, Spring Boot 3, NestJS, Go Fiber',
      icon: Database,
      details: 'Choose the server engine to handle your APIs and data pipelines with instant schema scaffolding.',
      actionText: 'Browse Backend Options',
      target: 'backends'
    },
    {
      step: 3,
      title: '3. Choose Themed UI Template',
      subtitle: 'SaaS, E-Commerce, AI Studio, Fintech & Agency themes',
      icon: Layers,
      details: 'Pick a complete UI template. Click "Preview Live" on any template to test out the full interactive design!',
      actionText: 'Explore UI Templates',
      target: 'templates'
    },
    {
      step: 4,
      title: '4. Download ZIP or Deploy Online',
      subtitle: '1-click deployment to Vercel, Railway, AWS or ZIP source',
      icon: Rocket,
      details: 'Download a ready-to-run folder or launch directly to your chosen cloud hosting platform.',
      actionText: 'Go to Launch Center',
      target: 'deploy'
    }
  ];

  const steps = isUltimateMode 
    ? allSteps 
    : allSteps.slice(2).map((s, index) => ({
        ...s,
        step: index + 1,
        title: `${index + 1}. ${s.title.split('. ')[1]}`
      }));

  return (
    <section id="intro" className="relative pt-6 pb-16 px-4 sm:px-8 max-w-7xl mx-auto font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background ambient glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* LEFT COLUMN: Main App Builder Welcome & Core Pathways */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden neu-surface border border-white/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-yellow-400/10 via-transparent to-transparent pointer-events-none rounded-bl-full" />

          <div>
            {/* Friendly Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/10 text-yellow-300 border border-yellow-400/25 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>Fullstack Web Application Generator</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
              Select Your Stack. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500">
                Preview & Deploy in Minutes.
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              Pick your frontend, backend, and a complete themed UI template. Experience interactive previews in separate viewports, download full source code, or launch live on Vercel and Railway.
            </p>

            {/* Two Primary Action Pathways */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div 
                onClick={() => onNavigate(isUltimateMode ? 'frontends' : 'templates')}
                className="neu-inset p-5 rounded-2xl flex items-start gap-3.5 cursor-pointer hover:border-yellow-400/40 border border-white/5 transition-all group"
              >
                <div className="p-3 rounded-xl bg-yellow-400 text-black font-bold shadow-md group-hover:scale-105 transition-transform">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm flex items-center gap-1.5">
                    <span>1. Build Your Application</span>
                    <ArrowRight className="w-3.5 h-3.5 text-yellow-400 group-hover:translate-x-1 transition-transform" />
                  </h4>
                  <p className="text-slate-400 text-xs mt-1 leading-normal">
                    Step-by-step wizard to pick frontend, backend, template, and export.
                  </p>
                </div>
              </div>

              <div 
                onClick={() => onViewChange('manage')}
                className="neu-inset p-5 rounded-2xl flex items-start gap-3.5 cursor-pointer hover:border-yellow-400/40 border border-white/5 transition-all group"
              >
                <div className="p-3 rounded-xl bg-[#222735] text-yellow-400 border border-yellow-400/20 font-bold shadow-md group-hover:scale-105 transition-transform">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm flex items-center gap-1.5">
                    <span>2. Manage Your Apps</span>
                    <ArrowRight className="w-3.5 h-3.5 text-yellow-400 group-hover:translate-x-1 transition-transform" />
                  </h4>
                  <p className="text-slate-400 text-xs mt-1 leading-normal">
                    View active deployments, live links, download archives, and analytics.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-center gap-6 text-center">
              <div>
                <div className="text-2xl font-black text-yellow-400 font-mono">100%</div>
                <div className="text-xs text-slate-400">Production Code</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-2xl font-black text-white font-mono">6+</div>
                <div className="text-xs text-slate-400">Themed Templates</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-2xl font-black text-white font-mono">1-Click</div>
                <div className="text-xs text-slate-400">Cloud Deploy</div>
              </div>
            </div>

            <button
              onClick={() => onNavigate(isUltimateMode ? 'frontends' : 'templates')}
              className="neu-yellow-btn px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold text-black flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all"
            >
              <span>Start Building Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Workflow */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between neu-surface border border-white/10">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-2">
              <div>
                <h3 className="text-white font-bold text-lg">App Builder Workflow</h3>
                <p className="text-slate-400 text-xs mt-0.5">{steps.length} quick steps from idea to live deployment</p>
              </div>
              <span className="text-xs font-bold bg-yellow-400 text-black px-2.5 py-1 rounded-lg">
                Interactive
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {steps.map((item) => {
                const Icon = item.icon;
                const isActive = activeStep === item.step;

                return (
                  <div
                    key={item.step}
                    onClick={() => setActiveStep(item.step)}
                    className={`p-3.5 rounded-2xl cursor-pointer transition-all duration-200 border ${
                      isActive
                        ? 'bg-[#222631] border-yellow-400/40 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                        : 'bg-[#181a21]/60 hover:bg-[#1f222b] border-white/5 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-yellow-400 text-black shadow-[0_0_12px_rgba(250,204,21,0.5)]'
                            : 'bg-[#13151a] text-slate-400 border border-white/10'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className={`text-sm font-semibold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                            {item.title}
                          </h4>
                          <span className="text-[10px] font-mono text-yellow-400/90 shrink-0">Step 0{item.step}</span>
                        </div>
                        <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{item.subtitle}</p>
                      </div>
                    </div>

                    {isActive && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-xs text-slate-300 leading-relaxed">{item.details}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate(item.target);
                          }}
                          className="mt-3 text-xs font-bold text-yellow-400 hover:text-yellow-300 flex items-center gap-1 group font-mono"
                        >
                          <span>{item.actionText}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-5 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-400 font-medium">Studio Step</span>
              <span className="text-yellow-400 font-bold">Step {activeStep} of {steps.length}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full transition-all duration-300"
                style={{ width: `${(activeStep / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
