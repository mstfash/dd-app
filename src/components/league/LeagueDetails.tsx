import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Shield, ArrowLeft, Medal, Award, Star } from 'lucide-react';
import LeagueTable from './LeagueTable';
import MatchesList from './MatchesList';
import TopPlayers from './TopPlayers';
import KnockoutBracket from './KnockoutBracket';
import useMatches from '../../hooks/useMatches';
import { generateCompleteLeagueTable } from './utils/statsUtils';
import useLeaguesState from '../../hooks/useLeaguesState';
import { MAIN_LEAGUE, MAIN_LEAGUE_ID } from '../../utils/constants';
import { Competition, Season, MatchInterface } from '../../utils/types';

export const Stage = [
  'Group Stage',
  'Knockout Stage - Round of 16',
  'Quarter-finals-A',
  'Quarter-finals-B',
  'Semi-finals',
  'Third-place play-off',
  'Final',
] as const;

export default function LeagueDetails() {
  const { sportType: routeSportType } = useParams<{ sportType: string }>();
  const sportType = (routeSportType || 'basketball').toLowerCase();
  const sportTypeLabel = sportType.charAt(0).toUpperCase() + sportType.slice(1);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'standings' | 'matches' | 'stats'>(
    'standings'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { currentCompetition, currentSeason } = useLeaguesState(MAIN_LEAGUE_ID);
  const seasonId = currentSeason?.id as string;
  const leagueId = currentCompetition?.id as string;
  const getMatchCategory = (match: MatchInterface) => {
    if (match.stage && match.stage !== 'Group Stage') {
      return match.stage.replace(/-/g, ' ');
    }
    if (match.group) {
      return `Group ${match.group}`;
    }
    if (match.homeTeam?.group) {
      return `Group ${match.homeTeam.group}`;
    }
    if (match.awayTeam?.group) {
      return `Group ${match.awayTeam.group}`;
    }
    return 'Regular Season';
  };
  const { matches, loading } = useMatches({
    where: {
      season: { id: { in: [seasonId] } },
      competition: { id: { in: [leagueId] } },
    },
    pollInterval: 5000,
  });

  const matchesData = useMemo(
    () =>
      matches?.sort((a, b) => {
        const dateA = new Date(a.matchDate);
        const dateB = new Date(b.matchDate);
        return dateA.getTime() - dateB.getTime();
      }) || [],
    [matches]
  );

  const uniqueSubCategories = useMemo(() => {
    const categories = matchesData
      .filter(
        (match) => (match.type?.toLowerCase() || 'football') === sportType
      )
      .map(getMatchCategory)
      .filter(Boolean);

    const unique = Array.from(new Set(categories));
    return unique.length ? ['all', ...unique] : ['all'];
  }, [matchesData, sportType]);

  // Filter matches for this league
  const leagueMatches = matchesData.filter((match) => {
    const matchSport = match.type?.toLowerCase() || 'football';
    if (matchSport !== sportType) {
      return false;
    }
    if (!selectedCategory || selectedCategory === 'all') {
      return true;
    }
    return getMatchCategory(match) === selectedCategory;
  });

  const isKnockout = leagueMatches.some(
    (match) =>
      (match.type?.toLowerCase() || 'football') === sportType &&
      match.stage !== 'Group Stage'
  );

  const leagueData = generateCompleteLeagueTable(
    leagueMatches,
    currentCompetition as Competition,
    currentSeason as Season,
    sportType
  );
  const [viewMode, setViewMode] = useState<'knockout' | 'table'>(
    isKnockout ? 'knockout' : 'table'
  );

  useEffect(() => {
    if (!uniqueSubCategories.includes(selectedCategory)) {
      setSelectedCategory(uniqueSubCategories[0] ?? 'all');
    }
  }, [uniqueSubCategories, selectedCategory]);

  useEffect(() => {
    if (isKnockout) {
      setViewMode('knockout');
    }
  }, [isKnockout]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-700"></div>
      </div>
    );
  }

  if (!leagueData) {
    return (
      <div className="min-h-screen p-8 bg-brand-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-xl mx-auto">
          <h2 className="text-red-800 font-semibold mb-2">League Not Found</h2>
          <p className="text-red-600">
            The requested league could not be found.
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

  return (
    <div className="min-h-screen bg-brand-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* League Header */}
        <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 rounded-2xl shadow-lg p-6 md:p-10 mb-8 flex md:flex-row flex-col gap-6 w-full text-white border border-brand-700/40">
          <div className="flex items-center justify-center">
            <div className="md:w-32 md:h-32 w-24 h-24 rounded-2xl bg-white/10 p-4 backdrop-blur">
              <img
                src="/logo.jpeg"
                alt="Double Dribble Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
              <h1 className="text-3xl font-display font-bold">
                {leagueData.competition.name || MAIN_LEAGUE}
              </h1>
              <span className="uppercase text-xs tracking-[0.35em] text-court-200">
                {sportTypeLabel}
              </span>
            </div>
            <p className="text-brand-100 text-sm max-w-3xl mb-4">
              Wins power the standings, point differential breaks ties, and
              every loss shapes your playoff path. No draws—every matchup
              produces a winner.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-brand-100">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-peach-400" />
                {leagueData.season.name}
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-peach-400" />
                {isKnockout ? 'Knockout Stage' : 'Regular Season'}
              </span>
              <span className="flex items-center gap-2">
                <Medal className="w-4 h-4 text-peach-400" />
                Point diff as tiebreaker
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {uniqueSubCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-peach-500 text-white shadow-lg'
                      : 'bg-white/10 text-brand-100 hover:bg-white/20'
                  }`}
                >
                  {cat === 'all' ? 'All Divisions' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-brand-200 mb-8">
          <button
            onClick={() => setActiveTab('standings')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'standings'
                ? 'text-peach-600 border-b-2 border-peach-600'
                : 'text-brand-400 hover:text-brand-700'
            }`}
          >
            Standings
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'matches'
                ? 'text-peach-600 border-b-2 border-peach-600'
                : 'text-brand-400 hover:text-brand-700'
            }`}
          >
            Matches
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'stats'
                ? 'text-peach-600 border-b-2 border-peach-600'
                : 'text-brand-400 hover:text-brand-700'
            }`}
          >
            Statistics
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {activeTab === 'standings' && (
            <div>
              {isKnockout && (
                <div className="mb-6 flex justify-end">
                  <div className="inline-flex rounded-lg border border-brand-200 p-1">
                    <button
                      onClick={() => setViewMode('knockout')}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        viewMode === 'knockout'
                          ? 'bg-peach-400 text-white'
                          : 'text-brand-700 hover:bg-brand-50'
                      }`}
                    >
                      Knockout Stage
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        viewMode === 'table'
                          ? 'bg-peach-400 text-white'
                          : 'text-brand-700 hover:bg-brand-50'
                      }`}
                    >
                      League Table
                    </button>
                  </div>
                </div>
              )}

              {viewMode === 'knockout' && isKnockout ? (
                <KnockoutBracket matches={leagueMatches} />
              ) : (
                <LeagueTable
                  leagueData={leagueData}
                  sportType={sportType || ''}
                />
              )}
            </div>
          )}

          {activeTab === 'matches' && <MatchesList matches={leagueMatches} />}

          {activeTab === 'stats' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-display font-semibold text-brand-700 mb-4 flex items-center gap-2">
                  <Medal className="w-5 h-5 text-peach-400" />
                  Top Scorers
                </h3>
                <TopPlayers players={leagueData.topScorer} statType="goals" />
              </div>

              {(sportType === 'football' || sportType === 'basketball') &&
              leagueData.topAssist?.some((player) => player.assists !== '0') ? (
                <div>
                  <h3 className="text-xl font-display font-semibold text-brand-700 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-peach-400" />
                    Top Assists
                  </h3>
                  <TopPlayers
                    players={leagueData.topAssist}
                    statType="assists"
                  />
                </div>
              ) : null}

              {sportType === 'football' && (
                <div>
                  <h3 className="text-xl font-display font-semibold text-brand-700 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-peach-400" />
                    Top Goalkeepers
                  </h3>
                  <TopPlayers
                    players={leagueData.topGoalie}
                    statType="cleanSheets"
                  />
                </div>
              )}

              {sportType === 'basketball' && (
                <div>
                  <h3 className="text-xl font-display font-semibold text-brand-700 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-peach-400" />
                    MVP Ranking
                  </h3>
                  <TopPlayers
                    players={leagueData.topPlayer}
                    statType="mvpPoints"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
