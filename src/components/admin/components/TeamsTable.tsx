import { Table } from 'lucide-react';
import type { ExtendedTeam } from '../types';

interface TeamsTableProps {
  teams: ExtendedTeam[];
}

export default function TeamsTable({ teams }: TeamsTableProps) {
  if (teams.length === 0) {
    return (
      <div className="text-center py-12">
        <Table className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No registrations found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50">
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sport</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Players</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {teams.map((team) => (
          <tr key={team.id} className="hover:bg-gray-50">
            <td className="px-6 py-4">
              <div className="font-medium text-gray-900">{team.team_name}</div>
            </td>
            <td className="px-6 py-4">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                {team.sport}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-900">{team.players.length} players</div>
              <div className="text-sm text-gray-500">
                {team.players.map(p => `${p.first_name} ${p.last_name}`).join(', ')}
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {new Date(team.created_at).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}