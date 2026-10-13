import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  Monitor, 
  Tablet, 
  Smartphone, 
  ExternalLink, 
  ArrowRight, 
  Layers, 
  Zap, 
  Star,
  ShieldCheck,
  CreditCard,
  Code,
  ShoppingCart,
  Send,
  Sliders,
  DollarSign,
  TrendingUp,
  Cpu,
  RefreshCw,
  Copy,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Minus,
  Plus,
  Play,
  RotateCcw
} from 'lucide-react';

export default function TemplatePreviewModal({ template, isOpen, onClose, onSelect, isSelected }) {
  const [viewport, setViewport] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  
  // Interactive widget states for each template type:
  // SaaS Calculator
  const [teamSize, setTeamSize] = useState(25);
  const [serversCount, setServersCount] = useState(12);
  const [pricingCycle, setPricingCycle] = useState('annual'); // 'monthly' | 'annual'

  // E-Commerce Cart
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductColors, setSelectedProductColors] = useState({});

  // AI Prompt Studio
  const [selectedAiModel, setSelectedAiModel] = useState('nemotron-ultra');
  const [promptInput, setPromptInput] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [aiOutput, setAiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Fintech Banking
  const [showCvv, setShowCvv] = useState(false);
  const [isCardFrozen, setIsCardFrozen] = useState(false);
  const [transferAmount, setTransferAmount] = useState('250.00');
  const [transferRecipient, setTransferRecipient] = useState('Stripe Payout Ops');
  const [accountBalance, setAccountBalance] = useState(124580.40);
  const [transferSuccessMsg, setTransferSuccessMsg] = useState('');

  // Agency Estimator
  const [selectedServices, setSelectedServices] = useState(['End-to-End Product Design']);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('All Works');

  // Developer Terminal
  const [activeCodeLang, setActiveCodeLang] = useState('cURL');
  const [copiedCode, setCopiedCode] = useState(false);
  const [apiEndpointPath, setApiEndpointPath] = useState('/api/v1/publish');
  const [apiMethod, setApiMethod] = useState('POST');
  const [apiResponseBody, setApiResponseBody] = useState(null);
  const [isApiTesting, setIsApiTesting] = useState(false);

  useEffect(() => {
    if (template) {
      if (template.id === 'saas-nova') {
        setTeamSize(template.demo?.calculator?.defaultTeamSize || 25);
        setServersCount(template.demo?.calculator?.defaultServers || 12);
      } else if (template.id === 'ecommerce-aura' && template.demo?.products) {
        setCartItems([
          { ...template.demo.products[0], quantity: 1, selectedColor: template.demo.products[0].colors?.[0] || '#1E293B' }
        ]);
      } else if (template.id === 'ai-nexus' && template.demo?.samplePrompts) {
        setPromptInput(template.demo.samplePrompts[0]);
        setAiOutput(template.demo.simulatedOutputs?.[template.demo.samplePrompts[0]] || '');
      } else if (template.id === 'fintech-krypton') {
        setAccountBalance(template.demo?.initialBalance || 124580.40);
      }
    }
  }, [template]);

  if (!isOpen || !template) return null;

  const demo = template.demo || {};
  const accent = template.accentColor || '#FACC15';

  // SaaS Savings Calculation
  const estimatedSavings = Math.round((teamSize * 45) + (serversCount * 85));

  // E-Commerce Cart helpers
  const handleAddToCart = (product) => {
    const chosenColor = selectedProductColors[product.id] || product.colors?.[0] || '#000';
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedColor === chosenColor);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selectedColor: chosenColor }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (idx, delta) => {
    setCartItems(prev => {
      const copy = [...prev];
      const item = copy[idx];
      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        copy.splice(idx, 1);
      } else {
        copy[idx] = { ...item, quantity: newQty };
      }
      return copy;
    });
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // AI Prompt Runner
  const handleRunAiPrompt = () => {
    setIsGenerating(true);
    setAiOutput('');
    const fullText = demo.simulatedOutputs?.[promptInput] || 
      `✓ Parsed prompt tokens\n✓ Applied hyperparameter temperature=${temperature}\n✓ Generated specialized architecture configuration\n✓ Ready to scaffold components with 0 latency`;
    
    let current = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        current += fullText[i];
        setAiOutput(current);
        i++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 15);
  };

  // Fintech Money Transfer
  const handleSendMoney = (e) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);
    if (!amount || amount <= 0 || amount > accountBalance) {
      alert('Please enter a valid amount within current balance.');
      return;
    }
    setAccountBalance(prev => prev - amount);
    setTransferSuccessMsg(`Successfully sent $${amount.toFixed(2)} to ${transferRecipient}!`);
    setTimeout(() => setTransferSuccessMsg(''), 4000);
  };

  // Agency Estimator
  const toggleAgencyService = (srv) => {
    setSelectedServices(prev => 
      prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]
    );
  };
  const estimatedAgencyTotal = selectedServices.reduce((sum, srvName) => {
    const match = demo.estimatorServices?.find(s => s.name === srvName);
    return sum + (match?.base || 10000);
  }, 0);

  // Developer API Sandbox
  const handleTestApi = () => {
    setIsApiTesting(true);
    setApiResponseBody(null);
    setTimeout(() => {
      setApiResponseBody({
        status: 200,
        ok: true,
        endpoint: apiEndpointPath,
        method: apiMethod,
        latency: '24ms',
        headers: {
          'content-type': 'application/json',
          'x-nesta-cluster': 'us-east-edge-04',
          'x-ratelimit-remaining': '9,985'
        },
        payload: {
          event_id: 'evt_9a4f21',
          channel: 'orders.live',
          delivery_status: 'ACK_CONFIRMED',
          subscribers_notified: 142
        }
      });
      setIsApiTesting(false);
    }, 600);
  };

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl animate-fadeIn font-['Plus_Jakarta_Sans',sans-serif]"
      onClick={onClose}
    >
      <div 
        className="glass-card rounded-3xl w-full max-w-6xl h-[94vh] flex flex-col neu-surface border border-white/15 overflow-hidden shadow-2xl animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Chrome / Navigation Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-4 bg-[#14161f]">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-black shadow-lg"
              style={{ backgroundColor: accent }}
            >
              {template.name.substring(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">{template.name}</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-yellow-300 border border-white/10">
                  {template.category}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Interactive Live Mode
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">{template.tagline}</p>
            </div>
          </div>

          {/* Viewport controls */}
          <div className="hidden md:flex items-center gap-1 p-1 bg-[#0e1014] rounded-xl border border-white/10">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewport === 'desktop' ? 'bg-[#222631] text-yellow-400 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewport === 'tablet' ? 'bg-[#222631] text-yellow-400 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewport === 'mobile' ? 'bg-[#222631] text-yellow-400 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onSelect(template);
                onClose();
              }}
              className="neu-yellow-btn px-4 sm:px-6 py-2 rounded-xl text-xs font-bold text-black flex items-center gap-2 shadow-lg"
            >
              {isSelected ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Currently Selected</span>
                </>
              ) : (
                <>
                  <span>Select Template</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl neu-btn text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Interactive Preview Canvas */}
        <div className="flex-1 overflow-y-auto bg-[#0a0c10] p-4 sm:p-6 flex justify-center items-start">
          <div 
            className={`transition-all duration-300 w-full bg-[#11131a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col ${
              viewport === 'desktop' ? 'max-w-5xl' : viewport === 'tablet' ? 'max-w-2xl' : 'max-w-sm'
            }`}
          >
            {/* Mock Browser Header */}
            <div className="px-4 py-3 bg-[#181a24] border-b border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[11px] text-slate-400 truncate">https://preview.{template.id}.nesta.app</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Interact with all components below
              </span>
            </div>

            {/* Template-Specific Render */}
            <div className="p-6 sm:p-10 space-y-12 bg-gradient-to-b from-[#11131a] via-[#141722] to-[#0f1118]">
              
              {/* Top Banner Navigation inside template */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs text-black" style={{ backgroundColor: accent }}>
                    {template.name.substring(0, 1)}
                  </div>
                  <span className="font-bold text-sm tracking-tight text-white">{template.name}</span>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-xs text-slate-300">
                  <span className="hover:text-white cursor-pointer transition-colors">Overview</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Components</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Analytics</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  {template.id === 'ecommerce-aura' && (
                    <button 
                      onClick={() => setIsCartOpen(!isCartOpen)}
                      className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs flex items-center gap-1.5"
                    >
                      <ShoppingCart className="w-4 h-4 text-sky-400" />
                      <span className="px-1.5 py-0.5 rounded-full bg-sky-400 text-black font-extrabold text-[10px]">
                        {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
                      </span>
                    </button>
                  )}
                  <button 
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-black shadow-md hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: accent }}
                  >
                    {demo.primaryAction || 'Get Started'}
                  </button>
                </div>
              </div>

              {/* HERO SECTION */}
              <div className="text-center max-w-2xl mx-auto space-y-5 pt-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs" style={{ color: accent }}>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{template.badge || 'Curated Architecture'}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {demo.heroHeading || 'The Next Generation Web Experience'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
                  {demo.heroSubheading || 'Crafted with modular design tokens, full responsiveness, and fast interactions.'}
                </p>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button 
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-black flex items-center gap-1.5 shadow-lg hover:scale-105 transition-all"
                    style={{ backgroundColor: accent }}
                  >
                    <span>{demo.primaryAction || 'Explore Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10">
                    {demo.secondaryAction || 'Learn More'}
                  </button>
                </div>
              </div>

              {/* ========================================================= */}
              {/* TEMPLATE 1: SAAS NOVA INTERACTIVE CALCULATOR & PRICING    */}
              {/* ========================================================= */}
              {template.id === 'saas-nova' && (
                <div className="space-y-8 animate-fadeIn">
                  {/* Interactive ROI Calculator Widget */}
                  <div className="p-6 rounded-2xl bg-[#151926] border border-yellow-400/30 shadow-xl space-y-5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-yellow-400" />
                        <h3 className="text-sm font-bold text-white">{demo.calculator?.title || 'Interactive Cloud ROI Calculator'}</h3>
                      </div>
                      <span className="text-[11px] font-mono text-yellow-300 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                        Live Slider Calculations
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      {/* Sliders */}
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                            <span>Engineering Team Size:</span>
                            <span className="font-bold text-yellow-400">{teamSize} Engineers</span>
                          </div>
                          <input 
                            type="range" 
                            min="2" 
                            max="150" 
                            value={teamSize} 
                            onChange={(e) => setTeamSize(Number(e.target.value))}
                            className="w-full accent-yellow-400 cursor-pointer"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                            <span>Cloud Microservices / Servers:</span>
                            <span className="font-bold text-sky-400">{serversCount} Instances</span>
                          </div>
                          <input 
                            type="range" 
                            min="1" 
                            max="80" 
                            value={serversCount} 
                            onChange={(e) => setServersCount(Number(e.target.value))}
                            className="w-full accent-sky-400 cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Result Box */}
                      <div className="p-4 rounded-xl bg-[#0e111a] border border-white/10 flex flex-col justify-center items-center text-center">
                        <span className="text-xs text-slate-400">Estimated Annual Cloud Reduction</span>
                        <div className="text-3xl font-black text-emerald-400 my-1">
                          ${(estimatedSavings * 12).toLocaleString()} / yr
                        </div>
                        <span className="text-[11px] text-slate-400">
                          (~${estimatedSavings.toLocaleString()} saved every single month)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Telemetry Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {demo.metrics?.map((m, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center hover:border-yellow-400/40 transition-colors">
                        <div className="text-lg sm:text-2xl font-black text-white">{m.value}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{m.label}</div>
                        <span className="text-[10px] text-emerald-400 font-mono block mt-1">{m.change}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Pricing Table with Annual Switcher */}
                  <div className="p-6 rounded-2xl bg-[#141724] border border-white/10 space-y-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <h3 className="text-sm font-bold text-white">Tiered Infrastructure Pricing</h3>
                        <p className="text-xs text-slate-400">Select annual billing to save 20% on all plans.</p>
                      </div>
                      <div className="flex items-center gap-2 p-1 bg-[#0d0f17] rounded-xl border border-white/10 text-xs">
                        <button 
                          onClick={() => setPricingCycle('monthly')}
                          className={`px-3 py-1 rounded-lg font-semibold transition-all ${pricingCycle === 'monthly' ? 'bg-white/10 text-white' : 'text-slate-400'}`}
                        >
                          Monthly
                        </button>
                        <button 
                          onClick={() => setPricingCycle('annual')}
                          className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all ${pricingCycle === 'annual' ? 'bg-yellow-400 text-black font-bold' : 'text-slate-400'}`}
                        >
                          <span>Annual</span>
                          <span className="text-[9px] bg-black/20 text-black px-1 rounded font-extrabold">-20%</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {demo.pricingTiers?.map((tier, idx) => {
                        const price = pricingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;
                        return (
                          <div 
                            key={idx}
                            className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                              tier.highlight 
                                ? 'bg-yellow-400/10 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.2)]' 
                                : 'bg-white/5 border-white/10 hover:border-white/20'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-white">{tier.name}</span>
                                {tier.highlight && (
                                  <span className="text-[9px] bg-yellow-400 text-black font-extrabold px-2 py-0.5 rounded">
                                    RECOMMENDED
                                  </span>
                                )}
                              </div>
                              <div className="flex items-baseline gap-1 my-3">
                                <span className="text-2xl font-black text-white">${price}</span>
                                <span className="text-xs text-slate-400">/ month</span>
                              </div>
                              <p className="text-[11px] text-slate-400 mb-4">{tier.desc}</p>
                              <div className="space-y-1.5 border-t border-white/10 pt-3 mb-4 text-xs text-slate-300">
                                {tier.features?.map((f, i) => (
                                  <div key={i} className="flex items-center gap-2 text-[11px]">
                                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                                    <span>{f}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <button 
                              className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                                tier.highlight ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-white/10 text-white hover:bg-white/20'
                              }`}
                            >
                              Choose {tier.name}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* TEMPLATE 2: E-COMMERCE AURA WITH LIVE CART & VARIANTS     */}
              {/* ========================================================= */}
              {template.id === 'ecommerce-aura' && (
                <div className="space-y-6 animate-fadeIn relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">Curated Luxury Hardware</h3>
                      <p className="text-xs text-slate-400">Select product color swatches and add directly to your cart.</p>
                    </div>
                    <button 
                      onClick={() => setIsCartOpen(true)}
                      className="px-3.5 py-1.5 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-bold flex items-center gap-2 hover:bg-sky-500/30"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Open Cart ({cartItems.length})</span>
                    </button>
                  </div>

                  {/* Product Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {demo.products?.map((p) => {
                      const activeColor = selectedProductColors[p.id] || p.colors?.[0] || '#1E293B';
                      return (
                        <div key={p.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-sky-400/40 transition-colors">
                          <div>
                            <div 
                              className="h-32 rounded-xl flex items-center justify-center text-xs font-semibold mb-3 transition-colors relative"
                              style={{ backgroundColor: activeColor + '30', border: `1px solid ${activeColor}` }}
                            >
                              <span className="text-white drop-shadow">Hardware Device #{p.id}</span>
                              <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded bg-black/60 text-sky-300 font-mono">
                                {p.tag}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-slate-400 text-[10px] uppercase font-mono">{p.category}</span>
                              <div className="flex items-center gap-1 text-amber-400 text-[11px]">
                                <Star className="w-3 h-3 fill-amber-400" />
                                <span>{p.rating}</span>
                              </div>
                            </div>
                            <h4 className="text-xs font-bold text-white truncate">{p.name}</h4>
                            <p className="text-[11px] text-slate-400 my-1 line-clamp-2">{p.desc}</p>
                            
                            {/* Color Swatches */}
                            <div className="flex items-center gap-1.5 my-2">
                              {p.colors?.map((c, i) => (
                                <button
                                  key={i}
                                  onClick={() => setSelectedProductColors(prev => ({ ...prev, [p.id]: c }))}
                                  className={`w-4 h-4 rounded-full border transition-all ${activeColor === c ? 'scale-125 border-white ring-2 ring-sky-400' : 'border-white/30'}`}
                                  style={{ backgroundColor: c }}
                                  title={c}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2 mt-2">
                            <span className="text-sm font-black text-white">${p.price}</span>
                            <button 
                              onClick={() => handleAddToCart(p)}
                              className="px-3 py-1.5 rounded-lg bg-sky-400 hover:bg-sky-300 text-black font-bold text-xs flex items-center gap-1 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Slide-Over Shopping Cart Drawer (Interactive) */}
                  {isCartOpen && (
                    <div className="p-5 rounded-2xl bg-[#131824] border border-sky-400/40 shadow-2xl space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4 text-sky-400" />
                          <h4 className="text-sm font-bold text-white">Your Shopping Cart</h4>
                          <span className="text-xs text-slate-400 font-mono">({cartItems.length} items)</span>
                        </div>
                        <button 
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Close ×
                        </button>
                      </div>

                      {cartItems.length === 0 ? (
                        <div className="py-6 text-center text-xs text-slate-400">Your cart is currently empty.</div>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {cartItems.map((item, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: item.selectedColor }} />
                                <div>
                                  <div className="font-bold text-white">{item.name}</div>
                                  <div className="text-[10px] text-slate-400">${item.price} each</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 bg-[#0a0d14] px-2 py-0.5 rounded-lg border border-white/10">
                                  <button onClick={() => updateCartQty(idx, -1)} className="hover:text-sky-400"><Minus className="w-3 h-3" /></button>
                                  <span className="font-mono text-white px-1">{item.quantity}</span>
                                  <button onClick={() => updateCartQty(idx, 1)} className="hover:text-sky-400"><Plus className="w-3 h-3" /></button>
                                </div>
                                <span className="font-bold text-white w-14 text-right">${item.price * item.quantity}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-xs text-slate-400 block">Subtotal</span>
                          <span className="text-lg font-black text-white">${cartSubtotal.toFixed(2)}</span>
                        </div>
                        <button 
                          onClick={() => alert(`Checkout simulator initiated for $${cartSubtotal.toFixed(2)}!`)}
                          className="neu-yellow-btn px-6 py-2 rounded-xl text-xs font-bold text-black"
                          style={{ backgroundColor: accent }}
                        >
                          Checkout Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================= */}
              {/* TEMPLATE 3: AI NEXUS STUDIO WITH LIVE PROMPT RUNNER       */}
              {/* ========================================================= */}
              {template.id === 'ai-nexus' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="p-6 rounded-2xl bg-[#161424] border border-purple-500/30 shadow-xl space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-purple-400" />
                        <h3 className="text-sm font-bold text-white">Live AI Prompt & Token Streaming Sandbox</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <select 
                          value={selectedAiModel} 
                          onChange={(e) => setSelectedAiModel(e.target.value)}
                          className="bg-[#0e0c18] border border-purple-500/30 text-xs text-purple-200 rounded-lg px-2.5 py-1 focus:outline-none"
                        >
                          {demo.models?.map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Preset Prompt Buttons */}
                    <div className="flex flex-wrap gap-2 text-[11px]">
                      <span className="text-slate-400 self-center">Try prompt:</span>
                      {demo.samplePrompts?.map((sp, idx) => (
                        <button
                          key={idx}
                          onClick={() => setPromptInput(sp)}
                          className={`px-2.5 py-1 rounded-lg border text-left truncate max-w-xs transition-colors ${
                            promptInput === sp 
                              ? 'bg-purple-600/30 text-purple-200 border-purple-400' 
                              : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                          }`}
                        >
                          "{sp}"
                        </button>
                      ))}
                    </div>

                    {/* Prompt Textarea */}
                    <div className="relative">
                      <textarea
                        value={promptInput}
                        onChange={(e) => setPromptInput(e.target.value)}
                        placeholder="Type an AI system or user prompt here..."
                        rows={3}
                        className="w-full p-3.5 rounded-xl bg-[#0b0a12] border border-purple-500/20 text-xs font-mono text-purple-100 placeholder-slate-600 focus:outline-none focus:border-purple-400 resize-none"
                      />
                      <div className="absolute right-3 bottom-3 flex items-center gap-2">
                        <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-400 bg-black/40 px-2 py-0.5 rounded font-mono">
                          <span>temp: {temperature}</span>
                        </div>
                        <button
                          onClick={handleRunAiPrompt}
                          disabled={isGenerating || !promptInput.trim()}
                          className="px-4 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
                        >
                          {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-black" />}
                          <span>{isGenerating ? 'Streaming...' : 'Run Inference'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Output Screen */}
                    {aiOutput && (
                      <div className="p-4 rounded-xl bg-[#090810] border border-purple-500/40 font-mono text-xs text-purple-300 space-y-2 animate-fadeIn">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-white/5">
                          <span>Model Execution Output</span>
                          <span className="text-emerald-400">● 100% token verified</span>
                        </div>
                        <pre className="whitespace-pre-wrap leading-relaxed">{aiOutput}</pre>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* TEMPLATE 4: FINTECH KRYPTON WITH CARD & MONEY SENDER      */}
              {/* ========================================================= */}
              {template.id === 'fintech-krypton' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Interactive 3D Holographic Card */}
                    <div className="p-6 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-700 to-slate-900 text-white shadow-2xl space-y-8 relative overflow-hidden border border-emerald-400/40">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs tracking-wider uppercase font-mono">{demo.virtualCard?.network}</span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setIsCardFrozen(!isCardFrozen)} 
                            className={`text-[10px] px-2 py-0.5 rounded font-bold transition-colors ${isCardFrozen ? 'bg-red-500 text-white' : 'bg-black/30 text-emerald-300'}`}
                          >
                            {isCardFrozen ? 'FROZEN' : 'ACTIVE'}
                          </button>
                          <CreditCard className="w-5 h-5 text-emerald-300" />
                        </div>
                      </div>

                      <div>
                        <div className="text-lg font-mono tracking-widest text-emerald-100">
                          {isCardFrozen ? '•••• •••• •••• ••••' : demo.virtualCard?.number}
                        </div>
                        <div className="flex justify-between items-end mt-4 text-xs font-mono">
                          <div>
                            <span className="text-[10px] text-emerald-300/70 block">CARDHOLDER</span>
                            <span className="font-bold">{demo.virtualCard?.holder}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-emerald-300/70 block">EXP / CVV</span>
                            <div className="flex items-center gap-1.5">
                              <span>{demo.virtualCard?.expires}</span>
                              <span>•</span>
                              <span>{showCvv ? demo.virtualCard?.cvv : '•••'}</span>
                              <button onClick={() => setShowCvv(!showCvv)} className="text-emerald-300 hover:text-white">
                                {showCvv ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Instant Send Money Interactive Form */}
                    <form onSubmit={handleSendMoney} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300">Live Available Balance</span>
                        <span className="text-xs text-emerald-400 font-mono">+14.2% YoY</span>
                      </div>
                      <div className="text-2xl font-black text-white">
                        ${accountBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>

                      <div className="space-y-2 pt-2">
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase font-mono">Send Payment To</label>
                          <input 
                            type="text" 
                            value={transferRecipient} 
                            onChange={(e) => setTransferRecipient(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-[#0e1218] border border-white/10 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase font-mono">Transfer Amount ($ USD)</label>
                          <input 
                            type="number" 
                            step="0.01" 
                            value={transferAmount} 
                            onChange={(e) => setTransferAmount(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-[#0e1218] border border-white/10 text-xs text-white"
                          />
                        </div>
                        <button 
                          type="submit" 
                          disabled={isCardFrozen}
                          className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Authorize Instant Wire</span>
                        </button>
                        {transferSuccessMsg && (
                          <div className="text-[11px] text-emerald-400 text-center font-mono py-1 animate-fadeIn">
                            ✓ {transferSuccessMsg}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* TEMPLATE 5: VANGUARD CREATIVE STUDIO PORTFOLIO            */}
              {/* ========================================================= */}
              {template.id === 'portfolio-vanguard' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Category Filter */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-sm font-bold text-white">Curated Editorial Works</h3>
                    <div className="flex gap-1.5">
                      {demo.categories?.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedGalleryCategory(cat)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            selectedGalleryCategory === cat ? 'bg-pink-500 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Case Studies Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {demo.caseStudies?.map(cs => (
                      <div key={cs.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/50 transition-all flex flex-col justify-between">
                        <div>
                          <div className="h-28 rounded-xl bg-[#261422] flex items-center justify-center text-xs text-pink-300 font-mono mb-3">
                            ✦ Case Study #{cs.id}
                          </div>
                          <span className="text-[10px] text-pink-400 font-mono">{cs.category} • {cs.year}</span>
                          <h4 className="text-sm font-bold text-white my-1">{cs.title}</h4>
                          <p className="text-[11px] text-slate-400">{cs.desc}</p>
                        </div>
                        <div className="pt-3 border-t border-white/10 mt-3 flex items-center justify-between text-[11px] text-pink-300">
                          <span>{cs.awards}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Budget Estimator */}
                  <div className="p-6 rounded-2xl bg-[#1d131f] border border-pink-500/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Interactive Scope & Budget Calculator</h4>
                      <span className="text-xs font-black text-pink-400">${estimatedAgencyTotal.toLocaleString()} est.</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {demo.estimatorServices?.map(s => {
                        const isChosen = selectedServices.includes(s.name);
                        return (
                          <button
                            key={s.name}
                            onClick={() => toggleAgencyService(s.name)}
                            className={`p-3 rounded-xl border text-left text-xs transition-all ${
                              isChosen 
                                ? 'bg-pink-500/20 border-pink-500 text-white font-bold' 
                                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                            }`}
                          >
                            <div>{s.name}</div>
                            <div className="text-[10px] text-pink-300 font-mono mt-1">+${s.base.toLocaleString()}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* TEMPLATE 6: DEVPULSE DOCS & TERMINAL SANDBOX              */}
              {/* ========================================================= */}
              {template.id === 'dev-docs-terminal' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Multi-Language Code Switcher */}
                  <div className="p-5 rounded-2xl bg-[#0e0c08] border border-amber-500/30 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex gap-2">
                        {demo.languages?.map(lang => (
                          <button
                            key={lang}
                            onClick={() => setActiveCodeLang(lang)}
                            className={`text-xs px-2.5 py-1 rounded-lg font-mono transition-colors ${
                              activeCodeLang === lang ? 'bg-amber-400 text-black font-bold' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                      <button 
                        onClick={() => handleCopyCode(demo.codeSamples?.[activeCodeLang] || '')}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 flex items-center gap-1"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre className="p-3 text-xs font-mono text-amber-200 overflow-x-auto whitespace-pre leading-relaxed">
                      <code>{demo.codeSamples?.[activeCodeLang] || '// Select a language above'}</code>
                    </pre>
                  </div>

                  {/* Live Interactive API Request Sandbox */}
                  <div className="p-5 rounded-2xl bg-[#14120e] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Live API Request Simulator</h4>
                      <span className="text-[10px] text-amber-400 font-mono">Real-time HTTP ACK</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select 
                        value={apiMethod} 
                        onChange={(e) => setApiMethod(e.target.value)}
                        className="bg-amber-400 text-black font-extrabold text-xs px-2.5 py-2 rounded-xl focus:outline-none"
                      >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                      </select>
                      <input 
                        type="text" 
                        value={apiEndpointPath} 
                        onChange={(e) => setApiEndpointPath(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl bg-[#090806] border border-white/10 text-xs font-mono text-white"
                      />
                      <button
                        onClick={handleTestApi}
                        disabled={isApiTesting}
                        className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                      >
                        {isApiTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-black" />}
                        <span>Send</span>
                      </button>
                    </div>

                    {apiResponseBody && (
                      <div className="p-3.5 rounded-xl bg-[#070604] border border-emerald-500/30 font-mono text-xs text-emerald-400 animate-fadeIn">
                        <div className="flex justify-between text-[10px] text-slate-400 pb-1 mb-2 border-b border-white/5">
                          <span>HTTP {apiResponseBody.status} OK</span>
                          <span>Latency: {apiResponseBody.latency}</span>
                        </div>
                        <pre className="overflow-x-auto text-[11px]">{JSON.stringify(apiResponseBody, null, 2)}</pre>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Template Components Checklist */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Components & Architecture Included in this Template</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {template.componentsIncluded?.map((comp, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#14161f] flex items-center justify-between text-xs text-slate-400">
          <span>Explore or customize any template before exporting your production build.</span>
          <button
            onClick={() => {
              onSelect(template);
              onClose();
            }}
            className="neu-yellow-btn px-5 py-2 rounded-xl text-xs font-bold text-black flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
            style={{ backgroundColor: accent }}
          >
            <span>Use {template.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
