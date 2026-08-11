import React, { useState } from 'react';
import { BlogPost, BlogStatus } from '../types';

interface BlogManagerViewProps {
  posts: BlogPost[];
  onOpenArticleModal: (post: BlogPost) => void;
  onOpenNewEntryModal: () => void;
  onAddPost: (post: BlogPost) => void;
  onUpdateStatus: (id: string, status: BlogStatus) => void;
}

export const BlogManagerView: React.FC<BlogManagerViewProps> = ({
  posts,
  onOpenArticleModal,
  onOpenNewEntryModal,
  onAddPost,
  onUpdateStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | BlogStatus>('ALL');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [showAiModal, setShowAiModal] = useState(false);

  const filteredPosts = posts.filter(
    (p) => activeTab === 'ALL' || p.status === activeTab
  );

  const handleGenerateAiPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiLoading(true);

    try {
      const res = await fetch('/api/ai/draft-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic || 'Dalmatian pelican telemetry tracking', category: 'Conservation News' }),
      });
      const data = await res.json();
      const draft = data.data || data.fallback;

      const newPost: BlogPost = {
        id: `post-${Date.now()}`,
        title: draft.title || 'AI Generated Sanctuary Report',
        author: 'Gemini AI Assistant',
        status: 'DRAFT',
        lastEdited: 'Just now',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        summary: draft.summary || 'Generated draft post',
        content: draft.content || 'Body text',
        category: draft.category || 'Conservation News',
        reads: '0 Reads',
        image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop&q=80',
        tag: draft.tag || 'AI Telemetry',
      };

      onAddPost(newPost);
      setShowAiModal(false);
      setAiTopic('');
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <main className="flex-1 md:ml-64 p-6 md:p-12 min-h-screen pb-24 md:pb-12">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline-xl text-3xl md:text-4xl font-bold text-[#003527]">
            Blog Posts Manager
          </h2>
          <p className="font-body-sm text-[#404944] mt-1">
            Create, edit, review, and publish articles for Kumisi Sanctuary news hub.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAiModal(true)}
            className="bg-[#c3ecd7] text-[#003527] px-5 py-2.5 rounded-xl font-bold font-label-caps text-xs flex items-center gap-2 hover:bg-[#003527] hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            AI Draft Assistant
          </button>
          <button
            onClick={onOpenNewEntryModal}
            className="bg-[#003527] text-white px-6 py-2.5 rounded-xl font-bold font-label-caps text-xs flex items-center gap-2 hover:bg-[#064e3b] transition-all cursor-pointer shadow-md shadow-[#003527]/20"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            New Post
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="glass-card p-2 rounded-2xl mb-6 inline-flex gap-2">
        {(['ALL', 'PUBLISHED', 'DRAFT', 'REVIEW REQ.'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-[#003527] text-white shadow-sm'
                : 'text-[#404944] hover:bg-white/40'
            }`}
          >
            {tab} ({tab === 'ALL' ? posts.length : posts.filter((p) => p.status === tab).length})
          </button>
        ))}
      </div>

      {/* Posts Table */}
      <div className="glass-card p-8 rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#bfc9c3]/30 font-label-caps text-xs text-[#404944] uppercase">
                <th className="pb-4 font-normal">POST TITLE</th>
                <th className="pb-4 font-normal">AUTHOR</th>
                <th className="pb-4 font-normal">CATEGORY</th>
                <th className="pb-4 font-normal">STATUS</th>
                <th className="pb-4 font-normal">LAST EDITED</th>
                <th className="pb-4 font-normal text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#bfc9c3]/10">
              {filteredPosts.map((post) => {
                let badgeClass = 'bg-[#e0e3e5] text-[#404944]';
                if (post.status === 'PUBLISHED') {
                  badgeClass = 'bg-[#4edea3]/30 text-[#005236]';
                } else if (post.status === 'REVIEW REQ.') {
                  badgeClass = 'bg-[#ffdad6] text-[#93000a]';
                }

                return (
                  <tr
                    key={post.id}
                    className="group hover:bg-[#e0e3e5]/30 transition-colors"
                  >
                    <td className="py-5" onClick={() => onOpenArticleModal(post)}>
                      <div className="flex items-center gap-3 cursor-pointer">
                        <span className="material-symbols-outlined text-[#003527]">
                          article
                        </span>
                        <div>
                          <p className="font-body-md font-bold text-[#191c1e] group-hover:text-[#003527] transition-colors">
                            {post.title}
                          </p>
                          <p className="text-xs text-[#404944] line-clamp-1">{post.summary}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 font-body-sm text-sm text-[#191c1e]">{post.author}</td>
                    <td className="py-5 font-body-sm text-xs text-[#404944]">
                      <span className="px-2.5 py-1 bg-[#c3ecd7] text-[#476c5b] rounded-md font-bold">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${badgeClass}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="py-5 font-body-sm text-sm text-[#404944]">
                      {post.lastEdited}
                    </td>
                    <td className="py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {post.status !== 'PUBLISHED' && (
                          <button
                            onClick={() => onUpdateStatus(post.id, 'PUBLISHED')}
                            className="px-3 py-1 bg-[#064e3b] text-white rounded-lg text-xs font-bold hover:bg-[#003527] transition-colors"
                          >
                            Publish
                          </button>
                        )}
                        <button
                          onClick={() => onOpenArticleModal(post)}
                          className="p-1.5 text-[#003527] hover:bg-[#c3ecd7] rounded-lg transition-colors"
                          title="View / Edit"
                        >
                          <span className="material-symbols-outlined text-sm">visibility</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Draft Generator Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card bg-[#f7f9fb] max-w-lg w-full rounded-3xl p-8 shadow-2xl relative border border-white/60">
            <button
              onClick={() => setShowAiModal(false)}
              className="absolute top-4 right-4 text-[#404944] hover:text-black"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex items-center gap-2 mb-4 text-[#003527]">
              <span className="material-symbols-outlined text-2xl">auto_awesome</span>
              <h3 className="font-headline-lg text-2xl font-bold">AI Conservation Writer</h3>
            </div>
            <p className="text-body-sm text-[#404944] text-xs mb-6">
              Enter a research topic or telemetry update. Gemini will generate a full blog post draft for Lake Kumisi Sanctuary.
            </p>

            <form onSubmit={handleGenerateAiPost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#003527] mb-1">
                  Topic / Key Findings
                </label>
                <input
                  type="text"
                  placeholder="e.g. White Stork telemetry return and mud quality index"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#bfc9c3]/50 text-xs focus:ring-2 focus:ring-[#003527] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAiModal(false)}
                  className="px-4 py-2 text-xs font-bold text-[#404944]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={aiLoading}
                  className="bg-[#003527] text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-[#064e3b] transition-all disabled:opacity-50"
                >
                  {aiLoading ? (
                    <>
                      <span className="material-symbols-outlined text-sm animate-spin">
                        progress_activity
                      </span>
                      Drafting with Gemini...
                    </>
                  ) : (
                    'Generate Draft'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
