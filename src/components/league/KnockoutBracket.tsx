import { useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { MatchInterface } from '../../utils/types';

interface KnockoutBracketProps {
  matches: MatchInterface[];
}

export default function KnockoutBracket({ matches }: KnockoutBracketProps) {
  const navigate = useNavigate();

  // Group matches by stage
  const quarterFinals = matches
    .filter((match) => match.stage.includes('Quarter-finals'))
    .sort((a) => {
      if (a.stage === 'Quarter-finals-A') {
        return -1;
      }
      return 1;
    });

  const semiFinals = matches.filter((match) => match.stage === 'Semi-finals');

  const semiFinalsA = semiFinals.find((match) => {
    if (!quarterFinals?.[0]) return false;
    const firstQuarterTeamIds = [
      quarterFinals[0].homeTeam.id,
      quarterFinals[0].awayTeam.id,
    ];
    return (
      firstQuarterTeamIds.includes(match.homeTeam.id) ||
      firstQuarterTeamIds.includes(match.awayTeam.id)
    );
  });

  const semiFinalsB = semiFinals.find((match) => {
    const second =
      quarterFinals.length > 2 ? quarterFinals[2] : quarterFinals[1];
    if (!second) return false;
    const secondQuarterTeamIds = [second.homeTeam.id, second.awayTeam.id];
    return (
      secondQuarterTeamIds.includes(match.homeTeam.id) ||
      secondQuarterTeamIds.includes(match.awayTeam.id)
    );
  });
  const final = matches.filter((match) => match.stage === 'Final');

  // Find the winner if the final is completed
  const winner =
    final.length > 0 && final[0].isMatchEnded
      ? final[0].homeTeamScore > final[0].awayTeamScore ||
        final[0].penalties?.filter(
          (penalty) => penalty.isHomeTeam && penalty.type === 'Scored'
        ).length >
          final[0].penalties?.filter(
            (penalty) => !penalty.isHomeTeam && penalty.type === 'Scored'
          ).length
        ? final[0].homeTeam
        : final[0].awayTeam
      : null;

  const renderMatchCard = (match: MatchInterface) => {
    const isCompleted = match.isMatchEnded;
    const homeWinner =
      isCompleted &&
      (match.homeTeamScore > match.awayTeamScore ||
        match.penalties?.filter(
          (penalty) => penalty.isHomeTeam && penalty.type === 'Scored'
        ).length >
          match.penalties?.filter(
            (penalty) => !penalty.isHomeTeam && penalty.type === 'Scored'
          ).length);
    const awayWinner =
      isCompleted &&
      (match.homeTeamScore < match.awayTeamScore ||
        match.penalties?.filter(
          (penalty) => !penalty.isHomeTeam && penalty.type === 'Scored'
        ).length >
          match.penalties?.filter(
            (penalty) => penalty.isHomeTeam && penalty.type === 'Scored'
          ).length);

    return (
      <div
        className={`bg-white rounded-xl shadow-md border-2 ${
          isCompleted ? 'border-peach-200' : 'border-brand-100'
        } p-4 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 relative overflow-hidden`}
        onClick={() => navigate(`/match/${match.id}`)}
      >
        {/* Stage Label */}
        <div className="absolute top-0 right-0 bg-gradient-to-l from-brand-100 to-transparent px-3 py-1 text-xs font-medium text-brand-700">
          {match.stage.toUpperCase()}
        </div>

        {/* Teams */}
        <div className="mt-4 space-y-3">
          {/* Home Team */}
          <div
            className={`flex items-center justify-between ${
              homeWinner ? 'text-peach-400 font-bold' : 'text-brand-700'
            }`}
          >
            <div className="flex items-center gap-2 flex-1">
              {homeWinner && <Trophy className="w-4 h-4" />}
              <span className="truncate w-[100px] overflow-hidden">
                {match.homeTeam.teams[0].name}
              </span>
            </div>
            <span className="text-lg font-display">
              {match.homeTeamScore}
              {match.penalties?.filter(
                (penalty) => penalty.isHomeTeam && penalty.type === 'Scored'
              ).length > 0 &&
                ` (${
                  match.penalties?.filter(
                    (penalty) => penalty.isHomeTeam && penalty.type === 'Scored'
                  ).length
                })`}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-brand-100"></div>

          {/* Away Team */}
          <div
            className={`flex items-center justify-between ${
              awayWinner ? 'text-peach-400 font-bold' : 'text-brand-700'
            }`}
          >
            <div className="flex items-center gap-2 flex-1">
              {awayWinner && <Trophy className="w-4 h-4" />}
              <span className="truncate w-[100px] overflow-hidden">
                {match.awayTeam.teams[0].name}
              </span>
            </div>
            <span className="text-lg font-display">
              {match.awayTeamScore}{' '}
              {match.penalties?.filter(
                (penalty) => !penalty.isHomeTeam && penalty.type === 'Scored'
              ).length > 0 &&
                ` (${
                  match.penalties?.filter(
                    (penalty) =>
                      !penalty.isHomeTeam && penalty.type === 'Scored'
                  ).length
                })`}
            </span>
          </div>
        </div>

        {/* Match Status */}
        {isCompleted && (
          <div className="mt-3 flex justify-end">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-brand-100 text-brand-700">
              FT
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-brand-700 to-brand-400 rounded-t-xl p-6 text-white">
        <h3 className="text-2xl font-display font-bold flex items-center gap-3">
          <Trophy className="w-6 h-6" />
          Knockout Stage
        </h3>
        <p className="text-white/80 mt-2">
          The road to glory - Single elimination matches
        </p>
      </div>

      <div className="overflow-x-auto pb-6 bg-white rounded-b-xl">
        <div className="min-w-[1000px] p-8">
          {/* Stage Headers */}
          <div className="flex justify-between mb-8 px-8">
            <div className="w-1/5 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 rounded-full">
                <span className="w-6 h-6 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold">
                  1
                </span>
                <span className="font-medium text-brand-700">
                  Quarter Finals
                </span>
              </div>
            </div>
            <div className="w-1/5 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 rounded-full">
                <span className="w-6 h-6 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold">
                  2
                </span>
                <span className="font-medium text-brand-700">Semi Finals</span>
              </div>
            </div>
            <div className="w-1/5 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 rounded-full">
                <span className="w-6 h-6 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold">
                  3
                </span>
                <span className="font-medium text-brand-700">Final</span>
              </div>
            </div>
            <div className="w-1/5 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 rounded-full">
                <span className="w-6 h-6 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold">
                  2
                </span>
                <span className="font-medium text-brand-700">Semi Finals</span>
              </div>
            </div>
            <div className="w-1/5 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 rounded-full">
                <span className="w-6 h-6 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold">
                  1
                </span>
                <span className="font-medium text-brand-700">
                  Quarter Finals
                </span>
              </div>
            </div>
          </div>
          {/* Bracket Structure */}
          <div className="relative flex justify-between">
            {/* Connection Lines */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div className="w-full h-px bg-brand-200"></div>
              <div className="absolute left-1/5 top-1/4 w-px h-1/2 bg-brand-200"></div>
              <div className="absolute right-1/5 top-1/4 w-px h-1/2 bg-brand-200"></div>
            </div>

            {/* Quarter Finals - Left Side */}
            <div className="w-1/5 relative">
              {quarterFinals.slice(0, 2).map((match) => (
                <div key={match.id} className="mb-12">
                  {renderMatchCard(match)}
                </div>
              ))}
            </div>

            {/* Semi Finals - Left Side */}
            <div className="w-1/5 mt-24 relative">
              {(semiFinalsA ? [semiFinalsA] : []).map((match) => (
                <div key={match.id} className="mb-12">
                  {renderMatchCard(match)}
                </div>
              ))}
            </div>

            {/* Final */}
            <div className="w-1/5 mt-48 relative">
              {final.map((match) => (
                <div key={match.id}>{renderMatchCard(match)}</div>
              ))}

              {/* Winner Trophy */}
              {winner && (
                <div className="mt-12 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-peach-100/50 to-transparent -z-10 blur-xl"></div>
                  <div className="inline-block bg-gradient-to-r from-peach-400 to-peach-300 rounded-full p-6 shadow-lg">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="mt-4 text-xl font-display font-bold text-peach-400">
                    Champion
                  </h4>
                  <div className="mt-2 text-lg font-medium text-brand-700">
                    {winner.teams[0].name}
                  </div>
                </div>
              )}
            </div>

            {/* Semi Finals - Right Side */}
            <div className="w-1/5 mt-24 relative">
              {(semiFinalsB ? [semiFinalsB] : []).map((match) => (
                <div key={match.id} className="mb-12">
                  {renderMatchCard(match)}
                </div>
              ))}
            </div>

            {/* Quarter Finals - Right Side */}
            <div className="w-1/5 relative">
              {quarterFinals.slice(2, 4).map((match) => (
                <div key={match.id} className="mb-12">
                  {renderMatchCard(match)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
