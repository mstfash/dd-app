import {
  BasketballMatchSummary,
  Competition,
  LeagueTableType,
  MatchActionDetail,
  MatchInterface,
  MatchTimelineAction,
  Season,
  TableType,
  TopPlayer,
} from '../../../utils/types';

const GENERIC_TEAM_PATTERNS = [
  /double\s+dribble/gi,
  /season\s+\w+/gi,
  /league\s+\w+/gi,
  /division\s+\w+/gi,
];

export const simplifyTeamName = (name?: string) => {
  if (!name) return '';
  let simplified = name;
  GENERIC_TEAM_PATTERNS.forEach((pattern) => {
    simplified = simplified.replace(pattern, '');
  });
  simplified = simplified.replace(/\s+/g, ' ').trim();
  return simplified || name.trim();
};

interface BasketballAdvancedStats {
  wins: number;
  losses: number;
  homeWins: number;
  homeLosses: number;
  awayWins: number;
  awayLosses: number;
  results: Array<'W' | 'L'>;
}

const computeBasketballAdvancedStats = (
  matches: MatchInterface[],
  sport: string
) => {
  const statsMap = new Map<string, BasketballAdvancedStats>();

  const sortedMatches = [...matches].sort(
    (a, b) =>
      new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime()
  );

  sortedMatches.forEach((match) => {
    if (!match.isMatchEnded) return;
    const { homeScore, awayScore } = getScoresBySport(match, sport);
    const homeId = match.homeTeam?.id;
    const awayId = match.awayTeam?.id;
    if (!homeId || !awayId) return;

    if (!statsMap.has(homeId)) {
      statsMap.set(homeId, {
        wins: 0,
        losses: 0,
        homeWins: 0,
        homeLosses: 0,
        awayWins: 0,
        awayLosses: 0,
        results: [],
      });
    }
    if (!statsMap.has(awayId)) {
      statsMap.set(awayId, {
        wins: 0,
        losses: 0,
        homeWins: 0,
        homeLosses: 0,
        awayWins: 0,
        awayLosses: 0,
        results: [],
      });
    }

    const homeStats = statsMap.get(homeId)!;
    const awayStats = statsMap.get(awayId)!;

    if (homeScore > awayScore) {
      homeStats.wins += 1;
      homeStats.homeWins += 1;
      homeStats.results.push('W');

      awayStats.losses += 1;
      awayStats.awayLosses += 1;
      awayStats.results.push('L');
    } else {
      awayStats.wins += 1;
      awayStats.awayWins += 1;
      awayStats.results.push('W');

      homeStats.losses += 1;
      homeStats.homeLosses += 1;
      homeStats.results.push('L');
    }
  });

  return statsMap;
};

const formatWinPercentage = (wins: number, losses: number) => {
  const games = wins + losses;
  if (games === 0) return '0.000';
  return (wins / games).toFixed(3);
};

const formatGamesBehind = (
  leaderWins: number,
  leaderLosses: number,
  teamWins: number,
  teamLosses: number
) => {
  const gb =
    (leaderWins - teamWins + (teamLosses - leaderLosses)) / 2;
  if (gb === 0) return '—';
  return gb % 1 === 0 ? gb.toString() : gb.toFixed(1);
};

const formatRecord = (wins: number, losses: number) => `${wins}-${losses}`;

const formatLastTen = (results: Array<'W' | 'L'>) => {
  if (!results.length) return '0-0';
  const lastTen = results.slice(-10);
  const wins = lastTen.filter((result) => result === 'W').length;
  const losses = lastTen.length - wins;
  return `${wins}-${losses}`;
};

const formatStreak = (results: Array<'W' | 'L'>) => {
  if (!results.length) return '—';
  let count = 0;
  let streakType: 'W' | 'L' | '' = '';
  for (let i = results.length - 1; i >= 0; i--) {
    if (!streakType) {
      streakType = results[i];
      count = 1;
    } else if (results[i] === streakType) {
      count += 1;
    } else {
      break;
    }
  }
  return streakType ? `${streakType}${count}` : '—';
};

const isBasketballSummary = (
  detail: MatchActionDetail
): detail is BasketballMatchSummary => {
  if (!detail || typeof detail !== 'object') {
    return false;
  }
  const record = detail as Record<string, unknown>;
  const sport = typeof record.sport === 'string' ? record.sport.toLowerCase() : '';
  return (
    sport === 'basketball' &&
    typeof record.teams === 'object' &&
    record.teams !== null
  );
};

const isTimelineAction = (
  detail: MatchActionDetail
): detail is MatchTimelineAction => {
  if (!detail || typeof detail !== 'object') return false;
  const maybeAction = detail as MatchTimelineAction;
  return typeof maybeAction.type === 'string' && typeof maybeAction.name === 'string';
};

const BASKETBALL_POINT_VALUES = {
  freethrow: 1,
  twopointer: 2,
  threepointer: 3,
};

const getBasketballActionPoints = (
  action: MatchTimelineAction
) => {
  if (typeof action?.points === 'number') {
    return action.points;
  }
  if (action?.pointType) {
    const key = action.pointType
      .toLowerCase()
      .replace(/[^a-z]/g, '') as keyof typeof BASKETBALL_POINT_VALUES;
    if (BASKETBALL_POINT_VALUES[key]) {
      return BASKETBALL_POINT_VALUES[key];
    }
  }
  return 2;
};

const calculateBasketballScore = (
  match: MatchInterface,
  isHomeTeam: boolean
) => {
  const actions = (match.actionDetails || [])
    .filter(isTimelineAction)
    .filter(
    (action) =>
      action.type?.toLowerCase() === 'points' &&
      action.isHomeTeam === isHomeTeam
  );

  if (!actions.length) {
    return isHomeTeam ? match.homeTeamScore || 0 : match.awayTeamScore || 0;
  }

  return actions.reduce(
    (total, action) => total + getBasketballActionPoints(action),
    0
  );
};

const getScoresBySport = (match: MatchInterface, sport: string) => {
  if ((sport || '').toLowerCase() === 'basketball') {
    return {
      homeScore: calculateBasketballScore(match, true),
      awayScore: calculateBasketballScore(match, false),
    };
  }

  return {
    homeScore: match.homeTeamScore || 0,
    awayScore: match.awayTeamScore || 0,
  };
};

export interface SportStats {
  sport: string;
  liveMatches: number;
  completedMatches: number;
  totalScore: number;
  averageScore: string;
  scoreLabel: string;
  recentResults: Array<{
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    winner: string;
    endedAt: string;
  }>;
  topScorer: {
    name: string;
    team: string;
    goals: number;
  };
  topPerformer?: {
    name: string;
    team: string;
    stat: number;
    statLabel: string;
  };
}

export function calculateTournamentStats(
  matches: MatchInterface[],
  selectedDate: Date,
  selectedSport: string
): SportStats[] {
  // Filter matches for selected date
  const todayMatches = matches.filter((match) => {
    const matchDate = new Date(match.matchDate);
    return matchDate.toDateString() === selectedDate.toDateString();
  });

  // If specific sport is selected, only calculate for that sport
  const sports =
    selectedSport === 'all'
      ? ['football', 'padel', 'basketball', 'padbol']
      : [selectedSport];

  // Generate league tables for each sport
  const leagueTables: Record<string, TableType[]> = {};

  sports.forEach((sport) => {
    const sportMatches = matches.filter((m) => m.type?.toLowerCase() === sport);

    const teamsMap = new Map<string, TableType>();

    // Initialize teams from matches
    sportMatches.forEach((match) => {
      const homeTeamName = match.homeTeam?.teams[0]?.name;
      const awayTeamName = match.awayTeam?.teams[0]?.name;
      const homeTeamId = match.homeTeam?.teams[0]?.id;
      const awayTeamId = match.awayTeam?.teams[0]?.id;

      if (!teamsMap.has(homeTeamId) && homeTeamName) {
        teamsMap.set(homeTeamId, {
          team: homeTeamName,
          partId: match.homeTeam?.id,
          MP: '0',
          W: '0',
          L: '0',
          D: '0',
          GF: '0',
          GA: '0',
          GD: '0',
          PF: '0',
          PA: '0',
          PD: '0',
          SF: '0',
          SA: '0',
          SD: '0',
          FP: '0',
          PTS: '0',
          h2h: 0,
          scoreSheet: [],
          participation: match.homeTeam,
        });
      }

      if (!teamsMap.has(awayTeamId) && awayTeamName) {
        teamsMap.set(awayTeamId, {
          team: awayTeamName,
          partId: match.awayTeam?.id,
          MP: '0',
          W: '0',
          L: '0',
          D: '0',
          GF: '0',
          GA: '0',
          GD: '0',
          PF: '0',
          PA: '0',
          PD: '0',
          SF: '0',
          SA: '0',
          SD: '0',
          FP: '0',
          PTS: '0',
          h2h: 0,
          scoreSheet: [],
          participation: match.awayTeam,
        });
      }
    });

    // Process matches
    sportMatches.forEach((match) => {
      if (!match.isMatchEnded) return;

      const homeTeamId = match.homeTeam?.teams[0]?.id;
      const awayTeamId = match.awayTeam?.teams[0]?.id;

      if (!homeTeamId || !awayTeamId) return;

      const homeTeam = teamsMap.get(homeTeamId);
      const awayTeam = teamsMap.get(awayTeamId);

      if (!homeTeam || !awayTeam) return;

      // Update matches played
      homeTeam.MP = (parseInt(homeTeam.MP) + 1).toString();
      awayTeam.MP = (parseInt(awayTeam.MP) + 1).toString();

      // Update goals
      const { homeScore, awayScore } = getScoresBySport(match, sport);

      homeTeam.GF = (parseInt(homeTeam.GF) + homeScore).toString();
      homeTeam.GA = (parseInt(homeTeam.GA) + awayScore).toString();
      awayTeam.GF = (parseInt(awayTeam.GF) + awayScore).toString();
      awayTeam.GA = (parseInt(awayTeam.GA) + homeScore).toString();

      if (sport === 'basketball') {
        homeTeam.PF = (parseInt(homeTeam.PF || '0') + homeScore).toString();
        homeTeam.PA = (parseInt(homeTeam.PA || '0') + awayScore).toString();
        homeTeam.PD = (
          parseInt(homeTeam.PF || '0') - parseInt(homeTeam.PA || '0')
        ).toString();
        awayTeam.PF = (parseInt(awayTeam.PF || '0') + awayScore).toString();
        awayTeam.PA = (parseInt(awayTeam.PA || '0') + homeScore).toString();
        awayTeam.PD = (
          parseInt(awayTeam.PF || '0') - parseInt(awayTeam.PA || '0')
        ).toString();
        homeTeam.GF = homeTeam.PF;
        homeTeam.GA = homeTeam.PA;
        homeTeam.GD = homeTeam.PD || '0';
        awayTeam.GF = awayTeam.PF;
        awayTeam.GA = awayTeam.PA;
        awayTeam.GD = awayTeam.PD || '0';
      }

      // Create score sheet entry
      const scoreSheet = {
        isHomeTeam: true,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        homeTeamId,
        awayTeamId,
        homeTeamScore: homeScore,
        awayTeamScore: awayScore,
      };

      homeTeam.scoreSheet.push(scoreSheet);
      awayTeam.scoreSheet.push({ ...scoreSheet, isHomeTeam: false });

      // Update head to head count
      if (homeScore !== awayScore) {
        if (homeScore > awayScore) {
          homeTeam.h2h++;
        } else {
          awayTeam.h2h++;
        }
      }

      const isBasketball = sport === 'basketball';

      if (homeScore > awayScore) {
        homeTeam.W = (parseInt(homeTeam.W) + 1).toString();
        awayTeam.L = (parseInt(awayTeam.L) + 1).toString();
        if (!isBasketball) {
          homeTeam.PTS = (parseInt(homeTeam.PTS) + 3).toString();
        }
      } else if (homeScore < awayScore) {
        awayTeam.W = (parseInt(awayTeam.W) + 1).toString();
        homeTeam.L = (parseInt(homeTeam.L) + 1).toString();
        if (!isBasketball) {
          awayTeam.PTS = (parseInt(awayTeam.PTS) + 3).toString();
        }
      } else if (!isBasketball) {
        homeTeam.D = (parseInt(homeTeam.D) + 1).toString();
        awayTeam.D = (parseInt(awayTeam.D) + 1).toString();
        homeTeam.PTS = (parseInt(homeTeam.PTS) + 1).toString();
        awayTeam.PTS = (parseInt(awayTeam.PTS) + 1).toString();
      }

      if (isBasketball) {
        homeTeam.PTS = homeTeam.W;
        awayTeam.PTS = awayTeam.W;
      }

      // Calculate goal difference
      if (!isBasketball) {
        homeTeam.GD = (
          parseInt(homeTeam.GF) - parseInt(homeTeam.GA)
        ).toString();
        awayTeam.GD = (
          parseInt(awayTeam.GF) - parseInt(awayTeam.GA)
        ).toString();
      }

      // Update fair play points
      homeTeam.FP = (match.homeTeamFairPlayPoints ? 1 : 0).toString();
      awayTeam.FP = (match.awayTeamFairPlayPoints ? 1 : 0).toString();
    });

    // Sort table by points, GD, then h2h
    const table = Array.from(teamsMap.values()).sort((a, b) => {
      if (sport === 'basketball') {
        if (parseInt(a.W) !== parseInt(b.W)) {
          return parseInt(b.W) - parseInt(a.W);
        }
        const diffA = parseInt(a.PD || a.GD || '0');
        const diffB = parseInt(b.PD || b.GD || '0');
        if (diffA !== diffB) {
          return diffB - diffA;
        }
        return parseInt(b.PF || b.GF || '0') - parseInt(a.PF || a.GF || '0');
      }

      if (parseInt(a.PTS) !== parseInt(b.PTS)) {
        return parseInt(b.PTS) - parseInt(a.PTS);
      }
      if (parseInt(a.GD) !== parseInt(b.GD)) {
        return parseInt(b.GD) - parseInt(a.GD);
      }
      return b.h2h - a.h2h;
    });

    leagueTables[sport] = table;
  });

  // Calculate sport stats (existing code)
  const sportStats = sports.map((sport) => {
    const sportMatches = todayMatches
      .map((m) => ({ ...m, type: m.type ? m.type : 'Football' }))
      .filter((m) => m.type.toLowerCase() === sport);

    // Calculate basic stats
    const liveMatches = sportMatches.filter((m) => m.isMatchLive).length;
    const completedMatches = sportMatches.filter((m) => m.isMatchEnded).length;
    const totalScore = sportMatches.reduce(
      (acc, match) =>
        acc + (match.homeTeamScore || 0) + (match.awayTeamScore || 0),
      0
    );

    // Get sport-specific score label
    const scoreLabel =
      sport === 'football'
        ? 'Goals'
        : sport === 'basketball'
        ? 'Points'
        : sport === 'padel'
        ? 'Points'
        : sport === 'padbol'
        ? 'Points'
        : 'Score';

    const averageScore =
      sportMatches.length > 0
        ? (totalScore / sportMatches.length).toFixed(2)
        : '0.00';
    // Get recent results (matches that ended in the last hour)
    const recentResults = sportMatches
      .filter((match) => {
        if (!match.isMatchEnded) return false;
        const matchDate = match.matchDate ? new Date(match.matchDate) : null;
        if (!matchDate) return false;
        const now = new Date();
        const diffInHours =
          (now.getTime() - matchDate.getTime()) / (1000 * 60 * 60);
        return diffInHours <= 1;
      })
      .map((match) => ({
        homeTeam: match.homeTeam?.teams?.[0]?.name || 'Unknown Team',
        awayTeam: match.awayTeam?.teams?.[0]?.name || 'Unknown Team',
        homeScore: match.homeTeamScore || 0,
        awayScore: match.awayTeamScore || 0,
        winner:
          match.homeTeamScore > (match.awayTeamScore || 0)
            ? match.homeTeam?.name
            : (match.awayTeamScore || 0) > (match.homeTeamScore || 0)
            ? match.awayTeam?.name
            : 'Draw',
        endedAt: new Date(match.matchDate).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }))
      .sort(
        (a, b) => new Date(b.endedAt).getTime() - new Date(a.endedAt).getTime()
      );

    // Calculate top scorer
    const scorers = new Map();
    sportMatches.forEach((match) => {
      if (sport === 'football') {
        (match.actionDetails || [])
          .filter((action) => action.type === 'Goal' && !action.isOwnGoal)
          .forEach((action) => {
            const team = action.isHomeTeam
              ? match.homeTeam?.name
              : match.awayTeam?.name;
            if (!action.name || !team) return;
            const key = `${action.name}|${team}`;
            scorers.set(key, (scorers.get(key) || 0) + 1);
          });
      } else {
        // For other sports, use total match score contribution
        (match.lineUp || [])
          .filter((player) => !player.isSub)
          .forEach((player) => {
            if (!player.name || !player.team) return;
            const key = `${player.name}|${player.team}`;
            const score = player.isHomeTeam
              ? match.homeTeamScore
              : match.awayTeamScore;
            scorers.set(key, (scorers.get(key) || 0) + score);
          });
      }
    });

    const topScorer = Array.from(scorers.entries()).sort(
      ([, a], [, b]) => b - a
    )[0] || ['Unknown|Unknown', 0];
    const [scorerName, scorerTeam] = topScorer[0].split('|');

    // Calculate sport-specific top performer
    const calculateTopPerformer = (
      sport: string,
      sportMatches: MatchInterface[]
    ) => {
      const completedMatches = sportMatches.filter((m) => m.isMatchEnded);

      switch (sport) {
        case 'padel':
          // Calculate match wins and win percentage
          const padelPlayers = new Map();
          completedMatches.forEach((match) => {
            const homeScore = match.homeTeamScore || 0;
            const awayScore = match.awayTeamScore || 0;
            const winningTeam =
              homeScore > awayScore ? match.homeTeam : match.awayTeam;

            if (!winningTeam) return;

            (match.lineUp || [])
              .filter((player) => !player.isSub)
              .forEach((player) => {
                if (!player.name || !player.team) return;
                const key = `${player.name}|${player.team}`;
                const current = padelPlayers.get(key) || {
                  wins: 0,
                  matches: 0,
                };
                if (player.team === winningTeam.name) {
                  current.wins++;
                }
                current.matches++;
                padelPlayers.set(key, current);
              });
          });

          const topPadelPlayer = Array.from(padelPlayers.entries())
            .filter(([, stats]) => stats.matches >= 2) // Minimum 2 matches played
            .map(([key, stats]) => ({
              key,
              winRate: ((stats.wins / stats.matches) * 100).toFixed(1),
              matches: stats.matches,
            }))
            .sort((a, b) => parseFloat(b.winRate) - parseFloat(a.winRate))[0];

          if (topPadelPlayer) {
            const [playerName, playerTeam] = topPadelPlayer.key.split('|');
            return {
              name: playerName,
              team: playerTeam,
              stat: parseFloat(topPadelPlayer.winRate),
              statLabel: 'Win Rate %',
            };
          }
          break;

        case 'basketball':
          // Calculate points per game
          const basketballPlayers = new Map();
          completedMatches.forEach((match) => {
            (match.lineUp || [])
              .filter((player) => !player.isSub)
              .forEach((player) => {
                if (!player.name || !player.team) return;
                const key = `${player.name}|${player.team}`;
                const current = basketballPlayers.get(key) || {
                  points: 0,
                  games: 0,
                };
                const score = player.isHomeTeam
                  ? match.homeTeamScore
                  : match.awayTeamScore;
                current.points += score || 0;
                current.games++;
                basketballPlayers.set(key, current);
              });
          });

          const topBasketballPlayer = Array.from(basketballPlayers.entries())
            .filter(([, stats]) => stats.games >= 2) // Minimum 2 games played
            .map(([key, stats]) => ({
              key,
              ppg: (stats.points / stats.games).toFixed(1),
              games: stats.games,
            }))
            .sort((a, b) => parseFloat(b.ppg) - parseFloat(a.ppg))[0];

          if (topBasketballPlayer) {
            const [playerName, playerTeam] = topBasketballPlayer.key.split('|');
            return {
              name: playerName,
              team: playerTeam,
              stat: parseFloat(topBasketballPlayer.ppg),
              statLabel: 'PPG',
            };
          }
          break;

        case 'football':
          // Calculate clean sheets for goalkeepers
          const goalkeepers = new Map();
          completedMatches.forEach((match) => {
            (match.lineUp || [])
              .filter((player) => player.position === 'GK' && !player.isSub)
              .forEach((player) => {
                if (!player.name || !player.team) return;
                const isCleanSheet = player.isHomeTeam
                  ? (match.awayTeamScore || 0) === 0
                  : (match.homeTeamScore || 0) === 0;

                if (isCleanSheet) {
                  const key = `${player.name}|${player.team}`;
                  goalkeepers.set(key, (goalkeepers.get(key) || 0) + 1);
                }
              });
          });

          const topKeeper = Array.from(goalkeepers.entries()).sort(
            ([, a], [, b]) => b - a
          )[0];

          if (topKeeper) {
            const [keeperName, keeperTeam] = topKeeper[0].split('|');
            return {
              name: keeperName,
              team: keeperTeam,
              stat: topKeeper[1],
              statLabel: 'Clean Sheets',
            };
          }
          break;

        case 'padbol':
          // Calculate points per set
          const padbolPlayers = new Map();
          completedMatches.forEach((match) => {
            (match.lineUp || [])
              .filter((player) => !player.isSub)
              .forEach((player) => {
                if (!player.name || !player.team) return;
                const key = `${player.name}|${player.team}`;
                const current = padbolPlayers.get(key) || {
                  points: 0,
                  sets: 0,
                };
                const score = player.isHomeTeam
                  ? match.homeTeamScore
                  : match.awayTeamScore;
                current.points += score || 0;
                current.sets++;
                padbolPlayers.set(key, current);
              });
          });

          const topPadbolPlayer = Array.from(padbolPlayers.entries())
            .filter(([, stats]) => stats.sets >= 2) // Minimum 2 sets played
            .map(([key, stats]) => ({
              key,
              pps: (stats.points / stats.sets).toFixed(1),
              sets: stats.sets,
            }))
            .sort((a, b) => parseFloat(b.pps) - parseFloat(a.pps))[0];

          if (topPadbolPlayer) {
            const [playerName, playerTeam] = topPadbolPlayer.key.split('|');
            return {
              name: playerName,
              team: playerTeam,
              stat: parseFloat(topPadbolPlayer.pps),
              statLabel: 'Points/Set',
            };
          }
          break;
      }
      return undefined;
    };

    return {
      sport,
      liveMatches,
      completedMatches,
      totalScore,
      averageScore,
      scoreLabel,
      recentResults,
      topScorer: {
        name: scorerName,
        team: scorerTeam,
        goals: scorers.get(`${scorerName}|${scorerTeam}`) || 0,
        scoreLabel,
      },
      topPerformer: calculateTopPerformer(sport, sportMatches),
    };
  });

  return sportStats;
}

export function generateCompleteLeagueTable(
  matches: MatchInterface[],
  competition: Competition,
  season: Season,
  selectedSport: string
): LeagueTableType {
  const leagueTables: Record<string, TableType[]> = {};
  const sports =
    selectedSport === 'all'
      ? ['football', 'padel', 'basketball', 'padbol']
      : [selectedSport];

  sports.forEach((sport) => {
    const sportMatches = matches?.filter(
      (m) => m.type?.toLowerCase() === sport
    );

    const teamsMap = new Map<string, TableType>();

    // Initialize teams from matches
    sportMatches?.forEach((match) => {
      const homeTeamName = match.homeTeam?.teams[0]?.name;
      const awayTeamName = match.awayTeam?.teams[0]?.name;
      const homeTeamId = match.homeTeam?.teams[0]?.id;
      const awayTeamId = match.awayTeam?.teams[0]?.id;

      if (!teamsMap.has(homeTeamId) && homeTeamName) {
        teamsMap.set(homeTeamId, {
          team: homeTeamName,
          partId: match.homeTeam?.id,
          MP: '0',
          W: '0',
          L: '0',
          D: '0',
          GF: '0',
          GA: '0',
          GD: '0',
          PF: '0',
          PA: '0',
          PD: '0',
          SF: '0',
          SA: '0',
          SD: '0',
          FP: '0',
          PTS: '0',
          h2h: 0,
          group: match.group,
          scoreSheet: [],
          participation: match.homeTeam,
        });
      }

      if (!teamsMap.has(awayTeamId) && awayTeamName) {
        teamsMap.set(awayTeamId, {
          team: awayTeamName,
          partId: match.awayTeam?.id,
          MP: '0',
          W: '0',
          L: '0',
          D: '0',
          GF: '0',
          GA: '0',
          GD: '0',
          PF: '0',
          PA: '0',
          PD: '0',
          SF: '0',
          SA: '0',
          SD: '0',
          FP: '0',
          PTS: '0',
          h2h: 0,
          group: match.group,
          scoreSheet: [],
          participation: match.awayTeam,
        });
      }
    });

    // Process matches
    const groupStageMatches =
      sportMatches?.filter((m) => m.stage === 'Group Stage') || [];

    groupStageMatches.forEach((match) => {
        if (!match.isMatchEnded) return;
        const homeTeamId = match.homeTeam?.teams[0]?.id;
        const awayTeamId = match.awayTeam?.teams[0]?.id;

        if (!homeTeamId || !awayTeamId) return;

        const homeTeam = teamsMap.get(homeTeamId);
        const awayTeam = teamsMap.get(awayTeamId);

        if (!homeTeam || !awayTeam) return;

        // Update matches played
        homeTeam.MP = (parseInt(homeTeam.MP) + 1).toString();
        awayTeam.MP = (parseInt(awayTeam.MP) + 1).toString();

        // Update goals
        const { homeScore, awayScore } = getScoresBySport(match, sport);

        homeTeam.GF = (parseInt(homeTeam.GF) + homeScore).toString();
        homeTeam.GA = (parseInt(homeTeam.GA) + awayScore).toString();
        awayTeam.GF = (parseInt(awayTeam.GF) + awayScore).toString();
        awayTeam.GA = (parseInt(awayTeam.GA) + homeScore).toString();

        if (sport === 'basketball') {
          homeTeam.PF = (parseInt(homeTeam.PF || '0') + homeScore).toString();
          homeTeam.PA = (parseInt(homeTeam.PA || '0') + awayScore).toString();
          homeTeam.PD = (
            parseInt(homeTeam.PF || '0') - parseInt(homeTeam.PA || '0')
          ).toString();
          awayTeam.PF = (parseInt(awayTeam.PF || '0') + awayScore).toString();
          awayTeam.PA = (parseInt(awayTeam.PA || '0') + homeScore).toString();
          awayTeam.PD = (
            parseInt(awayTeam.PF || '0') - parseInt(awayTeam.PA || '0')
          ).toString();
          homeTeam.GF = homeTeam.PF;
          homeTeam.GA = homeTeam.PA;
          homeTeam.GD = homeTeam.PD || '0';
          awayTeam.GF = awayTeam.PF;
          awayTeam.GA = awayTeam.PA;
          awayTeam.GD = awayTeam.PD || '0';
        }

        // Create score sheet entry
        const scoreSheet = {
          isHomeTeam: true,
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          homeTeamId,
          awayTeamId,
          homeTeamScore: homeScore,
          awayTeamScore: awayScore,
        };

        if (!homeTeam.group) {
          homeTeam.group = match.group || '';
        }

        if (!awayTeam.group) {
          awayTeam.group = match.group || '';
        }

        homeTeam.scoreSheet.push(scoreSheet);
        awayTeam.scoreSheet.push({ ...scoreSheet, isHomeTeam: false });

        // Update head to head count
        if (homeScore !== awayScore) {
          if (homeScore > awayScore) {
            homeTeam.h2h++;
          } else {
            awayTeam.h2h++;
          }
        }

        const isBasketball = sport === 'basketball';

        if (homeScore > awayScore) {
          homeTeam.W = (parseInt(homeTeam.W) + 1).toString();
          awayTeam.L = (parseInt(awayTeam.L) + 1).toString();
          if (!isBasketball) {
            homeTeam.PTS = (parseInt(homeTeam.PTS) + 3).toString();
          }
        } else if (homeScore < awayScore) {
          awayTeam.W = (parseInt(awayTeam.W) + 1).toString();
          homeTeam.L = (parseInt(homeTeam.L) + 1).toString();
          if (!isBasketball) {
            awayTeam.PTS = (parseInt(awayTeam.PTS) + 3).toString();
          }
        } else if (!isBasketball) {
          homeTeam.D = (parseInt(homeTeam.D) + 1).toString();
          awayTeam.D = (parseInt(awayTeam.D) + 1).toString();
          homeTeam.PTS = (parseInt(homeTeam.PTS) + 1).toString();
          awayTeam.PTS = (parseInt(awayTeam.PTS) + 1).toString();
        }

        if (isBasketball) {
          homeTeam.PTS = homeTeam.W;
          awayTeam.PTS = awayTeam.W;
        } else {
          // Calculate goal difference for non-basketball sports
          homeTeam.GD = (
            parseInt(homeTeam.GF) - parseInt(homeTeam.GA)
          ).toString();
          awayTeam.GD = (
            parseInt(awayTeam.GF) - parseInt(awayTeam.GA)
          ).toString();
        }

        // Update fair play points
        homeTeam.FP = (match.homeTeamFairPlayPoints ? 1 : 0).toString();
        awayTeam.FP = (match.awayTeamFairPlayPoints ? 1 : 0).toString();
      });

    // Sort table by points, GD, then h2h
    const table = Array.from(teamsMap.values()).sort((a, b) => {
      if (sport === 'basketball') {
        if (parseInt(a.W) !== parseInt(b.W)) {
          return parseInt(b.W) - parseInt(a.W);
        }
        const diffA = parseInt(a.PD || a.GD || '0');
        const diffB = parseInt(b.PD || b.GD || '0');
        if (diffA !== diffB) {
          return diffB - diffA;
        }
        return parseInt(b.PF || b.GF || '0') - parseInt(a.PF || a.GF || '0');
      }

      if (parseInt(a.PTS) !== parseInt(b.PTS)) {
        return parseInt(b.PTS) - parseInt(a.PTS);
      }
      if (parseInt(a.GD) !== parseInt(b.GD)) {
        return parseInt(b.GD) - parseInt(a.GD);
      }
      return b.h2h - a.h2h;
    });

    if (sport === 'basketball') {
      const statsMap = computeBasketballAdvancedStats(
        groupStageMatches,
        sport
      );
      const leaderWins = parseInt(table[0]?.W || '0');
      const leaderLosses = parseInt(table[0]?.L || '0');

      table.forEach((team) => {
        const stats = statsMap.get(team.partId);
        if (!stats) {
          team.winPercentage = '0.000';
          team.pct = '0.000';
          team.gamesBehind = '—';
          team.gb = '—';
          team.conferenceRecord = `${team.W}-${team.L}`;
          team.conf = `${team.W}-${team.L}`;
          team.homeRecord = '0-0';
          team.home = '0-0';
          team.awayRecord = '0-0';
          team.away = '0-0';
          team.lastTenRecord = '0-0';
          team.l10 = '0-0';
          team.streak = '—';
          team.strk = '—';
          return;
        }

        const { wins, losses, homeWins, homeLosses, awayWins, awayLosses, results } =
          stats;
        const pct = formatWinPercentage(wins, losses);

        team.winPercentage = pct;
        team.pct = pct;
        team.gamesBehind = formatGamesBehind(
          leaderWins,
          leaderLosses,
          wins,
          losses
        );
        team.gb = team.gamesBehind;
        const conferenceRecord = formatRecord(wins, losses);
        team.conferenceRecord = conferenceRecord;
        team.conf = conferenceRecord;
        const homeRecord = formatRecord(homeWins, homeLosses);
        team.homeRecord = homeRecord;
        team.home = homeRecord;
        const awayRecord = formatRecord(awayWins, awayLosses);
        team.awayRecord = awayRecord;
        team.away = awayRecord;
        const lastTen = formatLastTen(results);
        team.lastTenRecord = lastTen;
        team.l10 = lastTen;
        const streak = formatStreak(results);
        team.streak = streak;
        team.strk = streak;
      });
    }

    leagueTables[sport] = table;
  });

  const table = leagueTables[selectedSport.toLowerCase()] || [];

  // Initialize player stats maps
  const playerStats = new Map<string, TopPlayer>();

  matches
    ?.filter((m) => (m.type.toLowerCase() || 'football') === selectedSport)
    .forEach((match) => {
      if (!match.isMatchEnded) return;

      // Process actions for player statistics
      match?.actionDetails?.forEach((action) => {
        if (!isTimelineAction(action)) return;
        const teamId = action.isHomeTeam
          ? match.homeTeam.id
          : match.awayTeam.id;
        const team = action.isHomeTeam
          ? match.homeTeam.teams[0]
          : match.awayTeam.teams[0];
        const playerId = `${action.name}-${teamId}`;

        if (!playerStats.has(playerId)) {
          playerStats.set(playerId, {
            name: action.name,
            team: team?.name || '',
            goals: '0',
            assists: '0',
            photo: '',
            position: '',
            playerId,
            inGoals: '0',
            PLD: '0',
            redCard: '0',
            yellowCard: '0',
            playerPhoto: '',
            matchesIds: [],
          });
        }

        const player = playerStats.get(playerId)!;

        // Track unique matches played
        if (!player.matchesIds.includes(match.id)) {
          player.matchesIds.push(match.id);
          player.PLD = player.matchesIds.length.toString();
        }

        // Update stats based on action type
        switch (action.type.toLowerCase()) {
          case 'goal':
            if (!action.isOwnGoal) {
              player.goals = (parseInt(player.goals) + 1).toString();
            }
            break;
          case 'assist':
            player.assists = (parseInt(player.assists) + 1).toString();
            break;
          case 'yellow card':
            player.yellowCard = (parseInt(player.yellowCard) + 1).toString();
            break;
          case 'red card':
            player.redCard = (parseInt(player.redCard) + 1).toString();
            break;
        }
      });

      // Process lineup for player positions and photos
      match.lineUp.forEach((player) => {
        const teamId = player.isHomeTeam
          ? match.homeTeam.id
          : match.awayTeam.id;
        const playerId = `${player.name}-${teamId}`;

        if (playerStats.has(playerId)) {
          const playerStat = playerStats.get(playerId)!;
          playerStat.position = player.position;
          playerStat.playerPhoto = player.playerPhoto;
        }
      });
    });

  // Convert player stats to arrays and sort
  const players = Array.from(playerStats.values());

  const topScorer = [...players]
    .sort((a, b) => parseInt(b.goals) - parseInt(a.goals))
    .slice(0, 10);

  const topAssist = [...players]
    .sort((a, b) => parseInt(b.assists) - parseInt(a.assists))
    .slice(0, 10);

  const topGoalie = players
    .filter((p) => p.position === 'GK')
    .sort((a, b) => parseInt(b.inGoals) - parseInt(a.inGoals))
    .slice(0, 10);

  const topCard = [...players]
    .sort((a, b) => {
      const aCards = parseInt(a.redCard) * 2 + parseInt(a.yellowCard);
      const bCards = parseInt(b.redCard) * 2 + parseInt(b.yellowCard);
      return bCards - aCards;
    })
    .slice(0, 10);

  // Top player is the one with least cards (fair play)
  const topPlayer = [...players]
    .sort((a, b) => {
      const aCards = parseInt(a.redCard) * 2 + parseInt(a.yellowCard);
      const bCards = parseInt(b.redCard) * 2 + parseInt(b.yellowCard);
      return aCards - bCards;
    })
    .slice(0, 10);

  return {
    competition,
    season,
    table,
    topScorer,
    topAssist,
    topCard,
    topGoalie,
    topPlayer,
  };
}
