import { Clock, Trophy, TrendingUp } from 'lucide-react';
import type { SportStats } from '../../types';

interface TournamentStatsProps {
  stats: SportStats[];
  selectedSport: string;
}

export default function TournamentStats({
  stats,
  selectedSport,
}: TournamentStatsProps) {
  const getStatLabel = (sport: string) => {
    switch (sport) {
      case 'football':
        return 'Goals';
      case 'basketball':
        return 'Points';
      case 'padel':
        return 'Games';
      case 'padbol':
        return 'Points';
      default:
        return 'Score';
    }
  };

  const getPerformerLabel = (sport: string) => {
    switch (sport) {
      case 'football':
        return 'Clean Sheets';
      case 'basketball':
        return 'Points Per Game';
      case 'padel':
        return 'Win Rate';
      case 'padbol':
        return 'Points Per Set';
      default:
        return 'Performance';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-display font-semibold text-sage-600 mb-4 flex items-center justify-between">
        <TrendingUp className="w-5 h-5 text-peach-400" />
        <span className="text-sm text-sage-400">
          Average:{' '}
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
      </h2>

      {stats.map((sportStat, index) => (
        <div
          key={sportStat.sport}
          className={`space-y-4 ${
            index > 0 ? 'mt-6 pt-6 border-t border-sage-100' : ''
          }`}
        >
          {selectedSport === 'all' && (
            <h3 className="text-lg font-display font-medium text-sage-600 capitalize">
              {sportStat.sport}
            </h3>
          )}

          {/* Live Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-sage-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sage-600 mb-2">
                <Clock className="w-4 h-4 text-peach-400" />
                <span className="text-sm font-medium">Live Now</span>
              </div>
              <span className="text-2xl font-display font-bold text-sage-600">
                {sportStat.liveMatches || 0}
              </span>
            </div>

            <div className="bg-sage-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sage-600 mb-2">
                <Trophy className="w-4 h-4 text-peach-400" />
                <span className="text-sm font-medium">
                  Today's {getStatLabel(sportStat.sport)}
                </span>
              </div>
              <span className="text-2xl font-display font-bold text-sage-600">
                {sportStat.totalScore || 0}
              </span>
            </div>
          </div>

          {/* Top Performers */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-sage-500">
              Today's Top Performers
            </h4>

            {/* Football Stats */}
            {sportStat.sport === 'football' && (
              <>
                <div className="bg-sage-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-sage-600">
                      Top Goalscorer
                    </span>
                    <span className="text-sm font-bold text-peach-400">
                      {sportStat.topScorer?.goals || 0} Goals
                    </span>
                  </div>
                  <div className="font-medium text-sage-600">
                    {sportStat.topScorer?.name || 'No data'}
                  </div>
                  <div className="text-sm text-sage-500">
                    {sportStat.topScorer?.team || '-'}
                  </div>
                </div>
                <div className="bg-sage-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-sage-600">Clean Sheets</span>
                    <span className="text-sm font-bold text-peach-400">
                      {sportStat.topPerformer?.stat || 0}
                    </span>
                  </div>
                  <div className="font-medium text-sage-600">
                    {sportStat.topPerformer?.name || 'No data'}
                  </div>
                  <div className="text-sm text-sage-500">
                    {sportStat.topPerformer?.team || '-'}
                  </div>
                </div>
              </>
            )}

            {/* Basketball Stats */}
            {sportStat.sport === 'basketball' && (
              <>
                <div className="bg-sage-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-sage-600">Top Scorer</span>
                    <span className="text-sm font-bold text-peach-400">
                      {sportStat.topScorer?.goals || 0} Points
                    </span>
                  </div>
                  <div className="font-medium text-sage-600">
                    {sportStat.topScorer?.name || 'No data'}
                  </div>
                  <div className="text-sm text-sage-500">
                    {sportStat.topScorer?.team || '-'}
                  </div>
                </div>
                <div className="bg-sage-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-sage-600">
                      Points Per Game
                    </span>
                    <span className="text-sm font-bold text-peach-400">
                      {sportStat.topPerformer?.stat || 0} PPG
                    </span>
                  </div>
                  <div className="font-medium text-sage-600">
                    {sportStat.topPerformer?.name || 'No data'}
                  </div>
                  <div className="text-sm text-sage-500">
                    {sportStat.topPerformer?.team || '-'}
                  </div>
                </div>
              </>
            )}

            {/* Padel Stats */}
            {sportStat.sport === 'padel' && (
              <div className="bg-sage-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-sage-600">Win Rate</span>
                  <span className="text-sm font-bold text-peach-400">
                    {sportStat.topPerformer?.stat || 0}%
                  </span>
                </div>
                <div className="font-medium text-sage-600">
                  {sportStat.topPerformer?.name || 'No data'}
                </div>
                <div className="text-sm text-sage-500">
                  {sportStat.topPerformer?.team || '-'}
                </div>
              </div>
            )}

            {/* Padbol Stats */}
            {sportStat.sport === 'padbol' && (
              <>
                <div className="bg-sage-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-sage-600">
                      Top Points Scorer
                    </span>
                    <span className="text-sm font-bold text-peach-400">
                      {sportStat.topScorer?.goals || 0} Points
                    </span>
                  </div>
                  <div className="font-medium text-sage-600">
                    {sportStat.topScorer?.name || 'No data'}
                  </div>
                  <div className="text-sm text-sage-500">
                    {sportStat.topScorer?.team || '-'}
                  </div>
                </div>
                <div className="bg-sage-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-sage-600">
                      Points Per Set
                    </span>
                    <span className="text-sm font-bold text-peach-400">
                      {sportStat.topPerformer?.stat || 0} PPS
                    </span>
                  </div>
                  <div className="font-medium text-sage-600">
                    {sportStat.topPerformer?.name || 'No data'}
                  </div>
                  <div className="text-sm text-sage-500">
                    {sportStat.topPerformer?.team || '-'}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Recent Results */}
          {sportStat.recentResults.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-sage-500">
                Just Finished
              </h4>
              {sportStat.recentResults.map((result, idx) => (
                <div key={idx} className="bg-sage-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-sage-400">
                      {result.endedAt}
                    </span>
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded ${
                        result.winner === 'Draw'
                          ? 'bg-sage-200 text-sage-600'
                          : 'bg-peach-100 text-peach-400'
                      }`}
                    >
                      {result.winner === 'Draw' ? 'Draw' : 'Winner'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div
                        className={`font-medium ${
                          result.winner === result.homeTeam
                            ? 'text-peach-400'
                            : 'text-sage-600'
                        }`}
                      >
                        {result.homeTeam}
                      </div>
                      <div
                        className={`font-medium ${
                          result.winner === result.awayTeam
                            ? 'text-peach-400'
                            : 'text-sage-600'
                        }`}
                      >
                        {result.awayTeam}
                      </div>
                    </div>
                    <div className="text-xl font-display font-bold text-sage-600">
                      {result.homeScore}
                      <span className="mx-1">-</span>
                      {result.awayScore}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
