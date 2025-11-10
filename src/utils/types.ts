/* eslint-disable @typescript-eslint/no-explicit-any */
import { Participation } from '../hooks/useLeaguesState';
import { sports } from './Select';

export const playerPositions = [
  'GK',
  'SW',
  'CB',
  'RB',
  'RWB',
  'LB',
  'CDM',
  'CM',
  'RM',
  'LM',
  'LW',
  'RW',
  'CF',
  'ST',
] as const;
export type PlayerPosition = (typeof playerPositions)[number];
export type registrationType =
  | 'TEAM_REGISTRATION'
  | 'PLAYER_REGISTRATION'
  | 'TRANSFER_MARKET';

export type NumericStat = number | string | null | undefined;

export interface BasketballPlayerStats {
  minutes?: string;
  points?: NumericStat;
  assists?: NumericStat;
  rebounds?: NumericStat;
  offensiveRebounds?: NumericStat;
  defensiveRebounds?: NumericStat;
  steals?: NumericStat;
  blocks?: NumericStat;
  turnovers?: NumericStat;
  fouls?: NumericStat;
  plusMinus?: NumericStat;
  freeThrowsMade?: NumericStat;
  freeThrowsAttempted?: NumericStat;
  twoPointersMade?: NumericStat;
  twoPointersAttempted?: NumericStat;
  threePointersMade?: NumericStat;
  threePointersAttempted?: NumericStat;
  fieldGoalsMade?: NumericStat;
  fieldGoalsAttempted?: NumericStat;
  [key: string]: NumericStat;
}

export interface BasketballPlayerBoxScore {
  playerName: string;
  jerseyNumber?: string;
  starter?: boolean;
  position?: string;
  stats: BasketballPlayerStats;
}

export interface BasketballTeamLegend {
  times_tied?: NumericStat;
  bench_points?: NumericStat;
  biggest_lead?: NumericStat;
  lead_changes?: NumericStat;
  time_with_lead?: string;
  points_in_paint?: NumericStat;
  fast_break_points?: NumericStat;
  biggest_scoring_run?: NumericStat;
  second_chance_points?: NumericStat;
  points_from_turnovers?: NumericStat;
  [key: string]: NumericStat;
}

export interface BasketballTeamTotals extends BasketballPlayerStats {
  teamRebounds?: NumericStat;
  points?: NumericStat;
}

export interface BasketballTeamCoachingInfo {
  coach?: string;
  assistantCoaches?: string[];
}

export interface BasketballTeamSnapshot {
  legend?: BasketballTeamLegend;
  totals?: BasketballTeamTotals;
  players?: BasketballPlayerBoxScore[];
  metadata?: BasketballTeamCoachingInfo;
  teamName?: string;
}

export interface BasketballQuarterScore {
  quarter: number | string;
  home: number;
  away: number;
}

export interface BasketballMatchMetadata {
  homeTeamId?: string;
  awayTeamId?: string;
  homeTeamName?: string;
  awayTeamName?: string;
  venue?: string;
  attendance?: string;
  officials?: string[];
  [key: string]: NumericStat;
}

export interface BasketballMatchSummary {
  sport: 'basketball' | string;
  teams: {
    home: BasketballTeamSnapshot;
    away: BasketballTeamSnapshot;
    metadata?: BasketballMatchMetadata;
  };
  quarters?: BasketballQuarterScore[];
  scoringByIntervals?: Array<{
    label: string;
    home: number;
    away: number;
  }>;
}

export interface MatchTimelineAction {
  team: string;
  type: string;
  time: string;
  name: string;
  isHomeTeam: boolean;
  isFirstHalf: boolean;
  isOwnGoal: boolean;
  isInjurySub: boolean;
  isDirectRedCard: boolean;
  assistName: string;
  isPenaltyGoal: boolean;
  points?: number;
  pointType?: 'freeThrow' | 'twoPointer' | 'threePointer' | string;
  quarter?: number | string;
}

export type MatchActionDetail =
  | MatchTimelineAction
  | BasketballMatchSummary
  | Record<string, unknown>;

export interface MatchInterface {
  isMatchLive: boolean;
  inMatchTime: string;
  isMatchEnded: boolean;
  id: string;
  stage: string;
  matchDate: string;
  firstHalfStartTime: string;
  secondHalfStartTime: string;
  homeTeamScore: number;
  awayTeamScore: number;
  homeTeamExtraPoints: number;
  awayTeamExtraPoints: number;
  group: string;
  type: string;
  lineupCountPerTeam: number;
  season: Season;
  videosUrls: string;
  homeTeam: {
    id: string;
    name: string;
    group: string;
    teams: Array<{
      id: string;
      name: string;
      teamLogo: {
        url: string;
      };
      mascotLogo: string;
    }>;
  };
  awayTeam: {
    id: string;
    name: string;
    group: string;
    teams: Array<{
      id: string;
      name: string;
      teamLogo: {
        url: string;
      };
      mascotLogo: string;
    }>;
  };
  lineUp: Array<{
    team: string;
    type: string;
    name: string;
    isHomeTeam: boolean;
    isSub: boolean;
    isCaptain: boolean;
    position: string;
    playerPhoto: string;
  }>;
  actionDetails: MatchActionDetail[];
  penalties: Array<{
    team: string;
    type: string;
    penaltyNumber: string;
    isHomeTeam: boolean;
    name: string;
  }>;
  statistics: Array<{
    homeTeam: string;
    awayTeam: string;
    type: string;
  }>;
  competition: {
    name: string;
  };
  stadium: string;
  referee: string;
  homeTeamFormation: string;
  awayTeamFormation: string;
  homeTeamFairPlayPoints: boolean;
  awayTeamFairPlayPoints: boolean;
}

export interface LeaugeInfo {
  isRegistrationOn: boolean;
  isTeamRegistrationOn: boolean;
  slogan: string;
  subtitle: string;
  title: string;
  title2: string;
  leagueRules: {
    document: any;
  };
  seasonDetails: {
    document: any;
  };
}

export interface Season {
  endDate: string;
  id: string;
  name: string;
  seasonNumber: number;
  startDate: string;
}

export interface Competition {
  id: string;
  name: string;
  seasons: Array<Season>;
  disableRegistration: boolean;
  disableEdits: boolean;
  isTournament: boolean;
  minPlayersCount: number;
  maxPlayersCount: number;
  isOpenForPayment: boolean;
  isPublic: boolean;
  currentSeason: Season;
  logo: {
    url: string;
  } | null;
  baseColor: string;
  textColor: string;
  mainSportType: string;
  leagueRules: {
    document: any;
  };
  seasonDetails: {
    document: any;
  };
}
export interface ApplicationDataType {
  seasons: Array<Season>;
  competitions: Array<Competition>;
}

export interface ScoreSheet {
  isHomeTeam: boolean;
  homeTeam: {
    name: string;
    id: string;
    teams: [
      {
        name: string;
      }
    ];
  };
  awayTeam: {
    name: string;
    id: string;
    teams: [
      {
        name: string;
      }
    ];
  };
  homeTeamId: string;
  awayTeamId: string;
  homeTeamScore: number;
  awayTeamScore: number;
}

export interface TableType {
  team: string;
  partId: string;
  MP: string;
  W: string;
  L: string;
  D: string;
  GF: string;
  GA: string;
  GD: string;
  PF?: string;
  PA?: string;
  PD?: string;
  SF?: string;
  SA?: string;
  SD?: string;
  FP: string;
  PTS: string;
  h2h: number;
  group: string;
  scoreSheet: Array<ScoreSheet>;
  participation?: Partial<Participation>;
  winPercentage?: string;
  pct?: string;
  gamesBehind?: string;
  gb?: string;
  conferenceRecord?: string;
  conf?: string;
  homeRecord?: string;
  awayRecord?: string;
  lastTenRecord?: string;
  l10?: string;
  streak?: string;
  strk?: string;
  pointDiff?: string;
  diff?: string;
  pointsForAverage?: string;
  pointsAgainstAverage?: string;
}
export interface TopPlayerType {
  name: string;
  team: string;
  goals: string;
  assists: string;
  photo: string;
  position: string;
  playerId: string;
  inGoals: string;
  PLD: string;
  teamData?: Participation;
  playerPhoto: string;
}

export interface TopGoaliesType extends TopPlayerType {
  inGoals: string;
}

export interface TopCardsType extends TopPlayerType {
  redCard: string;
  yellowCard: string;
}

export interface TopGoalieTest extends TopPlayerType {
  inGoals: string;
}

export interface TopPlayer extends TopPlayerType {
  redCard: string;
  yellowCard: string;
  playerPhoto: string;
  matchesIds: string[];
}
export interface LeagueTableType {
  competition: Competition;
  season: Season;
  table: Array<TableType>;
  topScorer: Array<TopPlayerType>;
  topAssist: Array<TopPlayerType>;
  topCard: Array<TopCardsType>;
  topGoalie: Array<TopGoaliesType>;
  topPlayer: Array<TopPlayer>;
}

export interface Payment {
  id: string;
  amount: string;
  currency: string;
  isFulfilled: boolean;
  pending: boolean;
  success: boolean;
  createdAt: string;
  orderId: string;
  paymentMethod: string;
  txId: string;
  participation: Participation;
  plan: Plan;
  player: PlayerInterface;
}

export const PaymentMethods = ['Card', 'Mobile Wallet'] as const;

export interface PaymentData {
  amount: number;
  currency: string;
  paymentMethod: (typeof PaymentMethods)[number];
  merchant_order_id: string;
  billingData: BillingData;
}
export interface BillingData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export interface Team {
  id: string;
  name: string;
  teamLogo: {
    url: string;
  };
  mascotLogo: string;
}

export interface PlayerInterface {
  firstName: string;
  lastName: string;
  id: string;
  nickname: string;
  playerID: string;
  phoneNumber: string;
  hometown: string;
  weight: number;
  height: number;
  position: string;
  dateOfBirth: string;
  secondPosition: string;
  ability: string;
  skill: string;
  preferredFoot: string;
  jerseyName: string;
  jerseyNumber: number;
  kitSize: string;
  email: string;
  isCaptain: boolean;
  paid: boolean;
  verified: boolean;
  bio: string;
  paymentPlan: string;
  name: string;
  photo: {
    url: string;
  };
  assessment: {
    [key in keyof typeof sports]: { skill: string; value: string }[];
  };
  nationalIdImage: {
    url: string;
  };
  participation: Participation[];
  age: number;
}

export interface Plan {
  amount: number;
  competition: Competition;
  count: number;
  currency: string;
  description: string;
  extraAmount: number;
  extraAmountDescription: string;
  id: string;
  includes: string;
  name: string;
  per: string;
  isInstallment: boolean;
  planName: string;
  uiOrder: number;
}
