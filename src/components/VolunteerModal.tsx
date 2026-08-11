import React, { useState } from 'react';

interface VolunteerModalProps {
  onClose: () => void;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Bird Census');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-card bg-[#f7f9fb] max-w-lg w-full rounded-3xl p-8 shadow-2xl relative border border-white/60">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#404944] hover:text-black"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <h3 className="font-headline-lg text-2xl font-bold text-[#003527] mb-2">
          Become a Kumisi Guardian
        </h3>
        <p className="text-xs text-[#404944] mb-6">
          Support bird ringing, shoreline cleanup, telemetry data processing, or guided ecotours.
        </p>

        {submitted ? (
          <div className="p-6 bg-[#c3ecd7] text-[#003527] rounded-2xl text-center space-y-2">
            <span className="material-symbols-outlined text-4xl text-[#003527]">
              check_circle
            </span>
            <h4 className="font-bold text-lg">Thank You, {name}!</h4>
            <p className="text-xs">
              Your registration as a Kumisi Sanctuary Volunteer has been received. Our team will contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#003527] mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Ana Tsintsadze"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#bfc9c3]/50 text-xs focus:ring-2 focus:ring-[#003527] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#003527] mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ana@example.ge"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#bfc9c3]/50 text-xs focus:ring-2 focus:ring-[#003527] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#003527] mb-1">Primary Interest</label>
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#bfc9c3]/50 text-xs focus:ring-2 focus:ring-[#003527] focus:outline-none"
              >
                <option value="Bird Census">Seasonal Bird Census &amp; Tagging</option>
                <option value="Shoreline Cleanup">Wetland Restoration &amp; Cleanup</option>
                <option value="Peloid Research">Mineral Mud &amp; Water Analysis</option>
                <option value="Guided EcoTours">Public Education &amp; Guided Tours</option>
              </select>
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
                className="bg-[#003527] text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-[#064e3b] transition-all cursor-pointer shadow-md shadow-[#003527]/20"
              >
                Submit Registration
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
