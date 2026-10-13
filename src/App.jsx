import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import AuthScreen from './components/AuthScreen';
import HeroIntroSection from './components/HeroIntroSection';
import FrontendChoiceSection from './components/FrontendChoiceSection';
import BackendChoiceSection from './components/BackendChoiceSection';
import UiTemplateChoiceSection from './components/UiTemplateChoiceSection';
import UiCustomizationSection from './components/UiCustomizationSection';
import DeployExportSection from './components/DeployExportSection';
import ManageAppDashboard from './components/ManageAppDashboard';
import ApiEndpointsModal from './components/ApiEndpointsModal';
import Footer from './components/Footer';

import { apiService } from './services/apiService';
import { FRONTEND_OPTIONS } from './data/frontendOptions';
import { BACKEND_OPTIONS } from './data/backendOptions';
import { UI_TEMPLATES } from './data/uiTemplates';
import { DEFAULT_COMPONENT_ORDER, DEFAULT_COMPONENTS_STATE } from './data/componentRegistry';
import { Check, Terminal, Rocket, Layers } from 'lucide-react';

function AppContent() {
  const { currentUser, isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('builder');
  
  const [frontendOptions, setFrontendOptions] = useState(FRONTEND_OPTIONS);
  const [backendOptions, setBackendOptions] = useState(BACKEND_OPTIONS);
  const [uiTemplates, setUiTemplates] = useState(UI_TEMPLATES);
  
  const [selectedFrontend, setSelectedFrontend] = useState(FRONTEND_OPTIONS[0]);
  const [selectedBackend, setSelectedBackend] = useState(BACKEND_OPTIONS[0]);
  const [selectedTemplate, setSelectedTemplate] = useState(UI_TEMPLATES[0]);

  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const [toastMessage, setToastMessage] = useState(null);
  const [isUltimateMode, setIsUltimateMode] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      Promise.all([
        apiService.getFrontendTech(),
        apiService.getBackendTech(),
        apiService.getTemplates()
      ]).then(([frontends, backends, templates]) => {
        if (frontends && frontends.length > 0) {
          setFrontendOptions(frontends);
          setSelectedFrontend(prev => prev || frontends[0]);
        }
        if (backends && backends.length > 0) {
          setBackendOptions(backends);
          setSelectedBackend(prev => prev || backends[0]);
        }
        if (templates && templates.length > 0) {
          setUiTemplates(templates);
          setSelectedTemplate(prev => prev || templates[0]);
        }
      }).catch(err => console.error("Failed to load options", err));
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <AuthScreen onContinue={() => setCurrentView('builder')} />;
  }

  const handleNavigate = (sectionId) => {
    if (currentView !== 'builder') {
      setCurrentView('builder');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectFrontend = (frontend) => {
    setSelectedFrontend(frontend);
    showToast(`Frontend Selected: ${frontend.name}`, 'Ready for scaffolding & layout sync');
  };

  const handleSelectBackend = (backend) => {
    setSelectedBackend(backend);
    showToast(`Backend Engine Selected: ${backend.name}`, 'API endpoint contracts synchronized');
  };

  const [uiCustomization, setUiCustomization] = useState(() => {
    const defaultTpl = UI_TEMPLATES[0] || {};
    return {
      primaryColor: defaultTpl.accentColor || '#FACC15',
      secondaryColor: defaultTpl.secondaryColor || '#38BDF8',
      surfaceColor: defaultTpl.surfaceColor || '#141824',
      bgStyle: 'mesh',
      bgImageData: '',
      bgImageUrl: '',
      bgImageName: '',
      bgOverlayOpacity: 75,
      bgBlurAmount: 0,
      brandName: defaultTpl.name || 'Nova SaaS Platform',
      heroHeading: defaultTpl.demo?.heroHeading || 'Scale Your Cloud Infrastructure with Real-Time Intelligence',
      heroSubheading: defaultTpl.demo?.heroSubheading || 'Automate deployments, optimize database queries, and reduce server costs with instant AI-driven telemetry.',
      primaryAction: defaultTpl.demo?.primaryAction || 'Start Free Trial',
      secondaryAction: defaultTpl.demo?.secondaryAction || 'Watch Demo',
      ctaHeadline: 'Ready to scale your next digital product?',
      ctaSubheading: 'Launch in minutes with production-grade modular components.',
      keyFeatures: defaultTpl.features || [
        'Interactive Cloud Cost & ROI Calculator with Live Sliders',
        'Zero-Config Edge Scaling with Global Distribution',
        'Predictive Failover Probes with AI Telemetry'
      ],
      componentOrder: [...DEFAULT_COMPONENT_ORDER],
      components: { ...DEFAULT_COMPONENTS_STATE }
    };
  });

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setUiCustomization(prev => ({
      ...prev,
      primaryColor: template.accentColor || prev.primaryColor,
      secondaryColor: template.secondaryColor || prev.secondaryColor,
      surfaceColor: template.surfaceColor || prev.surfaceColor,
      brandName: prev.brandName || template.name,
      heroHeading: template.demo?.heroHeading || prev.heroHeading,
      heroSubheading: template.demo?.heroSubheading || prev.heroSubheading,
      primaryAction: template.demo?.primaryAction || prev.primaryAction,
      secondaryAction: template.demo?.secondaryAction || prev.secondaryAction,
      keyFeatures: template.features || prev.keyFeatures
    }));
    showToast(`UI Template Selected: ${template.name}`, 'Interactive component and design tokens synchronized');
  };

  const handleResetToTemplateDefaults = () => {
    if (!selectedTemplate) return;
    setUiCustomization({
      primaryColor: selectedTemplate.accentColor || '#FACC15',
      secondaryColor: selectedTemplate.secondaryColor || '#38BDF8',
      surfaceColor: selectedTemplate.surfaceColor || '#141824',
      bgStyle: 'mesh',
      bgImageData: '',
      bgImageUrl: '',
      bgImageName: '',
      bgOverlayOpacity: 75,
      bgBlurAmount: 0,
      brandName: selectedTemplate.name,
      heroHeading: selectedTemplate.demo?.heroHeading || '',
      heroSubheading: selectedTemplate.demo?.heroSubheading || '',
      primaryAction: selectedTemplate.demo?.primaryAction || '',
      secondaryAction: selectedTemplate.demo?.secondaryAction || '',
      ctaHeadline: 'Ready to scale your next digital product?',
      ctaSubheading: 'Launch in minutes with production-grade modular components.',
      keyFeatures: selectedTemplate.features || [],
      componentOrder: [...DEFAULT_COMPONENT_ORDER],
      components: { ...DEFAULT_COMPONENTS_STATE }
    });
    showToast(`Reset Defaults`, `Restored default visual tokens for ${selectedTemplate.name}`);
  };

  const handleApplyAiArchitectConfig = (cfg) => {
    if (!cfg) return;

    setUiCustomization(prev => {
      const next = { ...prev };

      // 1. Branding & Copywriting
      if (cfg.projectName || cfg.brandName) next.brandName = cfg.projectName || cfg.brandName;
      if (cfg.heroHeading) next.heroHeading = cfg.heroHeading;
      if (cfg.heroSubheading) next.heroSubheading = cfg.heroSubheading;
      if (cfg.primaryAction) next.primaryAction = cfg.primaryAction;
      if (cfg.secondaryAction) next.secondaryAction = cfg.secondaryAction;
      if (cfg.ctaHeadline) next.ctaHeadline = cfg.ctaHeadline;
      if (cfg.ctaSubheading) next.ctaSubheading = cfg.ctaSubheading;

      // 2. Key Architectural Features
      if (Array.isArray(cfg.keyFeatures) && cfg.keyFeatures.length > 0) {
        next.keyFeatures = cfg.keyFeatures;
      }

      // 3. Realistic Industry Metrics
      if (Array.isArray(cfg.metrics) && cfg.metrics.length > 0) {
        next.metrics = cfg.metrics.slice(0, 4);
      }

      // 4. Modular Pricing Tiers
      if (cfg.pricingTier1 && typeof cfg.pricingTier1 === 'object') {
        next.pricingTier1 = { ...prev.pricingTier1, ...cfg.pricingTier1 };
      }
      if (cfg.pricingTier2 && typeof cfg.pricingTier2 === 'object') {
        next.pricingTier2 = { ...prev.pricingTier2, ...cfg.pricingTier2 };
      }

      // 5. Frequently Asked Questions
      if (Array.isArray(cfg.faqs) && cfg.faqs.length > 0) {
        next.faqs = cfg.faqs;
      }

      // 6. Testimonials & Ratings
      if (Array.isArray(cfg.testimonials) && cfg.testimonials.length > 0) {
        next.testimonials = cfg.testimonials;
      }
      if (cfg.testimonialsRating) {
        next.testimonialsRating = cfg.testimonialsRating;
      }

      // 7. Visual Palette (Apply if provided and valid hex, preserving uploaded background image)
      if (cfg.primaryColor && /^#[0-9A-Fa-f]{6}$/.test(cfg.primaryColor)) {
        next.primaryColor = cfg.primaryColor;
      }
      if (cfg.secondaryColor && /^#[0-9A-Fa-f]{6}$/.test(cfg.secondaryColor)) {
        next.secondaryColor = cfg.secondaryColor;
      }

      return next;
    });

    showToast('AI Full Customization Applied', 'Brand, copy, metrics, pricing, FAQs & styling populated across all components!');
  };

  const showToast = (title, subtitle) => {
    setToastMessage({ title, subtitle });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleProjectCreated = (newProject) => {
    showToast(`Project Ready: ${newProject.name}`, `Added to Manage Your Apps dashboard!`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] relative selection:bg-yellow-400 selection:text-black transition-colors duration-300">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-yellow-400/5 via-transparent to-transparent pointer-events-none -z-10" />
      <Navbar
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view)}
        selectedFrontend={selectedFrontend}
        selectedBackend={selectedBackend}
        selectedTemplate={selectedTemplate}
        onOpenApiModal={() => setIsApiModalOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isUltimateMode={isUltimateMode}
        onToggleUltimateMode={() => setIsUltimateMode(!isUltimateMode)}
      />

      <main className="flex-1 space-y-12">
        {currentView === 'builder' ? (
          <>
            <HeroIntroSection
              onNavigate={handleNavigate}
              onOpenApiModal={() => setIsApiModalOpen(true)}
              onViewChange={(view) => setCurrentView(view)}
              isUltimateMode={isUltimateMode}
            />
            
            {isUltimateMode && (
              <>
                <FrontendChoiceSection
                  options={frontendOptions}
                  selectedFrontend={selectedFrontend}
                  onSelectFrontend={handleSelectFrontend}
                />

                <BackendChoiceSection
                  options={backendOptions}
                  selectedBackend={selectedBackend}
                  onSelectBackend={handleSelectBackend}
                />
              </>
            )}

            <UiTemplateChoiceSection
              options={uiTemplates}
              selectedTemplate={selectedTemplate}
              onSelectTemplate={handleSelectTemplate}
              onNavigateToCustomize={() => handleNavigate('customization')}
            />

            <UiCustomizationSection
              selectedTemplate={selectedTemplate}
              customization={uiCustomization}
              onUpdateCustomization={setUiCustomization}
              onResetToTemplateDefaults={handleResetToTemplateDefaults}
            />

            <DeployExportSection
              selectedFrontend={selectedFrontend}
              selectedBackend={selectedBackend}
              selectedTemplate={selectedTemplate}
              currentUser={currentUser}
              isUltimateMode={isUltimateMode}
              onProjectCreated={handleProjectCreated}
              frontendOptions={frontendOptions}
              backendOptions={backendOptions}
              uiTemplates={uiTemplates}
              onSelectFrontend={handleSelectFrontend}
              onSelectBackend={handleSelectBackend}
              onSelectTemplate={handleSelectTemplate}
              customization={uiCustomization}
              onUpdateCustomization={setUiCustomization}
              onApplyAiArchitectConfig={handleApplyAiArchitectConfig}
            />
          </>
        ) : (
          <ManageAppDashboard
            currentUser={currentUser}
            onStartNewApp={() => {
              setCurrentView('builder');
              setTimeout(() => {
                const el = document.getElementById('intro');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          />
        )}
      </main>

      <ApiEndpointsModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        selectedFrontend={selectedFrontend}
        selectedBackend={selectedBackend}
      />

      {currentView === 'builder' && (
        <aside
          aria-label="Current Architecture Selection"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 px-4 py-2.5 rounded-2xl glass-card neu-surface border border-yellow-400/40 flex items-center gap-3 sm:gap-6 shadow-2xl backdrop-blur-xl animate-fadeUp max-w-[94vw] bg-[#14161f]/95"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-xs font-bold text-white">
              {selectedFrontend?.name} + {selectedBackend?.name}
            </span>
            <span className="text-xs text-yellow-300 font-mono hidden md:inline">
              ({selectedTemplate?.name})
            </span>
          </div>

          <div className="h-4 w-px bg-white/20 hidden sm:block" />

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavigate('deploy')}
              className="text-xs font-extrabold text-black bg-yellow-400 hover:bg-yellow-300 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all shadow-md"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Launch / Export</span>
            </button>

            {isUltimateMode && (
              <button
                onClick={() => setIsApiModalOpen(true)}
                className="text-xs text-slate-300 hover:text-white font-mono hidden sm:flex items-center gap-1 transition-colors px-2 py-1"
              >
                <Terminal className="w-3.5 h-3.5 text-yellow-400" />
                <span>API Spec</span>
              </button>
            )}
          </div>
        </aside>
      )}

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-6 z-50 p-4 rounded-2xl glass-card neu-surface border border-yellow-400/50 shadow-2xl flex items-center gap-3 animate-slideIn bg-[#181b24]/95"
        >
          <div className="w-8 h-8 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-bold">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">{toastMessage.title}</div>
            <div className="text-[11px] text-slate-400 font-mono">{toastMessage.subtitle}</div>
          </div>
        </div>
      )}

      <Footer onOpenApiModal={() => setIsApiModalOpen(true)} onNavigate={handleNavigate} isUltimateMode={isUltimateMode} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
