import React, { useState } from 'react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [sanctuaryName, setSanctuaryName] = useState('Kumisi Lake Sanctuary');
  const [telemetryInterval, setTelemetryInterval] = useState('15 mins');
  const [autoDraft, setAutoDraft] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-card bg-[#f7f9fb] max-w-md w-full rounded-3xl p-8 shadow-2xl relative border border-white/60">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#404944] hover:text-black"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <h3 className="font-headline-lg text-2xl font-bold text-[#003527] mb-2">
          Portal Settings
        </h3>
        <p className="text-xs text-[#404944] mb-6">
          Configure telemetry frequency, automated draft generators, and admin privileges.
        </p>

        {saved ? (
          <div className="p-4 bg-[#c3ecd7] text-[#003527] rounded-xl text-center font-bold text-xs">
            ✓ Settings saved successfully!
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#003527] mb-1">Sanctuary Name</label>
              <input
                type="text"
                value={sanctuaryName}
                onChange={(e) => setSanctuaryName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#bfc9c3]/50 text-xs focus:ring-2 focus:ring-[#003527] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#003527] mb-1">
                Telemetry Ping Interval
              </label>
              <select
                value={telemetryInterval}
                onChange={(e) => setTelemetryInterval(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#bfc9c3]/50 text-xs focus:ring-2 focus:ring-[#003527] focus:outline-none"
              >
                <option value="5 mins">Real-time (Every 5 mins)</option>
                <option value="15 mins">Standard (Every 15 mins)</option>
                <option value="1 hour">Power Save (Hourly)</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-[#003527]">
                AI Telemetry Auto-Drafting
              </span>
              <input
                type="checkbox"
                checked={autoDraft}
                onChange={(e) => setAutoDraft(e.target.checked)}
                className="w-4 h-4 accent-[#003527]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-[#bfc9c3]/30">
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
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
