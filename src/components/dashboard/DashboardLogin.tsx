import { useState } from 'react';
import { LogIn, AlertCircle } from 'lucide-react';
import { DEMO_CREDENTIALS } from '../../utils/constants';

interface DashboardLoginProps {
  onLogin: () => void;
}

export default function DashboardLogin({ onLogin }: DashboardLoginProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      credentials.username === DEMO_CREDENTIALS.username &&
      credentials.password === DEMO_CREDENTIALS.password
    ) {
      localStorage.setItem('dashboardAuth', 'true');
      onLogin();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-display font-bold text-brand-600 mb-6 text-center">
          Dashboard Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-brand-600 mb-2">
              Username
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              className="w-full p-3 border-2 border-brand-200 rounded-lg focus:ring-2 focus:ring-court-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-600 mb-2">
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className="w-full p-3 border-2 border-brand-200 rounded-lg focus:ring-2 focus:ring-court-400"
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-court-500 text-brand-950 rounded-lg hover:bg-court-400 transition-colors flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
