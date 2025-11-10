import { useState, useEffect, useMemo } from 'react';
import { Users, Trophy, UserX, ArrowLeft, X } from 'lucide-react';
import {
  GET_PARTICIPATION_BY_ID,
  GET_PLAYERS_PUBLIC,
} from '../../utils/queries';
import { useQuery } from '@apollo/client';
import useMatches from '../../hooks/useMatches';

import {
  PlayerInterface,
  MatchInterface,
  MatchActionDetail,
  BasketballMatchSummary,
  BasketballPlayerStats,
} from '../../utils/types';
import { simplifyTeamName } from '../league/utils/statsUtils';

type NumericValue = number | string | null | undefined;

const normalizeName = (value?: string) =>
  (value || '').replace(/\s+/g, ' ').trim().toLowerCase();

const DEFAULT_PLAYER_IMAGE = 'https://i.ibb.co/RkxjQ1WG/zed4-09.png';

const parseNumeric = (value: NumericValue): number => {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number') return value;
  const trimmed = value.trim();
  if (!trimmed) return 0;
  const parsed = Number(trimmed);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const parseMinutesToSeconds = (value: NumericValue): number => {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number') {
    return Math.round(value * 60);
  }
  const trimmed = value.trim();
  if (!trimmed) return 0;
  if (trimmed.includes(':')) {
    const [minutes, seconds] = trimmed.split(':').map((part) => Number(part));
    return (
      (Number.isNaN(minutes) ? 0 : minutes * 60) +
      (Number.isNaN(seconds) ? 0 : seconds)
    );
  }
  const parsed = Number(trimmed);
  if (!Number.isNaN(parsed)) {
    return Math.round(parsed * 60);
  }
  return 0;
};

const formatSecondsToMinutesString = (seconds: number): string => {
  if (!seconds) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const statKeysLookup: Record<string, string[]> = {
  points: ['points', 'pts', 'score', 'totalPoints'],
  assists: ['assists', 'ast'],
  rebounds: ['rebounds', 'reb', 'totalRebounds'],
  offensiveRebounds: ['offensiveRebounds', 'oreb'],
  defensiveRebounds: ['defensiveRebounds', 'dreb'],
  steals: ['steals', 'stl'],
  blocks: ['blocks', 'blk'],
  turnovers: ['turnovers', 'to'],
  fouls: ['fouls', 'pf'],
  plusMinus: ['plusMinus', 'pm', '+/-', 'plus_minus'],
  minutes: ['minutes', 'min'],
};

const getStatValue = (
  stats: BasketballPlayerStats,
  key: keyof typeof statKeysLookup
) => {
  const keys = statKeysLookup[key];
  for (const statKey of keys) {
    const value = stats[statKey];
    if (value !== undefined && value !== null && value !== '') {
      return parseNumeric(value as NumericValue);
    }
  }
  return 0;
};

const getStatMinutes = (stats: BasketballPlayerStats) => {
  const keys = statKeysLookup.minutes;
  for (const statKey of keys) {
    const value = stats[statKey];
    if (value !== undefined && value !== null && value !== '') {
      return parseMinutesToSeconds(value as NumericValue);
    }
  }
  return 0;
};

const isBasketballSummary = (
  detail: MatchActionDetail
): detail is BasketballMatchSummary => {
  if (!detail || typeof detail !== 'object') return false;
  const sport = (detail as BasketballMatchSummary).sport;
  return typeof sport === 'string' && sport.toLowerCase() === 'basketball';
};

interface AggregatedPlayerStats {
  displayName: string;
  normalizedName: string;
  position?: string;
  photo?: string;
  jerseyNumber?: number;
  matches: Set<string>;
  minutes: number;
  points: number;
  assists: number;
  rebounds: number;
  steals: number;
  blocks: number;
  turnovers: number;
  plusMinus: number;
}

interface PlayerSeasonStats {
  matchesPlayed: number;
  minutes: string;
  points: number;
  assists: number;
  rebounds: number;
  steals: number;
  blocks: number;
  turnovers: number;
  plusMinus: number;
}

interface PublicTeamPlayerCard {
  id?: string;
  name: string;
  jerseyName?: string;
  jerseyNumber?: number;
  kitSize?: string;
  position?: string;
  isTeamAdmin: boolean;
  photo?: string;
  stats: PlayerSeasonStats;
  source: 'official' | 'derived';
}

const buildSeasonStats = (entry?: AggregatedPlayerStats): PlayerSeasonStats => {
  if (!entry) {
    return {
      matchesPlayed: 0,
      minutes: '0:00',
      points: 0,
      assists: 0,
      rebounds: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      plusMinus: 0,
    };
  }

  return {
    matchesPlayed: entry.matches.size,
    minutes: formatSecondsToMinutesString(entry.minutes),
    points: Math.round(entry.points),
    assists: Math.round(entry.assists),
    rebounds: Math.round(entry.rebounds),
    steals: Math.round(entry.steals),
    blocks: Math.round(entry.blocks),
    turnovers: Math.round(entry.turnovers),
    plusMinus: Math.round(entry.plusMinus),
  };
};

const ensurePlayerEntry = (
  map: Map<string, AggregatedPlayerStats>,
  name: string
): AggregatedPlayerStats => {
  const normalizedName = normalizeName(name);
  const existing = map.get(normalizedName);
  if (existing) {
    if (!existing.displayName && name) {
      existing.displayName = name;
    }
    return existing;
  }
  const entry: AggregatedPlayerStats = {
    displayName: name,
    normalizedName,
    matches: new Set(),
    minutes: 0,
    points: 0,
    assists: 0,
    rebounds: 0,
    steals: 0,
    blocks: 0,
    turnovers: 0,
    plusMinus: 0,
  };
  map.set(normalizedName, entry);
  return entry;
};

const aggregateTeamPlayers = (
  matches: MatchInterface[] | null,
  teamId: string | undefined,
  sportType?: string
) => {
  if (!teamId || !matches?.length)
    return new Map<string, AggregatedPlayerStats>();

  const teamMatches = matches.filter(
    (match) => match.homeTeam?.id === teamId || match.awayTeam?.id === teamId
  );

  const playerStatsMap = new Map<string, AggregatedPlayerStats>();

  teamMatches.forEach((match) => {
    const isHomeTeam = match.homeTeam?.id === teamId;
    const teamLineup = (match.lineUp || []).filter(
      (player) => player.isHomeTeam === isHomeTeam
    );

    const playersInMatch = new Set<string>();

    teamLineup.forEach((player) => {
      const entry = ensurePlayerEntry(playerStatsMap, player.name);
      if (player.position && !entry.position) {
        entry.position = player.position;
      }
      if (player.playerPhoto && !entry.photo) {
        entry.photo = player.playerPhoto;
      }
      playersInMatch.add(entry.normalizedName);
      entry.matches.add(match.id);
    });

    const summary = (match.actionDetails || []).find(isBasketballSummary);

    if (
      summary &&
      (match.type?.toLowerCase() === 'basketball' || sportType === 'basketball')
    ) {
      const snapshot = isHomeTeam ? summary.teams.home : summary.teams.away;
      snapshot.players?.forEach((player) => {
        const entry = ensurePlayerEntry(playerStatsMap, player.playerName);
        playersInMatch.add(entry.normalizedName);
        entry.matches.add(match.id);
        if (player.stats) {
          entry.minutes += getStatMinutes(player.stats);
          const reboundsTotal =
            getStatValue(player.stats, 'rebounds') ||
            getStatValue(player.stats, 'offensiveRebounds') +
              getStatValue(player.stats, 'defensiveRebounds');
          entry.points += getStatValue(player.stats, 'points');
          entry.assists += getStatValue(player.stats, 'assists');
          entry.rebounds += reboundsTotal;
          entry.steals += getStatValue(player.stats, 'steals');
          entry.blocks += getStatValue(player.stats, 'blocks');
          entry.turnovers += getStatValue(player.stats, 'turnovers');
          entry.plusMinus += getStatValue(player.stats, 'plusMinus');
        }
      });
    }

    (match.actionDetails || []).forEach((detail) => {
      if (!detail || typeof detail !== 'object') return;
      if (isBasketballSummary(detail)) return;
      if (!('name' in detail) || !('type' in detail)) return;
      const action = detail as MatchActionDetail & {
        name: string;
        type: string;
        isHomeTeam?: boolean;
        points?: number;
        pointType?: string;
      };
      if (!action.name || typeof action.name !== 'string') return;
      if (
        typeof action.isHomeTeam === 'boolean' &&
        action.isHomeTeam !== isHomeTeam
      ) {
        return;
      }
      const entry = ensurePlayerEntry(playerStatsMap, action.name);
      playersInMatch.add(entry.normalizedName);
      entry.matches.add(match.id);
      const normalizedType = action.type?.toLowerCase();
      if (normalizedType === 'assist') {
        entry.assists += 1;
      } else if (normalizedType === 'steal') {
        entry.steals += 1;
      } else if (normalizedType === 'block') {
        entry.blocks += 1;
      } else if (normalizedType === 'turnover') {
        entry.turnovers += 1;
      }
      if (normalizedType === 'points' || action.pointType) {
        const pointValue =
          typeof action.points === 'number'
            ? action.points
            : action.pointType?.toLowerCase() === 'threepointer'
            ? 3
            : action.pointType?.toLowerCase() === 'freethrow'
            ? 1
            : 2;
        entry.points += pointValue;
      }
    });

    playersInMatch.forEach((playerName) => {
      const entry = playerStatsMap.get(playerName);
      if (entry) {
        entry.matches.add(match.id);
      }
    });
  });

  return playerStatsMap;
};

import { useNavigate, useParams } from 'react-router-dom';
import { SPORTS_CONFIG } from '../../constants/sports';
import { SERVER_URL } from '../../utils/constants';

// Add ImagePopup component
function ImagePopup({
  imageUrl,
  alt,
  onClose,
}: {
  imageUrl: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-center bg-black/80 w-screen h-screen md:h-full overflow-y-auto"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full mx-4 mt-[50px] md:mt-[100px]">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-peach-400 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-auto rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}

export default function PublicTeam() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const { data: participationData } = useQuery(GET_PARTICIPATION_BY_ID, {
    variables: { id: teamId },
    skip: !teamId,
  });

  const participation = participationData?.participation;
  const sportType = participation?.type?.toLowerCase();
  const {
    data: playersData,
    loading: playersLoading,
    error: playersError,
  } = useQuery(GET_PLAYERS_PUBLIC, {
    variables: { id: teamId },
    skip: !teamId,
  });

  const { matches: teamMatches, loading: matchesLoading } = useMatches({
    where: teamId
      ? {
          OR: [
            { homeTeam: { id: { equals: teamId } } },
            { awayTeam: { id: { equals: teamId } } },
          ],
        }
      : {},
    pollInterval: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    setIsLoading(playersLoading || matchesLoading);
  }, [playersLoading, matchesLoading]);

  const { statsMap, statsList } = useMemo(() => {
    const aggregatedMap = aggregateTeamPlayers(
      teamMatches || null,
      teamId,
      sportType
    );
    const list = Array.from(aggregatedMap.values()).map((entry) => ({
      ...entry,
    }));
    return { statsMap: aggregatedMap, statsList: list };
  }, [teamMatches, teamId, sportType]);

  const displayPlayers = useMemo<PublicTeamPlayerCard[]>(() => {
    const officialPlayers = playersData?.players || [];
    const usedStatsEntries = new Set<string>();

    const mappedOfficial: PublicTeamPlayerCard[] = officialPlayers.map(
      (player: PlayerInterface) => {
        const fullName = `${player.firstName || ''} ${
          player.lastName || ''
        }`.trim();
        const normalizedFullName = normalizeName(fullName);
        const normalizedJerseyName = normalizeName(player.jerseyName || '');
        const normalizedShortName = normalizeName(player.name || '');

        let statsEntry =
          statsMap.get(normalizedFullName) ||
          statsMap.get(normalizedJerseyName) ||
          statsMap.get(normalizedShortName);

        if (!statsEntry) {
          statsEntry = statsList.find(
            (entry) => normalizeName(entry.displayName) === normalizedFullName
          );
        }

        if (statsEntry) {
          usedStatsEntries.add(statsEntry.normalizedName);
        }

        const photoUrl = player?.photo?.url
          ? SERVER_URL + player.photo.url
          : statsEntry?.photo || DEFAULT_PLAYER_IMAGE;

        const displayName =
          fullName ||
          player.jerseyName ||
          statsEntry?.displayName ||
          player.name ||
          'Player';

        return {
          id: player.id,
          name: displayName,
          jerseyName: player.jerseyName,
          jerseyNumber: player.jerseyNumber,
          kitSize: player.kitSize,
          position: statsEntry?.position,
          isTeamAdmin: player.id === participation?.teamAdmin?.id,
          photo: photoUrl,
          stats: buildSeasonStats(statsEntry),
          source: 'official' as const,
        };
      }
    );

    const derivedPlayers: PublicTeamPlayerCard[] = statsList
      .filter((entry) => !usedStatsEntries.has(entry.normalizedName))
      .map((entry) => ({
        id: undefined,
        name: simplifyTeamName(entry.displayName),
        jerseyName: simplifyTeamName(entry.displayName),
        jerseyNumber: entry.jerseyNumber,
        position: entry.position,
        isTeamAdmin: false,
        kitSize: undefined,
        photo: entry.photo || DEFAULT_PLAYER_IMAGE,
        stats: buildSeasonStats(entry),
        source: 'derived' as const,
      }));

    return [
      ...mappedOfficial.filter(
        (player) => player.name && player.name !== 'Player'
      ),
      ...derivedPlayers,
    ];
  }, [playersData?.players, statsList, statsMap, participation?.teamAdmin?.id]);

  const returnTournament = () => {
    const id = participation?.name?.split(' ').pop();
    const type = participation?.type;
    if (type) {
      const found = SPORTS_CONFIG[type.toLowerCase()];
      if (found) {
        const tournament = found.tournaments.find((t) => t.id === id);
        if (tournament) {
          return (
            <div className="flex flex-row items-center flex-wrap gap-2 mr-2 mt-4">
              <span className="px-4 py-2 bg-orange-200 text-sage-00 rounded-lg inline-block capitalize">
                {`${tournament?.name}`}
              </span>

              {/* <span className="px-4 py-2 bg-orange-200 text-sage-00 rounded-lg inline-block capitalize">
                {` Fees: ${tournament?.registrationFee.toLocaleString()} EGP`}
              </span> */}
            </div>
          );
        }
      }
    }
    return (
      <span className="px-4 py-2 bg-orange-200 text-sage-00 rounded-lg mt-4 inline-block mr-2 capitalize">
        {participation?.name?.split(' ')?.pop()?.split('-').join(' ')}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600" />
      </div>
    );
  }

  if (!displayPlayers.length && playersError) {
    return (
      <div className="min-h-screen p-8 bg-brand-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-xl mx-auto">
          <h2 className="text-red-800 font-semibold mb-2">
            Error Loading Team Data
          </h2>
          <p className="text-red-600">
            {playersError?.message || 'Team not found'}
          </p>
        </div>
      </div>
    );
  }

  if (!isLoading && !displayPlayers.length) {
    return (
      <div className="min-h-screen bg-brand-50 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto">
              <UserX className="w-8 h-8 text-brand-700" />
            </div>
            <h2 className="text-2xl font-display font-bold text-brand-700">
              No Team Found
            </h2>
            <p className="text-brand-400">
              You are not currently part of any team. Please contact your team
              administrator or the tournament organizers for assistance.
            </p>
            <div className="pt-4">
              <a
                href="/tournaments"
                className="inline-flex items-center gap-2 px-6 py-3 bg-peach-400 text-white rounded-lg hover:bg-peach-300 transition-colors"
              >
                <Trophy className="w-4 h-4" />
                View Tournaments
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-brand-50 py-12 px-4 w-full">
        <div className="max-w-6xl mx-auto w-full">
          <button
            onClick={() => navigate('/league')}
            className="flex items-center gap-2 px-4 py-2 text-brand-600 hover:text-brand-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-display">Back to Home</span>
          </button>
          {/* Team Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-display font-bold text-brand-700 mb-2">
              {participation?.teams?.[0]?.name}
            </h1>

            <div className="flex items-center gap-4 text-brand-400">
              <span className="flex items-center gap-2 capitalize">
                <Trophy className="w-4 h-4" />
                {participation?.type}
              </span>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center flex-wrap">
                {returnTournament()}

                <span className="px-4 py-2 bg-brand-100 text-brand-700 rounded-lg mt-4 inline-block">
                  {displayPlayers.length} Players
                </span>
              </div>
            </div>
          </div>

          {/* Players List */}
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full">
            <h2 className="text-2xl font-display font-semibold text-brand-700 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Players
            </h2>
            <div className="grid gap-6">
              {displayPlayers.map((player) => (
                <div
                  key={
                    player.id ??
                    `${player.name}-${player.jerseyNumber ?? 'derived'}`
                  }
                  className="flex flex-col md:flex-row gap-2 border border-brand-200 rounded-xl p-6 hover:border-peach-400 transition-all duration-300"
                >
                  <div>
                    <img
                      src={player.photo || DEFAULT_PLAYER_IMAGE}
                      alt={player.name}
                      className="w-24 h-24 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() =>
                        setSelectedImage({
                          url: player.photo || DEFAULT_PLAYER_IMAGE,
                          alt: player.name,
                        })
                      }
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-brand-700 mb-2 items-center">
                        {player.name}{' '}
                        {player.isTeamAdmin && (
                          <span className="px-2 py-1 bg-brand-200 text-brand-700 rounded-lg inline-block text-xs">
                            Team Admin
                          </span>
                        )}
                      </h3>
                      <div className="space-y-1 text-brand-400">
                        {player.kitSize && <p>Kit Size: {player.kitSize}</p>}
                        {player.jerseyName && (
                          <p>Kit Name: {player.jerseyName}</p>
                        )}
                        {player.jerseyNumber !== undefined &&
                          player.jerseyNumber !== null && (
                            <p>Kit Number: {player.jerseyNumber}</p>
                          )}
                        {player.position && (
                          <p>Position: {simplifyTeamName(player.position)}</p>
                        )}
                      </div>
                      <div className="mt-4 border-t border-brand-100 pt-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-300 mb-3">
                          Season Stats
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                          {[
                            { label: 'GP', value: player.stats.matchesPlayed },
                            { label: 'MIN', value: player.stats.minutes },
                            { label: 'PTS', value: player.stats.points },
                            { label: 'AST', value: player.stats.assists },
                            { label: 'REB', value: player.stats.rebounds },
                            { label: 'STL', value: player.stats.steals },
                            { label: 'BLK', value: player.stats.blocks },
                            { label: 'TO', value: player.stats.turnovers },
                            { label: '+/-', value: player.stats.plusMinus },
                          ].map((stat) => {
                            const isPlusMinus = stat.label === '+/-';
                            const displayValue =
                              typeof stat.value === 'number'
                                ? isPlusMinus && stat.value > 0
                                  ? `+${stat.value}`
                                  : stat.value
                                : stat.value;
                            return (
                              <div
                                key={stat.label}
                                className="bg-brand-50 rounded-lg px-3 py-2 text-center"
                              >
                                <div className="text-[11px] uppercase tracking-wider text-brand-300">
                                  {stat.label}
                                </div>
                                <div className="text-sm font-semibold text-brand-700">
                                  {displayValue}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add ImagePopup */}
      {selectedImage && (
        <ImagePopup
          imageUrl={selectedImage.url}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
