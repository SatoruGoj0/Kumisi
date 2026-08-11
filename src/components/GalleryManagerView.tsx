import React, { useState } from 'react';
import { GalleryPhoto } from '../types';

interface GalleryManagerViewProps {
  photos: GalleryPhoto[];
  onUploadPhoto: (file: File) => void;
}

export const GalleryManagerView: React.FC<GalleryManagerViewProps> = ({
  photos,
  onUploadPhoto,
}) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const allTags = Array.from(new Set(photos.flatMap((p) => p.tags)));

  const filteredPhotos = photos.filter((photo) => {
    const matchesTag = !activeTag || photo.tags.includes(activeTag);
    const matchesSearch =
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.photographer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadPhoto(e.target.files[0]);
    }
  };

  return (
    <main className="flex-1 md:ml-64 p-6 md:p-12 min-h-screen pb-24 md:pb-12">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline-xl text-3xl md:text-4xl font-bold text-[#003527]">
            Gallery Manager
          </h2>
          <p className="font-body-sm text-[#404944] mt-1">
            Manage field photography assets, avian observation media, and press imagery.
          </p>
        </div>

        <label className="bg-[#003527] text-white px-6 py-3 rounded-xl font-bold font-label-caps text-xs flex items-center gap-2 hover:bg-[#064e3b] transition-all cursor-pointer shadow-md shadow-[#003527]/20 self-start md:self-auto">
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          <span className="material-symbols-outlined text-sm">upload_file</span>
          Upload Photo
        </label>
      </header>

      {/* Filter & Search Bar */}
      <div className="glass-card p-4 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#404944] text-xl">
            search
          </span>
          <input
            type="text"
            placeholder="Search by title, photographer, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/70 border border-[#bfc9c3]/50 text-xs focus:outline-none focus:ring-2 focus:ring-[#003527]"
          />
        </div>

        {/* Tag chips */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTag === null
                ? 'bg-[#003527] text-white'
                : 'bg-[#c3ecd7] text-[#476c5b] hover:bg-[#003527]/20'
            }`}
          >
            All Media
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTag === tag
                  ? 'bg-[#003527] text-white'
                  : 'bg-[#c3ecd7] text-[#476c5b] hover:bg-[#003527]/20'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-white flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">visibility</span>
                {photo.views}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-headline-lg text-lg font-bold text-[#003527] mb-1 group-hover:text-[#064e3b] transition-colors">
                {photo.title}
              </h3>
              <p className="text-xs text-[#404944] mb-3">
                By {photo.photographer} • {photo.date}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {photo.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 bg-[#c3ecd7] text-[#476c5b] rounded text-[10px] font-bold"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Viewer Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card bg-[#f7f9fb] max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl relative border border-white/60 max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="relative max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.alt}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>
            <div className="p-6 overflow-y-auto space-y-3">
              <h3 className="font-headline-lg text-2xl font-bold text-[#003527]">
                {selectedPhoto.title}
              </h3>
              <p className="text-body-sm text-[#404944] text-xs leading-relaxed">
                {selectedPhoto.alt}
              </p>
              <div className="flex flex-wrap items-center justify-between border-t border-[#bfc9c3]/30 pt-4 text-xs text-[#404944]">
                <div>
                  <span className="font-bold text-[#003527]">Photographer:</span>{' '}
                  {selectedPhoto.photographer}
                </div>
                <div>
                  <span className="font-bold text-[#003527]">Date:</span> {selectedPhoto.date}
                </div>
                <div>
                  <span className="font-bold text-[#003527]">Views:</span> {selectedPhoto.views}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
