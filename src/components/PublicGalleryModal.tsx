import React, { useState } from 'react';
import { GalleryPhoto } from '../types';

interface PublicGalleryModalProps {
  photos: GalleryPhoto[];
  onClose: () => void;
  onUploadPhoto?: (file: File) => void;
}

export const PublicGalleryModal: React.FC<PublicGalleryModalProps> = ({
  photos,
  onClose,
  onUploadPhoto,
}) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

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
    if (e.target.files && e.target.files[0] && onUploadPhoto) {
      onUploadPhoto(e.target.files[0]);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-hidden">
      <div className="glass-card bg-[#f7f9fb] max-w-6xl w-full h-[90vh] rounded-3xl shadow-2xl relative border border-white/60 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-[#bfc9c3]/30 flex items-center justify-between bg-white/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#003527] text-2xl">
                photo_camera
              </span>
              <h2 className="font-headline-xl text-2xl md:text-3xl font-bold text-[#003527]">
                Kumisi Sanctuary Media Gallery
              </h2>
            </div>
            <p className="text-xs text-[#404944] mt-1">
              Explore photography of 270+ avian species, seasonal roosts, and mineral peloid waters.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onUploadPhoto && (
              <label className="bg-[#003527] text-white px-4 py-2.5 rounded-xl font-bold font-label-caps text-xs flex items-center gap-1.5 hover:bg-[#064e3b] transition-all cursor-pointer shadow-sm">
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <span className="material-symbols-outlined text-sm">upload</span>
                Submit Photo
              </label>
            )}

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#e0e3e5] text-[#003527] flex items-center justify-center hover:bg-[#003527] hover:text-white transition-all cursor-pointer"
              title="Close Gallery"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {uploadSuccess && (
          <div className="bg-[#c3ecd7] text-[#003527] px-6 py-2.5 text-xs font-bold text-center border-b border-[#003527]/20 animate-fade-in">
            ✓ Your photo has been submitted to the Kumisi Sanctuary media archive!
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="p-4 md:px-8 bg-[#e0e3e5]/30 border-b border-[#bfc9c3]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#404944] text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search pelicans, storks, mud, photographers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/80 border border-[#bfc9c3]/50 text-xs focus:outline-none focus:ring-2 focus:ring-[#003527]"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTag === null
                  ? 'bg-[#003527] text-white'
                  : 'bg-[#c3ecd7] text-[#476c5b] hover:bg-[#003527]/20'
              }`}
            >
              All Photos ({photos.length})
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
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

        {/* Gallery Grid */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between border border-[#bfc9c3]/30"
            >
              <div className="relative aspect-video overflow-hidden bg-black/5">
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
              <div className="p-4">
                <h3 className="font-headline-lg text-base font-bold text-[#003527] mb-1 group-hover:text-[#064e3b] transition-colors line-clamp-1">
                  {photo.title}
                </h3>
                <p className="text-[11px] text-[#404944] mb-2">
                  Photo by <span className="font-semibold">{photo.photographer}</span> • {photo.date}
                </p>
                <div className="flex flex-wrap gap-1">
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
      </div>

      {/* Lightbox / Selected Photo View */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card bg-[#f7f9fb] max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl relative border border-white/60 max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
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
                  <span className="font-bold text-[#003527]">Captured Date:</span> {selectedPhoto.date}
                </div>
                <div>
                  <span className="font-bold text-[#003527]">Archive Views:</span> {selectedPhoto.views}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
