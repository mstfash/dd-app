import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import LeagueSelector from './LeagueSelector';
import MatchCard from './MatchCard';
import { formatDate, getDaysInWeek } from './utils/dateUtils';
import { calculateTournamentStats, SportStats } from './utils/statsUtils';
import useMatches from '../../hooks/useMatches';
import useLeaguesState from '../../hooks/useLeaguesState';
import { MAIN_LEAGUE } from '../../utils/constants';

export default function League() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [stats, setStats] = useState<SportStats[]>([]);
  const { currentCompetition, currentSeason } = useLeaguesState(MAIN_LEAGUE);
  const seasonId = currentSeason?.id as string;
  const leagueId = currentCompetition?.id as string;
  const { matches } = useMatches({
    where: {
      season: { id: { in: [seasonId] } },
      competition: { id: { in: [leagueId] } },
    },
    pollInterval: 5000,
  });

  useEffect(() => {
    setWeekDates(getDaysInWeek(selectedDate));
  }, [selectedDate]);

  const matchesData =
    matches?.sort((a, b) => {
      const dateA = new Date(a.matchDate);
      const dateB = new Date(b.matchDate);
      return dateA.getTime() - dateB.getTime();
    }) || [];

  useEffect(() => {
    // Calculate stats based on selected date and sport
    const sportStats = calculateTournamentStats(
      matchesData,
      selectedDate,
      selectedSport
    );
    setStats(sportStats);
  }, [selectedDate, selectedSport]);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setSelectedDate(newDate);
  };
  // Filter matches by date and sport
  const filteredMatches = matchesData?.filter((match) => {
    const matchDate = new Date(match.matchDate);
    const isSameDay = matchDate.toDateString() === selectedDate.toDateString();
    const matchesSport =
      selectedSport === 'all' || match.type.toLowerCase() === selectedSport;
    return isSameDay && matchesSport;
  });

  return (
    <div className="min-h-screen bg-sage-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          {/* Main Content - 70% */}
          <div className="lg:col-span-12">
            <div className="mb-8">
              <h1 className="text-3xl font-display font-bold text-sage-600 mb-6">
                League Matches
              </h1>

              {/* Sports Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {['all', 'football', 'padel', 'basketball', 'padbol'].map(
                  (sport) => (
                    <button
                      key={sport}
                      onClick={() => setSelectedSport(sport)}
                      className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                        selectedSport === sport
                          ? 'bg-peach-400 text-white shadow-lg transform scale-105'
                          : 'bg-white text-sage-600 hover:bg-sage-100'
                      }`}
                    >
                      {sport === 'all'
                        ? 'All Sports'
                        : sport.charAt(0).toUpperCase() + sport.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Date Selector */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-8">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateWeek('prev')}
                  className="p-2 hover:bg-sage-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-sage-600" />
                </button>
                <h2 className="text-lg font-display font-semibold text-sage-600 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-peach-400" />
                  Match Schedule
                </h2>
                <button
                  onClick={() => navigateWeek('next')}
                  className="p-2 hover:bg-sage-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-sage-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {weekDates.map((date, index) => {
                  const isToday =
                    date.toDateString() === new Date().toDateString();
                  const isSelected =
                    date.toDateString() === selectedDate.toDateString();

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-peach-400 text-white'
                          : isToday
                          ? 'bg-sage-100 text-sage-600 hover:bg-sage-200'
                          : 'hover:bg-sage-100 text-sage-600'
                      }`}
                    >
                      <span className="text-xs font-medium">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                      <span
                        className={`text-lg font-bold ${
                          isSelected ? 'text-white' : ''
                        }`}
                      >
                        {date.getDate()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Matches Section - Full Width in Main Content */}
            <div className="space-y-6">
              {filteredMatches.length > 0 ? (
                <div className="space-y-8">
                  {selectedSport === 'all' ? (
                    // Group matches by sport when "All Sports" is selected
                    Object.entries(
                      filteredMatches.reduce((acc, match) => {
                        if (!acc[match.type.toLowerCase()])
                          acc[match.type.toLowerCase()] = [];
                        acc[match.type.toLowerCase()].push(match);
                        return acc;
                      }, {} as Record<string, typeof filteredMatches>)
                    ).map(([sport, matches]) => (
                      <div key={sport} className="space-y-4">
                        <h3 className="text-xl font-display font-semibold text-sage-600 flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-peach-400" />
                          {sport.charAt(0).toUpperCase() + sport.slice(1)}{' '}
                          Matches
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          {matches.map((match) => (
                            <MatchCard
                              key={match.id}
                              match={match}
                              onClick={() => navigate(`/match/${match.id}`)}
                            />
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    // Show matches directly when a specific sport is selected
                    <div className="space-y-4">
                      <h3 className="text-xl font-display font-semibold text-sage-600 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-peach-400" />
                        <span className="capitalize text-peach-400 hidden md:block">
                          {selectedSport}
                        </span>{' '}
                        Matches for {formatDate(selectedDate)}
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {filteredMatches.map((match) => (
                          <MatchCard
                            key={match.id}
                            match={match}
                            onClick={() => navigate(`/match/${match.id}`)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                  <p className="text-sage-500">
                    No matches scheduled for this date.
                  </p>
                </div>
              )}
            </div>

            {/* League Selector */}
            <div className="mt-16">
              <h2 className="text-xl font-display font-semibold text-sage-600 mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-peach-400" />
                Browse Leagues
              </h2>
              <LeagueSelector
                matches={matchesData}
                onSelectLeague={(sportType) => navigate(`/league/${sportType}`)}
              />
            </div>
          </div>

          {/* Mobile Tournament Stats - Shown between matches and browse leagues */}
          {/* <div className="lg:hidden col-span-1 -mt-8 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-display font-semibold text-sage-600 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-peach-400" />
                Tournament Stats
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-sage-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sage-600 mb-2">
                    <Clock className="w-4 h-4 text-peach-400" />
                    <span className="text-sm font-medium">Live</span>
                  </div>
                  <span
                    className="text-2xl font-display font-bold text-sage-600"
                    data-testid="live-matches"
                  >
                    {stats.reduce((acc, stat) => acc + stat.liveMatches, 0)}
                  </span>
                </div>

                <div className="bg-sage-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sage-600 mb-2">
                    <Trophy className="w-4 h-4 text-peach-400" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                  <span className="text-2xl font-display font-bold text-sage-600">
                    {stats.reduce(
                      (acc, stat) => acc + stat.completedMatches,
                      0
                    )}
                  </span>
                </div>

                <div className="bg-sage-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sage-600 mb-2">
                    <Medal className="w-4 h-4 text-peach-400" />
                    <span className="text-sm font-medium">Goals</span>
                  </div>
                  <span
                    className="text-2xl font-display font-bold text-sage-600"
                    data-testid="total-goals"
                  >
                    {stats.reduce(
                      (acc, stat) => acc + (stat.totalScore || 0),
                      0
                    )}
                  </span>
                </div>

                <div className="bg-sage-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sage-600 mb-2">
                    <Star className="w-4 h-4 text-peach-400" />
                    <span className="text-sm font-medium">Avg/Match</span>
                  </div>
                  <span
                    className="text-2xl font-display font-bold text-sage-600"
                    data-testid="average-score"
                  >
                    {stats.length > 0
                      ? (
                          stats.reduce(
                            (acc, stat) =>
                              acc + (parseFloat(stat.averageScore || '0') || 0),
                            0
                          ) / stats.length
                        ).toFixed(2)
                      : '0.00'}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stats[0] &&
                  (stats[0].sport === 'football' ||
                    stats[0].sport === 'basketball' ||
                    stats[0].sport === 'padbol') && (
                    <div>
                      <div className="text-sm text-sage-500 mb-2">
                        {stats[0].sport === 'basketball'
                          ? 'Top Scorer'
                          : stats[0].sport === 'football'
                          ? 'Top Goalscorer'
                          : 'Top Points Scorer'}
                      </div>
                      <div className="bg-sage-50 rounded-lg p-4">
                        <div className="font-medium text-sage-600">
                          {stats[0]?.topScorer.name || 'N/A'}
                        </div>
                        <div className="text-sm text-sage-500">
                          {stats[0]?.topScorer.team || 'N/A'}
                        </div>
                        <div className="mt-2 text-peach-400 font-bold">
                          {stats[0]?.topScorer.goals || 0}{' '}
                          {stats[0]?.scoreLabel}
                        </div>
                      </div>
                    </div>
                  )}
                <div>
                  <div className="text-sm text-sage-500 mb-2">
                    {stats[0]?.sport === 'football'
                      ? 'Clean Sheets'
                      : stats[0]?.sport === 'basketball'
                      ? 'Points Per Game'
                      : stats[0]?.sport === 'padel'
                      ? 'Win Rate'
                      : stats[0]?.sport === 'padbol'
                      ? 'Points Per Set'
                      : 'Top Performer'}
                  </div>
                  <div className="bg-sage-50 rounded-lg p-4">
                    <div className="font-medium text-sage-600">
                      {stats[0]?.topPerformer?.name || 'N/A'}
                    </div>
                    <div className="text-sm text-sage-500">
                      {stats[0]?.topPerformer?.team || 'N/A'}
                    </div>
                    <div className="mt-2 text-peach-400 font-bold">
                      {stats[0]?.topPerformer?.stat || 0}{' '}
                      {stats[0]?.topPerformer?.statLabel || 'Matches'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
