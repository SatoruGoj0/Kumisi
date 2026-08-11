import React from 'react';
import { BlogPost } from '../types';

interface ArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-card bg-[#f7f9fb] max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl relative border border-white/60 max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {post.image && (
          <div className="relative h-64 overflow-hidden flex-shrink-0">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003527]/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <span className="px-3 py-1 bg-[#c3ecd7] text-[#476c5b] rounded-full text-[11px] font-bold uppercase mb-2 inline-block">
                {post.category}
              </span>
              <h2 className="font-headline-lg text-2xl font-bold">{post.title}</h2>
            </div>
          </div>
        )}

        <div className="p-8 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-[#404944] border-b border-[#bfc9c3]/30 pb-4">
            <div>
              <span className="font-bold text-[#003527]">Author:</span> {post.author}
            </div>
            <div>
              <span className="font-bold text-[#003527]">Date:</span> {post.date}
            </div>
            <div>
              <span className="font-bold text-[#003527]">Reads:</span> {post.reads}
            </div>
          </div>

          <div className="text-body-md text-[#191c1e] leading-relaxed whitespace-pre-line text-sm md:text-base">
            {post.content}
          </div>
        </div>
      </div>
    </div>
  );
};
