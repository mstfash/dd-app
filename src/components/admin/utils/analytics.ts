import type { ExtendedTeam } from '../types';

export function calculateAnalytics(teams: ExtendedTeam[]) {
  return {
    totalPlayers: teams.reduce((acc, team) => acc + team.players.length, 0),
    totalTeams: teams.length,
    uniqueSports: new Set(teams.map(team => team.sport)).size,
    latestRegistration: teams.length > 0
      ? new Date(Math.max(...teams.map(t => new Date(t.created_at).getTime()))).toLocaleDateString()
      : 'No registrations'
  };
}