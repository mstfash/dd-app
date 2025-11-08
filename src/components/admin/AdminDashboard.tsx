import { useState } from 'react';
import { Download, Users, Trophy, Medal, Calendar } from 'lucide-react';
import { useTeams } from './hooks/useTeams';
import { calculateAnalytics } from './utils/analytics';
import { exportToCSV } from './utils/export';
import SearchBar from './components/SearchBar';
import SportFilter from './components/SportFilter';
import TeamsTable from './components/TeamsTable';
import AnalyticsCard from './components/AnalyticsCard';
import type { ExtendedTeam } from '../types';

export default function AdminDashboard() {
  const { teams, loading, error } = useTeams();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeams = teams.filter(team => {
    const matchesFilter = filter === 'all' || team.sport === filter;
    const matchesSearch = team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.players.some(player => 
        `${player.firstName} ${player.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  const analytics = calculateAnalytics(teams);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-xl mx-auto">
          <h2 className="text-red-800 font-semibold mb-2">Error Loading Data</h2>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tournament Dashboard</h1>
          <p className="text-gray-600">Manage and monitor tournament registrations</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnalyticsCard
            title="Total Players"
            value={analytics.totalPlayers}
            subtitle="Registered players across all teams"
            icon={Users}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <AnalyticsCard
            title="Total Teams"
            value={analytics.totalTeams}
            subtitle="Registered teams"
            icon={Trophy}
            iconColor="text-emerald-600"
            iconBgColor="bg-emerald-100"
          />
          <AnalyticsCard
            title="Sports"
            value={analytics.uniqueSports}
            subtitle="Different sports categories"
            icon={Medal}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <AnalyticsCard
            title="Latest Registration"
            value={analytics.latestRegistration}
            subtitle="Most recent team registration"
            icon={Calendar}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
        </div>

        {/* Filters and Export */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <SportFilter value={filter} onChange={setFilter} />
          <button
            onClick={() => exportToCSV(filteredTeams)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap"
          >
            <Download className="w-5 h-5" />
            Export CSV
          </button>
        </div>

        {/* Teams Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <TeamsTable teams={filteredTeams} />
        </div>
      </div>
    </div>
  );
}