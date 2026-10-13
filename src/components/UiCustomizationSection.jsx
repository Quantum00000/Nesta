import React, { useState } from 'react';
import { 
  Palette, 
  Image as ImageIcon, 
  Upload, 
  Type, 
  Layers, 
  Sparkles, 
  Check, 
  RefreshCw, 
  Eye, 
  Trash2, 
  ArrowRight, 
  ArrowUp, 
  ArrowDown, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  MessageSquare, 
  HelpCircle, 
  Building2,
  ChevronDown,
  Sun,
  Moon,
  Pencil,
  Plus,
  SlidersHorizontal
} from 'lucide-react';
import { 
  AVAILABLE_COMPONENTS, 
  DEFAULT_COMPONENT_ORDER, 
  DEFAULT_COMPONENTS_STATE 
} from '../data/componentRegistry';

const COLOR_PRESETS = [
  { name: 'Amber Gold', hex: '#FACC15' },
  { name: 'Sky Cyan', hex: '#38BDF8' },
  { name: 'Neon Purple', hex: '#A855F7' },
  { name: 'Emerald Glow', hex: '#10B981' },
  { name: 'Rose Pink', hex: '#EC4899' },
  { name: 'Crimson Fire', hex: '#EF4444' },
  { name: 'Electric Indigo', hex: '#6366F1' },
  { name: 'Obsidian White', hex: '#FFFFFF' }
];

const SURFACE_PRESETS = [
  { name: 'Dark Slate', hex: '#141824' },
  { name: 'Obsidian Black', hex: '#0D0F14' },
  { name: 'Midnight Navy', hex: '#0B132B' },
  { name: 'Cyber Charcoal', hex: '#18181B' },
  { name: 'Clean Light Slate', hex: '#F8FAFC' },
  { name: 'Pure Cloud White', hex: '#FFFFFF' }
];

const BG_STYLE_OPTIONS = [
  { id: 'mesh', label: 'Dark Radial Mesh', desc: 'Subtle glowing color atmospheric gradient' },
  { id: 'grid', label: 'Blueprint Grid', desc: 'Modern technical blueprint dot & line pattern' },
  { id: 'image', label: 'Custom Image Upload', desc: 'Upload or link your own brand background' },
  { id: 'solid', label: 'Pure Minimalist Solid', desc: 'Clean, distraction-free matte surface' }
];

export default function UiCustomizationSection({
  selectedTemplate,
  customization = {},
  onUpdateCustomization,
  onResetToTemplateDefaults
}) {
  const [activeTab, setActiveTab] = useState('colors'); // 'colors' | 'background' | 'copy' | 'components'
  const [imageUploadError, setImageUploadError] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(0);
  const [editingComponent, setEditingComponent] = useState('hero');
  const [rightViewTab, setRightViewTab] = useState('sandbox'); // 'sandbox' | 'editor'

  const currentTemplate = selectedTemplate || {
    id: 'saas-nova',
    name: 'Nova SaaS Platform',
    accentColor: '#FACC15',
    secondaryColor: '#38BDF8',
    surfaceColor: '#171B26',
    features: [
      'Interactive Cloud Cost & ROI Calculator with Live Sliders',
      'Zero-Config Edge Scaling with Global Distribution',
      'Predictive Failover Probes with AI Telemetry'
    ],
    demo: {
      heroHeading: 'Scale Your Cloud Infrastructure with Real-Time Intelligence',
      heroSubheading: 'Automate deployments, optimize database queries, and reduce server costs with instant AI-driven telemetry.',
      primaryAction: 'Start Free Trial',
      secondaryAction: 'Watch Demo',
      metrics: [
        { label: 'Active Deployments', value: '18,420+' },
        { label: 'Edge Latency', value: '18ms' },
        { label: 'Uptime SLA', value: '99.99%' },
        { label: 'Cost Saved', value: '$2.4M' }
      ]
    }
  };

  // Helper to update individual customization keys
  const updateField = (key, value) => {
    onUpdateCustomization({
      ...customization,
      [key]: value
    });
  };

  const getComponentName = (key) => {
    const found = AVAILABLE_COMPONENTS.find(c => c.id === key);
    return found ? found.name : key;
  };

  const getComponentBadge = (key) => {
    const found = AVAILABLE_COMPONENTS.find(c => c.id === key);
    return found ? found.badge : 'Module';
  };

  const getComponentIcon = (key) => {
    switch (key) {
      case 'navbar': return <Layers className="w-5 h-5 text-yellow-400" />;
      case 'hero': return <Sparkles className="w-5 h-5 text-yellow-400" />;
      case 'trustedBy': return <Building2 className="w-5 h-5 text-yellow-400" />;
      case 'interactiveWidget': return <RefreshCw className="w-5 h-5 text-yellow-400" />;
      case 'metrics': return <CheckCircle2 className="w-5 h-5 text-yellow-400" />;
      case 'features': return <Layers className="w-5 h-5 text-yellow-400" />;
      case 'testimonials': return <MessageSquare className="w-5 h-5 text-yellow-400" />;
      case 'pricing': return <ShieldCheck className="w-5 h-5 text-yellow-400" />;
      case 'faq': return <HelpCircle className="w-5 h-5 text-yellow-400" />;
      case 'ctaBanner': return <ArrowRight className="w-5 h-5 text-yellow-400" />;
      case 'footer': return <Building2 className="w-5 h-5 text-yellow-400" />;
      default: return <Pencil className="w-5 h-5 text-yellow-400" />;
    }
  };

  // Feature items handlers
  const handleAddFeatureItem = () => {
    const currentFeats = customization.keyFeatures && customization.keyFeatures.length > 0
      ? [...customization.keyFeatures]
      : [...(currentTemplate.features || ['New Feature Capability'])];
    currentFeats.push('Next-Gen AI Microservice Telemetry');
    updateField('keyFeatures', currentFeats);
  };

  const handleUpdateFeatureItem = (index, value) => {
    const currentFeats = customization.keyFeatures && customization.keyFeatures.length > 0
      ? [...customization.keyFeatures]
      : [...(currentTemplate.features || ['Feature 1', 'Feature 2', 'Feature 3'])];
    currentFeats[index] = value;
    updateField('keyFeatures', currentFeats);
  };

  const handleDeleteFeatureItem = (index) => {
    const currentFeats = customization.keyFeatures && customization.keyFeatures.length > 0
      ? [...customization.keyFeatures]
      : [...(currentTemplate.features || ['Feature 1', 'Feature 2', 'Feature 3'])];
    if (currentFeats.length <= 1) return;
    currentFeats.splice(index, 1);
    updateField('keyFeatures', currentFeats);
  };

  // Metrics handlers
  const currentMetrics = customization.metrics && customization.metrics.length > 0
    ? customization.metrics
    : (currentTemplate.demo?.metrics || [
        { label: 'Latency', value: '18ms' },
        { label: 'Uptime', value: '99.99%' },
        { label: 'Active Users', value: '120k+' },
        { label: 'Cost Saved', value: '$2.4M' }
      ]);

  const handleUpdateMetric = (index, field, val) => {
    const updated = [...currentMetrics];
    updated[index] = { ...updated[index], [field]: val };
    updateField('metrics', updated);
  };

  // Pricing tiers handlers
  const currentTier1 = customization.pricingTier1 || {
    name: 'Starter Tier',
    price: '$29',
    period: '/mo',
    desc: 'Includes 5 microservices & edge telemetry'
  };
  const currentTier2 = customization.pricingTier2 || {
    name: 'Enterprise Scale',
    price: '$99',
    period: '/mo',
    desc: 'Unlimited pipelines, dedicated edge CDN & SLA',
    badge: 'POPULAR'
  };

  const handleUpdateTier1 = (field, val) => {
    updateField('pricingTier1', { ...currentTier1, [field]: val });
  };

  const handleUpdateTier2 = (field, val) => {
    updateField('pricingTier2', { ...currentTier2, [field]: val });
  };

  // Testimonials handlers
  const currentTestimonials = customization.testimonials && customization.testimonials.length > 0
    ? customization.testimonials
    : [
        { quote: "Nesta completely transformed our product launch. We had our full interactive stack running in hours.", author: "Sarah Lin, CTO at HyperScale" },
        { quote: "The modular component customizer saved our design sprint weeks of engineering effort.", author: "David Vance, Lead Architect" }
      ];

  const handleUpdateTestimonial = (index, field, val) => {
    const updated = [...currentTestimonials];
    updated[index] = { ...updated[index], [field]: val };
    updateField('testimonials', updated);
  };

  // FAQ handlers
  const currentFaqs = customization.faqs && customization.faqs.length > 0
    ? customization.faqs
    : [
        { q: 'How does code export work?', a: 'You download a zero-config production ZIP containing complete Vite, React, and serverless backend handlers.' },
        { q: 'Can I add custom components later?', a: 'Yes, the codebase is completely open and modular with clean Tailwind tokens.' }
      ];

  const handleUpdateFaq = (index, field, val) => {
    const updated = [...currentFaqs];
    updated[index] = { ...updated[index], [field]: val };
    updateField('faqs', updated);
  };

  const handleAddFaq = () => {
    const updated = [...currentFaqs, { q: 'What databases are supported?', a: 'PostgreSQL, MongoDB, Supabase, and MySQL with zero-config connection pools.' }];
    updateField('faqs', updated);
  };

  const handleDeleteFaq = (index) => {
    if (currentFaqs.length <= 1) return;
    const updated = currentFaqs.filter((_, i) => i !== index);
    updateField('faqs', updated);
  };

  const handleToggleThemeMode = (mode) => {
    onUpdateCustomization({
      ...customization,
      themeMode: mode,
      surfaceColor: mode === 'light' ? '#F8FAFC' : (currentTemplate.surfaceColor || '#141824')
    });
  };

  // Handle local background image upload
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageUploadError('Please select a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageUploadError('Image size exceeds 5MB limit.');
      return;
    }

    setImageUploadError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (dataUrl) {
        onUpdateCustomization({
          ...customization,
          bgStyle: 'image',
          bgImageData: dataUrl,
          bgImageName: file.name
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    onUpdateCustomization({
      ...customization,
      bgImageData: '',
      bgImageUrl: '',
      bgImageName: '',
      bgStyle: 'mesh'
    });
  };

  const primaryColor = customization.primaryColor || currentTemplate.accentColor || '#FACC15';
  const secondaryColor = customization.secondaryColor || currentTemplate.secondaryColor || '#38BDF8';
  const surfaceColor = customization.surfaceColor || currentTemplate.surfaceColor || '#141824';
  const bgStyle = customization.bgStyle || 'mesh';
  const bgImageData = customization.bgImageData || customization.bgImageUrl || '';
  const overlayOpacity = customization.bgOverlayOpacity ?? 75;
  const blurAmount = customization.bgBlurAmount ?? 0;

  const components = customization.components || DEFAULT_COMPONENTS_STATE;
  const componentOrder = customization.componentOrder || DEFAULT_COMPONENT_ORDER;

  const toggleComponent = (compKey) => {
    updateField('components', {
      ...components,
      [compKey]: !components[compKey]
    });
  };

  const handleMoveComponent = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= componentOrder.length) return;

    const newOrder = [...componentOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    updateField('componentOrder', newOrder);
  };

  const handleResetOrder = () => {
    updateField('componentOrder', [...DEFAULT_COMPONENT_ORDER]);
  };

  // Render individual component previews for the Sandbox
  const renderSandboxComponent = (key) => {
    if (!components[key]) return null;

    switch (key) {
      case 'navbar':
        return (
          <div key="navbar" className="p-3 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <div 
                className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-black text-xs shadow-md"
                style={{ backgroundColor: primaryColor }}
              >
                {(customization.brandName || currentTemplate.name).substring(0, 1)}
              </div>
              <span className="font-extrabold text-xs text-white tracking-tight">
                {customization.brandName || currentTemplate.name}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-300 font-medium">
              <span className="hover:text-white cursor-pointer transition-colors">Platform</span>
              <span className="hover:text-white cursor-pointer transition-colors">Features</span>
              <span className="hover:text-white cursor-pointer transition-colors">Pricing</span>
              <span className="hover:text-white cursor-pointer transition-colors">Docs</span>
            </div>
            <button 
              className="px-3 py-1 rounded-lg text-xs font-black text-black shadow-md transition-transform hover:scale-105"
              style={{ backgroundColor: primaryColor }}
            >
              {customization.primaryAction || currentTemplate.demo?.primaryAction || 'Get Started'}
            </button>
          </div>
        );

      case 'hero':
        return (
          <div key="hero" className="text-center max-w-lg mx-auto space-y-4 pt-2">
            <div 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border border-white/10 shadow-inner"
              style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
            >
              <Sparkles className="w-3 h-3" />
              <span>Production-Grade Architecture</span>
            </div>

            <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              {customization.heroHeading || currentTemplate.demo?.heroHeading}
            </h1>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {customization.heroSubheading || currentTemplate.demo?.heroSubheading}
            </p>

            <div className="flex items-center justify-center gap-2.5 pt-1">
              <button 
                className="px-4 py-2 rounded-xl text-xs font-bold text-black flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105"
                style={{ backgroundColor: primaryColor }}
              >
                <span>{customization.primaryAction || currentTemplate.demo?.primaryAction || 'Launch Now'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 transition-colors">
                {customization.secondaryAction || currentTemplate.demo?.secondaryAction || 'Learn More'}
              </button>
            </div>
          </div>
        );

      case 'trustedBy':
        return (
          <div key="trustedBy" className="py-2 px-3 rounded-2xl bg-white/[0.03] border border-white/5 text-center space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
              Trusted by 10,000+ teams and high-growth innovators
            </span>
            <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 text-slate-400 text-xs font-mono font-semibold">
              <span className="flex items-center gap-1 hover:text-white transition-colors">
                <Building2 className="w-3 h-3 text-yellow-400" /> ACME CLOUD
              </span>
              <span className="hover:text-white transition-colors">VERTEX LABS</span>
              <span className="hover:text-white transition-colors">HYPERSCALE</span>
              <span className="hover:text-white transition-colors">VELOCE AI</span>
            </div>
          </div>
        );

      case 'interactiveWidget':
        return (
          <div key="interactiveWidget" className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
                <span>Interactive {currentTemplate.name} Engine</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-300 font-mono border border-yellow-400/20">
                Live Interactive Component
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 flex items-center justify-between flex-wrap gap-2">
              <span className="font-sans">Modular State Container: Interactive Widget Active</span>
              <span className="font-mono text-xs font-bold" style={{ color: primaryColor }}>
                Ready in Exported ZIP
              </span>
            </div>
          </div>
        );

      case 'metrics':
        return (
          <div key="metrics" className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {currentMetrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center shadow-sm">
                <div className="text-base font-black text-white" style={{ color: idx === 0 ? primaryColor : '#ffffff' }}>
                  {m.value}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        );

      case 'features':
        const feats = customization.keyFeatures && customization.keyFeatures.length > 0 
          ? customization.keyFeatures 
          : (currentTemplate.features || [
              'Zero-Config Edge Scaling with Global Distribution',
              'Automated Health Probes & Intelligent Failover',
              'End-to-End Enterprise Grade Encryption'
            ]);
        return (
          <div key="features" className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Key Features & Capabilities
              </span>
              <span className="text-[10px] text-slate-400">Bento Grid</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {feats.slice(0, 3).map((f, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold text-black" style={{ backgroundColor: primaryColor }}>
                    {idx + 1}
                  </div>
                  <div className="text-xs font-bold text-white leading-snug">{f}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'testimonials':
        const ratingVal = customization.testimonialsRating || '4.9/5.0';
        return (
          <div key="testimonials" className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <MessageSquare className="w-3.5 h-3.5 text-yellow-400" />
                <span>Customer Success & Reviews</span>
              </div>
              <div className="flex items-center text-yellow-400 text-xs">
                <Star className="w-3 h-3 fill-yellow-400" />
                <Star className="w-3 h-3 fill-yellow-400" />
                <Star className="w-3 h-3 fill-yellow-400" />
                <Star className="w-3 h-3 fill-yellow-400" />
                <Star className="w-3 h-3 fill-yellow-400" />
                <span className="text-[10px] text-slate-400 ml-1 font-mono">{ratingVal}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentTestimonials.slice(0, 2).map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-slate-300">
                  <p className="italic">"{item.quote}"</p>
                  <div className="text-[10px] font-bold text-white mt-2">— {item.author}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div key="pricing" className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-center">
            <div className="text-xs font-bold text-white">Production-Ready Pricing Matrix</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">{currentTier1.name}</span>
                <div className="text-lg font-black text-white">{currentTier1.price}<span className="text-xs text-slate-400 font-normal">{currentTier1.period || '/mo'}</span></div>
                <div className="text-[10px] text-slate-300 mt-1">{currentTier1.desc}</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-yellow-400/40 relative">
                <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-yellow-400 text-black">{currentTier2.badge || 'POPULAR'}</span>
                <span className="text-[10px] font-mono text-yellow-300 uppercase">{currentTier2.name}</span>
                <div className="text-lg font-black text-white">{currentTier2.price}<span className="text-xs text-slate-400 font-normal">{currentTier2.period || '/mo'}</span></div>
                <div className="text-[10px] text-slate-300 mt-1">{currentTier2.desc}</div>
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div key="faq" className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-yellow-400" />
              <span>Frequently Asked Questions</span>
            </div>
            {currentFaqs.map((faq, idx) => (
              <div 
                key={idx} 
                onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                className="p-2.5 rounded-xl bg-black/40 border border-white/5 cursor-pointer text-[11px]"
              >
                <div className="flex items-center justify-between font-semibold text-white">
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${expandedFaq === idx ? 'rotate-180 text-yellow-400' : ''}`} />
                </div>
                {expandedFaq === idx && (
                  <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed font-sans">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        );

      case 'ctaBanner':
        return (
          <div key="ctaBanner" className="p-5 rounded-2xl border text-center space-y-3 relative overflow-hidden shadow-xl"
            style={{ 
              background: `linear-gradient(135deg, ${primaryColor}20 0%, ${secondaryColor}15 100%)`,
              borderColor: `${primaryColor}40`
            }}
          >
            <h3 className="text-base sm:text-lg font-black text-white">
              {customization.ctaHeadline || 'Ready to Scale Your Digital Infrastructure?'}
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              {customization.ctaSubheading || 'Join thousands of developers and product teams building with Nesta today.'}
            </p>
            <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
              <input 
                type="email" 
                placeholder="Enter work email..." 
                className="px-3 py-1.5 rounded-xl bg-black/50 border border-white/20 text-xs text-white placeholder-slate-500 focus:outline-none w-full"
                readOnly
              />
              <button 
                className="px-3 py-1.5 rounded-xl text-xs font-black text-black shrink-0 shadow-md"
                style={{ backgroundColor: primaryColor }}
              >
                Launch
              </button>
            </div>
          </div>
        );

      case 'footer':
        return (
          <div key="footer" className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>© 2026 {customization.brandName || currentTemplate.name}. All rights reserved.</span>
            <span className="flex items-center gap-1 font-mono text-xs font-semibold" style={{ color: primaryColor }}>
              Built with Nesta
            </span>
          </div>
        );

      default:
        return null;
    }
  };

  // Render dedicated input controls for whichever component is being edited
  const renderComponentEditorFields = () => {
    switch (editingComponent) {
      case 'hero':
        return (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                App / Product Brand Name
              </label>
              <input
                type="text"
                value={customization.brandName || ''}
                onChange={(e) => updateField('brandName', e.target.value)}
                placeholder={currentTemplate.name}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:ring-1 focus:ring-yellow-400 font-bold"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Hero Main Headline
              </label>
              <textarea
                value={customization.heroHeading || ''}
                onChange={(e) => updateField('heroHeading', e.target.value)}
                placeholder={currentTemplate.demo?.heroHeading}
                rows={2}
                className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:ring-1 focus:ring-yellow-400 resize-none font-semibold"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Hero Subheading / Value Proposition
              </label>
              <textarea
                value={customization.heroSubheading || ''}
                onChange={(e) => updateField('heroSubheading', e.target.value)}
                placeholder={currentTemplate.demo?.heroSubheading}
                rows={3}
                className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-yellow-400 resize-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Primary Button Label</label>
                <input
                  type="text"
                  value={customization.primaryAction || ''}
                  onChange={(e) => updateField('primaryAction', e.target.value)}
                  placeholder={currentTemplate.demo?.primaryAction || 'Get Started'}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Secondary Button Label</label>
                <input
                  type="text"
                  value={customization.secondaryAction || ''}
                  onChange={(e) => updateField('secondaryAction', e.target.value)}
                  placeholder={currentTemplate.demo?.secondaryAction || 'Learn More'}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                />
              </div>
            </div>
          </div>
        );

      case 'features':
        const activeFeatures = customization.keyFeatures && customization.keyFeatures.length > 0
          ? customization.keyFeatures
          : (currentTemplate.features || [
              'Zero-Config Edge Scaling with Global Distribution',
              'Automated Health Probes & Intelligent Failover',
              'End-to-End Enterprise Grade Encryption'
            ]);
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Bento Grid Feature Bullets ({activeFeatures.length})
              </label>
              <button
                type="button"
                onClick={handleAddFeatureItem}
                className="text-[11px] font-bold text-black bg-yellow-400 hover:bg-yellow-300 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all shadow-sm"
              >
                <Plus className="w-3 h-3" />
                <span>Add Feature</span>
              </button>
            </div>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
              {activeFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/10">
                  <span className="w-6 h-6 rounded-md bg-yellow-400 text-black text-xs font-black flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleUpdateFeatureItem(idx, e.target.value)}
                    className="w-full bg-transparent text-xs text-white focus:outline-none"
                    placeholder={`Feature item #${idx + 1}`}
                  />
                  {activeFeatures.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteFeatureItem(idx)}
                      className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      title="Remove feature"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'metrics':
        return (
          <div className="space-y-4 animate-fadeIn">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Telemetry & KPI Stat Cards (4 Counter Units)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentMetrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-yellow-400 font-bold">
                    <span>COUNTER #{idx + 1}</span>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 font-mono">Display Value</label>
                    <input
                      type="text"
                      value={m.value}
                      onChange={(e) => handleUpdateMetric(idx, 'value', e.target.value)}
                      placeholder="99.9%"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-black text-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 font-mono">Metric Label</label>
                    <input
                      type="text"
                      value={m.label}
                      onChange={(e) => handleUpdateMetric(idx, 'label', e.target.value)}
                      placeholder="Uptime SLA"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="space-y-4 animate-fadeIn">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Modular Pricing Plan Cards
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Starter Tier */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">Tier 1 — Starter</span>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Plan Name</label>
                  <input
                    type="text"
                    value={currentTier1.name}
                    onChange={(e) => handleUpdateTier1('name', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Price</label>
                    <input
                      type="text"
                      value={currentTier1.price}
                      onChange={(e) => handleUpdateTier1('price', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-bold text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Period</label>
                    <input
                      type="text"
                      value={currentTier1.period || '/mo'}
                      onChange={(e) => handleUpdateTier1('period', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-slate-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Description</label>
                  <input
                    type="text"
                    value={currentTier1.desc}
                    onChange={(e) => handleUpdateTier1('desc', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-slate-300"
                  />
                </div>
              </div>

              {/* Enterprise Scale */}
              <div className="p-4 rounded-2xl bg-black/40 border border-yellow-400/40 space-y-3 relative">
                <span className="text-[10px] font-mono text-yellow-300 uppercase block font-bold">Tier 2 — Scale (Featured)</span>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Plan Name</label>
                  <input
                    type="text"
                    value={currentTier2.name}
                    onChange={(e) => handleUpdateTier2('name', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Price</label>
                    <input
                      type="text"
                      value={currentTier2.price}
                      onChange={(e) => handleUpdateTier2('price', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-bold text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Badge</label>
                    <input
                      type="text"
                      value={currentTier2.badge || 'POPULAR'}
                      onChange={(e) => handleUpdateTier2('badge', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-yellow-400 font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Description</label>
                  <input
                    type="text"
                    value={currentTier2.desc}
                    onChange={(e) => handleUpdateTier2('desc', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Customer Reviews & Social Proof
              </label>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-400 font-mono">Score:</span>
                <input
                  type="text"
                  value={customization.testimonialsRating || '4.9/5.0'}
                  onChange={(e) => updateField('testimonialsRating', e.target.value)}
                  className="w-16 px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[11px] font-mono text-yellow-400 text-center"
                />
              </div>
            </div>

            <div className="space-y-3">
              {currentTestimonials.slice(0, 2).map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono text-yellow-400 font-bold block">REVIEW #{idx + 1}</span>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Quote / Feedback</label>
                    <textarea
                      rows={2}
                      value={item.quote}
                      onChange={(e) => handleUpdateTestimonial(idx, 'quote', e.target.value)}
                      className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-xs text-slate-200 resize-none leading-snug"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Customer Name & Role</label>
                    <input
                      type="text"
                      value={item.author}
                      onChange={(e) => handleUpdateTestimonial(idx, 'author', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white font-medium"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Expandable FAQ Items ({currentFaqs.length})
              </label>
              <button
                type="button"
                onClick={handleAddFaq}
                className="text-[11px] font-bold text-black bg-yellow-400 hover:bg-yellow-300 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all shadow-sm"
              >
                <Plus className="w-3 h-3" />
                <span>Add FAQ</span>
              </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
              {currentFaqs.map((faq, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-yellow-400 font-bold">QUESTION #{idx + 1}</span>
                    {currentFaqs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteFaq(idx)}
                        className="text-red-400 hover:text-red-300 p-1 rounded"
                        title="Delete question"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={faq.q}
                    onChange={(e) => handleUpdateFaq(idx, 'q', e.target.value)}
                    placeholder="Enter question..."
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white font-semibold"
                  />
                  <textarea
                    rows={2}
                    value={faq.a}
                    onChange={(e) => handleUpdateFaq(idx, 'a', e.target.value)}
                    placeholder="Enter answer..."
                    className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-xs text-slate-300 resize-none leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'ctaBanner':
        return (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                CTA Banner Main Headline
              </label>
              <input
                type="text"
                value={customization.ctaHeadline || ''}
                onChange={(e) => updateField('ctaHeadline', e.target.value)}
                placeholder="Ready to scale your next digital product?"
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white font-bold"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                CTA Subheading Paragraph
              </label>
              <textarea
                rows={2}
                value={customization.ctaSubheading || ''}
                onChange={(e) => updateField('ctaSubheading', e.target.value)}
                placeholder="Launch in minutes with production-grade modular components."
                className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 resize-none leading-relaxed"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Action Button Label
              </label>
              <input
                type="text"
                value={customization.ctaButtonText || 'Launch'}
                onChange={(e) => updateField('ctaButtonText', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
              />
            </div>
          </div>
        );

      case 'navbar':
        return (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Branded Header Title
              </label>
              <input
                type="text"
                value={customization.brandName || ''}
                onChange={(e) => updateField('brandName', e.target.value)}
                placeholder={currentTemplate.name}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white font-bold"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Header Action Button Text
              </label>
              <input
                type="text"
                value={customization.primaryAction || ''}
                onChange={(e) => updateField('primaryAction', e.target.value)}
                placeholder={currentTemplate.demo?.primaryAction || 'Get Started'}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
              />
            </div>
          </div>
        );

      case 'footer':
        return (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Footer Brand Name
              </label>
              <input
                type="text"
                value={customization.brandName || ''}
                onChange={(e) => updateField('brandName', e.target.value)}
                placeholder={currentTemplate.name}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white font-bold"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Footer Copyright Text
              </label>
              <input
                type="text"
                value={customization.footerCopyright || `© 2026 ${customization.brandName || currentTemplate.name}. All rights reserved.`}
                onChange={(e) => updateField('footerCopyright', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                System Status Note
              </label>
              <input
                type="text"
                value={customization.footerStatus || 'All Systems Operational'}
                onChange={(e) => updateField('footerStatus', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-emerald-400 font-mono"
              />
            </div>
          </div>
        );

      case 'trustedBy':
        return (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Trust Banner Headline
              </label>
              <input
                type="text"
                value={customization.trustedHeadline || 'Trusted by 10,000+ teams and high-growth innovators'}
                onChange={(e) => updateField('trustedHeadline', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
              />
            </div>
            <p className="text-xs text-slate-400">
              Logo badges: ACME Cloud, Vertex Labs, Hyperscale, Veloce AI (customizable in exported codebase).
            </p>
          </div>
        );

      default:
        return (
          <div className="space-y-4 animate-fadeIn text-slate-300 text-xs">
            <p>Customize the {getComponentName(editingComponent)} component parameters and behavior.</p>
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Component Title
              </label>
              <input
                type="text"
                value={customization[`${editingComponent}Title`] || getComponentName(editingComponent)}
                onChange={(e) => updateField(`${editingComponent}Title`, e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <section id="customization" className="relative py-16 px-4 sm:px-8 max-w-7xl mx-auto font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Section Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-semibold mb-4 shadow-[0_0_15px_rgba(250,204,21,0.15)]">
          <Palette className="w-3.5 h-3.5 text-yellow-400" />
          <span>Step 3.5 — Template Customization Studio</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Fine-Tune Your UI Colors, Background & Components
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Tailor every visual detail for <strong className="text-white">{currentTemplate.name}</strong>. Upload your brand background image, pick custom primary/accent hex colors, tweak copywriting, and modify vertical component order. Watch the <strong className="text-yellow-400">Live Preview Sandbox</strong> update in real time!
        </p>
      </div>

      {/* Main Studio Card Container */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 neu-surface border border-white/15 shadow-2xl relative overflow-hidden">
        
        {/* Studio Navigation Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/10 pb-6 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('colors')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'colors'
                  ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.35)]'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-white/5'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>1. Palette & Colors</span>
            </button>

            <button
              onClick={() => setActiveTab('background')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'background'
                  ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.35)]'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-white/5'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>2. Background & Image</span>
            </button>

            <button
              onClick={() => setActiveTab('copy')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'copy'
                  ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.35)]'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-white/5'
              }`}
            >
              <Type className="w-4 h-4" />
              <span>3. Branding & Copy</span>
            </button>

            <button
              onClick={() => setActiveTab('components')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'components'
                  ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.35)]'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>4. Components & Layout Flow</span>
            </button>
          </div>

          <button
            onClick={onResetToTemplateDefaults}
            className="neu-btn px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            title="Reset customizations to template defaults"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>
        </div>

        {/* 2-Column Layout: Controls (Left 5 cols) & Real-Time Live Sandbox (Right 7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* TAB 1: PALETTE & COLORS */}
            {activeTab === 'colors' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Theme Mode Selector (Dark vs Light) */}
                <div className="p-5 rounded-2xl bg-[#12151e] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-white uppercase tracking-wider block">App Theme Mode</label>
                      <span className="text-[11px] text-slate-400">Choose default dark or light atmosphere for your web app</span>
                    </div>
                    <div className="flex items-center p-1 rounded-xl bg-black/40 border border-white/10 gap-1">
                      <button
                        type="button"
                        onClick={() => handleToggleThemeMode('dark')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                          (customization.themeMode || 'dark') === 'dark'
                            ? 'bg-yellow-400 text-black shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Moon className="w-3.5 h-3.5" />
                        <span>Dark Theme</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleThemeMode('light')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                          customization.themeMode === 'light'
                            ? 'bg-yellow-400 text-black shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Sun className="w-3.5 h-3.5" />
                        <span>Light Theme</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Primary Accent Color */}
                <div className="p-5 rounded-2xl bg-[#12151e] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-white uppercase tracking-wider block">Primary Brand Accent</label>
                      <span className="text-[11px] text-slate-400">Buttons, highlights & active widget states</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => updateField('primaryColor', e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-white/20 bg-transparent"
                      />
                      <span className="text-xs font-mono font-bold text-yellow-400">{primaryColor}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block mb-2">Curated Brand Palettes</span>
                    <div className="grid grid-cols-4 gap-2">
                      {COLOR_PRESETS.map((p) => (
                        <button
                          key={p.name}
                          onClick={() => updateField('primaryColor', p.hex)}
                          className={`p-2 rounded-xl text-left border transition-all text-xs flex items-center gap-2 ${
                            primaryColor.toLowerCase() === p.hex.toLowerCase()
                              ? 'border-yellow-400 bg-white/10'
                              : 'border-white/5 bg-[#090b10] hover:border-white/20'
                          }`}
                        >
                          <span className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: p.hex }} />
                          <span className="text-[10px] truncate text-slate-300 font-medium">{p.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Secondary Complement Color */}
                <div className="p-5 rounded-2xl bg-[#12151e] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-white uppercase tracking-wider block">Secondary Glow Accent</label>
                      <span className="text-[11px] text-slate-400">Gradients, metrics & secondary badges</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => updateField('secondaryColor', e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-white/20 bg-transparent"
                      />
                      <span className="text-xs font-mono font-bold text-sky-400">{secondaryColor}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {COLOR_PRESETS.map((p) => (
                      <button
                        key={p.name}
                        onClick={() => updateField('secondaryColor', p.hex)}
                        className={`p-2 rounded-xl text-left border transition-all text-xs flex items-center gap-2 ${
                          secondaryColor.toLowerCase() === p.hex.toLowerCase()
                            ? 'border-sky-400 bg-white/10'
                            : 'border-white/5 bg-[#090b10] hover:border-white/20'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: p.hex }} />
                        <span className="text-[10px] truncate text-slate-300 font-medium">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Surface Background Color */}
                <div className="p-5 rounded-2xl bg-[#12151e] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-white uppercase tracking-wider block">Surface Tone (Dark Base)</label>
                      <span className="text-[11px] text-slate-400">Card backgrounds & canvas depth</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={surfaceColor}
                        onChange={(e) => updateField('surfaceColor', e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-white/20 bg-transparent"
                      />
                      <span className="text-xs font-mono font-bold text-slate-300">{surfaceColor}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {SURFACE_PRESETS.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => updateField('surfaceColor', s.hex)}
                        className={`p-2.5 rounded-xl text-left border transition-all text-xs flex items-center gap-2.5 ${
                          surfaceColor.toLowerCase() === s.hex.toLowerCase()
                            ? 'border-yellow-400 bg-white/10'
                            : 'border-white/5 bg-[#090b10] hover:border-white/20'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-md shrink-0 border border-white/20" style={{ backgroundColor: s.hex }} />
                        <span className="text-xs text-white font-medium">{s.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: BACKGROUND & IMAGE */}
            {activeTab === 'background' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-5 rounded-2xl bg-[#12151e] border border-white/10 space-y-3">
                  <label className="text-xs font-bold text-white uppercase tracking-wider block">
                    Atmospheric Canvas Texture
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {BG_STYLE_OPTIONS.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => updateField('bgStyle', opt.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          bgStyle === opt.id
                            ? 'bg-yellow-400/10 border-yellow-400 text-white shadow-md'
                            : 'bg-[#090b10] border-white/5 text-slate-400 hover:border-white/20'
                        }`}
                      >
                        <div className="text-xs font-bold text-white mb-0.5">{opt.label}</div>
                        <div className="text-[10px] text-slate-400 leading-tight">{opt.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upload Background Image Option */}
                <div className="p-5 rounded-2xl bg-[#12151e] border border-yellow-400/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Upload className="w-4 h-4 text-yellow-400" />
                      <label className="text-xs font-bold text-white uppercase tracking-wider">Custom Background Image</label>
                    </div>
                    {bgImageData && (
                      <button
                        onClick={handleRemoveImage}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                        title="Remove custom image"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Upload your high-res desktop wallpaper or brand artwork. It layers behind the layout with real-time opacity controls.
                  </p>

                  {/* File Upload Box */}
                  <label className="p-4 rounded-xl border-2 border-dashed border-white/20 hover:border-yellow-400 cursor-pointer flex flex-col items-center justify-center text-center bg-[#090c13] transition-colors group">
                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-yellow-400 mb-2 transition-colors" />
                    <span className="text-xs font-bold text-slate-200 group-hover:text-white">
                      {customization.bgImageName ? `Selected: ${customization.bgImageName}` : 'Click to Browse & Upload Image File'}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1">Supports PNG, JPG, WebP, SVG (up to 5MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>

                  {imageUploadError && (
                    <div className="text-xs text-red-400 font-mono">⚠ {imageUploadError}</div>
                  )}

                  {/* Or Image URL */}
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Or Paste Background Image URL</label>
                    <input
                      type="url"
                      value={customization.bgImageUrl || ''}
                      onChange={(e) => {
                        onUpdateCustomization({
                          ...customization,
                          bgStyle: 'image',
                          bgImageUrl: e.target.value
                        });
                      }}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-3 py-2 rounded-xl bg-[#090b10] border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-yellow-400 font-mono"
                    />
                  </div>

                  {/* Overlay Controls */}
                  {bgStyle === 'image' && bgImageData && (
                    <div className="space-y-3 pt-3 border-t border-white/10">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Dark Overlay Opacity:</span>
                          <span className="font-bold text-yellow-400">{overlayOpacity}%</span>
                        </div>
                        <input
                          type="range"
                          min="20"
                          max="95"
                          value={overlayOpacity}
                          onChange={(e) => updateField('bgOverlayOpacity', Number(e.target.value))}
                          className="w-full accent-yellow-400 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Backdrop Blur Filter:</span>
                          <span className="font-bold text-sky-400">{blurAmount}px</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          value={blurAmount}
                          onChange={(e) => updateField('bgBlurAmount', Number(e.target.value))}
                          className="w-full accent-sky-400 cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: BRANDING & COPY */}
            {activeTab === 'copy' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-5 rounded-2xl bg-[#12151e] border border-white/10 space-y-3">
                  <div>
                    <label className="text-xs font-bold text-white uppercase tracking-wider block mb-1">App Brand Name</label>
                    <input
                      type="text"
                      value={customization.brandName || ''}
                      onChange={(e) => updateField('brandName', e.target.value)}
                      placeholder={currentTemplate.name}
                      className="w-full px-3 py-2 rounded-xl bg-[#090b10] border border-white/10 text-xs text-white focus:outline-none focus:ring-1 focus:ring-yellow-400 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-white uppercase tracking-wider block mb-1">Hero Main Heading</label>
                    <textarea
                      value={customization.heroHeading || ''}
                      onChange={(e) => updateField('heroHeading', e.target.value)}
                      placeholder={currentTemplate.demo?.heroHeading}
                      rows={2}
                      className="w-full p-3 rounded-xl bg-[#090b10] border border-white/10 text-xs text-white focus:outline-none focus:ring-1 focus:ring-yellow-400 resize-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-white uppercase tracking-wider block mb-1">Hero Subtitle & Paragraph</label>
                    <textarea
                      value={customization.heroSubheading || ''}
                      onChange={(e) => updateField('heroSubheading', e.target.value)}
                      placeholder={currentTemplate.demo?.heroSubheading}
                      rows={3}
                      className="w-full p-3 rounded-xl bg-[#090b10] border border-white/10 text-xs text-white focus:outline-none focus:ring-1 focus:ring-yellow-400 resize-none text-slate-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Primary CTA Button</label>
                      <input
                        type="text"
                        value={customization.primaryAction || ''}
                        onChange={(e) => updateField('primaryAction', e.target.value)}
                        placeholder={currentTemplate.demo?.primaryAction || 'Get Started'}
                        className="w-full px-3 py-1.5 rounded-xl bg-[#090b10] border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Secondary Button</label>
                      <input
                        type="text"
                        value={customization.secondaryAction || ''}
                        onChange={(e) => updateField('secondaryAction', e.target.value)}
                        placeholder={currentTemplate.demo?.secondaryAction || 'Learn More'}
                        className="w-full px-3 py-1.5 rounded-xl bg-[#090b10] border border-white/10 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-3">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">CTA Banner Headline</label>
                      <input
                        type="text"
                        value={customization.ctaHeadline || ''}
                        onChange={(e) => updateField('ctaHeadline', e.target.value)}
                        placeholder="Ready to scale your next digital product?"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#090b10] border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">CTA Banner Paragraph</label>
                      <input
                        type="text"
                        value={customization.ctaSubheading || ''}
                        onChange={(e) => updateField('ctaSubheading', e.target.value)}
                        placeholder="Launch in minutes with production-grade modular components."
                        className="w-full px-3 py-1.5 rounded-xl bg-[#090b10] border border-white/10 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: COMPONENT REORDERING & TOGGLES (SCROLL PREFERENCE IN CARD) */}
            {activeTab === 'components' && (
              <div className="p-5 rounded-2xl bg-[#12151e] border border-white/10 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-white uppercase tracking-wider block">
                      Active Modular Sections & Layout Flow
                    </label>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Toggle components on/off and use the ↑ ↓ controls to adjust vertical location on the page.
                    </p>
                  </div>
                  <button
                    onClick={handleResetOrder}
                    className="text-[10px] font-mono text-yellow-400 hover:text-yellow-300 px-2 py-1 rounded bg-white/5 border border-white/10 flex items-center gap-1 transition-colors shrink-0"
                    title="Restore default component order"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Order</span>
                  </button>
                </div>

                {/* Scrollable component container with scroll preference */}
                <div className="max-h-[460px] overflow-y-auto pr-2 space-y-2.5 custom-scrollbar">
                  {componentOrder.map((key, index) => {
                    const compMeta = AVAILABLE_COMPONENTS.find(c => c.id === key) || {
                      id: key,
                      name: key,
                      desc: 'Modular application block',
                      badge: 'Module',
                      canReorder: true
                    };
                    const isEnabled = !!components[key];
                    const isFirst = index === 0;
                    const isLast = index === componentOrder.length - 1;
                    const canReorder = compMeta.canReorder !== false;

                    return (
                      <div
                        key={key}
                        className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                          isEnabled
                            ? 'bg-[#181d2a] border-yellow-400/40 text-white shadow-sm'
                            : 'bg-[#090b10] border-white/5 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {/* Position Index & Details */}
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center font-mono text-[10px] font-bold text-yellow-400 shrink-0">
                            #{index + 1}
                          </span>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold text-white truncate">{compMeta.name}</span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-400">
                                {compMeta.badge}
                              </span>
                              {isEnabled && (
                                <span className="text-[9px] font-bold text-emerald-400 font-mono">
                                  ✓ ACTIVE
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400 truncate mt-0.5">{compMeta.desc}</p>
                          </div>
                        </div>

                        {/* Action Controls: Move Up, Move Down, Toggle Switch */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {canReorder && (
                            <div className="flex items-center gap-1 mr-1">
                              <button
                                type="button"
                                disabled={isFirst}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveComponent(index, 'up');
                                }}
                                title="Move section up"
                                className={`p-1.5 rounded-lg border transition-all ${
                                  isFirst
                                    ? 'opacity-30 border-white/5 cursor-not-allowed text-slate-600'
                                    : 'border-white/10 text-slate-300 hover:text-white hover:bg-white/10 active:scale-95'
                                }`}
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                disabled={isLast}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveComponent(index, 'down');
                                }}
                                title="Move section down"
                                className={`p-1.5 rounded-lg border transition-all ${
                                  isLast
                                    ? 'opacity-30 border-white/5 cursor-not-allowed text-slate-600'
                                    : 'border-white/10 text-slate-300 hover:text-white hover:bg-white/10 active:scale-95'
                                }`}
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}

                          {/* Edit Component Button */}
                          <button
                            type="button"
                            onClick={() => {
                              setEditingComponent(key);
                              setRightViewTab('editor');
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all ${
                              editingComponent === key && rightViewTab === 'editor'
                                ? 'bg-yellow-400 text-black shadow-md'
                                : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/20'
                            }`}
                            title={`Edit ${compMeta.name} content & options`}
                          >
                            <Pencil className="w-3 h-3 text-yellow-400" />
                            <span>Edit</span>
                          </button>

                          {/* Enable/Disable Toggle button */}
                          <button
                            type="button"
                            onClick={() => toggleComponent(key)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              isEnabled
                                ? 'bg-yellow-400 text-black hover:bg-yellow-300 shadow-md'
                                : 'bg-white/10 text-slate-400 hover:bg-white/20'
                            }`}
                          >
                            {isEnabled ? 'Enabled' : 'Disabled'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Real-Time Live Sandbox Preview or Component Edit Card (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Right Column Header / Tab Switcher */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0e1015] border border-white/10 shadow-inner">
                <button
                  type="button"
                  onClick={() => setRightViewTab('sandbox')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                    rightViewTab === 'sandbox'
                      ? 'bg-yellow-400 text-black shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Sandbox Preview</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRightViewTab('editor')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                    rightViewTab === 'editor'
                      ? 'bg-yellow-400 text-black shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Pencil className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Component Editor: {getComponentName(editingComponent)}</span>
                </button>
              </div>

              <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                {rightViewTab === 'sandbox' ? '● Real-Time Sandbox' : '✎ Active Component Editor'}
              </span>
            </div>

            {/* TAB VIEW 1: COMPONENT EDITOR CARD */}
            {rightViewTab === 'editor' && (
              <div className="rounded-3xl border border-white/15 bg-[#141824] p-6 sm:p-7 shadow-2xl relative space-y-5 animate-fadeIn min-h-[560px] flex flex-col justify-between">
                <div>
                  {/* Component Edit Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center text-yellow-400 shadow-sm">
                        {getComponentIcon(editingComponent)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-black text-white">{getComponentName(editingComponent)}</h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                            {getComponentBadge(editingComponent)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Modify content, text, numbers and interactive props in real time.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setRightViewTab('sandbox')}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-yellow-400" />
                      <span>Switch to Sandbox</span>
                    </button>
                  </div>

                  {/* Quick Component Switcher Strip */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-5 custom-scrollbar text-xs border-b border-white/5">
                    <span className="text-[10px] font-mono text-slate-500 uppercase mr-1 shrink-0">Switch Component:</span>
                    {componentOrder.map((key) => {
                      const isActive = editingComponent === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setEditingComponent(key)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all border shrink-0 ${
                            isActive
                              ? 'bg-yellow-400 text-black border-yellow-400 shadow-sm'
                              : 'bg-black/30 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {getComponentName(key)}
                        </button>
                      );
                    })}
                  </div>

                  {/* Component Fields Form */}
                  <div className="space-y-4">
                    {renderComponentEditorFields()}
                  </div>
                </div>

                {/* Card Footer Controls */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-3 text-xs mt-6">
                  <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Edits are automatically synced with Live Sandbox & Export ZIP</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setRightViewTab('sandbox')}
                    className="neu-yellow-btn px-4 py-2 rounded-xl text-xs font-bold text-black flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View in Live Sandbox →</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB VIEW 2: Embedded Live Preview Mockup Frame */}
            {rightViewTab === 'sandbox' && (
              <div 
                className={`live-customization-content rounded-3xl border border-white/15 overflow-hidden shadow-2xl relative transition-all duration-300 ${
                  surfaceColor === '#F8FAFC' || surfaceColor === '#FFFFFF' ? 'light-surface' : ''
                }`}
                style={{
                  backgroundColor: surfaceColor,
                  minHeight: '560px'
                }}
              >
                {/* Background Layer: Mesh, Grid, or Custom Image */}
                {bgStyle === 'image' && bgImageData ? (
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-300 pointer-events-none"
                    style={{ 
                      backgroundImage: `url(${bgImageData})`,
                      filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none'
                    }}
                  />
                ) : bgStyle === 'grid' ? (
                  <div 
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(${primaryColor} 1px, transparent 1px)`,
                      backgroundSize: '24px 24px'
                    }}
                  />
                ) : bgStyle === 'mesh' ? (
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${primaryColor}25, transparent 65%), radial-gradient(circle at 100% 100%, ${secondaryColor}20, transparent 50%)`
                    }}
                  />
                ) : null}

                {/* Dark Contrast Overlay for Text Readability when Image is active */}
                {bgStyle === 'image' && bgImageData && (
                  <div 
                    className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                    style={{ backgroundColor: `rgba(10, 12, 18, ${overlayOpacity / 100})` }}
                  />
                )}

                {/* Inner Mockup Browser Chrome */}
                <div className="relative z-10">
                  <div className="px-4 py-3 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 text-white/80 truncate">
                        {customization.brandName || currentTemplate.name}.dev
                      </span>
                    </div>
                    <span className="text-[10px] text-yellow-400 font-bold">Preview Live</span>
                  </div>

                  {/* Content Stream ordered exactly as the user specified in componentOrder */}
                  <div className="p-6 sm:p-8 space-y-8">
                    {componentOrder.map((key) => renderSandboxComponent(key))}
                  </div>
                </div>
              </div>
            )}

            {/* Customization Status Banner */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>All color, background, copy & custom section order are bundled into the project archive!</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
