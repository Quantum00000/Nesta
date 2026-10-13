import React, { useState } from 'react';
import { 
  FRONTEND_OPTIONS, 
  FRONTEND_CATEGORIES,
  registerCustomFrontend 
} from '../data/frontendOptions';
import FrontendDetailModal from './FrontendDetailModal';
import { 
  CheckCircle2, 
  Search, 
  Layers, 
  SlidersHorizontal, 
  PlusCircle, 
  ArrowUpRight, 
  Check, 
  Sparkles,
  FileCode,
  FolderTree,
  Terminal,
  ExternalLink
} from 'lucide-react';

export default function FrontendChoiceSection({ options = [], selectedFrontend, onSelectFrontend }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalFrontend, setModalFrontend] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  
  // Custom framework form state
  const [customName, setCustomName] = useState('');
  const [customTagline, setCustomTagline] = useState('');
  const [customCategory, setCustomCategory] = useState('Client SPA');

  // Filter options based on category and search
  const filteredOptions = options.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenPreview = (frontend, e) => {
    e.stopPropagation();
    setModalFrontend(frontend);
    setIsModalOpen(true);
  };

  const handleCardClick = (frontend) => {
    setModalFrontend(frontend);
    setIsModalOpen(true);
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const id = customName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newOption = {
      id,
      name: customName,
      version: '1.0.0',
      tagline: customTagline || 'Custom configured frontend engine for Nesta.',
      category: customCategory,
      badge: 'Custom Added',
      accentColor: '#FACC15',
      popularity: 80,
      stats: {
        stars: 'Custom',
        bundleSize: 'Custom',
        buildSpeed: '0.4s',
        seoScore: '95/100',
      },
      renderingMode: `${customCategory} via Custom Pipeline`,
      description: `Custom registered framework option created in Nesta. Pre-wired with Tailwind styling.`,
      keyFeatures: [
        'Custom template configuration',
        'Direct integration with Nesta backend endpoints',
        'Tailwind Neumorphic token compatibility'
      ],
      fileStructure: [
        { name: 'src/', type: 'dir', children: [
          { name: 'App.jsx', type: 'file', desc: 'Custom entry point' }
        ]},
        { name: 'package.json', type: 'file', desc: 'Custom dependencies' }
      ],
      sampleCode: `// Custom template for ${customName}\nexport default function App() {\n  return <div className="glass-card p-6">Custom Engine Loaded</div>;\n}`,
      bestFor: 'Specialized enterprise stacks and in-house component libraries.'
    };

    registerCustomFrontend(newOption);
    onSelectFrontend(newOption);
    setCustomModalOpen(false);
    setCustomName('');
    setCustomTagline('');
  };

  return (
    <section id="frontends" className="relative py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-yellow-400 text-xs font-mono mb-4">
          <Terminal className="w-3.5 h-3.5" />
          Section 03 // Frontend Architecture Matrix
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
          Choose Your Frontend Engine
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Select from our curated ecosystem of frontend engines. Each option delivers idiomatic project scaffolding, full TypeScript support, and pre-wired Nesta styling tokens.
        </p>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 mb-8 neu-surface border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {FRONTEND_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-yellow-400 text-black font-bold shadow-[0_0_15px_rgba(250,204,21,0.4)]'
                  : 'bg-[#14161b] text-slate-400 hover:text-white border border-white/5'
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
            placeholder="Search frameworks..."
            className="w-full pl-9 pr-4 py-2 rounded-xl neu-inset text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-yellow-400 border border-white/5 font-mono"
          />
        </div>

      </div>

      {/* Active Selection Banner (if framework is selected) */}
      {selectedFrontend && (
        <div className="mb-8 p-4 rounded-2xl bg-yellow-400/10 border border-yellow-400/40 flex items-center justify-between flex-wrap gap-4 shadow-[0_0_20px_rgba(250,204,21,0.15)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-bold text-sm">
              ✓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-yellow-400 uppercase tracking-wider font-semibold">Active Selection:</span>
                <span className="text-white font-bold text-sm">{selectedFrontend.name}</span>
                <span className="text-xs font-mono text-slate-400">({selectedFrontend.category})</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Ready for backend API synchronization & edge scaffolding.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setModalFrontend(selectedFrontend);
              setIsModalOpen(true);
            }}
            className="px-3.5 py-1.5 rounded-lg neu-btn text-xs font-mono text-yellow-400 hover:text-yellow-300 flex items-center gap-1.5"
          >
            <span>View Architecture Layout</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Grid of Frontend Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOptions.map((frontend) => {
          const isSelected = selectedFrontend?.id === frontend.id;

          return (
            <div
              key={frontend.id}
              onClick={() => handleCardClick(frontend)}
              className={`rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between relative group ${
                isSelected
                  ? 'bg-[#222735] border-2 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.35)] transform -translate-y-1'
                  : 'glass-card neu-surface border border-white/10 hover:border-yellow-400/40 hover:-translate-y-1 shadow-xl'
              }`}
            >
              {/* Selected Badge Indicator (Top Right) */}
              {isSelected && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400 text-black text-[10px] font-mono font-extrabold shadow-md">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>SELECTED</span>
                </div>
              )}

              <div>
                {/* Header: Icon, Category & Version */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg text-black shrink-0 shadow-lg transform transition-transform group-hover:scale-105"
                    style={{ backgroundColor: frontend.accentColor || '#FACC15' }}
                  >
                    {frontend.name.substring(0, 2)}
                  </div>
                  <div className="min-w-0 pr-12">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white tracking-tight truncate">
                        {frontend.name}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                      {frontend.category}
                    </span>
                  </div>
                </div>

                {/* Badge Tag */}
                <div className="mb-3">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white/5 text-yellow-300 border border-white/10">
                    {frontend.badge}
                  </span>
                </div>

                {/* Tagline Description */}
                <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 mb-4 font-normal">
                  {frontend.tagline}
                </p>

                {/* Quick Performance Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 mb-4 text-center font-mono">
                  <div className="p-1.5 rounded-lg bg-[#14161b]">
                    <span className="text-[9px] text-slate-400 uppercase block">Size</span>
                    <span className="text-xs font-semibold text-white block mt-0.5">{(frontend.stats || {}).bundleSize}</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#14161b]">
                    <span className="text-[9px] text-slate-400 uppercase block">Build</span>
                    <span className="text-xs font-semibold text-yellow-400 block mt-0.5">{(frontend.stats || {}).buildSpeed}</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#14161b]">
                    <span className="text-[9px] text-slate-400 uppercase block">SEO</span>
                    <span className="text-xs font-semibold text-emerald-400 block mt-0.5">{(frontend.stats || {}).seoScore}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions: Preview vs Select */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={(e) => handleOpenPreview(frontend, e)}
                  className="text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1 group/btn transition-colors"
                >
                  <span>Preview Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFrontend(frontend);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.5)]'
                      : 'neu-btn text-slate-200 hover:text-white hover:border-yellow-400/40'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* EXTENSION SECTION: HOW DEVELOPERS CAN EASILY ADD MORE FRONTENDS           */}
      {/* ========================================================================= */}
      <div className="mt-12 glass-card rounded-3xl p-6 sm:p-8 neu-surface border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <FolderTree className="w-4 h-4 text-yellow-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                Easily Add More Frontend Options & Templates in Code
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Need to add another framework (e.g. Qwik, SolidStart, TanStack Start, or custom micro-frontend)? All frontend configurations are decoupled into a single, clean registry file at <code className="text-yellow-400 font-mono">src/data/frontendOptions.js</code>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCustomModalOpen(true)}
              className="neu-btn px-4 py-2.5 rounded-xl text-xs font-mono text-white flex items-center gap-2 hover:border-yellow-400/40"
            >
              <PlusCircle className="w-4 h-4 text-yellow-400" />
              <span>Register Custom Preset</span>
            </button>
          </div>
        </div>

        {/* Code Snippet Guidance */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <span className="text-[11px] font-mono text-slate-400 block mb-2">
            Example: Adding an option to <span className="text-white">src/data/frontendOptions.js</span>:
          </span>
          <pre className="p-3.5 rounded-xl bg-[#0e1014] text-[11px] font-mono text-slate-300 overflow-x-auto border border-white/5">
            <code>{`// Add to FRONTEND_OPTIONS array in src/data/frontendOptions.js:
{
  id: 'qwik',
  name: 'Qwik City',
  category: 'Static & Islands',
  tagline: 'Resumable web applications with zero hydration latency.',
  badge: 'Instant On',
  stats: { stars: '20k', bundleSize: '1 kB', buildSpeed: '0.2s', seoScore: '100/100' },
  // Nesta automatically generates the card, preview modal, and selection state!
}`}</code>
          </pre>
        </div>
      </div>

      {/* Frontend Detail Modal (when user clicks card or preview) */}
      <FrontendDetailModal
        frontend={modalFrontend}
        isOpen={isModalOpen}
        isSelected={selectedFrontend?.id === modalFrontend?.id}
        onSelect={(fw) => onSelectFrontend(fw)}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Interactive Custom Framework Creator Modal */}
      {customModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setCustomModalOpen(false)}
        >
          <div 
            className="glass-card rounded-3xl w-full max-w-lg p-6 sm:p-8 neu-surface border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-2">
              Register New Frontend Engine
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Dynamically add a new frontend card to Nesta's registry.
            </p>

            <form onSubmit={handleAddCustom} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Framework Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Qwik City / TanStack Start"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full neu-inset px-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full neu-inset px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-yellow-400 bg-[#14161b]"
                >
                  <option value="Fullstack SSR">Fullstack SSR</option>
                  <option value="Client SPA">Client SPA</option>
                  <option value="Static & Islands">Static & Islands</option>
                  <option value="Reactive UI">Reactive UI</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Tagline / Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ultra-fast resumable framework with sub-millisecond TTI"
                  value={customTagline}
                  onChange={(e) => setCustomTagline(e.target.value)}
                  className="w-full neu-inset px-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCustomModalOpen(false)}
                  className="neu-btn px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="neu-yellow-btn px-5 py-2 rounded-xl text-xs font-bold text-black"
                >
                  Add Framework
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
