import React, { useState } from 'react';
import { BlogPost, GalleryPhoto, ViewMode } from '../types';

interface AdminDashboardProps {
  posts: BlogPost[];
  photos: GalleryPhoto[];
  onNavigate: (view: ViewMode) => void;
  onOpenArticleModal: (post: BlogPost) => void;
  onOpenNewEntryModal: () => void;
  onUploadPhoto: (file: File) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  posts,
  photos,
  onNavigate,
  onOpenArticleModal,
  onOpenNewEntryModal,
  onUploadPhoto,
}) => {
  const [analyticsView, setAnalyticsView] = useState<'annual' | 'quarterly'>('annual');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('Oct 24, 2024');

  const chartDataAnnual = [
    { month: 'JAN', value: '450', heightPct: '25%', num: 450 },
    { month: 'FEB', value: '680', heightPct: '45%', num: 680 },
    { month: 'MAR', value: '1.2k', heightPct: '75%', num: 1200 },
    { month: 'APR', value: '720', heightPct: '50%', num: 720 },
    { month: 'MAY', value: '1.5k', heightPct: '85%', num: 1500 },
    { month: 'JUN', value: '2.1k', heightPct: '98%', num: 2100 },
  ];

  const chartDataQuarterly = [
    { month: 'JUL', value: '1.8k', heightPct: '80%', num: 1800 },
    { month: 'AUG', value: '2.4k', heightPct: '100%', num: 2400 },
    { month: 'SEP', value: '1.9k', heightPct: '88%', num: 1900 },
    { month: 'OCT', value: '2.8k', heightPct: '95%', num: 2840 },
    { month: 'NOV', value: '1.1k', heightPct: '60%', num: 1100 },
    { month: 'DEC', value: '890', heightPct: '40%', num: 890 },
  ];

  const activeChartData = analyticsView === 'annual' ? chartDataAnnual : chartDataQuarterly;

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadPhoto(e.target.files[0]);
    }
  };

  return (
    <main className="flex-1 md:ml-64 p-6 md:p-12 min-h-screen pb-24 md:pb-12">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline-xl text-3xl md:text-5xl font-bold text-[#064e3b] leading-tight">
            Dashboard Overview
          </h2>
          <p className="font-body-md text-[#404944] mt-2">
            Welcome back. Here is what is happening at Lake Kumisi today.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 text-[#003527] border border-[#003527]/20 shadow-sm">
            <span className="material-symbols-outlined text-lg">calendar_today</span>
            <input
              type="text"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent font-label-caps text-xs font-semibold focus:outline-none w-28"
            />
          </div>
        </div>
      </header>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1 */}
        <div
          onClick={() => onNavigate('analytics')}
          className="glass-card p-6 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-transform cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="p-2.5 bg-[#b0f0d6] rounded-xl text-[#003527]">
              <span className="material-symbols-outlined text-xl">visibility</span>
            </span>
            <span className="text-[#005236] font-bold text-sm bg-[#4edea3]/20 px-2 py-0.5 rounded-md">
              +12%
            </span>
          </div>
          <div>
            <p className="font-label-caps text-xs text-[#404944] uppercase tracking-wider">
              Site Visits
            </p>
            <h3 className="font-headline-lg text-3xl font-bold text-[#003527] mt-1">2,840</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => onNavigate('gallery')}
          className="glass-card p-6 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-transform cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="p-2.5 bg-[#c3ecd7] rounded-xl text-[#416656]">
              <span className="material-symbols-outlined text-xl">photo_camera</span>
            </span>
            <span className="text-[#404944] font-body-sm text-xs">Last 7 days</span>
          </div>
          <div>
            <p className="font-label-caps text-xs text-[#404944] uppercase tracking-wider">
              New Photos
            </p>
            <h3 className="font-headline-lg text-3xl font-bold text-[#003527] mt-1">
              {photos.length > 0 ? photos.length * 35 : 142}
            </h3>
          </div>
        </div>

        {/* Card 3 */}
        <div
          onClick={() => onNavigate('blog')}
          className="glass-card p-6 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-transform cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="p-2.5 bg-[#6ffbbe] rounded-xl text-[#003623]">
              <span className="material-symbols-outlined text-xl">edit_note</span>
            </span>
            <span className="bg-[#ffdad6] text-[#93000a] px-2 py-0.5 rounded text-[10px] font-bold">
              2 PENDING
            </span>
          </div>
          <div>
            <p className="font-label-caps text-xs text-[#404944] uppercase tracking-wider">
              Blog Drafts
            </p>
            <h3 className="font-headline-lg text-3xl font-bold text-[#003527] mt-1">
              {posts.length}
            </h3>
          </div>
        </div>

        {/* Card 4 */}
        <div
          onClick={() => onNavigate('analytics')}
          className="glass-card p-6 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-transform cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="p-2.5 bg-[#064e3b] rounded-xl text-white">
              <span className="material-symbols-outlined text-xl">nest_eco_leaf</span>
            </span>
            <span className="text-[#31c98f] font-bold text-xs bg-[#004f34] px-2.5 py-0.5 rounded-full">
              Active
            </span>
          </div>
          <div>
            <p className="font-label-caps text-xs text-[#404944] uppercase tracking-wider">
              Species Tracked
            </p>
            <h3 className="font-headline-lg text-3xl font-bold text-[#003527] mt-1">48</h3>
          </div>
        </div>
      </div>

      {/* Main Grid: Analytics Chart + Gallery Manager Quick */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Conservation Analytics Chart */}
        <div className="lg:col-span-2 glass-card p-8 rounded-3xl min-h-[420px] flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="font-headline-lg text-2xl font-bold text-[#003527]">
                Conservation Analytics
              </h4>
              <p className="font-body-sm text-[#404944] text-xs md:text-sm mt-0.5">
                Simulated seasonal migration patterns & visitor impact.
              </p>
            </div>
            <select
              value={analyticsView}
              onChange={(e) => setAnalyticsView(e.target.value as 'annual' | 'quarterly')}
              className="bg-[#f7f9fb]/80 border border-[#bfc9c3]/50 rounded-lg px-3 py-1.5 font-label-caps text-xs text-[#003527] focus:ring-2 focus:ring-[#003527] cursor-pointer"
            >
              <option value="annual">Annual View</option>
              <option value="quarterly">Last 6 Months</option>
            </select>
          </div>

          <div className="flex-1 relative flex items-end gap-3 md:gap-4 px-2 pb-6 min-h-[220px]">
            {activeChartData.map((item, idx) => {
              const opacityClass =
                idx === activeChartData.length - 1
                  ? 'bg-[#064e3b]'
                  : `bg-[#003527] opacity-${(idx + 2) * 15}`;
              return (
                <div
                  key={item.month}
                  style={{ height: item.heightPct }}
                  className={`flex-1 ${opacityClass} rounded-t-lg transition-all hover:brightness-125 group relative cursor-help flex items-end justify-center`}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 glass-card px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[11px] font-bold text-[#003527] shadow-lg pointer-events-none z-20">
                    {item.month}: {item.value} visitors
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between px-2 pt-4 border-t border-[#bfc9c3]/20 text-[#404944] font-label-caps text-[11px] font-bold">
            {activeChartData.map((item) => (
              <span key={item.month}>{item.month}</span>
            ))}
          </div>
        </div>

        {/* Gallery Manager Quick Section */}
        <div className="glass-card p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-headline-lg text-2xl font-bold text-[#003527]">
                Gallery Manager
              </h4>
              <button
                onClick={() => onNavigate('gallery')}
                className="text-[#003527] hover:bg-[#b0f0d6] p-1.5 rounded-full transition-colors cursor-pointer"
                title="Expand Gallery"
              >
                <span className="material-symbols-outlined">open_in_full</span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Dropzone */}
              <label className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-video border-2 border-dashed border-[#bfc9c3] hover:border-[#003527] bg-white/20 hover:bg-white/40 transition-colors flex flex-col items-center justify-center p-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <span className="material-symbols-outlined text-4xl text-[#bfc9c3] group-hover:text-[#003527] mb-2 transition-colors">
                  upload_file
                </span>
                <p className="font-label-caps text-xs text-[#404944] group-hover:text-[#003527] font-semibold">
                  Drop or Click to Upload
                </p>
              </label>

              {/* Recent Uploads */}
              <div className="space-y-2.5">
                <p className="font-label-caps text-xs text-[#404944] uppercase font-bold">
                  Recent Uploads
                </p>
                <div className="flex gap-3">
                  {photos.slice(0, 2).map((photo) => (
                    <div
                      key={photo.id}
                      onClick={() => onNavigate('gallery')}
                      className="w-16 h-16 rounded-xl overflow-hidden glass-card p-0.5 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <img
                        className="w-full h-full object-cover rounded-lg"
                        src={photo.url}
                        alt={photo.alt}
                      />
                    </div>
                  ))}
                  <div
                    onClick={() => onNavigate('gallery')}
                    className="w-16 h-16 rounded-xl overflow-hidden glass-card p-0.5 flex items-center justify-center bg-[#e0e3e5]/30 cursor-pointer hover:bg-[#e0e3e5]/60 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[#404944]">more_horiz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#bfc9c3]/20">
            <div className="flex flex-wrap gap-2">
              {['#Kingfisher', '#Migration24', '#Wetlands'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(selectedTag === tag ? null : tag);
                    onNavigate('gallery');
                  }}
                  className="px-3 py-1 bg-[#c3ecd7] text-[#476c5b] hover:bg-[#003527] hover:text-white rounded-full text-[10px] font-bold transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Editor Previews */}
      <div className="glass-card p-8 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h4 className="font-headline-lg text-2xl font-bold text-[#003527]">
              Blog Editor Previews
            </h4>
            <p className="font-body-sm text-[#404944] text-xs mt-0.5">
              Draft, review, and publish sanctuary news articles.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenNewEntryModal}
              className="bg-[#c3ecd7] text-[#003527] px-4 py-2 rounded-full font-label-caps text-xs font-bold hover:bg-[#003527] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Write Post
            </button>
            <button
              onClick={() => onNavigate('blog')}
              className="bg-[#064e3b] text-white px-6 py-2 rounded-full font-label-caps text-xs font-bold hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              All Posts
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#bfc9c3]/30 font-label-caps text-xs text-[#404944] uppercase">
                <th className="pb-4 font-normal">POST TITLE</th>
                <th className="pb-4 font-normal">AUTHOR</th>
                <th className="pb-4 font-normal">STATUS</th>
                <th className="pb-4 font-normal text-right">LAST EDITED</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#bfc9c3]/10">
              {posts.map((post) => {
                let badgeClass = 'bg-[#e0e3e5] text-[#404944]';
                if (post.status === 'PUBLISHED') {
                  badgeClass = 'bg-[#4edea3]/30 text-[#005236]';
                } else if (post.status === 'REVIEW REQ.') {
                  badgeClass = 'bg-[#ffdad6] text-[#93000a]';
                }

                return (
                  <tr
                    key={post.id}
                    onClick={() => onOpenArticleModal(post)}
                    className="group hover:bg-[#e0e3e5]/30 transition-colors cursor-pointer"
                  >
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#003527] group-hover:scale-110 transition-transform">
                          article
                        </span>
                        <span className="font-body-md font-bold text-[#191c1e] group-hover:text-[#003527] transition-colors">
                          {post.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 font-body-sm text-[#191c1e] text-sm">{post.author}</td>
                    <td className="py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${badgeClass}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="py-5 text-right font-body-sm text-[#404944] text-sm">
                      {post.lastEdited}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full glass-card border-t border-[#bfc9c3]/30 px-6 py-3 flex justify-around items-center z-50">
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-[#003527] flex flex-col items-center"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            dashboard
          </span>
          <span className="text-[10px] font-label-caps mt-0.5">Home</span>
        </button>
        <button
          onClick={() => onNavigate('gallery')}
          className="text-[#404944] flex flex-col items-center"
        >
          <span className="material-symbols-outlined">photo_library</span>
          <span className="text-[10px] font-label-caps mt-0.5">Media</span>
        </button>
        <button
          onClick={onOpenNewEntryModal}
          className="-mt-8 bg-[#003527] p-3.5 rounded-full shadow-lg shadow-[#003527]/30 border-4 border-[#f7f9fb] text-white"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
        <button
          onClick={() => onNavigate('analytics')}
          className="text-[#404944] flex flex-col items-center"
        >
          <span className="material-symbols-outlined">monitoring</span>
          <span className="text-[10px] font-label-caps mt-0.5">Stats</span>
        </button>
        <button
          onClick={() => onNavigate('public')}
          className="text-[#404944] flex flex-col items-center"
        >
          <span className="material-symbols-outlined">public</span>
          <span className="text-[10px] font-label-caps mt-0.5">Site</span>
        </button>
      </nav>
    </main>
  );
};
