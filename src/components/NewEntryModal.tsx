import React, { useState } from 'react';
import { BlogPost, BlogStatus } from '../types';

interface NewEntryModalProps {
  onClose: () => void;
  onAddPost: (post: BlogPost) => void;
}

export const NewEntryModal: React.FC<NewEntryModalProps> = ({ onClose, onAddPost }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('Dr. Elene Beridze');
  const [category, setCategory] = useState('Migration Update');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<BlogStatus>('DRAFT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title,
      author,
      status,
      lastEdited: 'Just now',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      summary: summary || title,
      content: content || summary || 'Sanctuary update text.',
      category,
      reads: '0 Reads',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Alcedo_atthis_-_Riserva_Naturale_di_Macchiatonda.jpg/800px-Alcedo_atthis_-_Riserva_Naturale_di_Macchiatonda.jpg',
      tag: category,
    };

    onAddPost(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-card bg-[#f7f9fb] max-w-xl w-full rounded-3xl p-8 shadow-2xl relative border border-white/60 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#404944] hover:text-black"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <h3 className="font-headline-lg text-2xl font-bold text-[#003527] mb-6">
          New Entry: Blog Post
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#003527] mb-1">Post Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. White Stork Arrival Patterns"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#bfc9c3]/50 text-xs focus:ring-2 focus:ring-[#003527] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#003527] mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#bfc9c3]/50 text-xs focus:ring-2 focus:ring-[#003527] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#003527] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#bfc9c3]/50 text-xs focus:ring-2 focus:ring-[#003527] focus:outline-none"
              >
                <option value="Migration Update">Migration Update</option>
                <option value="Mud Research">Mud Research</option>
                <option value="Community Protection">Community Protection</option>
                <option value="Sanctuary Field Notes">Sanctuary Field Notes</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#003527] mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as BlogStatus)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#bfc9c3]/50 text-xs focus:ring-2 focus:ring-[#003527] focus:outline-none"
            >
              <option value="DRAFT">Draft</option>
              <option value="REVIEW REQ.">Review Requested</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#003527] mb-1">Short Summary</label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief overview of key findings..."
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#bfc9c3]/50 text-xs focus:ring-2 focus:ring-[#003527] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#003527] mb-1">Article Content</label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Full text of the post..."
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#bfc9c3]/50 text-xs focus:ring-2 focus:ring-[#003527] focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-[#404944]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#003527] text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-[#064e3b] transition-all cursor-pointer"
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
