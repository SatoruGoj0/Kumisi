import React, { useState } from 'react';
import { MigrationFlock, TrackedSpecies } from '../types';

interface AnalyticsViewProps {
  speciesList: TrackedSpecies[];
  flocks: MigrationFlock[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ speciesList, flocks }) => {
  const [selectedSpecies, setSelectedSpecies] = useState<TrackedSpecies | null>(null);
  const [query, setQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleAskSpecies = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoadingAi(true);
    setAiAnswer(null);

    try {
      const res = await fetch('/api/ai/species-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setAiAnswer(data.answer);
    } catch (err) {
      setAiAnswer(
        'Kumisi Lake Sanctuary hosts over 270 bird species along the Black Sea flyway, offering vital roosting grounds for migrating pelicans, kingfishers, and stilts.'
      );
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <main className="flex-1 md:ml-64 p-6 md:p-12 min-h-screen pb-24 md:pb-12">
      <header className="mb-8">
        <h2 className="font-headline-xl text-3xl md:text-4xl font-bold text-[#003527]">
          Conservation Telemetry &amp; Analytics
        </h2>
        <p className="font-body-sm text-[#404944] mt-1">
          Real-time GPS tracking of migratory flocks, species population censuses, and hydro-ecological data.
        </p>
      </header>

      {/* Top Grid: Live Migration Radar & Species Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Interactive Telemetry Map (2 cols) */}
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden min-h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-headline-lg text-xl font-bold text-[#003527]">
                Live Avian Telemetry Radar
              </h3>
              <p className="text-xs text-[#404944]">
                Lake Kumisi GPS tracking feed • Active solar collars
              </p>
            </div>
            <span className="bg-[#31c98f]/20 text-[#005236] px-3 py-1 rounded-full text-xs font-bold border border-[#31c98f]/40 animate-pulse">
              ● Live Stream
            </span>
          </div>

          <div className="relative flex-1 rounded-2xl overflow-hidden bg-[#2d3133] border border-[#bfc9c3]/30 min-h-[280px] p-4 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-50 filter contrast-125"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYIPbNVv4i32qsL_v3qe0SIj-Y2uIZUvIPjvsNDPNrlts3D2DFret4qh4yI2IIFgGSXkPd3aTGEWewvfl2eQOsApROjke0dO20F5ei40-rCIPUqTercKtwyA_K50kNRkCTWcVHmejqq9pI-dqICl7sjdGiuD868ri4TwGbR7-IcaKOUBt08s-8SOAqlY2H6glG6dVBImVbaRIj-9O9B6dcA59N3dnYDvTAdbM6hmrb-xs_MUc3wv-s')`,
              }}
            />

            {/* Flock Markers */}
            {flocks.map((flock) => (
              <div
                key={flock.id}
                style={{ left: `${flock.coordinates.x}%`, top: `${flock.coordinates.y}%` }}
                className="absolute group cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#31c98f] border-2 border-white shadow-xl animate-bounce flex items-center justify-center">
                  <span className="material-symbols-outlined text-[10px] text-white">flight</span>
                </div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 glass-card bg-black/80 text-white px-2.5 py-1 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                  {flock.species}: {flock.flockSize} birds ({flock.direction})
                </div>
              </div>
            ))}

            <div className="absolute bottom-4 left-4 right-4 glass-card bg-white/90 p-3 rounded-xl flex flex-wrap items-center justify-between text-xs font-bold text-[#003527] gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#064e3b]">radar</span>
                <span>Active Collars: 34 Tagged Flocks</span>
              </div>
              <div>
                <span>Signal Quality: 99.4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Species Assistant Card (1 col) */}
        <div className="glass-card p-6 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#003527]">
              <span className="material-symbols-outlined text-2xl">help</span>
              <h3 className="font-headline-lg text-xl font-bold">Ornithology AI Guide</h3>
            </div>
            <p className="text-xs text-[#404944] mb-4">
              Ask any question regarding Kumisi species, seasonal arrivals, or peloid ecology.
            </p>

            <form onSubmit={handleAskSpecies} className="space-y-3">
              <textarea
                rows={3}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Why do Dalmatian Pelicans arrive early in March?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#bfc9c3]/50 text-xs focus:ring-2 focus:ring-[#003527] focus:outline-none"
              />
              <button
                type="submit"
                disabled={loadingAi}
                className="w-full bg-[#003527] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#064e3b] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loadingAi ? (
                  <>
                    <span className="material-symbols-outlined text-sm animate-spin">
                      progress_activity
                    </span>
                    Querying AI...
                  </>
                ) : (
                  'Ask Ornithologist'
                )}
              </button>
            </form>

            {aiAnswer && (
              <div className="mt-4 p-4 rounded-xl bg-[#c3ecd7]/40 border border-[#003527]/20 text-xs text-[#003527] leading-relaxed">
                <p className="font-bold mb-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  Gemini Insight:
                </p>
                {aiAnswer}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tracked Species Table */}
      <div className="glass-card p-8 rounded-3xl">
        <h3 className="font-headline-lg text-2xl font-bold text-[#003527] mb-6">
          Tracked Avian &amp; Wetland Species (48 Active)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#bfc9c3]/30 font-label-caps text-xs text-[#404944] uppercase">
                <th className="pb-4 font-normal">SPECIES NAME</th>
                <th className="pb-4 font-normal">SCIENTIFIC NAME</th>
                <th className="pb-4 font-normal">ESTIMATED COUNT</th>
                <th className="pb-4 font-normal">POPULATION TREND</th>
                <th className="pb-4 font-normal">ROOST LOCATION</th>
                <th className="pb-4 font-normal text-right">LAST SPOTTED</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#bfc9c3]/10">
              {speciesList.map((sp) => (
                <tr
                  key={sp.id}
                  onClick={() => setSelectedSpecies(sp)}
                  className="group hover:bg-[#e0e3e5]/30 transition-colors cursor-pointer"
                >
                  <td className="py-4 font-body-md font-bold text-[#003527]">{sp.name}</td>
                  <td className="py-4 font-body-sm text-xs italic text-[#404944]">
                    {sp.scientificName}
                  </td>
                  <td className="py-4 font-body-sm font-bold text-[#191c1e]">{sp.count}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        sp.status === 'Increasing'
                          ? 'bg-[#4edea3]/30 text-[#005236]'
                          : 'bg-[#e0e3e5] text-[#404944]'
                      }`}
                    >
                      {sp.status}
                    </span>
                  </td>
                  <td className="py-4 font-body-sm text-xs text-[#404944]">{sp.location}</td>
                  <td className="py-4 text-right font-body-sm text-xs text-[#404944]">
                    {sp.lastSpotted}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
