import React, { useState, useEffect } from 'react';
import { ViewMode, BlogPost, GalleryPhoto, TrackedSpecies, MigrationFlock, BlogStatus } from './types';
import { INITIAL_BLOG_POSTS, INITIAL_GALLERY_PHOTOS, INITIAL_SPECIES, MIGRATION_FLOCKS } from './data';
import { Sidebar } from './components/Sidebar';
import { AdminDashboard } from './components/AdminDashboard';
import { PublicSanctuary } from './components/PublicSanctuary';
import { GalleryManagerView } from './components/GalleryManagerView';
import { BlogManagerView } from './components/BlogManagerView';
import { AnalyticsView } from './components/AnalyticsView';
import { ArticleModal } from './components/ArticleModal';
import { NewEntryModal } from './components/NewEntryModal';
import { VolunteerModal } from './components/VolunteerModal';
import { SettingsModal } from './components/SettingsModal';
import { PublicGalleryModal } from './components/PublicGalleryModal';
import { AdminLoginModal } from './components/AdminLoginModal';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('public');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);

  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [photos, setPhotos] = useState<GalleryPhoto[]>(INITIAL_GALLERY_PHOTOS);
  const [speciesList] = useState<TrackedSpecies[]>(INITIAL_SPECIES);
  const [migrationFlocks] = useState<MigrationFlock[]>(MIGRATION_FLOCKS);

  // Modals state
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showPublicGalleryModal, setShowPublicGalleryModal] = useState(false);

  // Detect direct admin link on initial load or URL change
  useEffect(() => {
    const checkAdminUrl = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const hasAdminQuery = searchParams.get('admin') === 'true' || searchParams.get('admin') === '1';
      const hasAdminHash = window.location.hash === '#admin';
      
      if (hasAdminQuery || hasAdminHash) {
        if (!isAdminAuthenticated) {
          setShowAdminLogin(true);
        } else {
          setCurrentView('dashboard');
        }
      }
    };

    checkAdminUrl();
    window.addEventListener('popstate', checkAdminUrl);
    window.addEventListener('hashchange', checkAdminUrl);
    return () => {
      window.removeEventListener('popstate', checkAdminUrl);
      window.removeEventListener('hashchange', checkAdminUrl);
    };
  }, [isAdminAuthenticated]);

  // Handle Navigation
  const handleNavigate = (view: ViewMode) => {
    if (view === 'public') {
      setCurrentView('public');
      return;
    }

    // Admin view request
    if (!isAdminAuthenticated) {
      setShowAdminLogin(true);
    } else {
      setCurrentView(view);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setShowAdminLogin(false);
    setCurrentView('dashboard');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentView('public');
    setShowAdminLogin(false);
    // Clean URL query/hash if any
    if (window.location.search.includes('admin=') || window.location.hash === '#admin') {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  // Add new post
  const handleAddPost = (newPost: BlogPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  // Update post status
  const handleUpdatePostStatus = (id: string, newStatus: BlogStatus) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus, lastEdited: 'Just now' } : p))
    );
  };

  // Upload photo handler
  const handleUploadPhoto = (file: File) => {
    const url = URL.createObjectURL(file);
    const newPhoto: GalleryPhoto = {
      id: `photo-${Date.now()}`,
      title: file.name.replace(/\.[^/.]+$/, ''),
      url,
      alt: file.name,
      photographer: 'Sanctuary Contributor',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tags: ['NewUpload', 'Wetlands'],
      views: 1,
    };
    setPhotos((prev) => [newPhoto, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col font-body-md">
      {/* Public Sanctuary View */}
      {currentView === 'public' ? (
        <PublicSanctuary
          posts={posts}
          migrationFlocks={migrationFlocks}
          onNavigate={handleNavigate}
          onOpenArticleModal={(post) => setActiveArticle(post)}
          onOpenVolunteerModal={() => setShowVolunteerModal(true)}
          onOpenSupportModal={() => setShowVolunteerModal(true)}
          onOpenGalleryModal={() => setShowPublicGalleryModal(true)}
        />
      ) : (
        /* Protected Admin Dashboard Layout */
        <div className="flex min-h-screen relative">
          <Sidebar
            currentView={currentView}
            onNavigate={(view) => {
              if (view === 'public') {
                handleAdminLogout();
              } else {
                handleNavigate(view);
              }
            }}
            onOpenNewEntry={() => setShowNewEntryModal(true)}
            onOpenSettings={() => setShowSettingsModal(true)}
          />

          {currentView === 'dashboard' && (
            <AdminDashboard
              posts={posts}
              photos={photos}
              onNavigate={handleNavigate}
              onOpenArticleModal={(post) => setActiveArticle(post)}
              onOpenNewEntryModal={() => setShowNewEntryModal(true)}
              onUploadPhoto={handleUploadPhoto}
            />
          )}

          {currentView === 'gallery' && (
            <GalleryManagerView
              photos={photos}
              onUploadPhoto={handleUploadPhoto}
            />
          )}

          {currentView === 'blog' && (
            <BlogManagerView
              posts={posts}
              onOpenArticleModal={(post) => setActiveArticle(post)}
              onOpenNewEntryModal={() => setShowNewEntryModal(true)}
              onAddPost={handleAddPost}
              onUpdateStatus={handleUpdatePostStatus}
            />
          )}

          {currentView === 'analytics' && (
            <AnalyticsView speciesList={speciesList} flocks={migrationFlocks} />
          )}
        </div>
      )}

      {/* Admin Login Modal (Triggered by admin URL link or protected route access) */}
      {showAdminLogin && (
        <AdminLoginModal
          onLoginSuccess={handleAdminLoginSuccess}
          onCancel={() => {
            setShowAdminLogin(false);
            setCurrentView('public');
          }}
        />
      )}

      {/* Public Photo Gallery Modal */}
      {showPublicGalleryModal && (
        <PublicGalleryModal
          photos={photos}
          onClose={() => setShowPublicGalleryModal(false)}
          onUploadPhoto={handleUploadPhoto}
        />
      )}

      {/* Global Modals */}
      {activeArticle && (
        <ArticleModal post={activeArticle} onClose={() => setActiveArticle(null)} />
      )}

      {showNewEntryModal && (
        <NewEntryModal
          onClose={() => setShowNewEntryModal(false)}
          onAddPost={handleAddPost}
        />
      )}

      {showVolunteerModal && (
        <VolunteerModal onClose={() => setShowVolunteerModal(false)} />
      )}

      {showSettingsModal && (
        <SettingsModal onClose={() => setShowSettingsModal(false)} />
      )}
    </div>
  );
}
