import type { Team } from '../../../types';

export interface ExtendedTeam extends Team {
  id: string;
  created_at: string;
  team_name: string;
  players: Array<{
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    kit_size: string;
    kit_number?: number;
    date_of_birth: string;
  }>;
}

export interface AnalyticsData {
  totalPlayers: number;
  totalTeams: number;
  uniqueSports: number;
  latestRegistration: string;
}