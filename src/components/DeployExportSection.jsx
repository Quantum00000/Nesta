import React, { useState } from 'react';
import { generateProjectZip, downloadBlob } from '../services/projectGenerator';
import { projectStorage } from '../services/projectStorage';
import { apiService } from '../services/apiService';
import confetti from 'canvas-confetti';
import { 
  Download, 
  Rocket, 
  Globe, 
  CheckCircle2, 
  Terminal, 
  ExternalLink, 
  Sparkles, 
  ArrowRight, 
  Server, 
  Layers, 
  RefreshCw, 
  Check, 
  Copy 
} from 'lucide-react';

const DEPLOY_PLATFORMS = [
  {
    id: 'vercel',
    name: 'Vercel',
    tagline: 'Optimal for React, Next.js, and Edge serverless functions.',
    badge: 'Recommended',
    accentColor: '#FFFFFF',
    iconText: '▲',
    category: 'Frontend & Serverless'
  },
  {
    id: 'railway',
    name: 'Railway',
    tagline: 'Fullstack cloud platform for Express, FastAPI, Spring Boot, and databases.',
    badge: 'Best for Fullstack',
    accentColor: '#9333EA',
    iconText: '🚂',
    category: 'Containers & Backends'
  },
  {
    id: 'netlify',
    name: 'Netlify',
    tagline: 'Instant CI/CD and edge CDN hosting with branch previews.',
    badge: 'Global CDN',
    accentColor: '#00C7B7',
    iconText: '🌐',
    category: 'Edge Network'
  },
  {
    id: 'render',
    name: 'Render',
    tagline: 'Fast web services, PostgreSQL, and background workers.',
    badge: 'Zero DevOps',
    accentColor: '#46E3B7',
    iconText: '⚡',
    category: 'Cloud Services'
  },
  {
    id: 'aws',
    name: 'AWS Amplify',
    tagline: 'Enterprise-grade hosting backed by Amazon Web Services infrastructure.',
    badge: 'Enterprise',
    accentColor: '#FF9900',
    iconText: '☁️',
    category: 'Cloud Infrastructure'
  }
];

export default function DeployExportSection({ 
  selectedFrontend, 
  selectedBackend, 
  selectedTemplate, 
  currentUser, 
  isUltimateMode, 
  onProjectCreated,
  frontendOptions = [],
  backendOptions = [],
  uiTemplates = [],
  onSelectFrontend,
  onSelectBackend,
  onSelectTemplate,
  customization = {},
  onUpdateCustomization,
  onApplyAiArchitectConfig
}) {
  const [activeTab, setActiveTab] = useState('deploy'); // 'deploy' | 'download'
  const [selectedPlatform, setSelectedPlatform] = useState(DEPLOY_PLATFORMS[0]);
  const [projectName, setProjectName] = useState('my-nesta-app');
  const [projectDescription, setProjectDescription] = useState('A sleek modern app');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState(0); // 0 = idle, 1..5 = steps, 6 = success
  const [deployLogs, setDeployLogs] = useState([]);
  const [deployedResult, setDeployedResult] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Handle Download Project ZIP
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      try {
        // Optional backend sync (fire and forget)
        let dbId = null;
        if (isUltimateMode) {
          const dbs = await apiService.getDatabaseTech();
          if (dbs && dbs.length > 0) dbId = dbs[0].id;
        }
        await apiService.saveProject({
          name: projectName,
          description: projectDescription,
          mode: isUltimateMode ? 'ULTIMATE' : 'SIMPLE',
          uiTemplateId: selectedTemplate?.id,
          frontendTechId: selectedFrontend?.id,
          backendTechId: selectedBackend?.id,
          databaseTechId: dbId,
          featureIds: []
        }).catch(() => {});
      } catch (e) { console.warn("Backend sync skipped."); }

      // Generate the ZIP on client-side using projectGenerator
      const { blob, filename } = await generateProjectZip({
        projectName,
        projectDescription,
        frontend: selectedFrontend,
        backend: selectedBackend,
        template: selectedTemplate,
        customization
      });
      
      // Download it!
      downloadBlob(blob, filename);
      
      // Save to local dashboard with all deep customizations preserved
      const saved = projectStorage.saveProject({
        name: projectName,
        description: projectDescription,
        userEmail: currentUser?.email || 'demo@nesta.dev',
        frontend: selectedFrontend,
        backend: selectedBackend,
        template: selectedTemplate,
        customization: customization,
        status: 'Exported (ZIP)',
        deployedPlatform: 'Local Files',
        liveUrl: null,
      });

      if (onProjectCreated) onProjectCreated(saved);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

    } catch (err) {
      console.error('Download error:', err);
      alert('Could not generate project archive: ' + (err.message || 'Backend error'));
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle Simulated Live Deployment Pipeline
  const handleStartDeploy = async () => {
    setIsDeploying(true);
    setDeployStep(1);
    setDeployLogs([]);
    setDeployedResult(null);

    const safeName = projectName.toLowerCase().replace(/[^a-z0-9-_]/g, '-');
    const liveDomain = `https://${safeName}.${selectedPlatform.id}.app`;
    const repoDomain = `https://github.com/${(currentUser?.name || 'developer').toLowerCase().replace(/\s+/g, '')}/${safeName}`;

    const steps = [
      { step: 1, text: `[1/5] Initializing ${selectedPlatform.name} edge build runner...` },
      { step: 2, text: `[2/5] Bundling ${selectedFrontend.name} framework with ${selectedTemplate.name} tokens...` },
      { step: 3, text: `[3/5] Provisioning ${selectedBackend.name} serverless backend handlers...` },
      { step: 4, text: `[4/5] Distributing static assets across 300+ edge points of presence...` },
      { step: 5, text: `[5/5] Allocating SSL certificate & binding domain ${liveDomain}...` },
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 900));
      setDeployStep(steps[i].step);
      setDeployLogs(prev => [...prev, steps[i].text]);
    }

    await new Promise(r => setTimeout(r, 600));

    const finalProject = {
      name: projectName,
      description: projectDescription,
      userEmail: currentUser?.email || 'demo@nesta.dev',
      frontend: selectedFrontend,
      backend: selectedBackend,
      template: selectedTemplate,
      customization: customization,
      status: 'Live',
      deployedPlatform: selectedPlatform.name,
      liveUrl: liveDomain,
      repoUrl: repoDomain,
    };

    projectStorage.saveProject(finalProject);
    if (onProjectCreated) onProjectCreated(finalProject);

    setDeployedResult(finalProject);
    setDeployStep(6);
    setIsDeploying(false);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 }
      });
    } catch (e) {}
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="deploy" className="relative py-16 px-4 sm:px-8 max-w-7xl mx-auto font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Section Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-semibold mb-4">
          <Rocket className="w-3.5 h-3.5 text-yellow-400" />
          <span>Step 4 — Launch & Export Center</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Download Your Code or Launch to Cloud
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Your fullstack architecture is ready! Download the complete source code folder or choose a deployment platform to launch live online.
        </p>
      </div>

      {/* Main Container Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 neu-surface border border-white/15 shadow-2xl relative overflow-hidden">
        
        {/* Architecture Stack Summary Badge Header */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Configured Architecture Stack
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-lg bg-yellow-400 text-black font-extrabold text-xs">
                Frontend: {selectedFrontend?.name || 'React 19'}
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#222735] text-yellow-400 border border-yellow-400/30 font-bold text-xs">
                Backend: {selectedBackend?.name || 'Express.js'}
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-white font-semibold text-xs">
                Theme: {selectedTemplate?.name || 'Nova SaaS Platform'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400">Ready for Scaffolding & Launch</span>
          </div>
        </div>

        {/* Project Name Config */}
                  <div className="mb-8 max-w-md">
            <label className="block text-xs font-bold text-slate-300 mb-2">Project / App Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="my-nesta-app"
              className="w-full px-4 py-2.5 rounded-xl neu-inset text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-yellow-400 bg-[#12141a] font-mono"
            />
          </div>

          <div className="mb-8 max-w-2xl p-5 rounded-2xl bg-[#12141a] border border-yellow-400/20">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <label className="text-xs font-bold text-yellow-400 uppercase tracking-wider">AI Architect Description</label>
            </div>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Describe your app features and our Spring AI Agent will parse it into JSON configurations..."
              className="w-full h-24 px-4 py-3 rounded-xl neu-inset text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-yellow-400 bg-[#0d0f14] font-sans resize-none mb-3"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={async () => {
                  setIsProcessingAI(true);
                  setAiResult(null);
                  try {
                    const res = await fetch('http://localhost:8080/api/agent/describe', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ description: projectDescription })
                    });
                    const data = await res.json();
                    
                    if (data.config) {
                      const cfg = data.config;
                      if (cfg.projectName) {
                        setProjectName(cfg.projectName);
                      }
                      if (onApplyAiArchitectConfig) {
                        onApplyAiArchitectConfig(cfg);
                      }
                      setAiResult({
                        success: true,
                        message: data.message || "AI Architect parsed your description into deep fullstack & UI components.",
                        config: cfg
                      });
                    } else {
                      setAiResult({
                        success: false,
                        message: data.message || "AI Agent responded, but no configuration was generated.",
                        config: null
                      });
                    }
                  } catch (e) {
                    console.error("AI Agent connection error:", e);
                    setAiResult({
                      success: false,
                      message: "Could not reach Spring AI backend on port 8080. Please ensure the backend is running with your NVIDIA API key.",
                      config: null
                    });
                  } finally {
                    setIsProcessingAI(false);
                  }
                }}
                disabled={isProcessingAI}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold text-black flex items-center gap-2 transition-all ${isProcessingAI ? 'bg-yellow-400/50 cursor-not-allowed' : 'neu-yellow-btn hover:scale-105 shadow-lg'}`}
              >
                {isProcessingAI ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing & Synthesizing Architecture...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Process with AI Architect</span>
                  </>
                )}
              </button>

              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                Spring AI + NVIDIA Nemotron-3
              </span>
            </div>

            {/* AI Architecture Summary Card */}
            {aiResult && (
              <div className={`mt-4 p-5 rounded-2xl border transition-all animate-fadeUp ${
                aiResult.success 
                  ? 'bg-gradient-to-br from-[#1a1f2c] via-[#141824] to-[#12141c] border-yellow-400/40 shadow-xl' 
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${aiResult.success ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                    <span className="text-xs font-bold text-white">
                      {aiResult.success ? 'AI Architect Applied to Your Project' : 'AI Agent Notice'}
                    </span>
                  </div>
                  <button 
                    onClick={() => setAiResult(null)}
                    className="text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded hover:bg-white/5 transition-colors"
                  >
                    ✕ Dismiss
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">{aiResult.message}</p>

                {aiResult.config && (
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-2.5">
                    <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                      {aiResult.config.metrics && <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">✓ 4 Industry Metrics</span>}
                      {aiResult.config.pricingTier1 && <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">✓ Custom Pricing</span>}
                      {aiResult.config.faqs && <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">✓ Domain FAQs</span>}
                      {aiResult.config.testimonials && <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">✓ Reviews & Testimonials</span>}
                      {aiResult.config.keyFeatures && <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">✓ Core Architecture Features</span>}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[11px]">
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-slate-400 block text-[10px] uppercase font-mono">Matched Template</span>
                        <span className="text-white font-bold truncate block">{selectedTemplate?.name || aiResult.config.uiThemeId}</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-mono">Brand Color</span>
                          <span className="text-white font-mono font-bold">{aiResult.config.primaryColor || '#FACC15'}</span>
                        </div>
                        <span 
                          className="w-5 h-5 rounded-md border border-white/20 shadow-inner" 
                          style={{ backgroundColor: aiResult.config.primaryColor || '#FACC15' }}
                        />
                      </div>

                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 col-span-2 flex items-center justify-between">
                        <div className="min-w-0 pr-2">
                          <span className="text-slate-400 block text-[10px] uppercase font-mono">Hero Headline</span>
                          <span className="text-white font-semibold truncate block">{aiResult.config.heroHeading || 'Custom Headline'}</span>
                        </div>
                        <button 
                          onClick={() => {
                            const el = document.getElementById('customization');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-[11px] font-bold text-yellow-400 hover:text-yellow-300 underline underline-offset-2 whitespace-nowrap pl-2"
                        >
                          Step 3.5 Fine-Tune →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        {/* Tab Switcher: Deploy Online vs Download ZIP */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-6 mb-8">
          <button
            onClick={() => setActiveTab('deploy')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'deploy'
                ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.4)]'
                : 'neu-btn text-slate-300 hover:text-white'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>Option A: Deploy to Cloud Platform</span>
          </button>
          <button
            onClick={() => setActiveTab('download')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'download'
                ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.4)]'
                : 'neu-btn text-slate-300 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Option B: Download Project Folder (.zip)</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* OPTION A: DEPLOY ONLINE TO CLOUD PLATFORM                                 */}
        {/* ========================================================================= */}
        {activeTab === 'deploy' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-base font-bold text-white mb-2">Select Cloud Deployment Platform</h3>
              <p className="text-xs text-slate-400 mb-6">
                Choose where Nesta should deploy and host your fullstack application.
              </p>

              {/* Platform Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {DEPLOY_PLATFORMS.map((plat) => {
                  const isSelected = selectedPlatform.id === plat.id;

                  return (
                    <div
                      key={plat.id}
                      onClick={() => setSelectedPlatform(plat)}
                      className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#222735] border-2 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-2xl">{plat.iconText}</div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-yellow-300">
                            {plat.badge}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white">{plat.name}</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{plat.tagline}</p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-mono">{plat.category}</span>
                        <span className={isSelected ? 'text-yellow-400 font-bold' : 'text-slate-500'}>
                          {isSelected ? 'Selected ✓' : 'Select'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Launch Action Button */}
            {!isDeploying && !deployedResult && (
              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-yellow-400/10 border border-yellow-400/30">
                <div>
                  <h4 className="text-sm font-bold text-white">Ready to deploy to {selectedPlatform.name}?</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Nesta will bundle all code and configure edge routing automatically.
                  </p>
                </div>
                <button
                  onClick={handleStartDeploy}
                  className="neu-yellow-btn px-8 py-3 rounded-xl text-sm font-extrabold text-black flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Launch & Deploy on {selectedPlatform.name}</span>
                </button>
              </div>
            )}

            {/* In-Progress Deployment Terminal Logs */}
            {isDeploying && (
              <div className="p-6 rounded-2xl bg-[#0e1015] border border-white/15 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <RefreshCw className="w-4 h-4 text-yellow-400 animate-spin" />
                    <span className="text-xs font-bold text-white">Deploying to {selectedPlatform.name}...</span>
                  </div>
                  <span className="text-xs font-mono text-yellow-400">Step {deployStep} of 5</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full transition-all duration-300"
                    style={{ width: `${(deployStep / 5) * 100}%` }}
                  />
                </div>

                {/* Live Console Output */}
                <div className="p-4 rounded-xl bg-[#090a0d] border border-white/5 font-mono text-xs text-slate-300 space-y-1.5 max-h-48 overflow-y-auto">
                  {deployLogs.map((log, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-emerald-400">
                      <span>✓</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  <div className="text-yellow-400 animate-pulse">Running live build container...</div>
                </div>
              </div>
            )}

            {/* Deployment Success Celebration Card */}
            {deployedResult && (
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1b2234] via-[#141824] to-[#12141c] border-2 border-yellow-400/60 shadow-2xl space-y-6 animate-scaleUp">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-bold text-xl shadow-lg">
                      🚀
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-2xl font-black text-white">Deployment Successful!</h4>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          LIVE ONLINE
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        Your project is now live on {deployedResult.deployedPlatform} and registered in your Manage Apps dashboard.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setDeployedResult(null);
                      setDeployStep(0);
                    }}
                    className="neu-btn px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    Deploy Another Version
                  </button>
                </div>

                {/* Live URLs and Info Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#0e1015] border border-white/10 space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Live Production URL</span>
                    <div className="flex items-center justify-between gap-2">
                      <a 
                        href={deployedResult.liveUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-sm font-bold text-yellow-400 hover:underline truncate flex items-center gap-1.5"
                      >
                        <span>{deployedResult.liveUrl}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleCopy(deployedResult.liveUrl)}
                        className="p-1.5 rounded-lg neu-btn text-xs text-slate-400 hover:text-white"
                        title="Copy live link"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0e1015] border border-white/10 space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">GitHub Repository</span>
                    <div className="text-sm font-mono text-slate-300 truncate">
                      {deployedResult.repoUrl}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href={deployedResult.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="neu-yellow-btn px-6 py-2.5 rounded-xl text-xs font-bold text-black flex items-center gap-2 shadow-lg"
                  >
                    <span>Visit Live Application</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={handleDownload}
                    className="neu-btn px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-2"
                  >
                    <Download className="w-4 h-4 text-yellow-400" />
                    <span>Download Project Source ZIP</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* OPTION B: DOWNLOAD PROJECT FOLDER ZIP                                     */}
        {/* ========================================================================= */}
        {activeTab === 'download' && (
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-yellow-400/20 text-yellow-400 flex items-center justify-center font-bold text-2xl mx-auto border border-yellow-400/30">
              <Download className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Download Standalone Project Source</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                Download a zero-config production ZIP archive containing your {selectedFrontend?.name} setup, {selectedBackend?.name} server logic, {selectedTemplate?.name} styled components, and README instructions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0e1014] border border-white/5 text-left text-xs font-mono text-slate-300 space-y-1.5">
              <div className="text-yellow-400 font-bold mb-2">// Included in your package:</div>
              <div>✓ Frontend source code with {selectedTemplate?.name} styling</div>
              <div>✓ Backend endpoints ready for {selectedBackend?.name}</div>
              <div>✓ Tailwind CSS & Vite configuration files</div>
              <div>✓ Ready to run `npm install && npm run dev`</div>
            </div>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="neu-yellow-btn px-8 py-3.5 rounded-xl text-sm font-extrabold text-black flex items-center justify-center gap-2 mx-auto shadow-xl hover:scale-105 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Generating ZIP Archive...' : 'Download Project Folder (.zip)'}</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}


