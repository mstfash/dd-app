import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { MatchInterface } from '../../utils/types';

interface LeagueSelectorProps {
  onSelectLeague: (sportType: string) => void;
  matches: MatchInterface[];
}

const leagues = [
  {
    id: 'football',
    name: 'Football Tournament',
    description: '5-a-side football on premium turf with a massive prize pool!',
    image:
      'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&auto=format&fit=crop',
  },
  {
    id: 'padel',
    name: 'Padel Tournament',
    description: 'Padel tournament with 4 competitive divisions',
    image:
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop',
  },
  {
    id: 'basketball',
    name: 'Basketball Tournament',
    description: 'Fast-paced 3x3 basketball',
    image:
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop',
  },
  {
    id: 'padbol',
    name: 'Padbol Tournament',
    description: 'The exciting fusion sport with great prizes',
    image:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop',
  },
];

export default function LeagueSelector({
  onSelectLeague,
  matches,
}: LeagueSelectorProps) {
  const [hoveredLeague, setHoveredLeague] = useState<string | null>(null);
  const getLeagueStats = (leagueId: string) => {
    const leagueMatches = matches.filter(
      (match) => match.type.toLowerCase() === leagueId
    ) as MatchInterface[];

    const teams: string[] = [];
    leagueMatches.forEach((match) => {
      if (!teams.includes(match.homeTeam.id)) {
        teams.push(match.homeTeam.id);
      }
      if (!teams.includes(match.awayTeam.id)) {
        teams.push(match.awayTeam.id);
      }
    });
    return {
      teams: teams.length,
      matches: leagueMatches.length,
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {leagues.map((league) => (
        <div
          key={league.id}
          className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
            hoveredLeague === league.id
              ? 'border-peach-400 shadow-lg'
              : 'border-transparent'
          }`}
          onClick={() => onSelectLeague(league.id)}
          onMouseEnter={() => setHoveredLeague(league.id)}
          onMouseLeave={() => setHoveredLeague(null)}
        >
          <div className="h-40 overflow-hidden">
            <img
              src={league.image}
              alt={league.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                hoveredLeague === league.id ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-display font-semibold text-sage-600 mb-2">
                  {league.name}
                </h3>
                <p className="text-sage-500 text-sm mb-4">
                  {league.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-sage-500">
                  <span>{getLeagueStats(league.id).teams} Teams</span>
                  <span>•</span>
                  <span>{getLeagueStats(league.id).matches} Matches</span>
                </div>
              </div>
              <div
                className={`p-2 rounded-full ${
                  hoveredLeague === league.id
                    ? 'bg-peach-400 text-white'
                    : 'bg-sage-100 text-sage-500'
                } transition-colors`}
              >
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
