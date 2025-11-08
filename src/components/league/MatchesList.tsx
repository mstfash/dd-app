import { useState, useMemo } from 'react';
import { Calendar, ChevronDown, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MatchCard from './MatchCard';
import { MatchInterface } from '../../utils/types';

interface MatchesListProps {
  matches: MatchInterface[];
}

export default function MatchesList({ matches }: MatchesListProps) {
  const navigate = useNavigate();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([
    'live',
    'upcoming',
  ]);

  // Filter states
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique groups and stages from matches
  const uniqueGroups = useMemo(() => {
    const groups = new Set(matches.map((match) => match.group).filter(Boolean));
    return ['all', ...Array.from(groups).sort()];
  }, [matches]);

  const uniqueStages = useMemo(() => {
    const stages = new Set(matches.map((match) => match.stage).filter(Boolean));
    return ['all', ...Array.from(stages).sort()];
  }, [matches]);

  const uniqueCategories = useMemo(() => {
    const categories = new Set(
      matches
        .map((match) => {
          const category = match.homeTeam?.name
            ?.split(' ')
            .pop()
            ?.split('-')
            .join(' ');
          return category || '';
        })
        .filter((item) => item !== '')
    );
    return ['all', ...Array.from(categories).sort()];
  }, [matches]);

  // Filter matches based on selected filters
  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const groupMatch =
        selectedGroup === 'all' || match.group === selectedGroup;
      const stageMatch =
        selectedStage === 'all' || match.stage === selectedStage;
      const categoryMatch =
        selectedCategory === 'all' ||
        match.homeTeam?.name?.split(' ').pop()?.split('-').join(' ') ===
          selectedCategory;
      return groupMatch && stageMatch && categoryMatch;
    });
  }, [matches, selectedGroup, selectedStage, selectedCategory]);

  // Group filtered matches by status and date
  const groupedMatches = {
    upcoming: filteredMatches.filter(
      (match) => !match.isMatchLive && !match.isMatchEnded
    ),
    live: filteredMatches.filter((match) => match.isMatchLive),
    completed: filteredMatches.filter((match) => match.isMatchEnded),
  };

  const toggleGroup = (group: string) => {
    if (expandedGroups.includes(group)) {
      setExpandedGroups(expandedGroups.filter((g) => g !== group));
    } else {
      setExpandedGroups([...expandedGroups, group]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Live Matches */}
      {groupedMatches.live.length > 0 && (
        <div>
          <button
            onClick={() => toggleGroup('live')}
            className="w-full flex items-center justify-between mb-4 bg-red-50 p-3 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-display font-semibold text-red-600">
                Live Matches{' '}
                {groupedMatches.live.length &&
                  `(${groupedMatches.live.length})`}
              </h3>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-red-500 transition-transform ${
                expandedGroups.includes('live') ? 'transform rotate-180' : ''
              }`}
            />
          </button>

          {expandedGroups.includes('live') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {groupedMatches.live.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onClick={() => navigate(`/match/${match.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Filter Matches by Group, Stage, and Category */}
      <div className="mb-6">
        {/* Mobile Collapsible Header */}
        <div className="md:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between mb-4 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-display font-semibold text-gray-700">
                Filters
              </h3>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${
                showFilters ? 'transform rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Desktop: Always visible select boxes */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-4">
            {/* Group Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Group
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                {uniqueGroups.map((group) => (
                  <option key={group} value={group}>
                    {group === 'all' ? 'All Groups' : group}
                  </option>
                ))}
              </select>
            </div>

            {/* Stage Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Stage
              </label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                {uniqueStages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage === 'all' ? 'All Stages' : stage}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Mobile: Collapsible select boxes */}
        {showFilters && (
          <div className="md:hidden bg-white rounded-lg p-4 mb-8 border border-gray-200">
            <div className="space-y-4">
              {/* Group Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Group
                </label>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  {uniqueGroups.map((group) => (
                    <option key={group} value={group}>
                      {group === 'all' ? 'All Groups' : group}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stage Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Stage
                </label>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  {uniqueStages.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage === 'all' ? 'All Stages' : stage}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  {uniqueCategories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Matches */}
      <div>
        <button
          onClick={() => toggleGroup('upcoming')}
          className="w-full flex items-center justify-between mb-4 bg-brand-50 p-3 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-400" />
            <h3 className="text-lg font-display font-semibold text-brand-700">
              Upcoming Matches
            </h3>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-brand-400 transition-transform ${
              expandedGroups.includes('upcoming') ? 'transform rotate-180' : ''
            }`}
          />
        </button>

        {expandedGroups.includes('upcoming') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {groupedMatches.upcoming.length > 0 ? (
              groupedMatches.upcoming.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onClick={() => navigate(`/match/${match.id}`)}
                />
              ))
            ) : (
              <div className="col-span-2 bg-white rounded-lg p-6 text-center text-brand-400">
                No upcoming matches scheduled.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Completed Matches */}
      <div>
        <button
          onClick={() => toggleGroup('completed')}
          className="w-full flex items-center justify-between mb-4 bg-brand-50 p-3 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-400" />
            <h3 className="text-lg font-display font-semibold text-brand-700">
              Completed Matches
            </h3>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-brand-400 transition-transform ${
              expandedGroups.includes('completed') ? 'transform rotate-180' : ''
            }`}
          />
        </button>

        {expandedGroups.includes('completed') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groupedMatches.completed.length > 0 ? (
              groupedMatches.completed.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onClick={() => navigate(`/match/${match.id}`)}
                />
              ))
            ) : (
              <div className="col-span-2 bg-white rounded-lg p-6 text-center text-brand-400">
                No completed matches yet.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
