import { Users } from 'lucide-react';
import { MatchInterface } from '../../../utils/types';

const SPORT_POSITIONS = {
  football: {
    defaultPositions: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
    label: 'Position',
  },
  basketball: {
    defaultPositions: [
      'Point Guard',
      'Shooting Guard',
      'Small Forward',
      'Power Forward',
      'Center',
    ],
    label: 'Position',
  },
  padel: {
    defaultPositions: ['Drive', 'Reves'],
    label: 'Side',
  },
  padbol: {
    defaultPositions: ['Server', 'Receiver'],
    label: 'Role',
  },
};

interface MatchLineupProps {
  match: MatchInterface;
}

interface LineupSectionProps {
  title: string;
  players: Array<{
    name: string;
    isCaptain: boolean;
    position: string;
    sport: string;
  }>;
}

function LineupSection({ title, players }: LineupSectionProps) {
  return (
    <div className="mb-8">
      <h4 className="text-lg font-medium text-brand-700 mb-4">{title}</h4>
      <div className="space-y-3">
        {players.map((player, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-brand-50 rounded-lg p-4"
          >
            <div>
              <div className="font-medium text-brand-700">
                {player.name}{' '}
                {player.isCaptain && (
                  <span className="text-court-500">(C)</span>
                )}
              </div>
              <div className="text-sm text-brand-400">
                {SPORT_POSITIONS[player.sport as keyof typeof SPORT_POSITIONS]
                  ?.label || 'Position'}
                : {player.position}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MatchLineup({ match }: MatchLineupProps) {
  const homeStarters = match.lineUp
    .filter((player) => player.isHomeTeam && !player.isSub)
    .map((p) => ({ ...p, sport: match.type }));
  const homeSubstitutes = match.lineUp
    .filter((player) => player.isHomeTeam && player.isSub)
    .map((p) => ({ ...p, sport: match.type }));
  const awayStarters = match.lineUp
    .filter((player) => !player.isHomeTeam && !player.isSub)
    .map((p) => ({ ...p, sport: match.type }));
  const awaySubstitutes = match.lineUp
    .filter((player) => !player.isHomeTeam && player.isSub)
    .map((p) => ({ ...p, sport: match.type }));

  return (
    <div>
      <h3 className="text-xl font-display font-semibold text-brand-700 mb-6 flex items-center gap-2">
        <Users className="w-5 h-5 text-court-500" />
        {match.type.charAt(0).toUpperCase() + match.type.slice(1)} Lineup
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-brand-700">
            {match.homeTeam.teams[0]?.name}
          </h3>
          <LineupSection
            title={
              match.type === 'padel' || match.type === 'padbol'
                ? 'Players'
                : 'Starting Lineup'
            }
            players={homeStarters}
          />
          {homeSubstitutes.length > 0 && (
            <LineupSection title="Substitutes" players={homeSubstitutes} />
          )}
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium text-brand-700">
            {match.awayTeam.teams[0]?.name}
          </h3>
          <LineupSection
            title={
              match.type === 'padel' || match.type === 'padbol'
                ? 'Players'
                : 'Starting Lineup'
            }
            players={awayStarters}
          />
          {awaySubstitutes.length > 0 && (
            <LineupSection title="Substitutes" players={awaySubstitutes} />
          )}
        </div>
      </div>
    </div>
  );
}
