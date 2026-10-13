import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  ChevronRight, 
  Server, 
  Layers, 
  LayoutDashboard, 
  Wrench, 
  LogOut, 
  Sparkles,
  User,
  Plus,
  Sun,
  Moon,
  ShieldCheck,
  CreditCard,
  Key,
  X,
  ExternalLink,
  CheckCircle2,
  ChevronDown,
  Mail,
  Zap,
  Activity
} from 'lucide-react';

export default function Navbar({ 
  currentView, 
  onViewChange, 
  selectedFrontend, 
  selectedBackend, 
  selectedTemplate, 
  onOpenApiModal, 
  activeSection, 
  onNavigate,
  isUltimateMode,
  onToggleUltimateMode
}) {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // null | 'profile' | 'account'
  const menuRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-8 pt-4 pb-3 transition-all duration-300 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-7xl mx-auto glass-card rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-2xl border border-black/10 dark:border-white/10 backdrop-blur-xl transition-all duration-300">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3.5 cursor-pointer" 
          onClick={() => {
            onViewChange('builder');
            if (onNavigate) onNavigate('intro');
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-[#FACC15] flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.5)] transform transition-transform hover:scale-105 active:scale-95">
            <span className="font-extrabold text-black text-xl tracking-tighter">N</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">
                Nesta
              </span>
              <span className="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
                App Studio
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Fullstack Architecture & Deployment
            </p>
          </div>
        </div>

        {/* Primary View Switcher: Builder vs Manage */}
        <div className="flex items-center gap-1.5 p-1 bg-[#0e1015] rounded-xl border border-white/10 shadow-inner">
          <button
            onClick={() => onViewChange('builder')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              currentView === 'builder'
                ? 'bg-yellow-400 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Build App</span>
          </button>
          <button
            onClick={() => onViewChange('manage')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              currentView === 'manage'
                ? 'bg-yellow-400 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Manage Apps</span>
          </button>
        </div>

        {/* User Account & Actions */}
        <div className="flex items-center gap-3">
          
          {/* Builder Step Nav Links (only when in builder view on desktop) */}
          {currentView === 'builder' && (
            <nav className="hidden xl:flex items-center gap-1 text-xs text-slate-400 mr-2">
              {isUltimateMode && (
                <>
                  <button onClick={() => onNavigate('frontends')} className="hover:text-white px-2 py-1">
                    1. Frontend
                  </button>
                  <span>•</span>
                  <button onClick={() => onNavigate('backends')} className="hover:text-white px-2 py-1">
                    2. Backend
                  </button>
                  <span>•</span>
                </>
              )}
              <button onClick={() => onNavigate('templates')} className="hover:text-white px-2 py-1">
                {isUltimateMode ? '3' : '1'}. UI Template
              </button>
              <span>•</span>
              <button onClick={() => onNavigate('deploy')} className="hover:text-yellow-400 px-2 py-1 font-semibold text-yellow-400">
                {isUltimateMode ? '4' : '2'}. Launch
              </button>
            </nav>
          )}

          {currentView === 'builder' && (
            <button
              onClick={onToggleUltimateMode}
              className={`hidden sm:flex px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
                isUltimateMode 
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
              }`}
              title="Toggle Ultimate Mode for developer customisations"
            >
              Ultimate Mode {isUltimateMode ? 'ON' : 'OFF'}
            </button>
          )}

          {/* Dark / Light Mode Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-xl neu-btn text-slate-400 hover:text-yellow-400 dark:hover:text-yellow-300 flex items-center gap-1.5 transition-all active:scale-95 border border-black/5 dark:border-white/10"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-yellow-400 animate-fadeIn" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 animate-fadeIn" />
            )}
            <span className="text-xs font-bold font-mono hidden md:inline">
              {isDark ? 'Light' : 'Dark'}
            </span>
          </button>

          {/* User Account Button & Dropdown */}
          {currentUser && (
            <div className="relative pl-3 border-l border-black/10 dark:border-white/10" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-all group focus:outline-none"
                aria-expanded={isAccountMenuOpen}
                title="Account Menu & Profile"
              >
                <div className="relative">
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full bg-white/10 border-2 border-yellow-400 object-cover shadow-sm group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#14161B]" />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-white group-hover:text-yellow-400 transition-colors truncate max-w-[100px] leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-yellow-400 font-mono">
                    {currentUser.plan || 'Free Account'}
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isAccountMenuOpen ? 'rotate-180 text-yellow-400' : ''}`} />
              </button>

              {/* Account Dropdown Card */}
              {isAccountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl p-3.5 glass-card neu-surface border border-white/15 shadow-2xl z-50 animate-scaleUp text-left">
                  {/* User summary header */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-2.5 flex items-center gap-3">
                    <img
                      src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-xl bg-white/10 border border-yellow-400/40 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{currentUser.email || 'developer@nesta.dev'}</div>
                      <span className="inline-block mt-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 font-bold border border-yellow-400/30">
                        {currentUser.plan || 'Pro Architect'}
                      </span>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        setActiveModal('profile');
                      }}
                      className="w-full px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 flex items-center gap-2.5 transition-colors"
                    >
                      <User className="w-4 h-4 text-yellow-400" />
                      <span>View Profile</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        setActiveModal('account');
                      }}
                      className="w-full px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 flex items-center gap-2.5 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>View Account Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        onViewChange('manage');
                      }}
                      className="w-full px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 flex items-center gap-2.5 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-sky-400" />
                      <span>Manage Created Apps</span>
                    </button>
                  </div>

                  <div className="pt-2 mt-2 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        logout();
                      }}
                      className="w-full px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-2.5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* VIEW PROFILE MODAL */}
      {activeModal === 'profile' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl p-6 sm:p-8 glass-card neu-surface border border-white/20 shadow-2xl relative animate-scaleUp">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={currentUser?.name}
                  className="w-20 h-20 rounded-3xl mx-auto border-4 border-yellow-400 object-cover shadow-2xl"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black" />
              </div>

              <div>
                <h3 className="text-xl font-black text-white">{currentUser?.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{currentUser?.email || 'developer@nesta.dev'}</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 text-[11px] font-bold mt-2">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  <span>{currentUser?.plan || 'Pro Architect'}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div>
                  <div className="text-base font-black text-white">6</div>
                  <div className="text-[10px] text-slate-400 font-mono">UI Themes</div>
                </div>
                <div>
                  <div className="text-base font-black text-emerald-400">100%</div>
                  <div className="text-[10px] text-slate-400 font-mono">Uptime</div>
                </div>
                <div>
                  <div className="text-base font-black text-yellow-400">Unlimited</div>
                  <div className="text-[10px] text-slate-400 font-mono">AI Scaffolding</div>
                </div>
              </div>

              <div className="space-y-2 text-left">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Role & Credentials</div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Workspace:</span>
                    <span className="font-semibold text-white">Nesta Cloud Studio</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">User ID:</span>
                    <span className="font-mono text-yellow-300">usr_nesta_{currentUser?.name?.toLowerCase().replace(/\s+/g, '_') || 'dev'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Active Developer
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 rounded-xl bg-yellow-400 text-black font-extrabold text-xs shadow-lg hover:bg-yellow-300 transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW ACCOUNT DETAILS MODAL */}
      {activeModal === 'account' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg rounded-3xl p-6 sm:p-8 glass-card neu-surface border border-white/20 shadow-2xl relative animate-scaleUp">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Account & Cloud Quotas</h3>
                <p className="text-xs text-slate-400">Subscription telemetry, API keys & cloud limits</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Subscription Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-400/10 via-white/5 to-transparent border border-yellow-400/30 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Current Plan</span>
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-yellow-400 text-black">ACTIVE</span>
                </div>
                <div className="text-xl font-black text-white">{currentUser?.plan || 'Pro Architect'}</div>
                <p className="text-xs text-slate-400">Unlimited code bundling, reactive component customisation, zero credit locks.</p>
              </div>

              {/* Resource Quotas */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="text-xs font-bold text-white uppercase tracking-wider">Platform Quotas</div>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">AI Tokens per Request</span>
                    <span className="font-mono text-emerald-400 font-bold">1,500 / 1,500 (Optimized)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full w-[25%]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Fullstack ZIP Exports</span>
                    <span className="font-mono text-yellow-400 font-bold">Unlimited</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full w-full" />
                  </div>
                </div>
              </div>

              {/* Connected Cloud Integrations */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="text-xs font-bold text-white uppercase tracking-wider">Connected Integrations</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                    <span className="text-slate-300">OpenRouter AI</span>
                    <span className="text-emerald-400 font-mono text-[10px] font-bold">CONNECTED</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                    <span className="text-slate-300">Supabase DB</span>
                    <span className="text-emerald-400 font-mono text-[10px] font-bold">ACTIVE</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                    <span className="text-slate-300">Vercel Deploy</span>
                    <span className="text-yellow-400 font-mono text-[10px] font-bold">READY</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                    <span className="text-slate-300">Spring Boot</span>
                    <span className="text-emerald-400 font-mono text-[10px] font-bold">SYNCED</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 rounded-xl neu-btn text-white font-bold text-xs hover:bg-white/10 transition-colors"
              >
                Close Account Details
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
