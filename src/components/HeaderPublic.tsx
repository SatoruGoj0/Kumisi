import React, { useState } from 'react';
import { ViewMode } from '../types';

interface HeaderPublicProps {
  onNavigate: (view: ViewMode) => void;
  onOpenGalleryModal: () => void;
  onOpenSupportModal: () => void;
}

export const HeaderPublic: React.FC<HeaderPublicProps> = ({
  onNavigate,
  onOpenGalleryModal,
  onOpenSupportModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 glass-nav border-b border-[#bfc9c3]/30 transition-all">
      <div className="flex justify-between items-center h-20 px-4 md:px-12 max-w-7xl mx-auto">
        {/* Logo */}
        <div
          onClick={() => onNavigate('public')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="material-symbols-outlined text-[#003527] text-3xl group-hover:scale-110 transition-transform">
            nature_people
          </span>
          <span className="font-headline-lg text-xl md:text-2xl font-bold text-[#003527]">
            Kumisi Lake Sanctuary
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6 items-center">
          <a
            href="#history"
            className="text-[#404944] hover:text-[#003527] transition-colors font-label-caps text-xs uppercase font-semibold"
          >
            History
          </a>
          <button
            onClick={onOpenGalleryModal}
            className="text-[#404944] hover:text-[#003527] transition-colors font-label-caps text-xs uppercase font-semibold cursor-pointer"
          >
            Gallery
          </button>
          <a
            href="#ecology"
            className="text-[#404944] hover:text-[#003527] transition-colors font-label-caps text-xs uppercase font-semibold"
          >
            Conservation
          </a>
          <a
            href="#healing"
            className="text-[#404944] hover:text-[#003527] transition-colors font-label-caps text-xs uppercase font-semibold"
          >
            Healing Waters
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSupportModal}
            className="hidden sm:block bg-[#003527] text-white px-6 py-2.5 rounded-full font-label-caps text-xs font-bold hover:bg-[#064e3b] transition-all active:scale-95 shadow-md shadow-[#003527]/20 cursor-pointer"
          >
            SUPPORT US
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#003527] p-2 rounded-lg hover:bg-[#e0e3e5]/50"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-b border-[#bfc9c3]/30 px-6 py-4 space-y-3">
          <a
            href="#history"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#404944] hover:text-[#003527] font-bold py-2"
          >
            History
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenGalleryModal();
            }}
            className="block text-left w-full text-[#404944] hover:text-[#003527] font-bold py-2"
          >
            Photo Gallery
          </button>
          <a
            href="#ecology"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#404944] hover:text-[#003527] font-bold py-2"
          >
            Conservation
          </a>
          <a
            href="#healing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#404944] hover:text-[#003527] font-bold py-2"
          >
            Healing Waters
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSupportModal();
            }}
            className="w-full mt-2 bg-[#003527] text-white py-3 rounded-xl font-bold"
          >
            SUPPORT US
          </button>
        </div>
      )}
    </header>
  );
};
