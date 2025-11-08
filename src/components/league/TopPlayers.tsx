import { Trophy, Star, Award, Crown, Shield } from 'lucide-react';
import { TopPlayerType } from '../../utils/types';

interface TopPlayersProps {
  players: TopPlayerType[];
  statType: 'goals' | 'assists' | 'cleanSheets' | 'mvpPoints';
}

const getStatIcon = (statType: string) => {
  switch (statType) {
    case 'goals':
      return Trophy;
    case 'assists':
      return Award;
    case 'cleanSheets':
      return Shield;
    case 'mvpPoints':
      return Star;
    default:
      return Crown;
  }
};

export default function TopPlayers({ players, statType }: TopPlayersProps) {
  const getStatLabel = () => {
    switch (statType) {
      case 'goals':
        return 'Goals';
      case 'assists':
        return 'Assists';
      case 'cleanSheets':
        return 'Clean Sheets';
      case 'mvpPoints':
        return 'MVP Points';
      default:
        return 'Stats';
    }
  };

  const StatIcon = getStatIcon(statType);
  // get value from players based on stateType for each player

  const getValue = (player: TopPlayerType) => {
    switch (statType) {
      case 'goals':
        return player.goals;
      case 'assists':
        return player.assists;
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {players.map((player, index) => {
        return (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-md p-6 border-2 transition-all duration-300 ${
              index === 0
                ? 'border-peach-400 transform lg:scale-105'
                : 'border-brand-100'
            }`}
          >
            {/* Rank Badge */}
            <div className="flex items-center justify-between mb-4">
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                  index === 0
                    ? 'bg-peach-100 text-peach-400'
                    : index === 1
                    ? 'bg-brand-100 text-brand-700'
                    : 'bg-brand-50 text-brand-400'
                }`}
              >
                <StatIcon className="w-4 h-4" />
                <span className="font-display font-bold">#{index + 1}</span>
              </div>
              <div
                className={`text-3xl font-display font-bold ${
                  index === 0 ? 'text-peach-400' : 'text-brand-700'
                }`}
              >
                {getValue(player)}
              </div>
            </div>

            {/* Player Info */}
            <div>
              <h3 className="text-xl font-display font-bold text-brand-700 mb-1">
                {player.name}
              </h3>
              <p className="text-brand-400">{player.team}</p>
            </div>

            {/* Stats */}
            <div className="mt-4 pt-4 border-t border-brand-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-brand-400">{getStatLabel()}</span>
                <div className="flex items-center gap-2">
                  {index === 0 && <Crown className="w-4 h-4 text-peach-400" />}
                  <span
                    className={`font-bold ${
                      index === 0 ? 'text-peach-400' : 'text-brand-700'
                    }`}
                  >
                    {getValue(player)} {getStatLabel()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
