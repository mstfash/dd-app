import { Trophy, Shield } from 'lucide-react';
import { Sport } from '../../types';
import { SPORTS_CONFIG } from '../../config/sports';

interface SportSelectionProps {
  selectedSport: Sport | '';
  setSelectedSport: (sport: Sport | '') => void;
  selectedTournament: string;
  setSelectedTournament: (id: string) => void;
  teamName: string;
  setTeamName: (name: string) => void;
}

export default function SportSelection({
  selectedSport,
  setSelectedSport,
  selectedTournament,
  setSelectedTournament,
  teamName,
  setTeamName,
}: SportSelectionProps) {
  const currentConfig = selectedSport ? SPORTS_CONFIG[selectedSport] : null;
  const tournaments = currentConfig?.tournaments || [];

  return (
    <div className="space-y-8">
      <div className="mb-6 md:mb-8">
        <label className="flex items-center gap-2 text-sm font-display font-semibold text-sage-600 mb-3 uppercase tracking-wide">
          <Trophy className="w-4 h-4" /> Select Sport *
        </label>
        <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value as Sport)}
          className="w-full p-3 md:p-4 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400 bg-white/90 font-medium text-sage-600 transition-all duration-300 hover:border-peach-400 text-base md:text-lg"
          required
        >
          <option value="">Choose a sport</option>
          {Object.values(SPORTS_CONFIG)
            .filter((s) => s.name !== 'Padel' && s.name !== 'Football')
            .map((sport) => (
              <option key={sport.name} value={sport.name}>
                {sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}
              </option>
            ))}
        </select>
      </div>

      {selectedSport && (
        <div className="mb-8">
          <label className="flex items-center gap-2 text-sm font-display font-semibold text-sage-600 mb-3 uppercase tracking-wide">
            <Shield className="w-4 h-4" /> Select Tournament *
          </label>
          <select
            value={selectedTournament}
            onChange={(e) => setSelectedTournament(e.target.value)}
            className="w-full p-4 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400 bg-white/90 font-medium text-sage-600 transition-all duration-300 hover:border-peach-400"
            required
          >
            <option value="">Choose a tournament</option>
            {tournaments.map((tournament) => (
              <option key={tournament.id} value={tournament.id}>
                {tournament.name} - {tournament.registrationFee} EGP
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-8">
        <label className="block text-sm font-display font-semibold text-sage-600 mb-3 uppercase tracking-wide">
          Team Name *
        </label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full p-4 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400 bg-white/90 font-medium placeholder:text-sage-400 transition-all duration-300 hover:border-peach-400"
          placeholder="Enter your team name"
          required
        />
      </div>
    </div>
  );
}
