import {
  Clock,
  Calendar,
  FishSymbol as Futbol,
  Trophy,
  CircleDot,
  CircleOff,
} from 'lucide-react';
import { MatchInterface } from '../../utils/types';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

interface MatchCardProps {
  match: MatchInterface;
  onClick: () => void;
  isScreen?: boolean;
}

const getSportIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'football':
      return <Futbol className="w-4 h-4 text-peach-400" />;
    case 'basketball':
      return <CircleDot className="w-4 h-4 text-peach-400" />;
    case 'padel':
      return <Trophy className="w-4 h-4 text-peach-400" />;
    case 'padbol':
      return <CircleOff className="w-4 h-4 text-peach-400" />;
    default:
      return null;
  }
};

export default function MatchCard({
  match,
  onClick,
  isScreen = false,
}: MatchCardProps) {
  const navigate = useNavigate();
  const getMatchStatusDisplay = () => {
    if (match.isMatchLive) {
      return (
        <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs animate-pulse">
          <Clock className="w-3 h-3" />
          <span>LIVE</span>
          <span>{match.inMatchTime}'</span>
        </div>
      );
    } else if (match.isMatchEnded) {
      return (
        <div className="flex items-center gap-1 bg-brand-500 text-white px-2 py-0.5 rounded-full text-xs">
          <Clock className="w-3 h-3" />
          <span>FT</span>
        </div>
      );
    } else {
      // Match hasn't started yet
      const matchDate = new Date(match.matchDate);
      const formattedTime = matchDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      return (
        <div className="flex flex-col gap-1  text-xs w-[110px]">
          <div className="text-right font-bold text-peach-400">
            {dayjs(match.matchDate).format('DD/MM/YYYY')}
          </div>

          <div className="flex items-center justify-center gap-1 bg-brand-100 text-brand-600 px-2 py-0.5 rounded-full">
            <Calendar className="w-3 h-3" />
            <span>{formattedTime}</span>
          </div>
        </div>
      );
    }
  };

  const baseStyles = isScreen
    ? 'bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:border-peach-400/50 transition-all duration-300 cursor-pointer'
    : 'bg-white rounded-lg p-3 border border-brand-100 hover:border-peach-400 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer';

  const textStyles = isScreen ? 'text-white' : 'text-brand-700';

  const scoreStyles = isScreen ? 'text-peach-400' : 'text-peach-400';

  const statsTextStyles = isScreen ? 'text-brand-200' : 'text-brand-400';

  const statsBgStyles = isScreen ? 'bg-brand-700' : 'bg-brand-100';

  const borderStyles = isScreen ? 'border-white/10' : 'border-brand-100';

  return (
    <div className={baseStyles} onClick={onClick}>
      <div className="md:p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className={`text-sm ${textStyles} font-bold capitalize ml-6`}>
              {match.homeTeam.name.split(' ').pop()?.split('-').join(' ')}
            </span>
            <div className="flex items-center gap-2">
              {getSportIcon(match.type)}
              <span className={`text-sm ${textStyles}`}>
                {match.competition.name}
              </span>
            </div>
          </div>
          {getMatchStatusDisplay()}
        </div>

        <div className="flex items-center justify-between mb-2 overflow-hidden">
          {/* Home Team */}
          <div
            className="flex-1 text-right flex items-center cursor-pointer justify-end"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/team/${match.homeTeam.id}`);
            }}
          >
            <span
              className={`text-sm md:text-lg font-display font-semibold ${textStyles} truncate min-w-[100px] max-w-[100px] md:max-w-[200px] inline-block`}
            >
              {match.homeTeam.teams[0].name}
            </span>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center gap-1 min-w-[100px]">
            <div className="flex items-center gap-3">
              <span
                className={`text-2xl font-display font-bold ${
                  match.isMatchEnded || match.isMatchLive
                    ? scoreStyles
                    : textStyles
                }`}
              >
                {match.isMatchEnded || match.isMatchLive
                  ? match.homeTeamScore
                  : '-'}
              </span>
              <span className={textStyles}>:</span>
              <span
                className={`text-2xl font-display font-bold ${
                  match.isMatchEnded || match.isMatchLive
                    ? scoreStyles
                    : textStyles
                }`}
              >
                {match.isMatchEnded || match.isMatchLive
                  ? match.awayTeamScore
                  : '-'}
              </span>
            </div>
          </div>

          {/* Away Team */}
          <div
            className="flex-1 text-left pl-2 flex items-center cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/team/${match.awayTeam.id}`);
            }}
          >
            <span
              className={`text-sm md:text-lg font-display font-semibold ${textStyles} truncate min-w-[100px] max-w-[100px] md:max-w-[200px] overflow-hidden inline-block`}
            >
              {match.awayTeam.teams[0].name}
            </span>
          </div>
        </div>

        {/* Sport-specific stats */}
        {match.statistics && match.statistics.length > 0 && (
          <div className={`mt-3 pt-3 border-t ${borderStyles}`}>
            <div className="grid grid-cols-2 gap-4">
              {match.statistics.map((stat, index) => (
                <div key={index} className="text-sm">
                  <div
                    className={`flex justify-between ${statsTextStyles} mb-1`}
                  >
                    <span>{stat.homeTeam}%</span>
                    <span className="capitalize">{stat.type}</span>
                    <span>{stat.awayTeam}%</span>
                  </div>
                  <div
                    className={`h-1 ${statsBgStyles} rounded-full overflow-hidden`}
                  >
                    <div
                      className="h-full bg-peach-400 rounded-full"
                      style={{
                        width: `${parseInt(stat.homeTeam)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
