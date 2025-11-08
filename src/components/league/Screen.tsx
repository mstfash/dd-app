import { Trophy, Clock, Calendar, Star, TrendingUp } from 'lucide-react';
import { calculateTournamentStats, SportStats } from './utils/statsUtils';
import { useState, useEffect, useCallback, useRef } from 'react';
import MatchCard from './MatchCard';
import useMatches from '../../hooks/useMatches';
import useLeaguesState from '../../hooks/useLeaguesState';
import { MAIN_LEAGUE } from '../../utils/constants';

// Utility function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const ROTATION_INTERVAL = 10000; // 120 seconds (2 minutes)

interface SlideIndicatorProps {
  total: number;
  current: number;
  label: string;
  isPaused: boolean;
}

function SlideIndicator({
  total,
  current,
  label,
  isPaused,
}: SlideIndicatorProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm p-4 border-t border-white/10">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-sage-300">{label}</span>
          {isPaused && <span className="text-xs text-peach-400">(Paused)</span>}
        </div>
        <span className="text-sm text-sage-300">
          {current + 1} / {total}
        </span>
      </div>
      <div className="h-1 bg-sage-700 rounded-full overflow-hidden">
        <div
          className={`h-full bg-peach-400 rounded-full progress-bar ${
            isPaused ? 'paused' : ''
          }`}
          style={{
            animation: `progress ${ROTATION_INTERVAL}ms ease-in-out infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
            animationDelay: `-${current * ROTATION_INTERVAL}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function Screen() {
  const [matchesSlideIndex, setMatchesSlideIndex] = useState(0);
  const [statsSlideIndex, setStatsSlideIndex] = useState(0);
  const { currentCompetition, currentSeason } = useLeaguesState(MAIN_LEAGUE);
  const seasonId = currentSeason?.id as string;
  const leagueId = currentCompetition?.id as string;

  // Get all matches for the current competition and season
  const { matches } = useMatches({
    where: {
      season: { id: { in: [seasonId] } },
      competition: { id: { in: [leagueId] } },
    },
    pollInterval: 5000,
  });

  // Initialize match data from real matches
  const getMatchData = useCallback(() => {
    if (!matches)
      return { liveMatches: [], upcomingMatches: [], recentMatches: [] };

    const todayMatches = matches.filter((match) => {
      const matchDate = new Date(match.matchDate);
      return matchDate.toDateString() === new Date().toDateString();
    });

    return {
      liveMatches: todayMatches.filter((match) => match.isMatchLive),
      upcomingMatches: todayMatches
        .filter((match) => !match.isMatchLive && !match.isMatchEnded)
        .slice(0, 3),
      recentMatches: todayMatches
        .filter((match) => match.isMatchEnded)
        .sort(
          (a, b) =>
            new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime()
        )
        .slice(0, 3),
    };
  }, [matches]);

  // Initialize stats with proper structure
  const [stats, setStats] = useState<SportStats[]>(() => {
    if (!matches) return [];
    return calculateTournamentStats(matches, new Date(), 'all');
  });

  // Update stats when matches change
  useEffect(() => {
    if (!matches) return;
    const newStats = calculateTournamentStats(matches, new Date(), 'all');
    setStats(newStats);
  }, [matches]);

  const updateStats = useCallback(() => {
    if (!matches) return;
    const newStats = calculateTournamentStats(matches, new Date(), 'all');
    setStats(newStats);
  }, [matches]);

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [isPaused, setIsPaused] = useState(false);

  // State for tracking shown content
  const [shownMatches, setShownMatches] = useState<Set<string>>(new Set());
  const [shownStats, setShownStats] = useState<Set<string>>(new Set());
  const [shuffledMatches, setShuffledMatches] = useState({
    live: [] as typeof matches,
    upcoming: [] as typeof matches,
    recent: [] as typeof matches,
  });

  // Initialize shuffled matches when matches data changes
  useEffect(() => {
    if (!matches) return;

    const { liveMatches, upcomingMatches, recentMatches } = getMatchData();
    setShuffledMatches({
      live: shuffleArray(liveMatches),
      upcoming: shuffleArray(upcomingMatches),
      recent: shuffleArray(recentMatches),
    });
  }, [matches, getMatchData]);

  const matchesRef = useRef(shuffledMatches);

  // Update ref when matches change
  useEffect(() => {
    matchesRef.current = shuffledMatches;
  }, [shuffledMatches]);

  // Reshuffle content when all items have been shown
  useEffect(() => {
    if (!matches) return;

    const { liveMatches, upcomingMatches, recentMatches } = getMatchData();
    if (
      shownMatches.size >=
      liveMatches.length + upcomingMatches.length + recentMatches.length
    ) {
      setShownMatches(new Set());
      setShuffledMatches({
        live: shuffleArray(liveMatches),
        upcoming: shuffleArray(upcomingMatches),
        recent: shuffleArray(recentMatches),
      });
    }
  }, [shownMatches, getMatchData, matches]);

  const handleRotation = useCallback(() => {
    if (!isPaused) {
      setMatchesSlideIndex((prev) => (prev + 1) % 3);
      setStatsSlideIndex((prev) => (prev + 1) % 3);
    }
  }, [isPaused]);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle rotation interval
  useEffect(() => {
    const interval = setInterval(handleRotation, ROTATION_INTERVAL);
    return () => clearInterval(interval);
  }, [handleRotation]);

  // Memoize click handler
  const handleMatchClick = useCallback(() => {}, []);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-sage-900 via-sage-800 to-sage-700 text-white overflow-hidden w-screen h-screen">
      <div className="h-screen max-w-[2000px] mx-auto p-2 sm:p-4 lg:p-6 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-peach-400">
            ZED Tournament Live
          </h1>
          <div className="text-xl sm:text-2xl lg:text-3xl font-display">
            {currentTime}
          </div>
        </div>

        <div className="flex gap-4 flex-1">
          {/* Left Side - Matches */}
          <div
            className="w-1/2 relative overflow-hidden rounded-xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${matchesSlideIndex * 100}%)` }}
            >
              {/* Live Matches */}
              <div className="min-w-full shrink-0 bg-black/20 backdrop-blur-sm p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <h2 className="text-3xl font-display font-bold">
                    Live Matches
                  </h2>
                </div>
                <div className="space-y-4 overflow-auto max-h-[calc(100vh-200px)]">
                  {shuffledMatches.live.length > 0 ? (
                    shuffledMatches.live.map((match) => (
                      <MatchCard
                        key={match.id}
                        match={match}
                        onClick={handleMatchClick}
                      />
                    ))
                  ) : (
                    <p className="text-sage-400">
                      No live matches at the moment
                    </p>
                  )}
                </div>
              </div>

              {/* Upcoming Matches */}
              <div className="min-w-full shrink-0 bg-black/20 backdrop-blur-sm p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-6 h-6 text-peach-400" />
                  <h2 className="text-3xl font-display font-bold">
                    Coming Up Next
                  </h2>
                </div>
                <div className="space-y-4 overflow-auto max-h-[calc(100vh-200px)]">
                  {shuffledMatches.upcoming.length > 0 ? (
                    shuffledMatches.upcoming.map((match) => (
                      <MatchCard
                        key={match.id}
                        match={match}
                        onClick={handleMatchClick}
                      />
                    ))
                  ) : (
                    <p className="text-sage-400">No upcoming matches</p>
                  )}
                </div>
              </div>

              {/* Recent Matches */}
              <div className="min-w-full shrink-0 bg-black/20 backdrop-blur-sm p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-6 h-6 text-peach-400" />
                  <h2 className="text-3xl font-display font-bold">
                    Recent Results
                  </h2>
                </div>
                <div className="space-y-4 overflow-auto max-h-[calc(100vh-200px)]">
                  {shuffledMatches.recent.length > 0 ? (
                    shuffledMatches.recent.map((match) => (
                      <MatchCard
                        key={match.id}
                        match={match}
                        onClick={handleMatchClick}
                      />
                    ))
                  ) : (
                    <p className="text-sage-400">No recent matches</p>
                  )}
                </div>
              </div>
            </div>

            <SlideIndicator
              total={3}
              current={matchesSlideIndex}
              label="Match Updates"
              isPaused={isPaused}
            />
          </div>

          {/* Right Side - Stats */}
          <div
            className="w-1/2 relative overflow-hidden rounded-xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ transition: 'transform 0.5s ease-in-out' }}
          >
            <div
              className="absolute inset-0 transition-transform duration-5000 ease-in-out"
              style={{ transform: `translateX(-${statsSlideIndex * 100}%)` }}
              onTransitionEnd={() => {
                // Add a small delay before tracking shown stats
                setTimeout(() => {
                  const currentStats = stats.filter(
                    (stat) => !shownStats.has(stat.sport)
                  );
                  currentStats.forEach((stat) => {
                    setShownStats((prev) => new Set([...prev, stat.sport]));
                  });
                }, 500);
              }}
            >
              {/* Tournament Overview */}
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-6 h-6 text-peach-400" />
                  <h2 className="text-3xl font-display font-bold">
                    Tournament Overview
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4 overflow-auto max-h-[calc(100vh-200px)]">
                  {stats.length > 0 ? (
                    stats.map((sportStats) => (
                      <div
                        key={sportStats.sport}
                        className="bg-black/30 rounded-lg p-4 border border-white/10"
                      >
                        <h3 className="text-2xl font-display font-bold mb-6 text-peach-300">
                          {sportStats.sport.charAt(0).toUpperCase() +
                            sportStats.sport.slice(1)}
                        </h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sage-300">Live Matches</span>
                            <span className="text-2xl font-display">
                              {sportStats.liveMatches}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-sage-300">
                              Total {sportStats.scoreLabel}
                            </span>
                            <span className="text-2xl font-display">
                              {sportStats.totalScore}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-sage-300">Average</span>
                            <span className="text-2xl font-display">
                              {sportStats.averageScore}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center p-8">
                      <p className="text-sage-300">
                        No tournament statistics available
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Top Performers */}
              <div className="absolute inset-0 translate-x-full bg-black/20 backdrop-blur-sm p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-6 h-6 text-peach-400" />
                  <h2 className="text-3xl font-display font-bold">
                    Top Performers
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4 overflow-auto max-h-[calc(100vh-200px)]">
                  {stats && stats.length > 0 ? (
                    stats.map((sportStats) => {
                      return (
                        <div
                          key={sportStats.sport}
                          className="bg-black/30 rounded-lg p-4 border border-white/10"
                        >
                          <h3 className="text-2xl font-display font-bold mb-4 text-peach-300 capitalize">
                            {sportStats.sport}
                          </h3>

                          {/* Top Scorer Section */}
                          {sportStats.topScorer &&
                            sportStats.topScorer.name && (
                              <div className="space-y-2 mb-4">
                                <div className="text-sage-300">Top Scorer</div>
                                <div className="text-xl font-display">
                                  {sportStats.topScorer.name}
                                </div>
                                <div className="text-peach-400 font-display text-2xl">
                                  {sportStats.topScorer.goals}{' '}
                                  {sportStats.scoreLabel}
                                </div>
                              </div>
                            )}

                          {/* Top Performer Section */}
                          {sportStats.topPerformer &&
                            sportStats.topPerformer.name && (
                              <div className="space-y-2 mt-4 pt-4 border-t border-white/10">
                                <div className="text-sage-300">
                                  Top Performer
                                </div>
                                <div className="text-xl font-display">
                                  {sportStats.topPerformer.name}
                                </div>
                                <div className="text-peach-400 font-display text-2xl">
                                  {sportStats.topPerformer.stat}{' '}
                                  {sportStats.topPerformer.statLabel}
                                </div>
                              </div>
                            )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-2 text-center text-sage-400">
                      No statistics available
                    </div>
                  )}
                </div>
              </div>

              {/* Latest Results */}
              <div className="absolute inset-0 translate-x-[200%] bg-black/20 backdrop-blur-sm p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-6 h-6 text-peach-400" />
                  <h2 className="text-3xl font-display font-bold">
                    Latest Results
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4 overflow-auto max-h-[calc(100vh-200px)]">
                  {stats && stats.length > 0 ? (
                    stats.map((sportStats) => {
                      if (!sportStats.recentResults?.length) return null;

                      return (
                        <div
                          key={sportStats.sport}
                          className="bg-black/30 rounded-lg p-4 border border-white/10"
                        >
                          <h3 className="text-2xl font-display font-bold mb-4 text-peach-300 capitalize">
                            {sportStats.sport}
                          </h3>
                          <div className="space-y-4">
                            {sportStats.recentResults.map((result, index) => (
                              <div
                                key={`${result.homeTeam}-${result.awayTeam}-${index}`}
                                className="border-b border-sage-500/30 pb-2 last:border-b-0"
                              >
                                <div className="flex flex-col gap-2">
                                  <div className="flex justify-between items-center">
                                    <span
                                      className={
                                        result.winner === result.homeTeam
                                          ? 'text-peach-300'
                                          : 'text-sage-300'
                                      }
                                    >
                                      {result.homeTeam}
                                    </span>
                                    <span className="text-xl font-display">
                                      {result.homeScore}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span
                                      className={
                                        result.winner === result.awayTeam
                                          ? 'text-peach-300'
                                          : 'text-sage-300'
                                      }
                                    >
                                      {result.awayTeam}
                                    </span>
                                    <span className="text-xl font-display">
                                      {result.awayScore}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-2 text-center text-sage-400">
                      No recent results available
                    </div>
                  )}
                </div>
              </div>
            </div>

            <SlideIndicator
              total={3}
              current={statsSlideIndex}
              label="Tournament Stats"
              isPaused={isPaused}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
