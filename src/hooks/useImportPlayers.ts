/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { read, utils } from 'xlsx';
import dayjs from 'dayjs';

// Types
interface PlayerData {
  firstName: string;
  lastName: string;
  email: string;
  playerID: string;
  phoneNumber: string;
  jerseyNumber?: number;
  jerseyName?: string;
  kitSize?: string;
  position?: string;
  dateOfBirth?: string;
  nickname?: string;
  hometown?: string;
  weight?: number;
  height?: number;
  secondPosition?: string;
  ability?: string;
  skill?: string;
  preferredFoot?: string;
  bio?: string;
  paid?: boolean;
  verified?: boolean;
  suspended?: boolean;
  isCaptain?: boolean;
  knowsUsFrom?: string;
  work?: string;
  team: string;
  competition: string;
  season: string;
}

const kitSize = {
  S: 'Small',
  M: 'Medium',
  L: 'Large',
  XL: 'XLarge',
  XXL: 'XXLarge',
  '3XL': 'XXXLarge',
};

const normalizeText = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value.trim();
  return String(value).trim();
};

const buildCacheKey = (...values: Array<unknown>) =>
  values.map((value) => normalizeText(value).toLowerCase()).join('|');

const isUniqueConstraintError = (error: unknown) => {
  const message =
    typeof error === 'object' && error && 'message' in error
      ? String((error as Error).message ?? '')
      : '';
  return message.toLowerCase().includes('unique constraint');
};

const toBoolean = (value: unknown) => {
  const normalized = normalizeText(value).toLowerCase();
  return ['true', '1', 'yes', 'y'].includes(normalized);
};

export interface ImportResults {
  success: any[];
  existing: any[];
  errors: any[];
  warnings: any[];
}

// GraphQL Queries
const CHECK_PLAYER_EXISTS = gql`
  query CheckPlayer($where: PlayerWhereInput!) {
    players(where: $where) {
      id
      email
      firstName
      lastName
      participation {
        id
        name
        competition {
          id
          name
        }
      }
    }
  }
`;

const GET_COMPETITIONS = gql`
  query GetCompetitions {
    competitions {
      id
      name
      currentSeason {
        id
        name
      }
      seasons {
        id
        name
      }
    }
  }
`;

const GET_TEAM = gql`
  query GetTeam($where: TeamWhereUniqueInput!) {
    team(where: $where) {
      id
      name
    }
  }
`;

const GET_PARTICIPATION = gql`
  query GetParticipation($where: ParticipationWhereInput!) {
    participations(where: $where) {
      id
      name
      competition {
        id
      }
      teams {
        id
      }
    }
  }
`;

// GraphQL Mutations
const CREATE_TEAM = gql`
  mutation CreateTeam($data: TeamCreateInput!) {
    createTeam(data: $data) {
      id
      name
    }
  }
`;

const CREATE_PARTICIPATION = gql`
  mutation CreateParticipation($data: ParticipationCreateInput!) {
    createParticipation(data: $data) {
      id
      name
    }
  }
`;

const CREATE_PLAYER = gql`
  mutation CreatePlayer($data: PlayerCreateInput!) {
    createPlayer(data: $data) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const usePlayerImport = () => {
  // Hooks
  const [getPlayerExists] = useLazyQuery(CHECK_PLAYER_EXISTS, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });
  const [getCompetitions] = useLazyQuery(GET_COMPETITIONS, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });
  const [getTeam] = useLazyQuery(GET_TEAM, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });
  const [getParticipation] = useLazyQuery(GET_PARTICIPATION, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });
  const [createTeam] = useMutation(CREATE_TEAM);
  const [createParticipation] = useMutation(CREATE_PARTICIPATION);
  const [createPlayer] = useMutation(CREATE_PLAYER);

  // Helper Functions
  const validatePlayerData = (player: any): PlayerData => {
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'team',
    ];
    const missingFields = requiredFields.filter(
      (field) => !normalizeText(player?.[field])
    );

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    const firstName = normalizeText(player.firstName);
    const lastName = normalizeText(player.lastName);
    const email = normalizeText(player.email).toLowerCase();
    const team = normalizeText(player.team);
    const competition = normalizeText(player.competition) || 'Dell';
    const season = normalizeText(player.season) || 'Season Three';
    const work = normalizeText(player.work);
    const nickname = normalizeText(player.nickname);
    const preferredFoot = normalizeText(player.preferredFoot) || 'N/A';
    const position = normalizeText(player.position) || 'N/A';
    const secondPosition = normalizeText(player.secondPosition) || 'N/A';
    const ability = normalizeText(player.ability) || 'N/A';
    const skill = normalizeText(player.skill) || 'N/A';
    const hometown = normalizeText(player.hometown) || 'N/A';
    const bio =
      normalizeText(player.bio) ||
      [work, team].filter(Boolean).join(' - ') ||
      `${firstName} ${lastName}`;

    const playerIdSource =
      normalizeText((player as any).playerID) ||
      normalizeText((player as any).playderID);
    const playerID =
      playerIdSource ||
      `${firstName.replace(/\s+/g, '_')}_${lastName.replace(
        /\s+/g,
        '_'
      )}_${Math.floor(Math.random() * 100000)}`;

    const jerseyNumberCandidate = Number(
      normalizeText(player.jerseyNumber) || NaN
    );
    const jerseyNumber = Number.isFinite(jerseyNumberCandidate)
      ? jerseyNumberCandidate
      : Math.floor(Math.random() * 99) + 1;
    const jerseyName = nickname || `${firstName} ${lastName}`;

    const kitSizeKey = normalizeText(player.kitSize).toUpperCase();
    const resolvedKitSize =
      kitSize[kitSizeKey as keyof typeof kitSize] || 'Medium';

    const dateOfBirthValue = normalizeText(player.dateOfBirth);
    const dateOfBirth = dayjs(dateOfBirthValue).isValid()
      ? dayjs(dateOfBirthValue).toISOString()
      : dayjs('1990-01-01').toISOString();

    const weightCandidate = Number(normalizeText(player.weight) || NaN);
    const heightCandidate = Number(normalizeText(player.height) || NaN);

    const phoneNumber =
      normalizeText(player.phoneNumber) ||
      String(Math.floor(Math.random() * 10000000000));

    return {
      firstName,
      lastName,
      email,
      playerID,
      phoneNumber,
      jerseyNumber,
      jerseyName,
      kitSize: resolvedKitSize,
      position,
      dateOfBirth,
      nickname,
      hometown,
      weight: Number.isFinite(weightCandidate) ? weightCandidate : 0,
      height: Number.isFinite(heightCandidate) ? heightCandidate : 0,
      secondPosition,
      ability,
      skill,
      preferredFoot,
      bio,
      paid: toBoolean(player.paid),
      verified: toBoolean(player.verified),
      suspended: toBoolean(player.suspended),
      isCaptain: toBoolean(player.isCaptain),
      knowsUsFrom: normalizeText(player.knowsUsFrom) || 'Other',
      work,
      team,
      competition,
      season,
    };
  };

  const checkExistingPlayer = async (email: string) => {
    try {
      const normalizedEmail = normalizeText(email).toLowerCase();
      const { data } = await getPlayerExists({
        variables: {
          where: {
            email: { equals: normalizedEmail },
          },
        },
      });
      return data?.players?.[0] || null;
    } catch (error) {
      console.error('Error checking player existence:', error);
      return null;
    }
  };

  // Main processing function
  const processFile = async (file: File): Promise<ImportResults> => {
    const results: ImportResults = {
      success: [],
      existing: [],
      errors: [],
      warnings: [],
    };
    const teamCache = new Map<string, { id: string; name: string }>();
    const participationCache = new Map<string, string>();
    let competitionsMap: Map<string, any> | null = null;

    const resolveCompetitions = async () => {
      if (competitionsMap) {
        return competitionsMap;
      }
      const { data: compsData } = await getCompetitions({
        fetchPolicy: 'network-only',
      });
      const competitions = compsData?.competitions ?? [];
      if (!competitions.length) {
        throw new Error('No competitions found');
      }
      competitionsMap = new Map(
        competitions.map((comp: any) => [buildCacheKey(comp.name), comp])
      );
      return competitionsMap;
    };

    const createTeamSafe = async (teamName: string) => {
      const trimmedName = normalizeText(teamName);
      if (!trimmedName) {
        throw new Error('Team name is required');
      }

      try {
        const { data } = await createTeam({
          variables: {
            data: {
              name: trimmedName,
              arabicName: `${trimmedName}_ar`,
            },
          },
        });
        return data?.createTeam ?? null;
      } catch (error) {
        if (isUniqueConstraintError(error)) {
          const { data: existing } = await getTeam({
            variables: { where: { name: trimmedName } },
            fetchPolicy: 'network-only',
          });
          return existing?.team ?? null;
        }
        throw error;
      }
    };

    const createParticipationSafe = async ({
      competitionId,
      seasonId,
      teamId,
      name,
    }: {
      competitionId: string;
      seasonId: string;
      teamId: string;
      name: string;
    }) => {
      try {
        const { data } = await createParticipation({
          variables: {
            data: {
              name,
              competition: { connect: { id: competitionId } },
              teams: { connect: [{ id: teamId }] },
              seasons: { connect: [{ id: seasonId }] },
            },
          },
        });
        return data?.createParticipation?.id ?? null;
      } catch (error) {
        if (isUniqueConstraintError(error)) {
          const { data: existing } = await getParticipation({
            variables: { where: { name: { equals: name } } },
            fetchPolicy: 'network-only',
          });
          return existing?.participations?.[0]?.id ?? null;
        }
        throw error;
      }
    };

    const buildParticipationName = (
      seasonName: string,
      teamName: string,
      competitionName: string
    ) => {
      const base = `${normalizeText(seasonName)} ${normalizeText(
        teamName
      )}`.trim();
      const suffix =
        normalizeText(competitionName) &&
        normalizeText(competitionName).toLowerCase() !== 'al elite'
          ? ` ${normalizeText(competitionName)}`
          : '';
      return `${base}${suffix}`.trim();
    };

    try {
      const buffer = await file.arrayBuffer();
      const workbook = read(buffer);

      // Process each sheet
      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const rawData = utils.sheet_to_json(sheet);

        if (rawData.length === 0) {
          results.warnings.push(`Sheet ${sheetName} is empty`);
          continue;
        }

        const competitions = await resolveCompetitions();

        // Process each player
        for await (const rawPlayer of rawData) {
          try {
            const validatedPlayer = validatePlayerData(rawPlayer);

            const competitionKey = buildCacheKey(
              validatedPlayer.competition ||
                (rawPlayer as any)?.competition ||
                'Dell'
            );
            const competition =
              competitions.get(competitionKey) ??
              competitions.get(buildCacheKey('Dell'));
            if (!competition) {
              throw new Error(
                `Competition ${
                  validatedPlayer.competition || competitionKey
                } not found`
              );
            }

            const currentSeason =
              competition.currentSeason ??
              competition.seasons?.find(
                (season: any) =>
                  buildCacheKey(season.name) ===
                  buildCacheKey(validatedPlayer.season)
              );
            if (!currentSeason) {
              throw new Error(
                `Season not found for competition ${competition.name}`
              );
            }

            // Check for existing player before creating relations
            const existingPlayer = await checkExistingPlayer(
              validatedPlayer.email
            );
            if (existingPlayer) {
              results.existing.push({
                email: validatedPlayer.email,
                message: 'Player already exists',
                existingData: existingPlayer,
              });
              continue;
            }

            const teamName = normalizeText(validatedPlayer.team);
            const teamCacheKey = buildCacheKey(teamName);
            let teamRecord = teamCache.get(teamCacheKey);

            if (!teamRecord) {
              const { data: teamData } = await getTeam({
                variables: {
                  where: { name: teamName },
                },
                fetchPolicy: 'network-only',
              });

              teamRecord = teamData?.team ?? null;

              if (!teamRecord) {
                teamRecord = await createTeamSafe(teamName);
              }

              if (!teamRecord?.id) {
                throw new Error(`Unable to resolve team ${teamName}`);
              }

              teamCache.set(teamCacheKey, teamRecord);
            } else {
              teamRecord = {
                id: teamRecord.id,
                name: teamRecord.name,
              };
            }

            const participationName = buildParticipationName(
              currentSeason.name,
              teamRecord.name,
              competition.name
            );

            if (!participationName) {
              throw new Error('Unable to build participation name');
            }

            const participationCacheKey = buildCacheKey(
              competition.id,
              currentSeason.id,
              participationName
            );

            let participationId = participationCache.get(participationCacheKey);

            if (!participationId) {
              const { data: participationData } = await getParticipation({
                variables: {
                  where: {
                    name: { equals: participationName },
                  },
                },
                fetchPolicy: 'network-only',
              });

              participationId =
                participationData?.participations?.[0]?.id ?? null;

              if (!participationId) {
                participationId = await createParticipationSafe({
                  competitionId: competition.id,
                  seasonId: currentSeason.id,
                  teamId: teamRecord.id,
                  name: participationName,
                });
              }

              if (!participationId) {
                throw new Error(
                  `Unable to resolve participation ${participationName}`
                );
              }

              participationCache.set(participationCacheKey, participationId);
            }

            const {
              team: _team,
              season: _season,
              competition: _competition,
              ...playerData
            } = validatedPlayer;

            const { data: playerResult } = await createPlayer({
              variables: {
                data: {
                  ...playerData,
                  participation: {
                    connect: [{ id: participationId }],
                  },
                },
              },
            });

            results.success.push({
              email: validatedPlayer.email,
              playerId: playerResult.createPlayer.id,
              message: 'Player created successfully',
            });
          } catch (error: any) {
            results.errors.push({
              row: rawPlayer,
              error: error?.message ?? 'Unknown error',
            });
          }
        }
      }

      return results;
    } catch (error: any) {
      console.error('File processing failed:', error.message);
      throw error;
    }
  };

  return {
    processFile,
    checkExistingPlayer,
  };
};

export default usePlayerImport;
