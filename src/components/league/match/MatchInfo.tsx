import {
  ClipboardList,
  MapPin,
  User,
  Calendar,
  Clock,
  Trophy,
  Shield,
  Users,
} from 'lucide-react';
import { MatchInterface } from '../../../utils/types';

interface MatchInfoProps {
  match: MatchInterface;
}

export default function MatchInfo({ match }: MatchInfoProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <h3 className="text-xl font-display font-semibold text-brand-700 mb-6 flex items-center gap-2">
        <ClipboardList className="w-5 h-5 text-court-500" />
        Match Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Match Details */}
          <div className="bg-brand-50 rounded-lg p-6">
            <h4 className="font-medium text-brand-700 mb-4">Match Details</h4>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-court-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-brand-700">Date</div>
                  <div className="text-sm text-brand-400">
                    {formatDate(match.matchDate)}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-court-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-brand-700">
                    Kickoff Time
                  </div>
                  <div className="text-sm text-brand-400">
                    {formatTime(match.matchDate)}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-court-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-brand-700">
                    Stadium
                  </div>
                  <div className="text-sm text-brand-400">
                    {match.stadium || 'Not specified'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-court-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-brand-700">
                    Referee
                  </div>
                  <div className="text-sm text-brand-400">
                    {match.referee || 'Not specified'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Competition Info */}
          <div className="bg-brand-50 rounded-lg p-6">
            <h4 className="font-medium text-brand-700 mb-4">Competition</h4>

            <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-court-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-brand-700">
                    Tournament
                  </div>
                  <div className="text-sm text-brand-400">
                    {match.competition.name}
                  </div>
                </div>
              </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-court-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-brand-700">
                    Stage
                  </div>
                  <div className="text-sm text-brand-400 capitalize">
                    {match.stage}
                  </div>
                </div>
              </div>

              {match.group && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-court-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-brand-700">
                      Group
                    </div>
                    <div className="text-sm text-brand-400">
                      Group {match.group}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Home Team Info */}
          <div className="bg-brand-50 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <h4 className="font-medium text-court-500 text-bold">
                {match.homeTeam.teams[0]?.name}
              </h4>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-brand-400">Formation</span>
                <span className="text-brand-700 font-medium">
                  {match.homeTeamFormation || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-400">Fair Play Points</span>
                <span className="text-brand-700 font-medium">
                  {match.homeTeamFairPlayPoints ? 'Yes' : 'No'}
                </span>
              </div>
              {match.isMatchEnded && (
                <div className="flex justify-between text-sm">
                  <span className="text-brand-400">Final Score</span>
                  <span className="text-brand-700 font-medium">
                    {match.homeTeamScore}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Away Team Info */}
          <div className="bg-brand-50 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <h4 className="font-medium text-court-500 text-bold">
                {match.awayTeam.teams[0]?.name}
              </h4>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-brand-400">Formation</span>
                <span className="text-brand-700 font-medium">
                  {match.awayTeamFormation || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-400">Fair Play Points</span>
                <span className="text-brand-700 font-medium">
                  {match.awayTeamFairPlayPoints ? 'Yes' : 'No'}
                </span>
              </div>
              {match.isMatchEnded && (
                <div className="flex justify-between text-sm">
                  <span className="text-brand-400">Final Score</span>
                  <span className="text-brand-700 font-medium">
                    {match.awayTeamScore}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Match Statistics */}
          {match.statistics && match.statistics.length > 0 && (
            <div className="bg-brand-50 rounded-lg p-6">
              <h4 className="font-medium text-brand-700 mb-4">
                Match Statistics
              </h4>

              <div className="space-y-4">
                {match.statistics.map((stat, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-1/4 text-sm text-brand-700 text-right pr-2">
                      {stat.homeTeam}
                    </div>
                    <div className="w-1/2 px-2">
                      <div className="relative h-2 bg-brand-200 rounded-full overflow-hidden">
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-court-500 rounded-full"
                          style={{
                            width: `${
                              (parseInt(stat.homeTeam) /
                                (parseInt(stat.homeTeam) +
                                  parseInt(stat.awayTeam))) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-1/4 text-sm text-brand-700 pl-2">
                      {stat.awayTeam}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
