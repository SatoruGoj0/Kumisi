import React, { useState } from 'react';
import { BlogPost, MigrationFlock, ViewMode } from '../types';
import { HeaderPublic } from './HeaderPublic';
import { OrnithologyAiGuide } from './OrnithologyAiGuide';

interface PublicSanctuaryProps {
  posts: BlogPost[];
  migrationFlocks: MigrationFlock[];
  onNavigate: (view: ViewMode) => void;
  onOpenArticleModal: (post: BlogPost) => void;
  onOpenVolunteerModal: () => void;
  onOpenSupportModal: () => void;
  onOpenGalleryModal: () => void;
}

export const PublicSanctuary: React.FC<PublicSanctuaryProps> = ({
  posts,
  migrationFlocks,
  onNavigate,
  onOpenArticleModal,
  onOpenVolunteerModal,
  onOpenSupportModal,
  onOpenGalleryModal,
}) => {
  const [emailAlert, setEmailAlert] = useState('');
  const [alertSubscribed, setAlertSubscribed] = useState(false);
  const [activeFlock, setActiveFlock] = useState<MigrationFlock | null>(null);
  const [guidebookDownloaded, setGuidebookDownloaded] = useState(false);

  const handleSubscribeAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailAlert.trim()) {
      setAlertSubscribed(true);
      setTimeout(() => setAlertSubscribed(false), 4000);
      setEmailAlert('');
    }
  };

  const handleDownloadGuidebook = () => {
    setGuidebookDownloaded(true);
    setTimeout(() => setGuidebookDownloaded(false), 4000);
  };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen font-body-md selection:bg-[#c3ecd7] selection:text-[#476c5b]">
      {/* Header */}
      <HeaderPublic
        onNavigate={onNavigate}
        onOpenGalleryModal={onOpenGalleryModal}
        onOpenSupportModal={onOpenSupportModal}
      />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 px-4">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover scale-105 transform transition-transform duration-1000"
              alt="Kumisi Lake panoramic dawn view"
              src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&h=1080&fit=crop&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#003527]/30 via-transparent to-[#f7f9fb]" />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-14 rounded-3xl inline-block shadow-2xl animate-float border border-white/50">
              <h1 className="font-headline-xl text-4xl sm:text-5xl md:text-6xl text-[#003527] mb-6 hero-text-shadow leading-tight font-extrabold">
                Where Nature Finds Its Rhythm
              </h1>
              <p className="font-body-md text-[#404944] max-w-2xl mx-auto mb-8 text-base md:text-lg leading-relaxed">
                Experience the serene majesty of Kumisi Lake, a sanctuary reborn from an artificial reservoir into a critical haven for over 100,000 migratory birds.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="#history"
                  className="bg-[#003527] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#064e3b] transition-all shadow-lg shadow-[#003527]/30 active:scale-95"
                >
                  Explore History
                  <span className="material-symbols-outlined">arrow_downward</span>
                </a>
                <button
                  onClick={onOpenGalleryModal}
                  className="glass-card bg-white/40 text-[#003527] border border-[#003527]/20 px-8 py-4 rounded-xl font-bold flex items-center justify-center hover:bg-white/70 transition-all active:scale-95 cursor-pointer"
                >
                  View Photo Gallery
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Ornithology AI Guide Section on Main Page */}
        <OrnithologyAiGuide />

        {/* Recent Updates & Popular Insights Layout */}
        <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Recent Updates Feed */}
            <div className="lg:w-2/3 space-y-8">
              <div className="border-l-4 border-[#003527] pl-4">
                <h2 className="font-headline-xl text-3xl font-bold text-[#003527]">
                  Recent Updates
                </h2>
                <p className="text-[#404944] text-sm mt-1">
                  Field telemetry reports and sanctuary preservation news.
                </p>
              </div>

              {/* Grid of 2 Cards Top */}
              <div className="grid md:grid-cols-2 gap-6">
                {posts.slice(0, 2).map((post) => (
                  <div
                    key={post.id}
                    onClick={() => onOpenArticleModal(post)}
                    className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
                  >
                    <div>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-[#f7f9fb]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#003527] shadow-sm">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-6">
                        <p className="text-xs text-[#404944] mb-2 font-semibold">{post.date}</p>
                        <h3 className="font-headline-lg text-xl font-bold text-[#003527] mb-2 group-hover:text-[#064e3b] transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-body-sm text-[#404944] line-clamp-3 text-sm leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                    </div>
                    <div className="p-6 pt-0 flex items-center gap-1 text-[#003527] font-bold text-xs uppercase tracking-wider group-hover:underline">
                      Read story
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Large Featured Card Bottom */}
              {posts[2] && (
                <div
                  onClick={() => onOpenArticleModal(posts[2])}
                  className="glass-card rounded-2xl overflow-hidden grid md:grid-cols-12 gap-0 hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="md:col-span-5 relative min-h-[220px]">
                    <img
                      src={posts[2].image}
                      alt={posts[2].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-[#c3ecd7] text-[#476c5b] font-label-caps text-[11px] mb-3 uppercase">
                        {posts[2].category}
                      </span>
                      <p className="text-xs text-[#404944] mb-1 font-semibold">{posts[2].date}</p>
                      <h3 className="font-headline-lg text-2xl font-bold text-[#003527] mb-3 group-hover:text-[#064e3b] transition-colors">
                        {posts[2].title}
                      </h3>
                      <p className="text-body-sm text-[#404944] text-sm leading-relaxed">
                        {posts[2].summary}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-[#003527] font-bold text-xs uppercase tracking-wider group-hover:underline">
                      Read the impact report
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:w-1/3 space-y-6">
              {/* Popular Insights Card */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-headline-lg text-xl font-bold text-[#003527] mb-4">
                  Popular Insights
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: '5 Benefits of Kumisi Mineral Mud',
                      reads: '1.2k Reads',
                      img: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=200&h=200&fit=crop&q=80',
                    },
                    {
                      title: 'Identifying the Dalmatian Pelican',
                      reads: '980 Reads',
                      img: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=200&h=200&fit=crop&q=80',
                    },
                    {
                      title: 'Eco-Tourism: How to Visit Responsibly',
                      reads: '850 Reads',
                      img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=200&h=200&fit=crop&q=80',
                    },
                  ].map((insight, idx) => (
                    <div
                      key={idx}
                      onClick={() => onNavigate('blog')}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/50 transition-colors cursor-pointer group"
                    >
                      <img
                        src={insight.img}
                        alt={insight.title}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-[#003527] group-hover:text-[#064e3b] line-clamp-2">
                          {insight.title}
                        </h4>
                        <p className="text-xs text-[#404944] mt-0.5">{insight.reads}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Migration Map Widget */}
              <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-headline-lg text-xl font-bold text-[#003527]">
                    Migration Map
                  </h3>
                  <button
                    onClick={() => onNavigate('analytics')}
                    className="text-[#003527] text-xs font-bold hover:underline flex items-center gap-1"
                  >
                    Expand
                    <span className="material-symbols-outlined text-sm">aspect_ratio</span>
                  </button>
                </div>
                <p className="text-xs text-[#404944] mb-4">Real-time tracking of tagged flocks.</p>

                {/* Simulated Map Container */}
                <div className="relative h-44 rounded-xl overflow-hidden bg-[#2d3133] border border-[#bfc9c3]/30 flex items-center justify-center p-2">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 filter contrast-125 grayscale hover:grayscale-0 transition-all"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&q=80')`,
                    }}
                  />
                  {migrationFlocks.map((flock) => (
                    <div
                      key={flock.id}
                      onClick={() => setActiveFlock(flock)}
                      style={{ left: `${flock.coordinates.x}%`, top: `${flock.coordinates.y}%` }}
                      className="absolute w-4 h-4 rounded-full bg-[#31c98f] border-2 border-white shadow-lg animate-pulse cursor-pointer hover:scale-150 transition-transform"
                      title={`${flock.species}: ${flock.flockSize} birds`}
                    />
                  ))}
                  <div className="absolute bottom-3 left-3 right-3 glass-card bg-white/80 px-3 py-1.5 rounded-lg flex items-center justify-between text-[11px] font-bold text-[#003527]">
                    <span>
                      {activeFlock
                        ? `${activeFlock.species} (${activeFlock.flockSize})`
                        : 'Live Activity: High'}
                    </span>
                    <span className="text-[#064e3b]">GPS Connected</span>
                  </div>
                </div>
              </div>

              {/* Bird Alerts Box */}
              <div className="bg-[#003527] text-white p-6 rounded-2xl relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-[#31c98f]/20 rounded-full blur-2xl pointer-events-none" />
                <h3 className="font-headline-lg text-xl font-bold mb-2">Bird Alerts</h3>
                <p className="text-xs text-[#b0f0d6] mb-4 leading-relaxed">
                  Get instant SMS or Email notifications for rare sightings and migration peaks.
                </p>

                {alertSubscribed ? (
                  <div className="bg-[#064e3b] p-3.5 rounded-xl border border-[#31c98f]/40 text-center text-xs font-bold text-[#b0f0d6]">
                    ✓ Subscribed to Kumisi Sanctuary alerts!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribeAlert} className="space-y-3">
                    <input
                      type="email"
                      required
                      value={emailAlert}
                      onChange={(e) => setEmailAlert(e.target.value)}
                      placeholder="Email Address"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#064e3b]/80 border border-[#31c98f]/30 text-white placeholder-white/50 text-xs focus:outline-none focus:ring-2 focus:ring-[#31c98f]"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#b0f0d6] text-[#003527] py-2.5 rounded-xl font-bold text-xs hover:bg-[#6ffbbe] transition-all cursor-pointer"
                    >
                      Subscribe Now
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* A Transformed Sanctuary Section */}
        <section
          id="history"
          className="py-24 px-4 md:px-12 bg-[#f2f4f6] relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
                <img
                  className="w-full h-full object-cover"
                  alt="A Transformed Sanctuary History image"
                  src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&q=80"
                />
                <div className="absolute bottom-6 left-6 right-6 glass-card p-6 rounded-2xl border border-white/60 shadow-xl">
                  <span className="font-label-caps text-xs text-[#003527] uppercase block mb-1 font-bold">
                    Status
                  </span>
                  <span className="font-headline-lg text-2xl font-bold text-[#003527]">
                    Vital Stopover Point
                  </span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#c3ecd7] text-[#476c5b] font-label-caps text-xs font-bold mb-4">
                THE HISTORY
              </span>
              <h2 className="font-headline-xl text-4xl md:text-5xl font-bold text-[#003527] mb-6 leading-tight">
                A Transformed Sanctuary
              </h2>
              <p className="text-body-md text-[#404944] mb-8 leading-relaxed">
                Once an artificial reservoir designed for industrial utility, Lake Kumisi has undergone a remarkable ecological metamorphosis. Today, it stands as one of Georgia's most significant wetlands, serving as a vital resting and refueling station for avian travelers.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-2xl border-l-4 border-[#003527]">
                  <span className="material-symbols-outlined text-[#003527] text-4xl mb-2">
                    flight_takeoff
                  </span>
                  <h4 className="font-bold text-[#003527] text-xl mb-1">100,000+</h4>
                  <p className="text-body-sm text-[#404944] text-xs">
                    Birds supported during peak migration seasons annually.
                  </p>
                </div>
                <div className="glass-card p-6 rounded-2xl border-l-4 border-[#416656]">
                  <span className="material-symbols-outlined text-[#416656] text-4xl mb-2">
                    water_drop
                  </span>
                  <h4 className="font-bold text-[#416656] text-xl mb-1">Artificial to Organic</h4>
                  <p className="text-body-sm text-[#404944] text-xs">
                    A unique example of human engineering turning into a natural masterpiece.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ecological Vitality Section */}
        <section
          id="ecology"
          className="py-24 px-4 md:px-12 bg-white relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-headline-xl text-4xl md:text-5xl font-bold text-[#003527] mb-4">
                Ecological Vitality
              </h2>
              <p className="text-body-md text-[#404944] text-base">
                Kumisi Lake is a critical node in the Black Sea/Mediterranean Flyway, hosting a staggering diversity of life within its reeds and waters.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid md:grid-cols-12 gap-6 min-h-[500px]">
              <div className="md:col-span-8 group relative rounded-3xl overflow-hidden glass-card min-h-[380px]">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Dalmatian Pelican wading through shallow reeds"
                  src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/90 via-[#064e3b]/30 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="font-headline-lg text-3xl font-bold mb-2">270+ Avian Species</h3>
                  <p className="max-w-md text-[#e0e3e5] text-sm">
                    From the majestic pelicans to the smallest sandpipers, the lake hosts nearly 70% of Georgia's bird diversity.
                  </p>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col gap-6">
                <div className="flex-1 glass-card p-8 rounded-3xl flex flex-col justify-center border border-[#bfc9c3]/30">
                  <span className="material-symbols-outlined text-[#064e3b] text-5xl mb-4">
                    map
                  </span>
                  <h3 className="font-bold text-[#003527] text-xl mb-2">Global Flyway</h3>
                  <p className="text-body-sm text-[#404944] text-xs leading-relaxed">
                    A strategic intersection for transcontinental migration between Europe, Africa, and Asia.
                  </p>
                </div>
                <div className="flex-1 bg-[#003527] text-white p-8 rounded-3xl flex flex-col justify-center shadow-xl">
                  <span className="material-symbols-outlined text-[#c3ecd7] text-5xl mb-4">
                    eco
                  </span>
                  <h3 className="font-bold text-2xl mb-2 text-white">Protected Status</h3>
                  <p className="text-body-sm text-[#b0f0d6]/90 text-xs leading-relaxed">
                    Ongoing efforts to secure permanent conservation status for this fragile habitat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Healing Waters Section */}
        <section
          id="healing"
          className="py-24 px-4 md:px-12 bg-[#e0e3e5]/40"
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="font-headline-xl text-4xl md:text-5xl font-bold text-[#003527] mb-6">
                Healing Waters &amp; Earth
              </h2>
              <p className="text-body-md text-[#404944] mb-8 leading-relaxed">
                Beyond its ecological significance, Kumisi is famed for its mineral wealth. The lake's sulfide-rich mud is renowned for its therapeutic properties, traditionally used in the historic sulfur baths of Tbilisi for treating skin and joint ailments.
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#c3ecd7] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#476c5b]">spa</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#003527] text-lg">Sulfide Peloids</h4>
                    <p className="text-body-sm text-[#404944] text-xs mt-1">
                      Highly concentrated minerals used in balneological therapy.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#c3ecd7] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#476c5b]">
                      medication
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#003527] text-lg">Traditional Medicine</h4>
                    <p className="text-body-sm text-[#404944] text-xs mt-1">
                      A cornerstone of regional wellness and natural recovery practices for centuries.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="lg:w-1/2 relative w-full">
              <div className="grid grid-cols-2 gap-4">
                <div className="pt-8">
                  <img
                    className="rounded-3xl shadow-lg mb-4 h-64 w-full object-cover"
                    alt="Mineral-rich dark sulfide mud"
                    src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&q=80"
                  />
                  <div className="glass-card p-4 rounded-2xl text-center">
                    <p className="font-label-caps text-xs text-[#003527] font-bold">CURATIVE MUD</p>
                  </div>
                </div>
                <div>
                  <img
                    className="rounded-3xl shadow-lg mb-4 h-80 w-full object-cover"
                    alt="Shallow mineral waters"
                    src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&q=80"
                  />
                  <div className="glass-card p-4 rounded-2xl text-center">
                    <p className="font-label-caps text-xs text-[#003527] font-bold">
                      MINERAL SPRINGS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Become a Guardian CTA */}
        <section className="py-24 px-4 md:px-12 bg-[#e6e8ea]/50 text-center">
          <div className="max-w-4xl mx-auto glass-card p-10 md:p-16 rounded-[40px] relative overflow-hidden shadow-2xl">
            <h2 className="font-headline-xl text-4xl md:text-5xl font-bold text-[#003527] mb-4">
              Become a Guardian
            </h2>
            <p className="text-body-md text-[#404944] mb-8 max-w-2xl mx-auto text-base">
              Join our network of researchers and nature lovers. Receive monthly deep-dives into the biodiversity of the Kumisi ecosystem.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={onOpenVolunteerModal}
                className="bg-[#003527] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#064e3b] transition-all shadow-lg shadow-[#003527]/20 active:scale-95 cursor-pointer"
              >
                Volunteer Today
              </button>
              <button
                onClick={handleDownloadGuidebook}
                className="glass-card border border-[#003527]/30 text-[#003527] px-8 py-4 rounded-2xl font-bold hover:bg-white/60 transition-all active:scale-95 cursor-pointer"
              >
                {guidebookDownloaded ? '✓ Downloaded Guidebook PDF' : 'Download Guidebook'}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 bg-[#d8dadc]/60 border-t border-[#bfc9c3]/50 text-sm">
        <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-12 max-w-7xl mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#003527] text-2xl">
                nature_people
              </span>
              <span className="font-headline-lg text-xl font-bold text-[#003527]">
                Kumisi Lake
              </span>
            </div>
            <p className="font-body-sm text-[#404944] text-xs max-w-xs text-center md:text-left">
              © 2025 Kumisi Lake Bird Sanctuary. Preserving Georgia's Natural Heritage.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-[#404944]">
            <a href="#history" className="hover:text-[#003527] transition-colors">
              History
            </a>
            <button onClick={onOpenGalleryModal} className="hover:text-[#003527] transition-colors cursor-pointer">
              Photo Gallery
            </button>
            <a href="#ecology" className="hover:text-[#003527] transition-colors">
              Conservation
            </a>
            <a href="#healing" className="hover:text-[#003527] transition-colors">
              Healing Waters
            </a>
          </nav>

          <div className="flex gap-3">
            <button
              onClick={() => alert('Sharing Kumisi Lake Sanctuary link!')}
              className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-[#003527] hover:bg-[#003527] hover:text-white transition-all shadow-sm"
              title="Share Sanctuary"
            >
              <span className="material-symbols-outlined text-lg">share</span>
            </button>
            <button
              onClick={() => alert('Kumisi Lake Location: Gardabani Municipality, Georgia (41.5833° N, 44.8333° E)')}
              className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-[#003527] hover:bg-[#003527] hover:text-white transition-all shadow-sm"
              title="Location map"
            >
              <span className="material-symbols-outlined text-lg">location_on</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
