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
  label: string | string[];
  accessor: (
    stats: BasketballPlayerStats,
    player?: BasketballPlayerBoxScore
  ) => string;
  align?: 'left' | 'right' | 'center';
  colspan?: number;
};

const numericKeysMap: Record<string, string[]> = {
  points: ['points', 'pts', 'score', 'totalPoints'],
  assists: ['assists', 'ast', 'as'],
  rebounds: ['rebounds', 'reb', 'totalRebounds', 'tot'],
  offensiveRebounds: ['offensiveRebounds', 'oreb', 'or'],
  defensiveRebounds: ['defensiveRebounds', 'dreb', 'dr'],
  steals: ['steals', 'stl', 'st'],
  blocks: ['blocks', 'blk', 'bs'],
  turnovers: ['turnovers', 'to'],
  personalFouls: ['personalFouls', 'pf', 'fouls', 'fls'],
  foulsDrawn: ['foulsDrawn', 'fd'],
  plusMinus: ['plusMinus', 'pm', 'plus_minus'],
  efficiency: ['efficiency', 'ef'],
  fieldGoalsMade: ['fieldGoalsMade', 'fgm'],
  fieldGoalsAttempted: ['fieldGoalsAttempted', 'fga'],
  fieldGoalsPercentage: ['fieldGoalsPercentage', 'fgp', 'fg%'],
  threePointersMade: ['threePointersMade', 'tpm', 'threePointers'],
  threePointersAttempted: ['threePointersAttempted', 'tpa'],
  threePointersPercentage: ['threePointersPercentage', 'tpp', '3p%'],
  twoPointersMade: ['twoPointersMade', 'twoPointers'],
  twoPointersAttempted: ['twoPointersAttempted'],
  twoPointersPercentage: ['twoPointersPercentage', '2p%'],
  freeThrowsMade: ['freeThrowsMade', 'ftm', 'freeThrows'],
  freeThrowsAttempted: ['freeThrowsAttempted', 'fta'],
  freeThrowsPercentage: ['freeThrowsPercentage', 'ftp', 'ft%'],
};

const legendDisplayOrder: Array<{
  key: keyof BasketballTeamLegend;
  label: string;
}> = [
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

const formatNumeric = (
  value: NumericStat,
  options: { defaultValue?: string; decimals?: number } = {}
) => {
  if (value === null || value === undefined || value === '') {
    return options.defaultValue ?? '0';
  }
  if (typeof value === 'number') {
    if (options.decimals !== undefined) {
      return value.toFixed(options.decimals);
    }
    return Number.isInteger(value) ? value.toString() : value.toFixed(1);
  }
  if (typeof value === 'string' && value.trim() !== '') {
    return value;
  }
  return options.defaultValue ?? '0';
};

const tryGetStat = (
  stats: BasketballPlayerStats,
  key: keyof typeof numericKeysMap
): NumericStat => {
  const possibleKeys = numericKeysMap[key];
  for (const possibleKey of possibleKeys) {
    const value = stats[possibleKey];
    if (value !== undefined && value !== null && value !== '') {
      return value;
    }
  }
  return undefined;
};

const calculatePercentage = (
  made: NumericStat,
  attempted: NumericStat
): string => {
  const madeNum = typeof made === 'number' ? made : Number(made || 0);
  const attemptedNum =
    typeof attempted === 'number' ? attempted : Number(attempted || 0);

  if (
    attemptedNum === 0 ||
    Number.isNaN(madeNum) ||
    Number.isNaN(attemptedNum)
  ) {
    return '0.0';
  }

  return ((madeNum / attemptedNum) * 100).toFixed(1);
};

const calculateEfficiency = (stats: BasketballPlayerStats): string => {
  const explicit = tryGetStat(stats, 'efficiency');
  if (explicit !== undefined && explicit !== null && explicit !== '') {
    return formatNumeric(explicit, { decimals: 1 });
  }

  // Calculate efficiency: PTS + REB + AST + STL + BLK - (FGA - FGM) - (FTA - FTM) - TO
  const pts = Number(tryGetStat(stats, 'points') ?? 0);
  const reb = Number(tryGetStat(stats, 'rebounds') ?? 0);
  const ast = Number(tryGetStat(stats, 'assists') ?? 0);
  const stl = Number(tryGetStat(stats, 'steals') ?? 0);
  const blk = Number(tryGetStat(stats, 'blocks') ?? 0);
  const fgm = Number(tryGetStat(stats, 'fieldGoalsMade') ?? 0);
  const fga = Number(tryGetStat(stats, 'fieldGoalsAttempted') ?? 0);
  const ftm = Number(tryGetStat(stats, 'freeThrowsMade') ?? 0);
  const fta = Number(tryGetStat(stats, 'freeThrowsAttempted') ?? 0);
  const to = Number(tryGetStat(stats, 'turnovers') ?? 0);

  const efficiency =
    pts + reb + ast + stl + blk - (fga - fgm) - (fta - ftm) - to;
  return formatNumeric(efficiency, { decimals: 1 });
};

const computePoints = (stats: BasketballPlayerStats) => {
  const explicit = tryGetStat(stats, 'points');
  if (explicit !== undefined && explicit !== null && explicit !== '')
    return explicit;

  const three = Number(tryGetStat(stats, 'threePointersMade') ?? 0);
  const two = Number(tryGetStat(stats, 'twoPointersMade') ?? 0);
  const one = Number(tryGetStat(stats, 'freeThrowsMade') ?? 0);

  if ([three, two, one].some((val) => !Number.isNaN(val) && val > 0)) {
    return three * 3 + two * 2 + one;
  }
  return 0;
};

const computeRebounds = (stats: BasketballPlayerStats) => {
  const total = tryGetStat(stats, 'rebounds');
  if (total !== undefined && total !== null && total !== '') return total;

  const offensive = Number(tryGetStat(stats, 'offensiveRebounds') ?? 0);
  const defensive = Number(tryGetStat(stats, 'defensiveRebounds') ?? 0);

  if (!Number.isNaN(offensive + defensive)) {
    return offensive + defensive;
  }
  return 0;
};

// Column definitions matching the image structure
const statColumns: StatColumn[] = [
  {
    key: 'minutes',
    label: 'Min',
    accessor: (stats) => stats.minutes ?? 'DNP',
    align: 'center',
  },
  {
    key: 'fieldGoals',
    label: ['M/A', '%'],
    accessor: (stats) => {
      const made = tryGetStat(stats, 'fieldGoalsMade') ?? 0;
      const attempted = tryGetStat(stats, 'fieldGoalsAttempted') ?? 0;
      return `${formatNumeric(made)}/${formatNumeric(attempted)}`;
    },
    colspan: 2,
    align: 'center',
  },
  {
    key: 'fieldGoalsPct',
    label: '',
    accessor: (stats) => {
      const made = tryGetStat(stats, 'fieldGoalsMade') ?? 0;
      const attempted = tryGetStat(stats, 'fieldGoalsAttempted') ?? 0;
      const percentage = tryGetStat(stats, 'fieldGoalsPercentage');
      return percentage !== undefined
        ? formatNumeric(percentage, { decimals: 1 })
        : calculatePercentage(made, attempted);
    },
    align: 'center',
  },
  {
    key: 'twoPointers',
    label: ['M/A', '%'],
    accessor: (stats) => {
      const made = tryGetStat(stats, 'twoPointersMade') ?? 0;
      const attempted = tryGetStat(stats, 'twoPointersAttempted') ?? 0;
      return `${formatNumeric(made)}/${formatNumeric(attempted)}`;
    },
    colspan: 2,
    align: 'center',
  },
  {
    key: 'twoPointersPct',
    label: '',
    accessor: (stats) => {
      const made = tryGetStat(stats, 'twoPointersMade') ?? 0;
      const attempted = tryGetStat(stats, 'twoPointersAttempted') ?? 0;
      const percentage = tryGetStat(stats, 'twoPointersPercentage');
      return percentage !== undefined
        ? formatNumeric(percentage, { decimals: 1 })
        : calculatePercentage(made, attempted);
    },
    align: 'center',
  },
  {
    key: 'threePointers',
    label: ['M/A', '%'],
    accessor: (stats) => {
      const made = tryGetStat(stats, 'threePointersMade') ?? 0;
      const attempted = tryGetStat(stats, 'threePointersAttempted') ?? 0;
      return `${formatNumeric(made)}/${formatNumeric(attempted)}`;
    },
    colspan: 2,
    align: 'center',
  },
  {
    key: 'threePointersPct',
    label: '',
    accessor: (stats) => {
      const made = tryGetStat(stats, 'threePointersMade') ?? 0;
      const attempted = tryGetStat(stats, 'threePointersAttempted') ?? 0;
      const percentage = tryGetStat(stats, 'threePointersPercentage');
      return percentage !== undefined
        ? formatNumeric(percentage, { decimals: 1 })
        : calculatePercentage(made, attempted);
    },
    align: 'center',
  },
  {
    key: 'freeThrows',
    label: ['M/A', '%'],
    accessor: (stats) => {
      const made = tryGetStat(stats, 'freeThrowsMade') ?? 0;
      const attempted = tryGetStat(stats, 'freeThrowsAttempted') ?? 0;
      return `${formatNumeric(made)}/${formatNumeric(attempted)}`;
    },
    colspan: 2,
    align: 'center',
  },
  {
    key: 'freeThrowsPct',
    label: '',
    accessor: (stats) => {
      const made = tryGetStat(stats, 'freeThrowsMade') ?? 0;
      const attempted = tryGetStat(stats, 'freeThrowsAttempted') ?? 0;
      const percentage = tryGetStat(stats, 'freeThrowsPercentage');
      return percentage !== undefined
        ? formatNumeric(percentage, { decimals: 1 })
        : calculatePercentage(made, attempted);
    },
    align: 'center',
  },
  {
    key: 'offensiveRebounds',
    label: 'OR',
    accessor: (stats) =>
      formatNumeric(tryGetStat(stats, 'offensiveRebounds'), {
        defaultValue: '0',
      }),
    align: 'center',
  },
  {
    key: 'defensiveRebounds',
    label: 'DR',
    accessor: (stats) =>
      formatNumeric(tryGetStat(stats, 'defensiveRebounds'), {
        defaultValue: '0',
      }),
    align: 'center',
  },
  {
    key: 'totalRebounds',
    label: 'TOT',
    accessor: (stats) =>
      formatNumeric(computeRebounds(stats), { defaultValue: '0' }),
    align: 'center',
  },
  {
    key: 'assists',
    label: 'AS',
    accessor: (stats) =>
      formatNumeric(tryGetStat(stats, 'assists'), { defaultValue: '0' }),
    align: 'center',
  },
  {
    key: 'turnovers',
    label: 'TO',
    accessor: (stats) =>
      formatNumeric(tryGetStat(stats, 'turnovers'), { defaultValue: '0' }),
    align: 'center',
  },
  {
    key: 'steals',
    label: 'ST',
    accessor: (stats) =>
      formatNumeric(tryGetStat(stats, 'steals'), { defaultValue: '0' }),
    align: 'center',
  },
  {
    key: 'blocks',
    label: 'BS',
    accessor: (stats) =>
      formatNumeric(tryGetStat(stats, 'blocks'), { defaultValue: '0' }),
    align: 'center',
  },
  {
    key: 'personalFouls',
    label: 'PF',
    accessor: (stats) =>
      formatNumeric(tryGetStat(stats, 'personalFouls'), { defaultValue: '0' }),
    align: 'center',
  },
  {
    key: 'foulsDrawn',
    label: 'FD',
    accessor: (stats) =>
      formatNumeric(tryGetStat(stats, 'foulsDrawn'), { defaultValue: '0' }),
    align: 'center',
  },
  {
    key: 'plusMinus',
    label: '+/-',
    accessor: (stats) => {
      const value = tryGetStat(stats, 'plusMinus');
      if (value === undefined || value === null || value === '') {
        return '0';
      }
      const numericValue = typeof value === 'number' ? value : Number(value);
      if (Number.isNaN(numericValue)) {
        return '0';
      }
      if (numericValue > 0) return `+${numericValue}`;
      return numericValue.toString();
    },
    align: 'center',
  },
  {
    key: 'efficiency',
    label: 'EF',
    accessor: (stats) => calculateEfficiency(stats),
    align: 'center',
  },
  {
    key: 'points',
    label: 'PTS',
    accessor: (stats) =>
      formatNumeric(computePoints(stats), { defaultValue: '0' }),
    align: 'center',
  },
];

const aggregateColumnsForTotals = (
  totals: BasketballTeamSnapshot['totals']
): Record<string, string> => {
  if (!totals) return {};

  const aggregated: Record<string, string> = {};

  statColumns.forEach((column) => {
    if (column.key === 'fieldGoals' || column.key === 'fieldGoalsPct') {
      const made = Number(tryGetStat(totals, 'fieldGoalsMade') ?? 0);
      const attempted = Number(tryGetStat(totals, 'fieldGoalsAttempted') ?? 0);
      aggregated.fieldGoals = `${made}/${attempted}`;
      aggregated.fieldGoalsPct = calculatePercentage(made, attempted);
    } else if (
      column.key === 'twoPointers' ||
      column.key === 'twoPointersPct'
    ) {
      const made = Number(tryGetStat(totals, 'twoPointersMade') ?? 0);
      const attempted = Number(tryGetStat(totals, 'twoPointersAttempted') ?? 0);
      aggregated.twoPointers = `${made}/${attempted}`;
      aggregated.twoPointersPct = calculatePercentage(made, attempted);
    } else if (
      column.key === 'threePointers' ||
      column.key === 'threePointersPct'
    ) {
      const made = Number(tryGetStat(totals, 'threePointersMade') ?? 0);
      const attempted = Number(
        tryGetStat(totals, 'threePointersAttempted') ?? 0
      );
      aggregated.threePointers = `${made}/${attempted}`;
      aggregated.threePointersPct = calculatePercentage(made, attempted);
    } else if (column.key === 'freeThrows' || column.key === 'freeThrowsPct') {
      const made = Number(tryGetStat(totals, 'freeThrowsMade') ?? 0);
      const attempted = Number(tryGetStat(totals, 'freeThrowsAttempted') ?? 0);
      aggregated.freeThrows = `${made}/${attempted}`;
      aggregated.freeThrowsPct = calculatePercentage(made, attempted);
    } else if (column.key === 'totalRebounds') {
      aggregated.totalRebounds = formatNumeric(computeRebounds(totals), {
        defaultValue: '0',
      });
    } else if (column.key === 'points') {
      aggregated.points = formatNumeric(computePoints(totals), {
        defaultValue: '0',
      });
    } else if (column.key === 'efficiency') {
      aggregated.efficiency = calculateEfficiency(totals);
    } else {
      const value =
        totals[column.key as keyof BasketballPlayerStats] ??
        tryGetStat(totals, column.key as keyof typeof numericKeysMap);
      if (value !== undefined && value !== null && value !== '') {
        aggregated[column.key] = formatNumeric(value, { defaultValue: '0' });
      } else {
        aggregated[column.key] =
          column.key === 'minutes' ? totals.minutes ?? '0' : '0';
      }
    }
  });

  return aggregated;
};

const getTeamName = (
  snapshot: BasketballTeamSnapshot | undefined,
  fallback: string | undefined
) => {
  const rawName = snapshot?.teamName || fallback || 'Unknown Team';
  return simplifyTeamName(rawName);
};

const getCellBorderClass = (_index: number, columnKey: string) => {
  // Min column (index 0 in statColumns)
  if (columnKey === 'minutes') {
    return 'border-r border-brand-200';
  }
  // Field Goals (first shooting stat group)
  if (columnKey === 'fieldGoals') {
    return 'border-l border-r border-brand-200';
  }
  if (columnKey === 'fieldGoalsPct') {
    return 'border-r border-brand-200';
  }
  // 2 Points, 3 Points, Free Throws (other shooting stat groups)
  if (['twoPointers', 'threePointers', 'freeThrows'].includes(columnKey)) {
    return 'border-r border-brand-200';
  }
  if (
    ['twoPointersPct', 'threePointersPct', 'freeThrowsPct'].includes(columnKey)
  ) {
    return 'border-r border-brand-200';
  }
  // OR (first rebound)
  if (columnKey === 'offensiveRebounds') {
    return 'border-l border-r border-brand-200';
  }
  // DR, TOT (other rebounds)
  if (['defensiveRebounds', 'totalRebounds'].includes(columnKey)) {
    return 'border-r border-brand-200';
  }
  // AS (first other stat)
  if (columnKey === 'assists') {
    return 'border-l border-r border-brand-200';
  }
  // TO, ST, BS (other stats)
  if (['turnovers', 'steals', 'blocks'].includes(columnKey)) {
    return 'border-r border-brand-200';
  }
  // PF (first foul)
  if (columnKey === 'personalFouls') {
    return 'border-l border-r border-brand-200';
  }
  // FD (second foul)
  if (columnKey === 'foulsDrawn') {
    return 'border-r border-brand-200';
  }
  // +/- (first advanced stat)
  if (columnKey === 'plusMinus') {
    return 'border-l border-r border-brand-200';
  }
  // EF (second advanced stat)
  if (columnKey === 'efficiency') {
    return 'border-r border-brand-200';
  }
  // PTS (last column)
  if (columnKey === 'points') {
    return 'border-l border-brand-200';
  }
  return '';
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

  // Sort players: starters first (with *), then by jersey number
  const sortedPlayers = [...players].sort((a, b) => {
    if (a.starter && !b.starter) return -1;
    if (!a.starter && b.starter) return 1;
    const aNum = Number(a.jerseyNumber || 999);
    const bNum = Number(b.jerseyNumber || 999);
    return aNum - bNum;
  });

  return (
    <div className="bg-white rounded-2xl shadow-md border border-brand-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-brand-100 flex items-center justify-between bg-gradient-to-r from-brand-50 to-white">
        <div>
          <div className="text-xs uppercase tracking-wide text-brand-400">
            {teamLabel}
          </div>
          <h4 className="text-xl font-display font-semibold text-brand-700">
            {displayName}
          </h4>
        </div>
        <div className="flex items-center gap-2 bg-peach-100 text-peach-600 px-3 py-1.5 rounded-full text-sm font-semibold">
          <Trophy className="w-4 h-4" />
          <span>{totalPoints} pts</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-brand-50 text-brand-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-3 py-3 text-center font-semibold border-r border-brand-200 [vertical-align:middle]">
                No
              </th>
              <th className="px-4 py-3 text-left font-semibold border-r border-brand-200 [vertical-align:middle]">
                Name
              </th>
              <th className="px-3 py-3 text-center font-semibold border-r border-brand-200 [vertical-align:middle]">
                Min
              </th>
              <th
                colSpan={2}
                className="px-2 py-3 text-center font-semibold border-l border-r border-b border-brand-200 [vertical-align:middle]"
              >
                Field Goals
              </th>
              <th
                colSpan={2}
                className="px-2 py-3 text-center font-semibold border-r border-b border-brand-200 [vertical-align:middle]"
              >
                2 Points
              </th>
              <th
                colSpan={2}
                className="px-2 py-3 text-center font-semibold border-r border-b border-brand-200 [vertical-align:middle]"
              >
                3 Points
              </th>
              <th
                colSpan={2}
                className="px-2 py-3 text-center font-semibold border-r border-b border-brand-200 [vertical-align:middle]"
              >
                Free Throws
              </th>
              <th className="px-2 py-3 text-center font-semibold border-l border-r border-brand-200 [vertical-align:middle]">
                OR
              </th>
              <th className="px-2 py-3 text-center font-semibold border-r border-brand-200 [vertical-align:middle]">
                DR
              </th>
              <th className="px-2 py-3 text-center font-semibold border-r border-brand-200 [vertical-align:middle]">
                TOT
              </th>
              <th className="px-2 py-3 text-center font-semibold border-l border-r border-brand-200 [vertical-align:middle]">
                AS
              </th>
              <th className="px-2 py-3 text-center font-semibold border-r border-brand-200 [vertical-align:middle]">
                TO
              </th>
              <th className="px-2 py-3 text-center font-semibold border-r border-brand-200 [vertical-align:middle]">
                ST
              </th>
              <th className="px-2 py-3 text-center font-semibold border-r border-brand-200 [vertical-align:middle]">
                BS
              </th>
              <th
                colSpan={2}
                className="px-2 py-3 text-center font-semibold border-l border-r border-b border-brand-200 [vertical-align:middle]"
              >
                Fouls
              </th>
              <th className="px-2 py-3 text-center font-semibold border-l border-r border-brand-200 [vertical-align:middle]">
                +/-
              </th>
              <th className="px-2 py-3 text-center font-semibold border-r border-brand-200 [vertical-align:middle]">
                EF
              </th>
              <th className="px-2 py-3 text-center font-semibold border-l border-brand-200 [vertical-align:middle]">
                PTS
              </th>
            </tr>
            <tr className="bg-brand-50/80">
              <th className="border-r border-brand-200 [vertical-align:middle]"></th>
              <th className="border-r border-brand-200 [vertical-align:middle]"></th>
              <th className="border-r border-brand-200 [vertical-align:middle]"></th>
              <th className="px-2 py-2 text-center text-[10px] font-medium border-l border-r border-brand-200 [vertical-align:middle]">
                M/A
              </th>
              <th className="px-2 py-2 text-center text-[10px] font-medium border-r border-brand-200 [vertical-align:middle]">
                %
              </th>
              <th className="px-2 py-2 text-center text-[10px] font-medium border-r border-brand-200 [vertical-align:middle]">
                M/A
              </th>
              <th className="px-2 py-2 text-center text-[10px] font-medium border-r border-brand-200 [vertical-align:middle]">
                %
              </th>
              <th className="px-2 py-2 text-center text-[10px] font-medium border-r border-brand-200 [vertical-align:middle]">
                M/A
              </th>
              <th className="px-2 py-2 text-center text-[10px] font-medium border-r border-brand-200 [vertical-align:middle]">
                %
              </th>
              <th className="px-2 py-2 text-center text-[10px] font-medium border-r border-brand-200 [vertical-align:middle]">
                M/A
              </th>
              <th className="px-2 py-2 text-center text-[10px] font-medium border-r border-brand-200 [vertical-align:middle]">
                %
              </th>
              <th className="border-l border-r border-brand-200 [vertical-align:middle]"></th>
              <th className="border-r border-brand-200 [vertical-align:middle]"></th>
              <th className="border-r border-brand-200 [vertical-align:middle]"></th>
              <th className="border-l border-r border-brand-200 [vertical-align:middle]"></th>
              <th className="border-r border-brand-200 [vertical-align:middle]"></th>
              <th className="border-r border-brand-200 [vertical-align:middle]"></th>
              <th className="border-r border-brand-200 [vertical-align:middle]"></th>
              <th className="px-2 py-2 text-center text-[10px] font-medium border-l border-r border-brand-200 [vertical-align:middle]">
                PF
              </th>
              <th className="px-2 py-2 text-center text-[10px] font-medium border-r border-brand-200 [vertical-align:middle]">
                FD
              </th>
              <th className="border-l border-r border-brand-200 [vertical-align:middle]"></th>
              <th className="border-r border-brand-200 [vertical-align:middle]"></th>
              <th className="border-l border-brand-200 [vertical-align:middle]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-50 text-sm text-brand-600">
            {sortedPlayers.map((player) => {
              const jerseyDisplay = player.jerseyNumber
                ? `${player.starter ? '*' : ''}${player.jerseyNumber}`
                : '';
              const nameDisplay = player.captain
                ? `${player.playerName} (C)`
                : player.playerName;

              return (
                <tr
                  key={`${player.playerName}-${player.jerseyNumber ?? 'bench'}`}
                  className="hover:bg-brand-50/50"
                >
                  <td className="px-3 py-3 text-center font-medium text-brand-700 border-r border-brand-200 [vertical-align:middle]">
                    {jerseyDisplay}
                  </td>
                  <td className="px-4 py-3 font-medium text-brand-700 border-r border-brand-200 [vertical-align:middle]">
                    {nameDisplay}
                  </td>
                  {statColumns.map((column, idx) => (
                    <td
                      key={column.key}
                      className={`${
                        idx === 0 ? 'px-3' : 'px-2'
                      } py-3 [vertical-align:middle] ${getCellBorderClass(
                        idx,
                        column.key
                      )} ${
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
              );
            })}
          </tbody>
          <tfoot className="bg-brand-50/60 text-sm font-semibold text-brand-700">
            <tr>
              <td className="px-3 py-3 border-r border-brand-200 [vertical-align:middle]"></td>
              <td className="px-4 py-3 uppercase tracking-wide border-r border-brand-200 [vertical-align:middle]">
                Totals
              </td>
              {statColumns.map((column, idx) => (
                <td
                  key={column.key}
                  className={`${
                    idx === 0 ? 'px-3' : 'px-2'
                  } py-3 [vertical-align:middle] ${getCellBorderClass(
                    idx,
                    column.key
                  )} ${
                    column.align === 'right'
                      ? 'text-right'
                      : column.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                  }`}
                >
                  {totals[column.key] ??
                    (column.key === 'minutes'
                      ? snapshot?.totals?.minutes ?? '0'
                      : '0')}
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
              .filter(
                ({ key }) => legend[key] !== undefined && legend[key] !== null
              )
              .map(({ key, label }) => (
                <div
                  key={key}
                  className="bg-white rounded-lg border border-brand-100 px-4 py-3 flex flex-col shadow-sm"
                >
                  <span className="text-xs uppercase tracking-wide text-brand-300">
                    {label}
                  </span>
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

export default function BasketballBoxScore({
  summary,
  match,
}: BasketballBoxScoreProps) {
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
              <div className="text-3xl sm:text-4xl font-display font-semibold">
                {homeName}
              </div>
              <div className="flex items-center gap-3 text-5xl sm:text-6xl font-display font-bold">
                <span>{computedHomePoints}</span>
                <span className="text-white/50 text-3xl sm:text-4xl">-</span>
                <span>{computedAwayPoints}</span>
              </div>
              <div className="text-3xl sm:text-4xl font-display font-semibold">
                {awayName}
              </div>
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
                    <td className="px-3 py-3 font-semibold text-left">
                      {homeName}
                    </td>
                    {homeQuarterScores.map((quarter) => (
                      <td
                        key={`home-${quarter.label}`}
                        className="px-2 py-3 text-center"
                      >
                        {quarter.score ?? '-'}
                      </td>
                    ))}
                    <td className="px-3 py-3 text-center font-semibold text-peach-300">
                      {computedHomePoints}
                    </td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-3 py-3 font-semibold text-left">
                      {awayName}
                    </td>
                    {awayQuarterScores.map((quarter) => (
                      <td
                        key={`away-${quarter.label}`}
                        className="px-2 py-3 text-center"
                      >
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
