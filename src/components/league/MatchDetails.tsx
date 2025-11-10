import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Video,
  Users,
  Goal,
  Info,
} from 'lucide-react';
import MatchLineup from './match/MatchLineup';
import MatchActions from './match/MatchActions';
import MatchVideos from './match/MatchVideos';
import { MatchInterface } from '../../utils/types';
import useMatches from '../../hooks/useMatches';
import MatchInfo from './match/MatchInfo';
import { BasketballMatchSummary } from '../../utils/types';
import { simplifyTeamName } from './utils/statsUtils';

const isBasketballSummary = (
  detail: MatchInterface['actionDetails'][number]
): detail is BasketballMatchSummary => {
  if (!detail || typeof detail !== 'object') return false;
  const sport = (detail as BasketballMatchSummary).sport;
  return typeof sport === 'string' && sport.toLowerCase() === 'basketball';
};

const getBasketballPoints = (
  totals: BasketballMatchSummary['teams']['home']['totals'],
  quarterTotals: number,
  fallbackScore: number
) => {
  if (!totals) return quarterTotals || fallbackScore;
  if (typeof totals.points === 'number') return totals.points;
  if (typeof totals.points === 'string' && totals.points.trim()) {
    const parsed = Number(totals.points);
    if (!Number.isNaN(parsed)) return parsed;
  }
  if (totals.fieldGoalsMade || totals.threePointersMade || totals.freeThrowsMade) {
    const three = Number(totals.threePointersMade ?? 0);
    const two = Number(totals.twoPointersMade ?? 0);
    const one = Number(totals.freeThrowsMade ?? 0);
    return three * 3 + two * 2 + one;
  }
  return quarterTotals || fallbackScore;
};

const getQuarterLabel = (quarter: number | string, index: number) => {
  if (typeof quarter === 'string') {
    return quarter.toUpperCase();
  }
  return index < 4 ? `Q${index + 1}` : `OT${index - 3}`;
};

export default function MatchDetails() {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    'actions' | 'lineup' | 'info' | 'videos'
  >('info');

  const { matches, loading } = useMatches({
    where: {
      id: {
        equals: matchId,
      },
    },
    pollInterval: 5000,
  });

  const match: MatchInterface | null = matches?.[0] || null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen p-8 bg-brand-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-xl mx-auto">
          <h2 className="text-red-800 font-semibold mb-2">Match Not Found</h2>
          <p className="text-red-600">
            The requested match could not be found.
          </p>
          <button
            onClick={() => navigate('/league')}
            className="mt-4 text-peach-400 hover:text-peach-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Leagues
          </button>
        </div>
      </div>
    );
  }

  const getMatchStatusDisplay = () => {
    if (match.isMatchLive) {
      return (
        <div className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm animate-pulse">
          <Clock className="w-4 h-4" />
          <span>LIVE</span>
          <span>{match.inMatchTime}'</span>
        </div>
      );
    } else if (match.isMatchEnded) {
      return (
        <div className="flex items-center gap-2 bg-brand-500 text-white px-3 py-1 rounded-full text-sm">
          <Clock className="w-4 h-4" />
          <span>FULL TIME</span>
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
        <div className="flex items-center gap-2 bg-brand-100 text-brand-600 px-3 py-1 rounded-full text-sm">
          <Calendar className="w-4 h-4" />
          <span>{formattedTime}</span>
        </div>
      );
    }
  };

  const isBasketball = match.type?.toLowerCase() === 'basketball';
  const basketballSummary = isBasketball
    ? (match.actionDetails || []).find(isBasketballSummary)
    : undefined;
  const homeQuarterScores = basketballSummary?.quarters?.map((quarter, index) => ({
    label: getQuarterLabel(quarter.quarter, index),
    score: quarter.home,
  })) ?? [];
  const awayQuarterScores = basketballSummary?.quarters?.map((quarter, index) => ({
    label: getQuarterLabel(quarter.quarter, index),
    score: quarter.away,
  })) ?? [];
  const homeQuarterTotal = homeQuarterScores.reduce(
    (acc, quarter) => acc + (Number(quarter.score) || 0),
    0
  );
  const awayQuarterTotal = awayQuarterScores.reduce(
    (acc, quarter) => acc + (Number(quarter.score) || 0),
    0
  );
  const computedHomePoints = isBasketball && basketballSummary
    ? getBasketballPoints(
        basketballSummary.teams.home.totals,
        homeQuarterTotal,
        match.homeTeamScore || 0
      )
    : match.homeTeamScore;
  const computedAwayPoints = isBasketball && basketballSummary
    ? getBasketballPoints(
        basketballSummary.teams.away.totals,
        awayQuarterTotal,
        match.awayTeamScore || 0
      )
    : match.awayTeamScore;

  return (
    <div className="min-h-screen bg-brand-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/league')}
            className="flex items-center gap-2 text-brand-600 hover:text-brand-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Leagues</span>
          </button>
        </div>

        {/* Match Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="text-center mb-4">
            <span className="text-sm text-brand-500">
              {match.competition.name} •{' '}
              {match.stage.charAt(0).toUpperCase() + match.stage.slice(1)}
            </span>
          </div>

          {isBasketball && basketballSummary ? (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Home Team */}
                <div
                  className="text-center flex-1 md:text-left cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/team/${match.homeTeam.id}`);
                  }}
                >
                  <div className="text-xs uppercase tracking-wide text-brand-400 mb-1">
                    Home
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-700">
                    {simplifyTeamName(
                      match.homeTeam.teams?.[0]?.name ?? match.homeTeam.name
                    )}
                  </h3>
                </div>

                {/* Enhanced Score Display */}
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 rounded-2xl px-8 py-6 text-white shadow-md">
                    <div className="flex flex-col items-center gap-3">
                      {getMatchStatusDisplay()}
                      <div className="flex items-center gap-6">
                        <span className="text-5xl md:text-6xl font-display font-bold text-peach-300">
                          {computedHomePoints}
                        </span>
                        <span className="text-2xl md:text-3xl text-white/50">-</span>
                        <span className="text-5xl md:text-6xl font-display font-bold text-peach-300">
                          {computedAwayPoints}
                        </span>
                      </div>
                      <div className="text-sm text-white/70">
                        {new Date(match.matchDate).toLocaleDateString(undefined, {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Away Team */}
                <div
                  className="text-center flex-1 md:text-right cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/team/${match.awayTeam.id}`);
                  }}
                >
                  <div className="text-xs uppercase tracking-wide text-brand-400 mb-1">
                    Away
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-700">
                    {simplifyTeamName(
                      match.awayTeam?.teams?.[0]?.name ?? match.awayTeam.name
                    )}
                  </h3>
                </div>
              </div>

              {homeQuarterScores.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[420px] bg-brand-50 rounded-xl overflow-hidden">
                    <thead className="bg-brand-100 text-brand-500 text-xs uppercase tracking-wide">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Team</th>
                        {homeQuarterScores.map((quarter) => (
                          <th key={quarter.label} className="px-3 py-3 text-center font-semibold">
                            {quarter.label}
                          </th>
                        ))}
                        <th className="px-4 py-3 text-center font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-brand-600 divide-y divide-brand-100">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-brand-700">
                          {simplifyTeamName(
                            match.homeTeam.teams?.[0]?.name ?? match.homeTeam.name
                          )}
                        </td>
                        {homeQuarterScores.map((quarter) => (
                          <td key={`home-${quarter.label}`} className="px-3 py-3 text-center">
                            {quarter.score ?? '-'}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-center font-semibold text-peach-500">
                          {computedHomePoints}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-brand-700">
                          {simplifyTeamName(
                            match.awayTeam?.teams?.[0]?.name ?? match.awayTeam.name
                          )}
                        </td>
                        {awayQuarterScores.map((quarter) => (
                          <td key={`away-${quarter.label}`} className="px-3 py-3 text-center">
                            {quarter.score ?? '-'}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-center font-semibold text-peach-500">
                          {computedAwayPoints}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Home Team */}
              <div
                className="text-center flex-1 mb-6 md:mb-0 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/team/${match.homeTeam.id}`);
                }}
              >
                <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-700">
                  {simplifyTeamName(
                    match.homeTeam.teams?.[0]?.name ?? match.homeTeam.name
                  )}
                </h3>
              </div>

              {/* Score */}
              <div className="flex flex-col items-center justify-center px-4 md:px-8 mb-6 md:mb-0 min-w-[200px]">
                {getMatchStatusDisplay()}

                <div className="flex items-center gap-6 my-4">
                  <span className="text-5xl md:text-6xl font-display font-bold text-peach-400">
                    {match.homeTeamScore}
                  </span>
                  <span className="text-2xl md:text-3xl text-brand-400">-</span>
                  <span className="text-5xl md:text-6xl font-display font-bold text-peach-400">
                    {match.awayTeamScore}
                  </span>
                </div>

                <div className="text-sm text-brand-500">
                  {new Date(match.matchDate).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>

              {/* Away Team */}
              <div
                className="text-center flex-1 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/team/${match.awayTeam.id}`);
                }}
              >
                <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-700">
                  {simplifyTeamName(
                    match.awayTeam?.teams?.[0]?.name ?? match.awayTeam.name
                  )}
                </h3>
              </div>
            </div>
          )}
        </div>

        {/* Match Details Box */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-sm text-brand-500 mb-2">Stadium</div>
              <div className="font-medium text-brand-700">
                {match.stadium || '-'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-brand-500 mb-2">Referee</div>
              <div className="font-medium text-brand-700">
                {match.referee || '-'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-brand-500 mb-2">Competition</div>
              <div className="font-medium text-brand-700">
                {match.competition.name}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation - Fixed for mobile */}
        <div className="flex flex-wrap border-b border-brand-200 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-3 font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'info'
                ? 'text-peach-400 border-b-2 border-peach-400'
                : 'text-brand-500 hover:text-brand-700'
            }`}
          >
            <Info className="w-4 h-4" />
            <span className="hidden sm:inline">Match Info</span>
            <span className="sm:hidden">Info</span>
          </button>
          <button
            onClick={() => setActiveTab('actions')}
            className={`px-4 py-3 font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'actions'
                ? 'text-peach-400 border-b-2 border-peach-400'
                : 'text-brand-500 hover:text-brand-700'
            }`}
          >
            <Goal className="w-4 h-4" />
            <span className="hidden sm:inline">Match Events</span>
            <span className="sm:hidden">Events</span>
          </button>
          <button
            onClick={() => setActiveTab('lineup')}
            className={`px-4 py-3 font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'lineup'
                ? 'text-peach-400 border-b-2 border-peach-400'
                : 'text-brand-500 hover:text-brand-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Lineup</span>
            <span className="sm:hidden">Lineup</span>
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-3 font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'videos'
                ? 'text-peach-400 border-b-2 border-peach-400'
                : 'text-brand-500 hover:text-brand-700'
            }`}
          >
            <Video className="w-4 h-4" />
            <span className="hidden sm:inline">Videos</span>
            <span className="sm:hidden">Videos</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
          {activeTab === 'info' && <MatchInfo match={match} />}
          {activeTab === 'actions' && <MatchActions match={match} />}
          {activeTab === 'lineup' && <MatchLineup match={match} />}
          {activeTab === 'videos' && <MatchVideos match={match} />}
        </div>
      </div>
    </div>
  );
}
