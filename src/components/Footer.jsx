import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';

export default function Footer({ onOpenApiModal, onNavigate, isUltimateMode }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-white/10 bg-[#101217] pt-12 pb-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-10">

        {/* Top Tier: Brand + Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center font-black text-black text-lg shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                N
              </div>
              <span className="text-xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight">
                Nesta
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              A simple tool for choosing and scaffolding your web technology stack — frontend, backend, and UI components all in one place.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Live & Free
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-yellow-400">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('intro')} className="hover:text-white transition-colors">
                  🏠 Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('anatomy')} className="hover:text-white transition-colors">
                  🧩 UI Components
                </button>
              </li>
              {isUltimateMode && (
                <>
                  <li>
                    <button onClick={() => onNavigate('frontends')} className="hover:text-white transition-colors">
                      💻 Frontend Options
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onNavigate('backends')} className="hover:text-white transition-colors">
                      🖥️ Backend Options
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Help */}
          {isUltimateMode && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-yellow-400">Help & Docs</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <button onClick={onOpenApiModal} className="hover:text-white flex items-center gap-1.5 transition-colors">
                    <Terminal className="w-3.5 h-3.5 text-yellow-400" />
                    View API Details
                  </button>
                </li>
                <li>
                  <span className="text-slate-500 text-xs">Add a framework: edit <code className="text-slate-300">src/data/frontendOptions.js</code></span>
                </li>
              </ul>
            </div>
          )}

        </div>

        {/* Bottom Tier */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div>
            © 2026 Nesta. Made to make web development simple.
          </div>
          <button
            onClick={scrollToTop}
            className="neu-btn px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-xs"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-yellow-400" />
          </button>
        </div>

      </div>
    </footer>
  );
}
