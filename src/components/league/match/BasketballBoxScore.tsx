import { Trophy } from 'lucide-react';
import {
  BasketballMatchSummary,
  BasketballPlayerBoxScore,
  BasketballPlayerStats,
  BasketballTeamLegend,
  BasketballTeamSnapshot,
  MatchInterface,
  NumericStat,
} from '../../../utils/types';
import { simplifyTeamName } from '../utils/statsUtils';

interface BasketballBoxScoreProps {
  summary: BasketballMatchSummary;
  match: MatchInterface;
}

type StatColumn = {
  key: string;
  label: string;
  accessor: (stats: BasketballPlayerStats, player?: BasketballPlayerBoxScore) => string;
  align?: 'left' | 'right' | 'center';
};

const numericKeysMap: Record<string, string[]> = {
  points: ['points', 'pts', 'score', 'totalPoints'],
  assists: ['assists', 'ast'],
  rebounds: ['rebounds', 'reb', 'totalRebounds'],
  offensiveRebounds: ['offensiveRebounds', 'oreb'],
  defensiveRebounds: ['defensiveRebounds', 'dreb'],
  steals: ['steals', 'stl'],
  blocks: ['blocks', 'blk'],
  turnovers: ['turnovers', 'to'],
  fouls: ['fouls', 'fls', 'pf'],
  plusMinus: ['plusMinus', 'pm', 'plus_minus'],
  fieldGoalsMade: ['fieldGoalsMade', 'fgm'],
  fieldGoalsAttempted: ['fieldGoalsAttempted', 'fga'],
  threePointersMade: ['threePointersMade', 'tpm', 'threePointers'],
  threePointersAttempted: ['threePointersAttempted', 'tpa'],
  twoPointersMade: ['twoPointersMade', 'twoPointers'],
  twoPointersAttempted: ['twoPointersAttempted'],
  freeThrowsMade: ['freeThrowsMade', 'ftm', 'freeThrows'],
  freeThrowsAttempted: ['freeThrowsAttempted', 'fta'],
};

const legendDisplayOrder: Array<{ key: keyof BasketballTeamLegend; label: string }> = [
  { key: 'fast_break_points', label: 'Fast Break Points' },
  { key: 'points_in_paint', label: 'Points in Paint' },
  { key: 'second_chance_points', label: 'Second Chance Points' },
  { key: 'points_from_turnovers', label: 'Points from TO' },
  { key: 'bench_points', label: 'Bench Points' },
  { key: 'biggest_lead', label: 'Biggest Lead' },
  { key: 'lead_changes', label: 'Lead Changes' },
  { key: 'times_tied', label: 'Times Tied' },
  { key: 'time_with_lead', label: 'Time With Lead' },
  { key: 'biggest_scoring_run', label: 'Biggest Run' },
];

const formatNumeric = (value: NumericStat, options: { defaultValue?: string } = {}) => {
  if (value === null || value === undefined) {
    return options.defaultValue ?? '-';
  }
  if (typeof value === 'number') {
    return Number.isInteger(value) ? value.toString() : value.toFixed(1);
  }
  if (typeof value === 'string' && value.trim() !== '') {
    return value;
  }
  return options.defaultValue ?? '-';
};

const tryGetStat = (stats: BasketballPlayerStats, key: keyof typeof numericKeysMap) => {
  const possibleKeys = numericKeysMap[key];
  for (const possibleKey of possibleKeys) {
    const value = stats[possibleKey];
    if (value !== undefined && value !== null) {
      return value;
    }
  }
  return undefined;
};

const computePoints = (stats: BasketballPlayerStats) => {
  const explicit = tryGetStat(stats, 'points');
  if (explicit !== undefined) return explicit;

  const three = Number(tryGetStat(stats, 'threePointersMade') ?? 0);
  const two = Number(tryGetStat(stats, 'twoPointersMade') ?? 0);
  const one = Number(tryGetStat(stats, 'freeThrowsMade') ?? 0);

  if ([three, two, one].some((val) => !Number.isNaN(val) && val > 0)) {
    return three * 3 + two * 2 + one;
  }
  return undefined;
};

const computeRebounds = (stats: BasketballPlayerStats) => {
  const total = tryGetStat(stats, 'rebounds');
  if (total !== undefined) return total;
  const offensive = Number(tryGetStat(stats, 'offensiveRebounds') ?? 0);
  const defensive = Number(tryGetStat(stats, 'defensiveRebounds') ?? 0);
  if (!Number.isNaN(offensive + defensive) && (offensive > 0 || defensive > 0)) {
    return offensive + defensive;
  }
  return undefined;
};

const statColumns: StatColumn[] = [
  {
    key: 'minutes',
    label: 'MIN',
    accessor: (stats) => stats.minutes ?? '--',
  },
  {
    key: 'points',
    label: 'PTS',
    accessor: (stats) => formatNumeric(computePoints(stats), { defaultValue: '0' }),
    align: 'right',
  },
  {
    key: 'assists',
    label: 'AST',
    accessor: (stats) => formatNumeric(tryGetStat(stats, 'assists'), { defaultValue: '0' }),
    align: 'right',
  },
  {
    key: 'rebounds',
    label: 'REB',
    accessor: (stats) => formatNumeric(computeRebounds(stats), { defaultValue: '0' }),
    align: 'right',
  },
  {
    key: 'steals',
    label: 'STL',
    accessor: (stats) => formatNumeric(tryGetStat(stats, 'steals'), { defaultValue: '0' }),
    align: 'right',
  },
  {
    key: 'blocks',
    label: 'BLK',
    accessor: (stats) => formatNumeric(tryGetStat(stats, 'blocks'), { defaultValue: '0' }),
    align: 'right',
  },
  {
    key: 'turnovers',
    label: 'TO',
    accessor: (stats) => formatNumeric(tryGetStat(stats, 'turnovers'), { defaultValue: '0' }),
    align: 'right',
  },
  {
    key: 'twoPointersMade',
    label: '2P',
    accessor: (stats) => {
      const made = tryGetStat(stats, 'twoPointersMade');
      const attempted = tryGetStat(stats, 'twoPointersAttempted');
      if (attempted !== undefined) {
        return `${formatNumeric(made, { defaultValue: '0' })}/${formatNumeric(attempted, {
          defaultValue: '0',
        })}`;
      }
      return formatNumeric(made, { defaultValue: '0' });
    },
    align: 'right',
  },
  {
    key: 'threePointersMade',
    label: '3P',
    accessor: (stats) => {
      const made = tryGetStat(stats, 'threePointersMade');
      const attempted = tryGetStat(stats, 'threePointersAttempted');
      if (attempted !== undefined) {
        return `${formatNumeric(made, { defaultValue: '0' })}/${formatNumeric(attempted, {
          defaultValue: '0',
        })}`;
      }
      return formatNumeric(made, { defaultValue: '0' });
    },
    align: 'right',
  },
  {
    key: 'freeThrowsMade',
    label: 'FT',
    accessor: (stats) => {
      const made = tryGetStat(stats, 'freeThrowsMade');
      const attempted = tryGetStat(stats, 'freeThrowsAttempted');
      if (attempted !== undefined) {
        return `${formatNumeric(made, { defaultValue: '0' })}/${formatNumeric(attempted, {
          defaultValue: '0',
        })}`;
      }
      return formatNumeric(made, { defaultValue: '0' });
    },
    align: 'right',
  },
  {
    key: 'fouls',
    label: 'FLS',
    accessor: (stats) => formatNumeric(tryGetStat(stats, 'fouls'), { defaultValue: '0' }),
    align: 'right',
  },
  {
    key: 'plusMinus',
    label: '+/-',
    accessor: (stats) => {
      const value = tryGetStat(stats, 'plusMinus');
      if (value === undefined || value === null) {
        return '-';
      }
      const numericValue = typeof value === 'number' ? value : Number(value);
      if (Number.isNaN(numericValue)) {
        return formatNumeric(value, { defaultValue: '-' });
      }
      if (numericValue > 0) return `+${numericValue}`;
      return numericValue.toString();
    },
    align: 'right',
  },
];

const aggregateColumnsForTotals = (
  totals: BasketballTeamSnapshot['totals']
): Record<string, string> => {
  if (!totals) return {};

  const aggregated: Record<string, string> = {};
  statColumns.forEach((column) => {
    const value =
      totals[column.key as keyof BasketballPlayerStats] ??
      tryGetStat(totals, column.key as keyof typeof numericKeysMap);
    if (value !== undefined && value !== null) {
      aggregated[column.key] = formatNumeric(value, { defaultValue: '0' });
    }
  });

  if (!aggregated.points) {
    aggregated.points = formatNumeric(computePoints(totals), { defaultValue: '0' });
  }
  if (!aggregated.rebounds) {
    aggregated.rebounds = formatNumeric(computeRebounds(totals), { defaultValue: '0' });
  }

  return aggregated;
};

const getTeamName = (
  snapshot: BasketballTeamSnapshot | undefined,
  fallback: string | undefined
) => {
  const rawName = snapshot?.teamName || fallback || 'Unknown Team';
  return simplifyTeamName(rawName);
};

const TeamBoxScore = ({
  snapshot,
  teamLabel,
  fallbackName,
}: {
  snapshot?: BasketballTeamSnapshot;
  teamLabel: string;
  fallbackName?: string;
}) => {
  const players = snapshot?.players ?? [];
  const totals = aggregateColumnsForTotals(snapshot?.totals);
  const legend = snapshot?.legend;
  const displayName = getTeamName(snapshot, fallbackName);
  const totalPoints = totals.points ?? '0';

  return (
    <div className="bg-white rounded-2xl shadow-md border border-brand-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-brand-100 flex items-center justify-between bg-gradient-to-r from-brand-50 to-white">
        <div>
          <div className="text-xs uppercase tracking-wide text-brand-400">{teamLabel}</div>
          <h4 className="text-xl font-display font-semibold text-brand-700">{displayName}</h4>
        </div>
        <div className="flex items-center gap-2 bg-peach-100 text-peach-600 px-3 py-1.5 rounded-full text-sm font-semibold">
          <Trophy className="w-4 h-4" />
          <span>{totalPoints} pts</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-brand-50 text-brand-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Player</th>
              {statColumns.map((column) => (
                <th
                  key={column.key}
                  className={`px-3 py-3 font-semibold ${
                    column.align === 'right'
                      ? 'text-right'
                      : column.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-50 text-sm text-brand-600">
            {players.map((player) => (
              <tr key={`${player.playerName}-${player.jerseyNumber ?? 'bench'}`}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-medium text-brand-700">{player.playerName}</span>
                    {player.position && (
                      <span className="text-xs text-brand-300 uppercase tracking-wider">
                        {player.position}
                      </span>
                    )}
                  </div>
                </td>
                {statColumns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-3 py-3 ${
                      column.align === 'right'
                        ? 'text-right'
                        : column.align === 'center'
                        ? 'text-center'
                        : 'text-left'
                    }`}
                  >
                    {column.accessor(player.stats || {}, player)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-brand-50/60 text-sm font-semibold text-brand-700">
            <tr>
              <td className="px-4 py-3 uppercase tracking-wide">Totals</td>
              {statColumns.map((column) => (
                <td
                  key={column.key}
                  className={`px-3 py-3 ${
                    column.align === 'right'
                      ? 'text-right'
                      : column.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                  }`}
                >
                  {totals[column.key] ?? (column.key === 'minutes' ? snapshot?.totals?.minutes ?? '--' : '0')}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      {legend && (
        <div className="px-6 py-5 bg-brand-50 border-t border-brand-100">
          <div className="text-xs uppercase tracking-wide text-brand-400 mb-3">
            Team Insights
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {legendDisplayOrder
              .filter(({ key }) => legend[key] !== undefined && legend[key] !== null)
              .map(({ key, label }) => (
                <div
                  key={key}
                  className="bg-white rounded-lg border border-brand-100 px-4 py-3 flex flex-col shadow-sm"
                >
                  <span className="text-xs uppercase tracking-wide text-brand-300">{label}</span>
                  <span className="text-lg font-semibold text-brand-700">
                    {formatNumeric(legend[key])}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const getQuarterLabel = (quarter: number | string, index: number) => {
  if (typeof quarter === 'string') {
    return quarter.toUpperCase();
  }
  const base = index < 4 ? `Q${index + 1}` : `OT${index - 3}`;
  return base;
};

export default function BasketballBoxScore({ summary, match }: BasketballBoxScoreProps) {
  const quarters = summary.quarters ?? [];
  const homeQuarterScores = quarters.map((quarter, index) => ({
    label: getQuarterLabel(quarter.quarter, index),
    score: quarter.home,
  }));
  const awayQuarterScores = quarters.map((quarter, index) => ({
    label: getQuarterLabel(quarter.quarter, index),
    score: quarter.away,
  }));

  const homeTotals = summary.teams.home.totals;
  const awayTotals = summary.teams.away.totals;

  const computedHomePoints =
    Number(homeTotals?.points ?? computePoints(homeTotals ?? {})) ||
    homeQuarterScores.reduce((acc, entry) => acc + (entry.score ?? 0), 0) ||
    match.homeTeamScore;
  const computedAwayPoints =
    Number(awayTotals?.points ?? computePoints(awayTotals ?? {})) ||
    awayQuarterScores.reduce((acc, entry) => acc + (entry.score ?? 0), 0) ||
    match.awayTeamScore;

  const homeName = simplifyTeamName(
    summary.teams?.metadata?.homeTeamName ??
      summary.teams.home.teamName ??
      match.homeTeam?.teams?.[0]?.name ??
      match.homeTeam?.name
  );
  const awayName = simplifyTeamName(
    summary.teams?.metadata?.awayTeamName ??
      summary.teams.away.teamName ??
      match.awayTeam?.teams?.[0]?.name ??
      match.awayTeam?.name
  );

  return (
    <div className="space-y-10">
      <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 rounded-3xl p-6 md:p-8 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <div className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
              Final Score
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-6">
              <div className="text-3xl sm:text-4xl font-display font-semibold">{homeName}</div>
              <div className="flex items-center gap-3 text-5xl sm:text-6xl font-display font-bold">
                <span>{computedHomePoints}</span>
                <span className="text-white/50 text-3xl sm:text-4xl">-</span>
                <span>{computedAwayPoints}</span>
              </div>
              <div className="text-3xl sm:text-4xl font-display font-semibold">{awayName}</div>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-white/10 uppercase text-xs tracking-wider text-white/70">
                  <tr>
                    <th className="px-3 py-2 text-left">Team</th>
                    {homeQuarterScores.map((quarter) => (
                      <th key={quarter.label} className="px-2 py-2 text-center">
                        {quarter.label}
                      </th>
                    ))}
                    <th className="px-3 py-2 text-center">Total</th>
                  </tr>
                </thead>
                <tbody className="text-base">
                  <tr className="border-t border-white/10">
                    <td className="px-3 py-3 font-semibold text-left">{homeName}</td>
                    {homeQuarterScores.map((quarter) => (
                      <td key={`home-${quarter.label}`} className="px-2 py-3 text-center">
                        {quarter.score ?? '-'}
                      </td>
                    ))}
                    <td className="px-3 py-3 text-center font-semibold text-peach-300">
                      {computedHomePoints}
                    </td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-3 py-3 font-semibold text-left">{awayName}</td>
                    {awayQuarterScores.map((quarter) => (
                      <td key={`away-${quarter.label}`} className="px-2 py-3 text-center">
                        {quarter.score ?? '-'}
                      </td>
                    ))}
                    <td className="px-3 py-3 text-center font-semibold text-peach-300">
                      {computedAwayPoints}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <TeamBoxScore
          snapshot={summary.teams.home}
          teamLabel="Home Team"
          fallbackName={match.homeTeam?.teams?.[0]?.name}
        />
        <TeamBoxScore
          snapshot={summary.teams.away}
          teamLabel="Away Team"
          fallbackName={match.awayTeam?.teams?.[0]?.name}
        />
      </div>
    </div>
  );
}

