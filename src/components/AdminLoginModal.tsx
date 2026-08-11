import React, { useState } from 'react';

interface AdminLoginModalProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  onLoginSuccess,
  onCancel,
}) => {
  const [username, setUsername] = useState('staff@kumisi.ge');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      // Validate password (accept 'kumisi2024' or 'admin' or non-empty valid password)
      const cleanPass = password.trim();
      if (cleanPass === 'kumisi2024' || cleanPass === 'admin' || cleanPass.length >= 4) {
        onLoginSuccess();
      } else {
        setErrorMsg('Invalid password. Demo credentials: kumisi2024');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#003527]/80 backdrop-blur-md flex items-center justify-center p-4 selection:bg-[#c3ecd7] selection:text-[#476c5b]">
      <div className="glass-card bg-[#f7f9fb] max-w-md w-full rounded-3xl p-8 shadow-2xl relative border border-white/60">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-[#404944] hover:text-[#003527] p-2 rounded-full hover:bg-white/50 transition-all"
          title="Return to Sanctuary"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#003527] text-white flex items-center justify-center shadow-lg shadow-[#003527]/30 mb-4">
            <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
          </div>
          <h2 className="font-headline-xl text-2xl md:text-3xl font-bold text-[#003527]">
            Sanctuary Staff Portal
          </h2>
          <p className="text-xs text-[#404944] mt-1">
            Restricted access for Kumisi Lake conservation researchers and administrators.
          </p>
        </div>

        <div className="bg-[#c3ecd7]/50 border border-[#003527]/20 p-3.5 rounded-2xl mb-6 text-center text-xs text-[#003527]">
          <p className="font-bold flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-sm">key</span>
            Restricted Link Access
          </p>
          <p className="text-[11px] text-[#404944] mt-0.5">
            Passcode: <code className="bg-white/80 px-1.5 py-0.5 rounded font-mono font-bold text-[#003527]">kumisi2024</code>
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-[#ffdad6] text-[#93000a] text-xs font-bold rounded-xl text-center border border-[#ffb4ab]">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#003527] mb-1">
              Administrator Email
            </label>
            <input
              type="email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="staff@kumisi.ge"
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#bfc9c3]/50 text-xs focus:ring-2 focus:ring-[#003527] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#003527] mb-1">
              Passcode / Security Key
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter passcode (kumisi2024)"
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#bfc9c3]/50 text-xs focus:ring-2 focus:ring-[#003527] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#003527] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#064e3b] transition-all cursor-pointer shadow-lg shadow-[#003527]/30 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">
                  progress_activity
                </span>
                Authenticating...
              </>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onCancel}
            className="text-xs font-bold text-[#404944] hover:text-[#003527] hover:underline"
          >
            ← Back to Public Kumisi Sanctuary Website
          </button>
        </div>
      </div>
    </div>
  );
};
