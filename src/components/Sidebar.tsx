import React from 'react';
import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenNewEntry: () => void;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onOpenNewEntry,
  onOpenSettings,
}) => {
  return (
    <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-[#f2f4f6]/80 backdrop-blur-xl border-r border-[#bfc9c3]/30 shadow-lg shadow-[#003623]/10 flex-col p-4 space-y-2 z-50">
      <div className="px-4 py-6 mb-2">
        <h1 className="font-headline-lg text-[28px] font-bold text-[#003527] leading-tight">
          Admin Portal
        </h1>
        <p className="font-body-sm text-[#404944] mt-0.5">Conservation Oversight</p>
      </div>

      <nav className="flex-1 space-y-1.5 px-2">
        {/* Overview */}
        <button
          onClick={() => onNavigate('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-left transition-all ${
            currentView === 'dashboard'
              ? 'bg-[#c3ecd7] text-[#476c5b] shadow-sm translate-x-1'
              : 'text-[#404944] hover:bg-[#e0e3e5]/50'
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontVariationSettings: currentView === 'dashboard' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            dashboard
          </span>
          <span className="font-label-caps uppercase text-xs">Overview</span>
        </button>

        {/* Gallery Manager */}
        <button
          onClick={() => onNavigate('gallery')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-left transition-all ${
            currentView === 'gallery'
              ? 'bg-[#c3ecd7] text-[#476c5b] shadow-sm translate-x-1'
              : 'text-[#404944] hover:bg-[#e0e3e5]/50'
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontVariationSettings: currentView === 'gallery' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            photo_library
          </span>
          <span className="font-label-caps uppercase text-xs">Gallery Manager</span>
        </button>

        {/* Blog Posts */}
        <button
          onClick={() => onNavigate('blog')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-left transition-all ${
            currentView === 'blog'
              ? 'bg-[#c3ecd7] text-[#476c5b] shadow-sm translate-x-1'
              : 'text-[#404944] hover:bg-[#e0e3e5]/50'
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontVariationSettings: currentView === 'blog' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            article
          </span>
          <span className="font-label-caps uppercase text-xs">Blog Posts</span>
        </button>

        {/* Analytics */}
        <button
          onClick={() => onNavigate('analytics')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-left transition-all ${
            currentView === 'analytics'
              ? 'bg-[#c3ecd7] text-[#476c5b] shadow-sm translate-x-1'
              : 'text-[#404944] hover:bg-[#e0e3e5]/50'
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontVariationSettings: currentView === 'analytics' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            monitoring
          </span>
          <span className="font-label-caps uppercase text-xs">Analytics</span>
        </button>

        {/* Switch to Public Site */}
        <button
          onClick={() => onNavigate('public')}
          className="w-full flex items-center gap-3 px-4 py-3 text-[#003527] hover:bg-[#c3ecd7]/40 transition-all rounded-lg mt-4 border border-[#003527]/20"
        >
          <span className="material-symbols-outlined">public</span>
          <span className="font-label-caps uppercase text-xs font-bold">Public Sanctuary</span>
        </button>
      </nav>

      <div className="px-2 pb-4 space-y-1.5">
        <button
          onClick={onOpenNewEntry}
          className="w-full mb-3 bg-[#003527] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[0.98] active:scale-95 transition-all shadow-md shadow-[#003527]/20 cursor-pointer"
        >
          <span className="material-symbols-outlined">add</span>
          <span className="font-label-caps uppercase text-xs">New Entry</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-[#404944] hover:bg-[#e0e3e5]/50 transition-all rounded-lg"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-caps uppercase text-xs">Settings</span>
        </button>

        <button
          onClick={() => onNavigate('public')}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-all rounded-lg"
        >
          <span className="material-symbols-outlined text-[#ba1a1a]">logout</span>
          <span className="font-label-caps uppercase text-xs text-[#ba1a1a]">Sign Out</span>
        </button>
      </div>

      <div className="border-t border-[#bfc9c3]/30 pt-4 flex items-center gap-3 px-4 pb-2">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#b0f0d6] flex-shrink-0">
          <img
            className="w-full h-full object-cover"
            alt="Sanctuary staff portrait"
            src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=200&h=200&fit=crop&q=80"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-label-caps text-xs truncate font-bold text-[#191c1e]">
            Sanctuary Staff
          </p>
          <p className="text-[11px] text-[#404944] truncate">dr.elene@kumisi.ge</p>
        </div>
      </div>
    </aside>
  );
};
