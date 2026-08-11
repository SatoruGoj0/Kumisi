import React, { useState } from 'react';

export const OrnithologyAiGuide: React.FC = () => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const kumisiKeywords = [
    'kumisi', 'кумиси', 'lake', 'sanctuary', 'pelican', 'stork', 'mud', 'peloid',
    'bird', 'avian', 'migrat', 'flyway', 'georgia', 'gardabani', 'wetland', 'reeds',
    'roost', 'nest', 'feather', 'species', 'sulfide', 'balneolog', 'ecosystem',
    'conservation', 'telemetry', 'flock', 'ring', 'water', 'wildlife', 'fauna', 'flora',
    'heron', 'egret', 'duck', 'goose', 'swan', 'falcon', 'eagle', 'kingfisher', 'orintholog'
  ];

  const checkIsKumisiRelated = (input: string): boolean => {
    const q = input.toLowerCase().trim();
    if (!q) return false;
    return kumisiKeywords.some((kw) => q.includes(kw));
  };

  const handleAsk = async (questionToAsk?: string) => {
    const promptText = (questionToAsk || query).trim();
    if (!promptText) return;

    setLoading(true);
    setAnswer(null);
    setIsBlocked(false);

    // Hardcoded client-side check
    if (!checkIsKumisiRelated(promptText)) {
      setLoading(false);
      setIsBlocked(true);
      setAnswer(
        'I am specialized strictly in Lake Kumisi Sanctuary. I can only answer questions related to Lake Kumisi, its bird migration, mineral mud, or Georgia wetland conservation.'
      );
      return;
    }

    try {
      const res = await fetch('/api/ai/species-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: promptText }),
      });
      const data = await res.json();
      setAnswer(data.answer);
      if (data.blocked) {
        setIsBlocked(true);
      }
    } catch (err) {
      setAnswer(
        'Kumisi Lake Sanctuary hosts over 270 bird species along the Black Sea flyway, offering vital roosting grounds for migrating pelicans, kingfishers, and stilts.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAsk();
  };

  const presetQuestions = [
    'What species of pelicans migrate to Lake Kumisi?',
    'Why is Kumisi mineral mud valuable for ecosystem & health?',
    'When does peak spring bird migration happen at Kumisi?',
    'How did Kumisi transform from an artificial lake into a sanctuary?',
  ];

  return (
    <section className="py-16 px-4 md:px-12 bg-[#003527] text-white relative overflow-hidden my-12 rounded-[40px] max-w-7xl mx-auto shadow-2xl">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#31c98f]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#c3ecd7]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#31c98f]/20 text-[#b0f0d6] text-xs font-bold border border-[#31c98f]/30 mb-3">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              ORNITHOLOGY AI GUIDE
            </div>
            <h2 className="font-headline-xl text-3xl md:text-4xl font-bold text-white">
              Ask Kumisi Sanctuary Assistant
            </h2>
            <p className="text-sm text-[#b0f0d6]/90 mt-1 max-w-xl">
              Instant AI answers regarding Lake Kumisi's 270+ avian species, telemetry tracking, peloid mud, and Georgia flyway history.
            </p>
          </div>

          <div className="text-right text-xs text-[#b0f0d6]/70 border-l-2 border-[#31c98f]/40 pl-4">
            <span className="font-bold text-white block">Topic Scope: Strictly Lake Kumisi</span>
            <span>Non-Kumisi queries are automatically blocked</span>
          </div>
        </div>

        {/* Preset Sample Chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          {presetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(q);
                handleAsk(q);
              }}
              className="bg-[#064e3b]/80 border border-[#31c98f]/30 hover:border-[#31c98f] text-[#b0f0d6] text-xs px-3.5 py-2 rounded-xl text-left transition-all hover:bg-[#064e3b] cursor-pointer"
            >
              💡 {q}
            </button>
          ))}
        </div>

        {/* Question Form */}
        <form onSubmit={handleSubmit} className="relative mb-6">
          <textarea
            rows={3}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about Lake Kumisi (e.g. Dalmatian pelican roosting, sulfide mud benefits, migration season)..."
            className="w-full px-5 py-4 rounded-2xl bg-[#064e3b]/90 border border-[#31c98f]/40 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#31c98f]"
          />
          <div className="mt-3 flex justify-between items-center">
            <span className="text-[11px] text-[#b0f0d6]/60">
              * Questions must be directly related to Lake Kumisi ecosystem.
            </span>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="bg-[#b0f0d6] text-[#003527] px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-[#6ffbbe] transition-all disabled:opacity-40 cursor-pointer flex items-center gap-2 shadow-md"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-sm animate-spin">
                    progress_activity
                  </span>
                  Analyzing...
                </>
              ) : (
                <>
                  Ask Guide
                  <span className="material-symbols-outlined text-sm">send</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* AI Output Card */}
        {answer && (
          <div
            className={`p-6 rounded-2xl border transition-all ${
              isBlocked
                ? 'bg-[#93000a]/20 border-[#ffb4ab]/40 text-white'
                : 'bg-[#064e3b] border-[#31c98f]/50 text-white shadow-xl'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-xl">
                {isBlocked ? 'block' : 'psychology'}
              </span>
              <h4 className="font-bold text-sm">
                {isBlocked ? 'Topic Guardrail Response' : 'Ornithologist Insight'}
              </h4>
            </div>
            <p className="text-sm leading-relaxed text-[#f7f9fb]">{answer}</p>
          </div>
        )}
      </div>
    </section>
  );
};
