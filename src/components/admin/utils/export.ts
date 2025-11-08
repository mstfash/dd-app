import type { ExtendedTeam } from '../types';

export function exportToCSV(teams: ExtendedTeam[]) {
  const headers = ['Team Name', 'Sport', 'Players', 'Registration Date'];
  const rows = teams.map(team => [
    team.team_name,
    team.sport,
    team.players.length,
    new Date(team.created_at).toLocaleDateString()
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tournament-registrations.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}