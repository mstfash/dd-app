import { useMemo } from 'react';
import { ApplicationDataType, Competition, Season } from '../utils/types';
import { usePlayerInfo } from './usePlayerInfo';
import { PlayerInfo } from '../context/AppStateContext';

export interface Participation {
  id: string;
  name: string;
  seasons: {
    id: string;
    seasonNumber: string;
    name: string;
  }[];
  competition: {
    id: string;
    name: string;
  };
  teams: Team[];
  teamAdmin: PlayerInfo;
  type: string;
  playersCount: number;
  group?: string;
}

export interface Team {
  id: string;
  name: string;
  teamLogo: {
    url: string;
  };
  mascotLogo: string;
}

interface SeasonState {
  applicationData: ApplicationDataType | null; // Replace with proper type from your types file
  notInCurrentSeason: boolean;
  currentTeam: Team | null;
  currentEalElitePart: Participation | null;
  currentSeason: Season | undefined;
  previousSeason: Season | undefined;
  lastSeason: Season | undefined;
  isTransferMarket: boolean;
  currentParticipation: Participation | null;
  participatedLastSeason: boolean;
  currentCompetition: Competition | undefined;
  joinedLeagues: {
    [key: string]: Participation[];
  };
  competitionsList: Array<
    Competition & {
      currentSeason: Season | null;
      previousSeason: Season | null;
      lastSeason: Season | null;
    }
  >;
  publicCompetitions: Array<
    Competition & {
      currentSeason: Season | null;
      previousSeason: Season | null;
      lastSeason: Season | null;
    }
  >;
  isTeamAdmin: boolean;
  isTeamFull: boolean;
  joinedTeams: Array<Participation>;
}

export default function useLeaguesState(
  compIdentifier: string = ''
): SeasonState {
  const selectedCompetition = useMemo(() => {
    return compIdentifier;
  }, [compIdentifier]);

  const { playerInfo, applicationData } = usePlayerInfo();

  const competitionsList = useMemo(() => {
    if (applicationData?.competitions?.length) {
      return applicationData.competitions.map((c: Competition) => ({
        ...c,
        currentSeason: c.currentSeason ?? c.seasons[c.seasons.length - 1],
        previousSeason: c.seasons[c.seasons.length - 2],
        lastSeason: c.seasons[c.seasons.length - 1],
      }));
    }
    return [];
  }, [applicationData?.competitions]);

  const publicCompetitions = useMemo(() => {
    return competitionsList?.filter((c: Competition) => c.isPublic);
  }, [competitionsList]);

  const currentCompetition = useMemo(() => {
    if (!selectedCompetition) {
      return competitionsList?.find((c: Competition) => c.name === 'AL Elite');
    }
    return competitionsList?.find(
      (c: Competition) =>
        c.id === selectedCompetition ||
        c.name.toLowerCase() === selectedCompetition.toLowerCase()
    );
  }, [competitionsList, selectedCompetition]);

  const currentSeason = useMemo(() => {
    if (currentCompetition?.currentSeason) {
      return currentCompetition.currentSeason;
    }
    return currentCompetition?.seasons[currentCompetition?.seasons.length - 1];
  }, [currentCompetition]);

  const lastSeason = useMemo(() => {
    return currentCompetition?.seasons[currentCompetition?.seasons.length - 1];
  }, [currentCompetition]);

  const previousSeason = useMemo(() => {
    return currentCompetition?.seasons[currentCompetition?.seasons.length - 2];
  }, [currentCompetition]);

  const joinedLeagues = useMemo(() => {
    const data = playerInfo?.participation ? [...playerInfo.participation] : [];
    const mappedPart = data?.sort((a: Participation, b: Participation) => {
      const first = [...a.seasons];
      const second = [...b.seasons];
      return (
        Number(first?.[0]?.seasonNumber) - Number(second?.[0]?.seasonNumber)
      );
    });

    return mappedPart?.reduce(
      (acc: { [key: string]: Participation[] }, item: Participation) => {
        acc[item.competition?.name]
          ? acc[item.competition.name].push(item)
          : (acc[item.competition.name] = [item]);
        return acc;
      },
      {}
    );
  }, [playerInfo]);

  const joinedTeams = useMemo(() => {
    return Object.values(joinedLeagues)
      .flat()
      .filter((p: Participation) => !p.name.toLowerCase().includes('transfer'));
  }, [joinedLeagues]);

  const currentEalElitePart = useMemo(() => {
    if (!competitionsList?.length) return null;
    const ealElite = competitionsList?.find(
      (c: Competition) => c.name === 'AL Elite'
    );
    if (!ealElite) return null;
    const currentParticipation =
      joinedLeagues?.[ealElite?.name]?.[
        joinedLeagues?.[ealElite?.name].length - 1
      ];
    if (!currentParticipation) return null;
    return currentParticipation;
  }, [competitionsList, joinedLeagues]);

  const currentParticipation = useMemo(() => {
    if (
      !playerInfo?.participation?.length ||
      !currentCompetition ||
      !joinedLeagues
    )
      return null;
    return joinedLeagues?.[currentCompetition.name]?.[
      joinedLeagues[currentCompetition.name].length - 1
    ];
  }, [currentCompetition, joinedLeagues, playerInfo]);

  const isTeamAdmin = useMemo(() => {
    return Boolean(currentParticipation?.teamAdmin?.id === playerInfo?.id);
  }, [currentParticipation, playerInfo]);

  const currentTeam = useMemo(() => {
    if (!currentParticipation) return null;
    return currentParticipation?.teams[0];
  }, [currentParticipation]);

  const isTransferMarket = useMemo(() => {
    return Boolean(currentParticipation?.name?.includes('Transfer Market'));
  }, [currentParticipation]);

  const participatedLastSeason = useMemo(() => {
    if (!playerInfo) return false;
    const exists = currentParticipation?.name?.includes(
      previousSeason?.name as string
    );
    if (exists && !playerInfo.isCaptain && !isTransferMarket) {
      return true;
    }
    return false;
  }, [currentParticipation, isTransferMarket, playerInfo, previousSeason]);

  const notInCurrentSeason = useMemo(() => {
    if (lastSeason && playerInfo) {
      if (isTransferMarket) return true;
      const exists = currentParticipation?.seasons?.[0]?.name
        .toLowerCase()
        .includes(lastSeason.name.toLowerCase());

      if (exists) {
        return false;
      }
      return true;
    }
    return false;
  }, [currentParticipation, lastSeason, isTransferMarket, playerInfo]);

  const isTeamFull = useMemo(() => {
    if (
      currentCompetition?.maxPlayersCount &&
      currentParticipation?.playersCount &&
      currentCompetition?.maxPlayersCount <= currentParticipation?.playersCount
    ) {
      return true;
    }
    return false;
  }, [currentCompetition, currentParticipation]);

  return {
    applicationData,
    currentSeason,
    currentTeam,
    notInCurrentSeason,
    currentParticipation,
    lastSeason,
    isTransferMarket,
    previousSeason,
    participatedLastSeason,
    competitionsList,
    currentCompetition,
    joinedLeagues,
    currentEalElitePart,
    isTeamAdmin,
    isTeamFull,
    joinedTeams,
    publicCompetitions,
  };
}
