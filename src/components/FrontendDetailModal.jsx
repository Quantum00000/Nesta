import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Folder, 
  FileCode, 
  Cpu, 
  Zap, 
  Copy, 
  ExternalLink, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function FrontendDetailModal({ frontend, isOpen, onClose, isSelected, onSelect }) {
  const [activeTab, setActiveTab] = useState('structure'); // 'structure' | 'code' | 'specs'
  const [copied, setCopied] = useState(false);

  if (!isOpen || !frontend) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to render mock file tree
  const renderTree = (items, depth = 0) => {
    return items.map((item, index) => (
      <div key={index} className="text-xs font-mono my-1" style={{ paddingLeft: `${depth * 18}px` }}>
        <div className="flex items-center gap-2 py-0.5 px-2 rounded hover:bg-white/5 transition-colors">
          {item.type === 'dir' ? (
            <Folder className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
          ) : (
            <FileCode className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          )}
          <span className={item.type === 'dir' ? 'text-white font-semibold' : 'text-slate-300'}>
            {item.name}
          </span>
          {item.desc && (
            <span className="text-[11px] text-slate-400 ml-auto font-sans hidden sm:inline">
              // {item.desc}
            </span>
          )}
        </div>
        {item.children && renderTree(item.children, depth + 1)}
      </div>
    ));
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="glass-card rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col neu-surface border border-white/15 overflow-hidden shadow-2xl animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-7 border-b border-white/10 flex items-start justify-between gap-4 bg-[#171a22]">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl text-black shadow-lg"
              style={{ backgroundColor: frontend.accentColor || '#FACC15' }}
            >
              {frontend.name.substring(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-2xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
                  {frontend.name}
                </h3>
                <span className="text-xs font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  {frontend.version}
                </span>
                <span className="text-xs font-mono font-medium text-yellow-400 bg-yellow-400/10 px-2.5 py-0.5 rounded border border-yellow-400/25">
                  {frontend.category}
                </span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                {frontend.tagline}
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="p-2 rounded-xl neu-btn text-slate-400 hover:text-white transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tab Switcher */}
        <div className="px-6 sm:px-7 pt-4 border-b border-white/5 flex gap-2 bg-[#14161b]">
          <button
            onClick={() => setActiveTab('structure')}
            className={`px-4 py-2 text-xs font-mono font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'structure'
                ? 'text-yellow-400 border-yellow-400 bg-white/5'
                : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            01 File Directory Layout
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 text-xs font-mono font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'code'
                ? 'text-yellow-400 border-yellow-400 bg-white/5'
                : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            02 Component Code Sample
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2 text-xs font-mono font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'specs'
                ? 'text-yellow-400 border-yellow-400 bg-white/5'
                : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            03 Architecture & Features
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-7 overflow-y-auto flex-1 bg-[#14161b] space-y-6">
          
          {/* TAB 1: FILE DIRECTORY STRUCTURE */}
          {activeTab === 'structure' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-400">
                  How Nesta generates the project file tree on disk:
                </span>
                <span className="text-[11px] font-mono text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">
                  Standardized Layout
                </span>
              </div>
              <div className="neu-inset p-4 rounded-2xl border border-white/5 bg-[#0e1014]">
                {renderTree(frontend.fileStructure)}
              </div>
              <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300">
                <strong className="text-white">Note for Developers:</strong> All generated files follow Nesta's modular conventions. You can find or add framework templates directly in <code className="text-yellow-400 font-mono">src/data/frontendOptions.js</code>.
              </div>
            </div>
          )}

          {/* TAB 2: COMPONENT CODE SAMPLE */}
          {activeTab === 'code' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">
                  Idiomatic Component Implementation with Nesta Tokens:
                </span>
                <button
                  onClick={() => handleCopy(frontend.sampleCode)}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-mono transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Template</span>
                    </>
                  )}
                </button>
              </div>
              <div className="neu-inset rounded-2xl overflow-hidden border border-white/10 bg-[#0d0e12]">
                <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-96">
                  <code>{frontend.sampleCode}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: ARCHITECTURE & SPECS */}
          {activeTab === 'specs' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-2">
                  Rendering Mode & Execution
                </h4>
                <div className="p-4 rounded-xl neu-inset text-xs font-mono text-yellow-400">
                  {frontend.renderingMode}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-2">
                  Key Architectural Strengths
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(frontend.keyFeatures || []).map((feat, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
                      <span className="text-xs text-slate-200">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-2">
                  Recommended Use Cases
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed p-4 rounded-xl bg-[#1b1e26] border border-white/5">
                  {frontend.bestFor}
                </p>
              </div>
            </div>
          )}

          {/* Quick Metrics Bar inside Modal */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/10 text-center font-mono">
            <div className="p-2 rounded-lg bg-white/5">
              <span className="text-[10px] text-slate-400 uppercase block">GitHub Stars</span>
              <span className="text-xs font-bold text-white mt-0.5 block">{(frontend.stats || {}).stars}</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5">
              <span className="text-[10px] text-slate-400 uppercase block">Bundle Size</span>
              <span className="text-xs font-bold text-yellow-400 mt-0.5 block">{(frontend.stats || {}).bundleSize}</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5">
              <span className="text-[10px] text-slate-400 uppercase block">Build Latency</span>
              <span className="text-xs font-bold text-white mt-0.5 block">{(frontend.stats || {}).buildSpeed}</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5">
              <span className="text-[10px] text-slate-400 uppercase block">SEO Index</span>
              <span className="text-xs font-bold text-emerald-400 mt-0.5 block">{(frontend.stats || {}).seoScore}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 sm:p-6 border-t border-white/10 flex items-center justify-between gap-4 bg-[#171a22]">
          <div className="text-xs text-slate-400 font-mono hidden sm:block">
            {isSelected ? (
              <span className="text-yellow-400 flex items-center gap-1.5 font-bold">
                <Check className="w-4 h-4 text-yellow-400" />
                This is your currently active framework
              </span>
            ) : (
              <span>Ready to scaffold with Nesta design tokens</span>
            )}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl neu-btn text-xs font-semibold text-slate-300 hover:text-white"
            >
              Close
            </button>
            <button
              onClick={() => {
                onSelect(frontend);
                onClose();
              }}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                isSelected
                  ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.5)]'
                  : 'neu-yellow-btn text-black'
              }`}
            >
              {isSelected ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>Selected & Active</span>
                </>
              ) : (
                <>
                  <span>Select {frontend.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
