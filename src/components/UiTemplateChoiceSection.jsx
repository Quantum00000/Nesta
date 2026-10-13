import React, { useState } from 'react';
import { UI_TEMPLATES, UI_TEMPLATE_CATEGORIES } from '../data/uiTemplates';
import TemplatePreviewModal from './TemplatePreviewModal';
import { 
  Sparkles, 
  ArrowUpRight, 
  Check, 
  Eye, 
  Layers, 
  Search, 
  SlidersHorizontal, 
  ArrowRight,
  Monitor,
  Palette,
  Cpu,
  ShoppingBag,
  CreditCard,
  Terminal,
  Brush
} from 'lucide-react';

export default function UiTemplateChoiceSection({ options = [], selectedTemplate, onSelectTemplate, onNavigateToCustomize }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const templatesList = options && options.length > 0 ? options : UI_TEMPLATES;

  const filteredTemplates = templatesList.filter((tpl) => {
    const matchesCategory = selectedCategory === 'All' || tpl.category === selectedCategory;
    const matchesSearch = tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tpl.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tpl.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenPreview = (tpl, e) => {
    if (e) e.stopPropagation();
    setPreviewTemplate(tpl);
    setIsPreviewOpen(true);
  };

  const getTemplateIcon = (id) => {
    switch(id) {
      case 'saas-nova': return <Layers className="w-5 h-5" />;
      case 'ecommerce-aura': return <ShoppingBag className="w-5 h-5" />;
      case 'ai-nexus': return <Cpu className="w-5 h-5" />;
      case 'fintech-krypton': return <CreditCard className="w-5 h-5" />;
      case 'portfolio-vanguard': return <Brush className="w-5 h-5" />;
      case 'dev-docs-terminal': return <Terminal className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="templates" className="relative py-16 px-4 sm:px-8 max-w-7xl mx-auto font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Section Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-semibold mb-4 shadow-[0_0_15px_rgba(250,204,21,0.15)]">
          <Layers className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
          <span>Step 3 — Heavy Interactable UI Templates</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Choose a Full-Featured Web Application Template
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Each template is packed with <strong className="text-white">real interactable widgets</strong> (calculators, shopping carts, AI prompt sandboxes, holographic banking cards, and API testers). Click <strong className="text-yellow-400">"Preview Live"</strong> to try the components in real time!
        </p>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 mb-8 neu-surface border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {UI_TEMPLATE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.35)] scale-105'
                  : 'bg-[#14161b] text-slate-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates (e.g. SaaS, E-Com, AI)..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl neu-inset text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-yellow-400 border border-white/5 bg-[#0f1118]"
          />
        </div>

      </div>

      {/* Active Selection Banner */}
      {selectedTemplate && (
        <div className="mb-8 p-5 rounded-3xl bg-gradient-to-r from-yellow-400/15 via-[#1a1e2a] to-yellow-400/5 border-2 border-yellow-400/40 flex items-center justify-between flex-wrap gap-4 shadow-[0_0_30px_rgba(250,204,21,0.15)] animate-fadeIn">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-black shadow-lg text-lg"
              style={{ backgroundColor: selectedTemplate.accentColor || '#FACC15' }}
            >
              {getTemplateIcon(selectedTemplate.id)}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-[11px] text-yellow-400 font-extrabold uppercase tracking-wider font-mono">SELECTED TEMPLATE</span>
                <span className="text-white font-black text-lg">{selectedTemplate.name}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-semibold">{selectedTemplate.category}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  {selectedTemplate.stats?.rating} ★
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {selectedTemplate.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleOpenPreview(selectedTemplate)}
              className="px-4 py-2.5 rounded-xl neu-btn text-xs font-bold text-yellow-400 hover:text-yellow-300 flex items-center gap-2 shadow-md hover:scale-105 transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>Test Interactive Demo</span>
            </button>
            {onNavigateToCustomize && (
              <button
                onClick={onNavigateToCustomize}
                className="neu-yellow-btn px-4 py-2.5 rounded-xl text-xs font-extrabold text-black flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                <Palette className="w-4 h-4" />
                <span>Customize Colors & Layout ↓</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Grid of UI Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const isSelected = selectedTemplate?.id === template.id;
          const accent = template.accentColor || '#FACC15';

          return (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className={`rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between relative group ${
                isSelected
                  ? 'bg-gradient-to-b from-[#222735] to-[#151926] border-2 border-yellow-400 shadow-[0_0_35px_rgba(250,204,21,0.35)] transform -translate-y-1.5'
                  : 'glass-card neu-surface border border-white/10 hover:border-white/30 hover:-translate-y-1 shadow-xl hover:shadow-2xl'
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400 text-black text-[10px] font-black shadow-lg">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>ACTIVE</span>
                </div>
              )}

              <div>
                {/* Header: Icon & Category */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-black shrink-0 shadow-lg transform transition-transform group-hover:scale-110"
                    style={{ backgroundColor: accent }}
                  >
                    {getTemplateIcon(template.id)}
                  </div>
                  <div className="min-w-0 pr-12">
                    <h3 className="text-lg font-black text-white tracking-tight truncate group-hover:text-yellow-400 transition-colors">
                      {template.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400 block font-mono">
                        {template.category}
                      </span>
                      <span className="text-[10px] text-yellow-300 font-bold">
                        • {template.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 mb-4">
                  {template.tagline}
                </p>

                {/* Highlighted Interactivity Pill */}
                <div className="mb-3 p-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Interactable Component:</span>
                  <span className="font-bold text-white capitalize" style={{ color: accent }}>
                    {template.interactivityType ? template.interactivityType.replace('_', ' ') : 'Interactive Widget'}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-1.5 py-3 border-y border-white/5 mb-4 text-xs text-slate-300">
                  {(template.features || []).slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Component Badges Count */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-4">
                  <span>{template.componentsIncluded?.length || 6} Modular Components</span>
                  <span className="text-emerald-400 font-mono font-bold">{template.stats?.conversions} Conversions</span>
                </div>
              </div>

              {/* Bottom Actions: Preview vs Select */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={(e) => handleOpenPreview(template, e)}
                  className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Preview Live</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTemplate(template);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    isSelected
                      ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.5)]'
                      : 'neu-btn text-slate-200 hover:text-white hover:border-yellow-400/40'
                  }`}
                >
                  {isSelected ? 'Selected ✓' : 'Select Template'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Template Detail Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        isOpen={isPreviewOpen}
        isSelected={selectedTemplate?.id === previewTemplate?.id}
        onSelect={(tpl) => onSelectTemplate(tpl)}
        onClose={() => setIsPreviewOpen(false)}
      />

    </section>
  );
}
