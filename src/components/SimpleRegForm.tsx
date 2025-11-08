import { useState, FormEvent, useMemo } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import useLeaguesState from '../hooks/useLeaguesState';
import { MAIN_LEAGUE, MAIN_LEAGUE_ID } from '../utils/constants';
import { useRegistration } from '../hooks/useRegistration';
import { useMutation } from '@apollo/client';
import {
  CREATE_PLAYER_MINIMAL,
  CREATE_TEAM_MINIMAL,
  CREATE_PARTICIPATION,
  UPDATE_PLAYER,
} from '../utils/mutations';
import { isValidPhoneNumber } from '../utils/phoneUtil';

const TEAM_LEVELS = ['Recreational', 'Competitive', 'Elite'];
const MAX_PLAYERS = 12;
const MIN_PLAYERS = 1;

type Player = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
};

const initialPlayer: Player = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: '',
};

const competitionIdentifier = MAIN_LEAGUE_ID || MAIN_LEAGUE;

const SimpleRegForm = () => {
  const { currentCompetition, lastSeason, currentSeason } = useLeaguesState(
    competitionIdentifier
  );
  const [teamLevel, setTeamLevel] = useState('');
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState<Player[]>([{ ...initialPlayer }]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { checkExistanceCallback } = useRegistration();
  const [createPlayer] = useMutation(CREATE_PLAYER_MINIMAL);
  const [createTeam] = useMutation(CREATE_TEAM_MINIMAL);
  const [createParticipation] = useMutation(CREATE_PARTICIPATION);
  const [updatePlayerData] = useMutation(UPDATE_PLAYER);

  const isRegistrationDisabled = Boolean(
    currentCompetition?.disableRegistration
  );

  const canAddMorePlayers = players.length < MAX_PLAYERS;
  const canRemovePlayers = players.length > MIN_PLAYERS;

  const trimmedPlayers = useMemo(
    () =>
      players.map((player) => ({
        ...player,
        firstName: player.firstName.trim(),
        lastName: player.lastName.trim(),
        email: player.email.trim().toLowerCase(),
        phone: player.phone.trim(),
      })),
    [players]
  );

  const handleInputChange = (
    playerIdx: number,
    field: keyof Player,
    value: string
  ) => {
    setPlayers((prev) =>
      prev.map((player, index) => {
        if (index !== playerIdx) return player;
        const formattedValue =
          field === 'email'
            ? value.trim().toLowerCase()
            : field === 'phone'
            ? value.replace(/[^0-9+]/g, '')
            : value;
        return { ...player, [field]: formattedValue };
      })
    );
  };

  const addPlayer = () => {
    if (!canAddMorePlayers) return;
    setPlayers((prev) => [...prev, { ...initialPlayer }]);
  };

  const removePlayer = (index: number) => {
    if (!canRemovePlayers) return;
    setPlayers((prev) => prev.filter((_, idx) => idx !== index));
  };

  const validate = () => {
    if (!teamName.trim()) return 'Please enter a team name.';
    if (!teamLevel) return 'Please select a division.';

    const seenEmails = new Set<string>();

    for (const [idx, player] of trimmedPlayers.entries()) {
      if (
        !player.firstName ||
        !player.lastName ||
        !player.email ||
        !player.dob
      ) {
        return `Please fill all required fields for Player ${idx + 1}.`;
      }

      if (!player.phone) {
        return `Please add a phone number for Player ${idx + 1}.`;
      }

      if (seenEmails.has(player.email)) {
        return `Duplicate email detected for Player ${idx + 1}.`;
      }
      seenEmails.add(player.email);
    }

    return '';
  };

  const generateRandomTeamName = () => {
    const anchorPlayer = trimmedPlayers[0];
    const baseName =
      `${anchorPlayer.firstName}${anchorPlayer.lastName}`.replace(/\s+/g, '');
    const suffix = Math.floor(100 + Math.random() * 900);
    return baseName ? `${baseName}-${suffix}` : `DD-${suffix}`;
  };

  const recuriveTeamNameGenerator = async (
    teamName: string
  ): Promise<string> => {
    const teamValidation = await checkExistanceCallback({ teamName });
    if (!teamValidation.isValid) {
      return recuriveTeamNameGenerator(generateRandomTeamName());
    }
    return teamName;
  };

  const handleGenerateTeamName = async () => {
    const generatedName = await recuriveTeamNameGenerator(
      generateRandomTeamName()
    );
    setTeamName(generatedName);
  };

  const getQuarterDivisionLabel = () => {
    if (!currentCompetition?.name) return 'Double Dribble';
    return currentCompetition.name;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const compId = currentCompetition?.id;
      const seasonId = lastSeason?.id;

      if (!compId || !seasonId) {
        setError('Unable to locate the Double Dribble league configuration.');
        setLoading(false);
        return;
      }

      if (isRegistrationDisabled) {
        setError('Registration is currently closed.');
        setLoading(false);
        return;
      }

      let resolvedTeamName = teamName.trim();
      if (!resolvedTeamName) {
        resolvedTeamName = await recuriveTeamNameGenerator(
          generateRandomTeamName()
        );
        setTeamName(resolvedTeamName);
      } else {
        const teamValidation = await checkExistanceCallback({
          teamName: resolvedTeamName,
        });
        if (!teamValidation.isValid) {
          setError('Team name already exists. Please choose another name.');
          setLoading(false);
          return;
        }
      }

      const teamRes = await createTeam({
        variables: { data: { name: resolvedTeamName } },
      });
      const teamId = teamRes?.data?.createTeam?.id;

      if (!teamId) {
        throw new Error('Team ID not found.');
      }

      for (const [index, player] of trimmedPlayers.entries()) {
        const phoneNumber = isValidPhoneNumber(player.phone);
        if (!phoneNumber) {
          setError(
            `Invalid phone number for ${
              player.firstName || `Player ${index + 1}`
            }.`
          );
          setLoading(false);
          return;
        }
      }

      const createdPlayers = [] as Array<{ id: string }>;

      for await (const [index, player] of trimmedPlayers.entries()) {
        try {
          const existing = await checkExistanceCallback({
            email: player.email,
          });
          if (existing.data) {
            createdPlayers.push(existing.data);
            continue;
          }

          const playerData = {
            firstName: player.firstName,
            lastName: player.lastName,
            email: player.email,
            phoneNumber: player.phone,
            playerID: String(Math.floor(Math.random() * 10000000000)),
            jerseyNumber: Math.floor(Math.random() * 90) + 5,
            kitSize: 'Large',
            hometown: 'N/A',
            position: 'N/A',
            secondPosition: 'N/A',
            ability: 'Beginner',
            skill: 'N/A',
            preferredFoot: 'N/A',
            knowsUsFrom: 'Social Media',
            receiveEmails: false,
          };

          const playerRes = await createPlayer({
            variables: { data: playerData },
          });

          if (!playerRes?.data?.createPlayer?.id) {
            throw new Error('Failed to create player record.');
          }

          createdPlayers.push(playerRes.data.createPlayer);
        } catch (err) {
          const errMsg = err instanceof Error ? err.message : String(err);
          setError(
            `Error processing ${
              player.firstName || `Player ${index + 1}`
            }: ${errMsg}`
          );
          setLoading(false);
          return;
        }
      }

      const participationData = {
        name: `${
          lastSeason?.name ?? 'Season'
        } ${resolvedTeamName} ${getQuarterDivisionLabel()} - ${teamLevel.toLowerCase()}`,
        seasons: { connect: [{ id: seasonId }] },
        teams: { connect: [{ id: teamId }] },
        competition: { connect: { id: compId } },
        type: 'Basketball',
        teamAdmin: {
          connect: { id: createdPlayers[0].id },
        },
        isVerified: false,
      };

      const pRes = await createParticipation({
        variables: { data: participationData },
      });

      const partId = pRes?.data?.createParticipation?.id;

      if (!partId) {
        throw new Error('Participation ID not found.');
      }

      for await (const [index, player] of createdPlayers.entries()) {
        const updatedPlayerData = {
          participation: {
            connect: [{ id: partId }],
          },
          firstName: trimmedPlayers[index].firstName,
          lastName: trimmedPlayers[index].lastName,
          receiveEmails: true,
        };

        await updatePlayerData({
          variables: {
            id: player.id,
            data: updatedPlayerData,
          },
        });
      }

      setSuccess(true);
      setPlayers([{ ...initialPlayer }]);
      setTeamLevel('');
      setTeamName('');
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      setError(`An error occurred: ${errMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/team"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-display uppercase tracking-[0.3em] text-white backdrop-blur transition-all duration-300 hover:bg-white/20 hover:border-white/40"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 group-hover:bg-peach-400 group-hover:text-brand-900">
                🏀
              </span>
              <span className="text-white/90 group-hover:text-white">
                Team Login
              </span>
            </a>
            <a
              href="/league"
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-display uppercase tracking-[0.3em] text-white/80 backdrop-blur transition-all duration-300 hover:bg-peach-400 hover:text-brand-900 hover:border-peach-200"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:bg-brand-900 group-hover:text-peach-300">
                🔴
              </span>
              <span className="text-white/80 group-hover:text-brand-900">
                Live League
              </span>
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-white/40 text-xs uppercase tracking-[0.35em]">
            Manage your roster • Track live standings
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left Card - League Snapshot */}
          <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 rounded-3xl shadow-2xl p-10 text-white relative overflow-hidden border border-brand-700/40">
            <div className="absolute inset-0 bg-brand-900/40 backdrop-blur-[2px]" />
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src="/logo.jpeg"
                    alt="Double Dribble"
                    className="w-20 h-20 p-3 rounded-2xl bg-white/10 backdrop-blur"
                  />
                  <img
                    src="/3bont-logo.png"
                    alt="3Bont"
                    className="w-20 h-20 p-3 rounded-2xl bg-white/10 backdrop-blur"
                  />
                </div>
                <span className="uppercase tracking-[0.35em] text-xs text-court-200">
                  Basketball League
                </span>
              </div>

              <div>
                <h1 className="text-4xl font-display font-bold tracking-tight">
                  Double Dribble League
                </h1>
                <p className="text-brand-100 mt-4 text-sm sm:text-base">
                  Egypt's first fully data-driven basketball league. Lock in
                  your roster, compete across four quarters, and climb the table
                  through wins and point differential.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-wide text-brand-200">
                    Season Tip-Off
                  </p>
                  <p className="text-lg font-semibold">January 2026</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-wide text-brand-200">
                    Divisions
                  </p>
                  <p className="text-lg font-semibold">Rec • Comp • Elite</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-wide text-brand-200">
                    Venue
                  </p>
                  <p className="text-lg font-semibold">Cairo Sports Arena</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-wide text-brand-200">
                    Prize Pool
                  </p>
                  <p className="text-lg font-semibold">200,000 EGP</p>
                </div>
              </div>

              <div className="bg-brand-900/40 rounded-2xl p-5 border border-brand-700/40">
                <h3 className="text-lg font-semibold mb-3">
                  What’s new in DD Season 1?
                </h3>
                <ul className="space-y-2 text-sm text-brand-100">
                  <li>• Quarter-based match actions with live shot charts</li>
                  <li>
                    • Playoff seeding driven by wins, then point differential
                  </li>
                  <li>• Full roster management with easy add/remove players</li>
                  <li>• Smart scouting reports for every verified team</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Card - Registration Form */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-brand-100 relative">
            {loading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20 rounded-3xl">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-peach-400"></div>
              </div>
            )}

            {isRegistrationDisabled ? (
              <div className="space-y-6 text-center">
                <div className="relative overflow-hidden rounded-3xl border border-brand-200/60 bg-gradient-to-br from-brand-900/90 via-brand-800/95 to-brand-900/90 px-10 py-12 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.65)] text-white">
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(circle at top right, rgba(255,122,33,0.22), transparent 45%), radial-gradient(circle at bottom left, rgba(63,178,151,0.18), transparent 35%)',
                    }}
                  ></div>
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs tracking-[0.35em] uppercase text-white/80">
                      <span className="text-peach-300">Heads Up</span>
                      <span>Registration Status</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
                      Registration Closed
                    </h2>
                    <p className="max-w-lg text-sm sm:text-base leading-relaxed text-brand-50/80">
                      Season{' '}
                      {lastSeason?.seasonNumber ??
                        currentSeason?.seasonNumber ??
                        ''}{' '}
                      is currently locked for registrations. We appreciate your
                      passion—keep training and watch this space for the next
                      Double Dribble tip-off announcement.
                    </p>
                    <div className="mt-2 flex flex-col sm:flex-row items-center gap-3 text-xs tracking-[0.35em] text-white/60 uppercase">
                      <span>Double Dribble Operations</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-peach-300/90">
                        Stay Ready. Stay Hungry.
                      </span>
                    </div>
                    <div className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-peach-400 via-white/80 to-teal-300" />
                  </div>
                </div>
              </div>
            ) : success ? (
              <div className="bg-brand-50 border border-brand-100 text-brand-800 rounded-2xl px-8 py-10 text-center text-xl font-semibold shadow-lg">
                <div className="mb-4">
                  <svg
                    className="mx-auto mb-2"
                    width="48"
                    height="48"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="12"
                      fill="#FF6F1F"
                      fillOpacity="0.12"
                    />
                    <path
                      d="M7 13l3 3 7-7"
                      stroke="#FF6F1F"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                Registration complete!
                <br />
                Thank you for joining Double Dribble. Our team will send the
                payment link after verifying your roster.
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-display font-bold text-brand-700 mb-2">
                    Register Your Team
                  </h2>
                  <p className="text-brand-400 text-sm">
                    Secure your slot in the upcoming Double Dribble season. You
                    can start with a single player and keep adding teammates.
                  </p>
                  <div className="flex items-center justify-center gap-3 mt-3 text-xs text-brand-300 uppercase tracking-[0.3em]">
                    Powered by
                    <img
                      src="/3bont-logo.png"
                      alt="3Bont"
                      className="h-6 w-auto drop-shadow-sm"
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-brand-600 font-medium mb-2">
                      Team Name<span className="text-peach-500">*</span>
                    </label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <input
                        type="text"
                        className="flex-1 px-4 py-3 rounded-xl border border-brand-100 focus:ring-peach-400 focus:border-peach-400 transition-all bg-white text-brand-700 placeholder:text-brand-300"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Enter your team name"
                      />
                      <button
                        type="button"
                        onClick={handleGenerateTeamName}
                        className="px-4 py-3 rounded-xl border border-brand-200 text-brand-500 hover:border-peach-400 hover:text-peach-500 transition"
                      >
                        Generate
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-brand-600 font-medium mb-2">
                      Division<span className="text-peach-500">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:ring-peach-400 focus:border-peach-400 transition-all bg-white text-brand-700"
                      value={teamLevel}
                      onChange={(e) => setTeamLevel(e.target.value)}
                      required
                    >
                      <option value="">Select Division</option>
                      {TEAM_LEVELS.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-6">
                    {players.map((player, idx) => (
                      <div
                        key={idx}
                        className="bg-brand-50 rounded-2xl p-6 border border-brand-100 relative"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-peach-500 text-white rounded-full flex items-center justify-center text-base font-bold">
                              {idx + 1}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-brand-700">
                                Player {idx + 1}
                              </h3>
                              <p className="text-xs text-brand-400 uppercase tracking-wide">
                                Core roster spot
                              </p>
                            </div>
                          </div>

                          {canRemovePlayers && (
                            <button
                              type="button"
                              onClick={() => removePlayer(idx)}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-300 hover:text-red-500 transition"
                            >
                              <Trash2 className="w-4 h-4" /> Remove
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-brand-500 text-sm mb-1">
                              First Name
                              <span className="text-peach-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:ring-peach-400 focus:border-peach-400 bg-white text-brand-700 placeholder:text-brand-300"
                              value={player.firstName}
                              placeholder="First name"
                              onChange={(e) =>
                                handleInputChange(
                                  idx,
                                  'firstName',
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-brand-500 text-sm mb-1">
                              Last Name<span className="text-peach-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:ring-peach-400 focus:border-peach-400 bg-white text-brand-700 placeholder:text-brand-300"
                              value={player.lastName}
                              placeholder="Last name"
                              onChange={(e) =>
                                handleInputChange(
                                  idx,
                                  'lastName',
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-brand-500 text-sm mb-1">
                              Email<span className="text-peach-500">*</span>
                            </label>
                            <input
                              type="email"
                              className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:ring-peach-400 focus:border-peach-400 bg-white text-brand-700 placeholder:text-brand-300"
                              value={player.email}
                              placeholder="player@example.com"
                              onChange={(e) =>
                                handleInputChange(idx, 'email', e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-brand-500 text-sm mb-1">
                              Phone Number
                              <span className="text-peach-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:ring-peach-400 focus:border-peach-400 bg-white text-brand-700 placeholder:text-brand-300"
                              value={player.phone}
                              onChange={(e) =>
                                handleInputChange(idx, 'phone', e.target.value)
                              }
                              placeholder="e.g. +201234567890"
                            />
                          </div>
                          <div>
                            <label className="block text-brand-500 text-sm mb-1">
                              Date of Birth
                              <span className="text-peach-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:ring-peach-400 focus:border-peach-400 bg-white text-brand-700 placeholder:text-brand-300"
                              value={player.dob}
                              placeholder="YYYY-MM-DD"
                              onChange={(e) =>
                                handleInputChange(idx, 'dob', e.target.value)
                              }
                              onFocus={(e) => (e.currentTarget.type = 'date')}
                              onBlur={(e) => {
                                if (!e.currentTarget.value) {
                                  e.currentTarget.type = 'text';
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {canAddMorePlayers && (
                    <button
                      type="button"
                      onClick={addPlayer}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-brand-200 text-brand-500 hover:border-peach-400 hover:text-peach-500 transition"
                    >
                      <PlusCircle className="w-5 h-5" /> Add another player
                    </button>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-center text-sm font-medium">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-peach-500 text-white rounded-xl font-bold text-lg hover:bg-peach-400 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.01]"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit Registration'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleRegForm;
