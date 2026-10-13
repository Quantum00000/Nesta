import React, { useState, useEffect } from 'react';
import { projectStorage } from '../services/projectStorage';
import { generateProjectZip, downloadBlob } from '../services/projectGenerator';
import { 
  Server, 
  ExternalLink, 
  Download, 
  Trash2, 
  RefreshCw, 
  Plus, 
  Globe, 
  Layers, 
  ShieldCheck, 
  Activity, 
  Sparkles,
  Terminal,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function ManageAppDashboard({ currentUser, onStartNewApp }) {
  const [projects, setProjects] = useState([]);
  const [selectedLogsProj, setSelectedLogsProj] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    loadProjects();
  }, [currentUser]);

  const loadProjects = () => {
    const list = projectStorage.getProjects(currentUser?.email || 'demo@nesta.dev');
    setProjects(list);
  };

  const handleDelete = (id, name) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      projectStorage.deleteProject(id);
      loadProjects();
    }
  };

  const handleDownload = async (proj) => {
    try {
      const { blob, filename } = await generateProjectZip({
        projectName: proj.name,
        projectDescription: proj.description,
        frontend: proj.frontend,
        backend: proj.backend,
        template: proj.template,
        customization: proj.customization || {}
      });
      downloadBlob(blob, filename);
    } catch (err) {
      alert('Download error: ' + err.message);
    }
  };

  const filteredProjects = projects.filter(p => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Live') return p.status === 'Live';
    if (activeFilter === 'Exported') return p.status.includes('Exported');
    return true;
  });

  return (
    <div className="min-h-[85vh] py-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Manage Your Applications
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
              Dashboard
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Monitor deployments, download source archives, and manage projects created by <span className="text-white font-semibold">{currentUser?.name || 'Developer'}</span>.
          </p>
        </div>

        <button
          onClick={onStartNewApp}
          className="neu-yellow-btn px-6 py-2.5 rounded-xl text-xs font-bold text-black flex items-center gap-2 shadow-lg self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Build New Application</span>
        </button>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-card neu-surface border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium block mb-1">Total Projects</span>
            <span className="text-2xl font-black text-white">{projects.length}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card neu-surface border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium block mb-1">Live Deployments</span>
            <span className="text-2xl font-black text-emerald-400">
              {projects.filter(p => p.status === 'Live').length}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card neu-surface border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium block mb-1">Total Monthly Views</span>
            <span className="text-2xl font-black text-white">60.5k</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card neu-surface border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium block mb-1">Global SLA</span>
            <span className="text-2xl font-black text-yellow-400">99.99%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {['All', 'Live', 'Exported'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === filter
                  ? 'bg-yellow-400 text-black font-bold shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {filter} Projects
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Showing {filteredProjects.length} application{filteredProjects.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Projects List Table / Cards */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 rounded-3xl glass-card neu-surface border border-white/10 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 text-slate-400 flex items-center justify-center mx-auto">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No projects found in this view</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Get started by launching the App Builder Studio to pick your tech stack and themed template.
          </p>
          <button
            onClick={onStartNewApp}
            className="neu-yellow-btn px-6 py-2.5 rounded-xl text-xs font-bold text-black inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Your First App</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((proj) => {
            const isLive = proj.status === 'Live';

            return (
              <div
                key={proj.id}
                className="p-6 rounded-3xl glass-card neu-surface border border-white/10 hover:border-yellow-400/30 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Project Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white tracking-tight">{proj.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5 ${
                      isLive 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-white/10 text-slate-300 border border-white/10'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
                      <span>{proj.status}</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                      Platform: {proj.deployedPlatform || 'Cloud'}
                    </span>
                  </div>

                  {/* Badges Stack */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-md bg-yellow-400/10 text-yellow-300 font-semibold border border-yellow-400/20">
                      Frontend: {proj.frontend?.name || 'React 19'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#222735] text-yellow-400 font-semibold border border-yellow-400/20">
                      Backend: {proj.backend?.name || 'Express.js'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">
                      Theme: {proj.template?.name || 'Nova SaaS'}
                    </span>
                  </div>

                  {/* Deployed link if live */}
                  {proj.liveUrl && (
                    <div className="pt-1 flex items-center gap-2 text-xs">
                      <span className="text-slate-400">URL:</span>
                      <a 
                        href={proj.liveUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-yellow-400 hover:underline flex items-center gap-1 font-mono font-medium"
                      >
                        <span>{proj.liveUrl}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2.5 lg:self-center">
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="neu-yellow-btn px-4 py-2 rounded-xl text-xs font-bold text-black flex items-center gap-1.5 shadow-md"
                    >
                      <span>Visit Live App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => handleDownload(proj)}
                    className="neu-btn px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5"
                    title="Download project ZIP"
                  >
                    <Download className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Download ZIP</span>
                  </button>

                  <button
                    onClick={() => setSelectedLogsProj(proj)}
                    className="neu-btn px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
                    title="View build and deployment telemetry"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Logs</span>
                  </button>

                  <button
                    onClick={() => handleDelete(proj.id, proj.name)}
                    className="p-2 rounded-xl neu-btn text-red-400 hover:text-red-300 hover:border-red-500/30"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Deployment Log Modal */}
      {selectedLogsProj && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedLogsProj(null)}
        >
          <div 
            className="glass-card rounded-3xl w-full max-w-2xl p-6 neu-surface border border-white/15 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white">Deployment Telemetry</h3>
                <span className="text-xs font-mono text-slate-400">{selectedLogsProj.name}</span>
              </div>
              <button onClick={() => setSelectedLogsProj(null)} className="neu-btn px-3 py-1 rounded-lg text-xs">
                Close
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#090a0d] border border-white/5 font-mono text-xs text-slate-300 space-y-2 max-h-64 overflow-y-auto">
              <div className="text-emerald-400">✓ Target: {selectedLogsProj.deployedPlatform || 'Edge Cloud'}</div>
              <div className="text-slate-400">[2026-09-30 20:12:00] Build triggered from Nesta App Studio</div>
              <div className="text-slate-400">[2026-09-30 20:12:02] Optimizing {selectedLogsProj.frontend?.name} bundles...</div>
              <div className="text-slate-400">[2026-09-30 20:12:04] Injecting {selectedLogsProj.template?.name} design tokens...</div>
              <div className="text-slate-400">[2026-09-30 20:12:06] Routing active via {selectedLogsProj.backend?.name} endpoints</div>
              <div className="text-emerald-400">✓ SSL verified. Domain active: {selectedLogsProj.liveUrl || 'Local Environment'}</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
