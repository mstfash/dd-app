import { Table, Info, LayoutGrid, LayoutList } from 'lucide-react';
import { LeagueTableType } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface LeagueTableProps {
  leagueData: LeagueTableType;
  sportType: string;
  groupFilter?: string;
}

export default function LeagueTable({
  leagueData,
  sportType,
  groupFilter,
}: LeagueTableProps) {
  const [viewMode, setViewMode] = useState<'all' | 'groups'>('groups');
  const hasGroups = leagueData.table.some((team) => team.group);
  // Get unique groups
  const groups = hasGroups
    ? Array.from(new Set(leagueData.table.map((team) => team.group))).sort()
    : [];

  // Filter table data based on view mode and group filter
  const getFilteredData = () => {
    if (viewMode === 'all') {
      return leagueData.table;
    }
    return groupFilter
      ? leagueData.table.filter((team) => team.group === groupFilter)
      : leagueData.table;
  };

  // Get column headers based on sport type
  const getColumnHeaders = () => {
    const commonHeaders = [
      { key: 'position', label: '#', tooltip: 'Position' },
      { key: 'team', label: 'Team', tooltip: 'Team Name' },
      { key: 'MP', label: 'MP', tooltip: 'Matches Played' },
      { key: 'W', label: 'W', tooltip: 'Wins' },
      { key: 'L', label: 'L', tooltip: 'Losses' },
    ];

    if (sportType === 'football' || sportType === 'padbol') {
      return [
        ...commonHeaders,
        { key: 'D', label: 'D', tooltip: 'Draws' },
        { key: 'GF', label: 'GF', tooltip: 'Goals For' },
        { key: 'GA', label: 'GA', tooltip: 'Goals Against' },
        { key: 'GD', label: 'GD', tooltip: 'Goal Difference' },
        { key: 'PTS', label: 'PTS', tooltip: 'Points' },
      ];
    } else if (sportType === 'basketball') {
      return [
        ...commonHeaders,
        { key: 'PF', label: 'PF', tooltip: 'Points For' },
        { key: 'PA', label: 'PA', tooltip: 'Points Against' },
        { key: 'PD', label: 'PD', tooltip: 'Points Difference' },
        { key: 'PTS', label: 'PTS', tooltip: 'Points' },
      ];
    } else if (sportType === 'padel') {
      return [
        ...commonHeaders,
        { key: 'SF', label: 'SF', tooltip: 'Sets For' },
        { key: 'SA', label: 'SA', tooltip: 'Sets Against' },
        { key: 'SD', label: 'SD', tooltip: 'Sets Difference' },
        { key: 'PTS', label: 'PTS', tooltip: 'Points' },
      ];
    }

    // Default fallback
    return commonHeaders;
  };
  const tableData = getFilteredData();
  const headers = getColumnHeaders();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <h3 className="text-xl font-display font-semibold text-brand-700 flex items-center gap-2">
            <Table className="w-5 h-5 text-peach-400" />
            League Table
          </h3>
        </div>
        <div className="text-sm text-brand-400">{leagueData.season.name}</div>
      </div>
      {hasGroups && (
        <div className="flex items-center gap-2 bg-brand-50 rounded-lg p-1 mb-5 w-fit mx-auto">
          <button
            onClick={() => setViewMode('all')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors ${
              viewMode === 'all'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-brand-400 hover:text-brand-700'
            }`}
          >
            <LayoutList className="w-4 h-4" />
            All Teams
          </button>
          <button
            onClick={() => setViewMode('groups')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors ${
              viewMode === 'groups'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-brand-400 hover:text-brand-700'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            By Groups
          </button>
        </div>
      )}

      {viewMode === 'groups' && hasGroups ? (
        <div className="space-y-8">
          {groups.map((group) => {
            if (!group) return null;
            return (
              <div key={group} className="bg-white rounded-lg shadow-sm">
                <h4 className="text-lg font-display font-semibold text-brand-700 mb-4">
                  Group {group}
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-brand-50">
                        {headers.map((header) => (
                          <th
                            key={header.key}
                            className="px-4 py-3 text-left text-xs font-medium text-brand-400 uppercase tracking-wider"
                            title={header.tooltip}
                          >
                            <div className="flex items-center gap-1">
                              {header.label}
                              {header.key !== 'team' &&
                                header.key !== 'position' && (
                                  <Info className="w-3 h-3 text-brand-200" />
                                )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-brand-100">
                      {leagueData.table
                        .filter((team) => team.group === group)
                        .map((team, index) => (
                          <tr
                            key={team.partId}
                            className="hover:bg-brand-50 transition-colors"
                          >
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div
                                className={`text-sm font-medium ${
                                  index < 2
                                    ? 'text-peach-400'
                                    : 'text-brand-700'
                                }`}
                              >
                                {index + 1}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div
                                className="flex items-center cursor-pointer"
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate(`/team/${team.partId}`);
                                }}
                              >
                                <div
                                  className={`text-sm font-medium ${
                                    index < 2
                                      ? 'text-peach-400'
                                      : 'text-brand-700'
                                  }`}
                                >
                                  {team.team}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-brand-400">
                                {team.MP}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-brand-400">
                                {team.W}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-brand-400">
                                {team.L}
                              </div>
                            </td>
                            {sportType === 'football' ||
                            sportType === 'padbol' ? (
                              <>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="text-sm text-brand-400">
                                    {team.D}
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="text-sm text-brand-400">
                                    {team.GF}
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="text-sm text-brand-400">
                                    {team.GA}
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div
                                    className={`text-sm ${
                                      parseInt(team.GD) > 0
                                        ? 'text-green-600'
                                        : parseInt(team.GD) < 0
                                        ? 'text-red-500'
                                        : 'text-brand-400'
                                    }`}
                                  >
                                    {parseInt(team.GD) > 0
                                      ? `+${team.GD}`
                                      : team.GD}
                                  </div>
                                </td>
                              </>
                            ) : sportType === 'basketball' ? (
                              <>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="text-sm text-brand-400">
                                    {team.PF ?? team.GF}
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="text-sm text-brand-400">
                                    {team.PA ?? team.GA}
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div
                                    className={`text-sm ${
                                      parseInt(team.PD ?? team.GD) > 0
                                        ? 'text-green-600'
                                        : parseInt(team.PD ?? team.GD) < 0
                                        ? 'text-red-500'
                                        : 'text-brand-400'
                                    }`}
                                  >
                                    {parseInt(team.PD ?? team.GD) > 0
                                      ? `+${team.PD ?? team.GD}`
                                      : team.PD ?? team.GD}
                                  </div>
                                </td>
                              </>
                            ) : sportType === 'padel' ? (
                              <>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="text-sm text-brand-400">
                                    {team.SF ?? team.GF}
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="text-sm text-brand-400">
                                    {team.SA ?? team.GA}
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div
                                    className={`text-sm ${
                                      parseInt(team.SD ?? team.GD) > 0
                                        ? 'text-green-600'
                                        : parseInt(team.SD ?? team.GD) < 0
                                        ? 'text-red-500'
                                        : 'text-brand-400'
                                    }`}
                                  >
                                    {parseInt(team.SD ?? team.GD) > 0
                                      ? `+${team.SD ?? team.GD}`
                                      : team.SD ?? team.GD}
                                  </div>
                                </td>
                              </>
                            ) : null}
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-bold text-brand-700">
                                {team.PTS}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-brand-50">
                {headers.map((header) => (
                  <th
                    key={header.key}
                    className="px-4 py-3 text-left text-xs font-medium text-brand-400 uppercase tracking-wider"
                    title={header.tooltip}
                  >
                    <div className="flex items-center gap-1">
                      {header.label}
                      {header.key !== 'team' && header.key !== 'position' && (
                        <Info className="w-3 h-3 text-brand-200" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-brand-100">
              {tableData.map((team, index) => (
                <tr
                  key={team.partId}
                  className="hover:bg-brand-50 transition-colors"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div
                      className={`text-sm font-medium ${
                        index < 2 ? 'text-peach-400' : 'text-brand-700'
                      }`}
                    >
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/team/${team.partId}`);
                      }}
                    >
                      <div
                        className={`text-sm font-medium ${
                          index < 2 ? 'text-peach-400' : 'text-brand-700'
                        }`}
                      >
                        {team.team}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-brand-400">{team.MP}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-brand-400">{team.W}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-brand-400">{team.L}</div>
                  </td>
                  {sportType === 'football' || sportType === 'padbol' ? (
                    <>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-brand-400">{team.D}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-brand-400">{team.GF}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-brand-400">{team.GA}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div
                          className={`text-sm ${
                            parseInt(team.GD) > 0
                              ? 'text-green-600'
                              : parseInt(team.GD) < 0
                              ? 'text-red-500'
                              : 'text-brand-400'
                          }`}
                        >
                          {parseInt(team.GD) > 0 ? `+${team.GD}` : team.GD}
                        </div>
                      </td>
                    </>
                  ) : sportType === 'basketball' ? (
                    <>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-brand-400">
                          {team.PF ?? team.GF}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-brand-400">
                          {team.PA ?? team.GA}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div
                          className={`text-sm ${
                            parseInt(team.PD ?? team.GD) > 0
                              ? 'text-green-600'
                              : parseInt(team.PD ?? team.GD) < 0
                              ? 'text-red-500'
                              : 'text-brand-400'
                          }`}
                        >
                          {parseInt(team.PD ?? team.GD) > 0
                            ? `+${team.PD ?? team.GD}`
                            : team.PD ?? team.GD}
                        </div>
                      </td>
                    </>
                  ) : sportType === 'padel' ? (
                    <>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-brand-400">
                          {team.SF ?? team.GF}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-brand-400">
                          {team.SA ?? team.GA}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div
                          className={`text-sm ${
                            parseInt(team.SD ?? team.GD) > 0
                              ? 'text-green-600'
                              : parseInt(team.SD ?? team.GD) < 0
                              ? 'text-red-500'
                              : 'text-brand-400'
                          }`}
                        >
                          {parseInt(team.SD ?? team.GD) > 0
                            ? `+${team.SD ?? team.GD}`
                            : team.SD ?? team.GD}
                        </div>
                      </td>
                    </>
                  ) : null}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-brand-700">
                      {team.PTS}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* <div className="mt-6 text-xs text-brand-400 space-y-1">
        <p>* Top 2 teams from each group qualify for the knockout stage</p>
        <p>
          * In case of equal points, goal difference (GD) is the first
          tiebreaker
        </p>
      </div> */}
    </div>
  );
}
