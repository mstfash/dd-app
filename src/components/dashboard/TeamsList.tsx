import { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Trophy,
  Users,
  Calendar,
  ArrowRight,
  Filter,
  Download,
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useLeaguesState, { Participation } from '../../hooks/useLeaguesState';
import usePlayers from '../../hooks/usePlayers';
import { MAIN_LEAGUE } from '../../utils/constants';

interface TeamsListProps {
  participations: Participation[];
}

export default function TeamsList({ participations }: TeamsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSportType, setSelectedSportType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();
  const { currentCompetition } = useLeaguesState(MAIN_LEAGUE);

  const [searchParams, setSearchParams] = useSearchParams();

  // Get unique sport types from participations
  const sportTypes = useMemo(() => {
    const types = new Set(participations.map((p) => p.type));
    return ['all', ...Array.from(types)];
  }, [participations]);

  // Group participations by sport type and category
  const groupedParticipations = useMemo(() => {
    const filtered = participations.filter((participation) => {
      const matchesSearch =
        participation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participation.competition.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        participation.teams.some((team) =>
          team.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesSportType =
        selectedSportType === 'all' || participation.type === selectedSportType;

      return matchesSearch && matchesSportType;
    });

    // Group by category (extracted from participation name)
    const grouped = filtered.reduce((acc, participation) => {
      const nameParts = participation.name.split(' ');
      const category = nameParts[nameParts.length - 1]; // Get the last part (e.g., 'padbol-a', 'mens-football')

      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(participation);
      return acc;
    }, {} as Record<string, Participation[]>);

    return grouped;
  }, [participations, searchTerm, selectedSportType]);

  const { players, loading, error } = usePlayers({
    where: {
      participation: {
        some: {
          id: {
            in: (selectedCategory !== 'all'
              ? groupedParticipations?.[selectedCategory]
              : participations
            )
              ?.filter((p) =>
                selectedSportType !== 'all'
                  ? p.type === selectedSportType
                  : true
              )
              ?.filter((p) => !p.name.toLowerCase().includes('transfer'))
              ?.map((p) => p.id),
          },
        },
      },
    },
    isPublic: false,
  });

  const processData = () => {
    if (!players) {
      console.log('no players data');
      return;
    }

    if (players) {
      let heads = Object.keys(players[0]).filter((x) => x !== '__typename');

      const processedPlayers = players.map((player) => {
        const playerData = [...heads].map((head) => {
          if (head === 'team') {
            return player.participation[0].teams[0].name;
          }
          if (head === 'photo') {
            return player[head]?.url;
          }
          if (head === 'participation') {
            const parts = player.participation.filter(
              (p) => p.competition.id === currentCompetition?.id
            );
            return parts.length > 0 ? parts.map((p) => p.name).join(', ') : '';
          }
          //@ts-expect-error expected error
          return player[head];
        });

        return playerData;
      });
      const allData = [...[heads], ...processedPlayers];

      const csvData =
        'data:text/csv;charset=utf-8,' +
        allData.map((e) => e.join(',')).join('\n');

      const encodedUri = encodeURI(csvData);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'dd-league-rosters.csv');
      document.body.appendChild(link);
      link.click();
    }
  };

  useEffect(() => {
    if (searchParams.get('query'))
      setSearchTerm(searchParams.get('query') || '');
    if (searchParams.get('sportType'))
      setSelectedSportType(searchParams.get('sportType') || 'all');
    if (searchParams.get('category'))
      setSelectedCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-brand-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-brand-100">
          <div className="flex flex-col  gap-2 md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-brand-600 mb-2">
                Tournament Dashboard
              </h1>
              <p className="text-brand-500">
                Manage and monitor your tournament registrations
              </p>
            </div>

            <button
              className={`flex items-center gap-2 px-4 py-2 bg-court-500 text-brand-950 rounded-lg hover:bg-court-400 transition-colors ${
                loading || error ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading || !!error}
              onClick={processData}
            >
              <Download className="w-5 h-5" />
              {loading ? 'Generating...' : 'Export Players CSV'}
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-[25px] transform -translate-y-1/2 text-brand-400 w-5 h-5 z-[5]" />
            <input
              type="text"
              placeholder="Search competitions, teams..."
              value={searchParams.get('query') || searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                searchParams.set('query', e.target.value);
                setSearchParams(searchParams);
              }}
              className="w-full pl-10 pr-4 py-3 border-2 border-brand-200 rounded-xl focus:ring-2 focus:ring-court-400 bg-white/95"
            />
          </div>

          <div className="relative min-w-[200px]">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-400 w-5 h-5" />
            <select
              value={searchParams.get('sportType') || selectedSportType}
              onChange={(e) => {
                setSelectedSportType(e.target.value);
                searchParams.set('sportType', e.target.value);
                setSearchParams(searchParams);
              }}
              className="w-full pl-10 pr-4 py-3 border-2 border-brand-200 rounded-xl focus:ring-2 focus:ring-court-400 bg-white/95 appearance-none"
            >
              {sportTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Sports' : type}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-[200px]">
            {' '}
            <select
              value={searchParams.get('category') || selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                searchParams.set('category', e.target.value);
                setSearchParams(searchParams);
              }}
              className="w-full pl-10 pr-4 py-3 border-2 border-brand-200 rounded-xl focus:ring-2 focus:ring-court-400 bg-white/95 appearance-none"
            >
              <option value={'all'}>All Categories</option>
              {Object.entries(groupedParticipations).map(([category]) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories and Teams */}
        <div className="space-y-8">
          {Object.entries(groupedParticipations).map(
            ([category, categoryParticipations]) => {
              if (
                selectedCategory &&
                selectedCategory !== 'all' &&
                category.toLowerCase() !== selectedCategory.toLowerCase()
              )
                return null;
              return (
                <div key={category} className="space-y-6">
                  <h2 className="text-2xl font-display font-bold text-brand-600 flex md:flex-row flex-col items-center gap-2">
                    <Trophy className="w-6 h-6 text-court-500" />
                    {category.charAt(0).toUpperCase() + category.slice(1)} -
                    <span>
                      Team Count:{' '}
                      <span className="text-court-500">
                        {categoryParticipations.length}
                      </span>
                    </span>
                  </h2>

                  <div className="grid grid-cols-1 gap-6">
                    {categoryParticipations.map((participation) => (
                      <div
                        key={participation.id}
                        className="bg-white/95 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-brand-100"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-display font-semibold text-brand-600">
                              <span className="text-court-500">
                                {participation.teams[0].name}
                              </span>
                            </h3>
                            <span className="px-3 py-1 bg-brand-100 text-brand-600 rounded-full text-sm">
                              {participation.type}
                            </span>
                          </div>

                          <div className="md:flex-row flex-col flex md:items-center gap-4 text-brand-500 text-sm mb-6">
                            <span className="flex items-center gap-2">
                              <Trophy className="w-4 h-4" />
                              {participation.competition.name}
                            </span>
                            <span className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {participation.playersCount} Players
                            </span>
                            <span className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {participation.seasons[0]?.name}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {participation.teams.map((team) => (
                              <div
                                key={team.id}
                                onClick={() =>
                                  navigate(
                                    `/dashboard/team/${participation.id}?category=${category}&sportType=${selectedSportType}&query=${searchTerm}`
                                  )
                                }
                                className="flex items-center gap-4 p-4 bg-brand-50 rounded-xl cursor-pointer hover:bg-brand-100 transition-colors group"
                              >
                                {team.teamLogo?.url ? (
                                  <img
                                    src={team.teamLogo.url}
                                    alt={team.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-16 h-16 rounded-full bg-brand-200 flex items-center justify-center">
                                    <Trophy className="w-8 h-8 text-brand-400" />
                                  </div>
                                )}
                                <div className="flex-grow">
                                  <h4 className="font-medium text-brand-600 group-hover:text-brand-700">
                                    {team.name}
                                  </h4>
                                </div>
                                <ArrowRight className="w-5 h-5 text-brand-400 group-hover:text-brand-600 transform group-hover:translate-x-1 transition-all" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
