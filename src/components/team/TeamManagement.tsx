import { useState, useEffect, useMemo } from 'react';
import {
  Users,
  Edit2,
  Save,
  X,
  Trophy,
  LogIn,
  UserX,
  ArrowLeft,
} from 'lucide-react';
import { usePlayerInfo } from '../../hooks/usePlayerInfo';
import { GET_TEAM_PLAYERS } from '../../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import {
  AUTH_PLAYER,
  UPDATE_PLAYER,
  FORGOT_PASSWORD,
} from '../../utils/mutations';
import useLeaguesState from '../../hooks/useLeaguesState';
import { PlayerInterface } from '../../utils/types';
import { kitSize } from '../../utils/Select';
import AddPlayerForm from './AddPlayerForm';
import { useNavigate } from 'react-router-dom';
import { SPORTS_CONFIG } from '../../constants/sports';
import { MAIN_LEAGUE } from '../../utils/constants';

export default function TeamManagement() {
  const { playerInfo } = usePlayerInfo();
  const { currentCompetition } = useLeaguesState(MAIN_LEAGUE);
  const isEditsLocked = Boolean(currentCompetition?.disableEdits);
  const isRegistrationLocked = Boolean(currentCompetition?.disableRegistration);
  const [authPlayerWithPassword] = useMutation(AUTH_PLAYER);
  const [updatePlayer] = useMutation(UPDATE_PLAYER);
  const [forgotPasswordMutation] = useMutation(FORGOT_PASSWORD);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedParticipation, setSelectedParticipation] =
    useState<string>('');

  const participation = useMemo(() => {
    return playerInfo?.participation.find((p) =>
      selectedParticipation
        ? p.id === selectedParticipation
        : p.competition?.id === currentCompetition?.id
    );
  }, [playerInfo, selectedParticipation, currentCompetition]);

  const navigate = useNavigate();

  const {
    data: playersData,
    loading: playersLoading,
    refetch,
    error: playersError,
  } = useQuery(GET_TEAM_PLAYERS, {
    variables: { id: selectedParticipation || participation?.id },
    skip: !participation?.id,
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('playerInfo');
  });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [nationalId, setNationalId] = useState<File | null>(null);
  const [editForm, setEditForm] = useState({
    jerseyName: '',
    jerseyNumber: '',
    kitSize: '',
  });

  useEffect(() => {
    if (playerInfo && !isAuthenticated) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated, playerInfo]);

  useEffect(() => {
    if (isEditsLocked) {
      setEditingPlayerId(null);
    }
  }, [isEditsLocked]);

  useEffect(() => {
    setIsLoading(playersLoading);
  }, [playersLoading]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await authPlayerWithPassword({
        variables: {
          email: loginForm.email.toLowerCase(),
          password: loginForm.password,
        },
      });

      if (
        res.data &&
        res.data.authPlayerWithPassword &&
        res.data.authPlayerWithPassword.id
      ) {
        localStorage.setItem(
          'playerInfo',
          JSON.stringify(res.data.authPlayerWithPassword)
        );
        window.location.reload();
      } else {
        setError('There was a problem with your login');
      }
    } catch {
      setError('Invalid username or password');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (!forgotPasswordEmail) return;
      const res = await forgotPasswordMutation({
        variables: {
          email: forgotPasswordEmail.toLowerCase(),
        },
      });
      if (
        res.data &&
        res.data.forgetPlayerPassword &&
        res.data.forgetPlayerPassword.id
      ) {
        setForgotPasswordSuccess(true);
      } else {
        setError('Failed to reset your password');
      }
    } catch (error) {
      setError('Failed to send reset link. Please verify your email address.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNationalId(file);
    }
  };
  const startEditing = (playerId: string) => {
    const player: PlayerInterface = playersData?.players.find(
      (p: PlayerInterface) => p.id === playerId
    );
    if (player) {
      setEditForm({
        jerseyNumber: String(player.jerseyNumber),
        kitSize: player.kitSize,
        jerseyName: player.jerseyName,
      });
      setEditingPlayerId(playerId);
    }
  };

  const handleUpdatePlayer = async () => {
    if (isEditsLocked) {
      setError('Roster edits are currently locked for this competition.');
      return;
    }
    try {
      setIsSubmitting(true);
      let updatePlayerData: {
        jerseyName: string;
        jerseyNumber: number;
        kitSize: string;
        nationalIdImage?: { upload: File | null };
      } = { ...editForm, jerseyNumber: Number(editForm.jerseyNumber) };

      if (nationalId) {
        updatePlayerData = {
          ...updatePlayerData,
          nationalIdImage: {
            upload: nationalId,
          },
        };
      }
      await updatePlayer({
        variables: {
          id: editingPlayerId,
          data: updatePlayerData,
        },
      });
      await refetch();
      setEditingPlayerId(null);
      setIsSubmitting(false);
    } catch {
      setError('Failed to update player');
      setIsSubmitting(false);
    }
  };

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
                {`Prize: ${tournament?.prizePool.toLocaleString()} EGP`}
              </span> */}
              <span className="px-4 py-2 bg-orange-200 text-sage-00 rounded-lg inline-block capitalize">
                {` Fees: ${tournament?.registrationFee.toLocaleString()} EGP`}
              </span>
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

  if (!isAuthenticated) {
    if (isForgotPassword) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-sage-50 p-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 text-sage-600 hover:text-sage-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-display">Back to Home</span>
          </button>
          <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-sage-200">
            <h1 className="text-3xl font-display font-bold text-sage-600 mb-4 text-center">
              Reset Password
            </h1>

            {forgotPasswordSuccess ? (
              <div className="text-center space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
                  Reset link has been sent to your email.
                </div>
                <button
                  onClick={() => {
                    setIsForgotPassword(false);
                    setForgotPasswordSuccess(false);
                  }}
                  className="text-sage-600 hover:text-sage-500"
                >
                  Return to login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-sage-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    className="w-full p-3 border-2 border-sage-200 rounded-lg"
                    required
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <button
                    type="submit"
                    className="w-full py-3 bg-peach-400 text-white rounded-lg hover:bg-peach-300"
                  >
                    Send Reset Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="w-full py-3 border border-sage-200 text-sage-600 rounded-lg hover:bg-sage-50"
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-sage-50 p-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 text-sage-600 hover:text-sage-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-display">Back to Home</span>
        </button>
        <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-sage-200">
          <h1 className="text-3xl font-display font-bold text-sage-600 mb-4 text-center">
            Team Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-sage-600 mb-2">
                Email
              </label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-full p-3 border-2 border-sage-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-600 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="w-full p-3 border-2 border-sage-200 rounded-lg"
                required
              />
            </div>
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-peach-400 text-white rounded-lg hover:bg-peach-300 flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Login
            </button>

            <button
              type="button"
              onClick={() => setIsForgotPassword(true)}
              className="w-full text-sage-600 hover:text-sage-500 text-sm"
            >
              Forgot your password?
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isLoading || playersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sage-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage-600" />
      </div>
    );
  }

  if (
    !playersData &&
    !playersLoading &&
    !playerInfo &&
    !isLoading &&
    isAuthenticated &&
    playersError
  ) {
    return (
      <div className="min-h-screen p-8 bg-sage-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-xl mx-auto">
          <h2 className="text-red-800 font-semibold mb-2">
            Error Loading Team Data
          </h2>
          <p className="text-red-600">{error || 'Team not found'}</p>
        </div>
      </div>
    );
  }

  if (
    !playersLoading &&
    !isLoading &&
    playersData &&
    !playersData.players?.length
  ) {
    return (
      <div className="min-h-screen bg-sage-50 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
            <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto">
              <UserX className="w-8 h-8 text-sage-600" />
            </div>
            <h2 className="text-2xl font-display font-bold text-sage-600">
              No Team Found
            </h2>
            <p className="text-sage-500">
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
    <div className="min-h-screen bg-sage-50 py-12 px-4 w-full">
      <div className="max-w-6xl mx-auto w-full">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 text-sage-600 hover:text-sage-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-display">Back to Home</span>
        </button>
        {/* Team Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {playerInfo?.participation &&
          playerInfo?.participation?.length > 0 ? (
            <select
              value={selectedParticipation || participation?.id}
              onChange={(e) => setSelectedParticipation(e.target.value)}
              className="px-4 py-2 border-2 border-sage-200  mb-2 w-fit rounded-xl focus:ring-2 focus:ring-peach-400 text-3xl font-display font-bold text-sage-600  bg-white/90 transition-all duration-300 group-hover:border-peach-400"
              required
            >
              <option value="">Select Team</option>
              {playerInfo?.participation?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p?.teams?.[0]?.name}
                </option>
              ))}
            </select>
          ) : (
            <h1 className="text-3xl font-display font-bold text-sage-600 mb-2">
              {participation?.teams?.[0]?.name}
            </h1>
          )}
          <div className="flex items-center gap-4 text-sage-500">
            <span className="flex items-center gap-2 capitalize">
              <Trophy className="w-4 h-4" />
              {participation?.type}
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center flex-wrap">
              {returnTournament()}

              <span className="px-4 py-2 bg-sage-100 text-sage-600 rounded-lg mt-4 inline-block">
                {playersData?.players?.length} Players
              </span>
            </div>
          </div>

          {participation?.teamAdmin?.id === playerInfo?.id && (
            <div className="mt-5">
              <AddPlayerForm
                teamId={participation?.teams[0]?.id as string}
                partId={participation?.id as string}
                sportType={participation?.type as string}
                onSuccess={refetch}
                requiresKitNumber={
                  participation?.type === 'Football' ||
                  participation?.type === 'Basketball'
                }
                isDisabled={isRegistrationLocked}
              />
            </div>
          )}
        </div>

        {/* Players List */}
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full">
          <h2 className="text-2xl font-display font-semibold text-sage-600 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Players
          </h2>
          {isEditsLocked && (
            <div className="mb-6 rounded-xl border border-sage-200 bg-sage-50 px-4 py-3 text-sm text-sage-600">
              Player profile edits are locked while Double Dribble operations
              verifies rosters. Please reach out to the league if urgent updates
              are required.
            </div>
          )}
          <div className="grid gap-6">
            {playersData?.players.map((player: PlayerInterface) => (
              <div
                key={player.id}
                className="border border-sage-200 rounded-xl p-6 hover:border-peach-400 transition-all duration-300"
              >
                {editingPlayerId === player.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={editForm.jerseyName}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            jerseyName: e.target.value,
                          }))
                        }
                        className="p-3 border border-sage-200 rounded-lg"
                        placeholder="Kit Name"
                      />
                      <input
                        type="number"
                        value={editForm.jerseyNumber}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            jerseyNumber: e.target.value,
                          }))
                        }
                        className="p-3 border border-sage-200 rounded-lg"
                        placeholder="Kit Number"
                      />
                      <select
                        value={editForm.kitSize}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            kitSize: e.target.value,
                          }))
                        }
                        className="p-3 border border-sage-200 rounded-lg"
                      >
                        {kitSize.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingPlayerId(null)}
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdatePlayer}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-500 flex items-center gap-2"
                        type="button"
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-sage-600 mb-2 items-center">
                        {player.firstName} {player.lastName}{' '}
                        {player?.id === participation?.teamAdmin?.id && (
                          <span className="px-2 py-1 bg-sage-200 text-sage-600 rounded-lg inline-block text-xs">
                            Team Admin
                          </span>
                        )}
                      </h3>
                      <div className="space-y-1 text-sage-500">
                        <p>Phone: {player.phoneNumber}</p>
                        <p>Kit Size: {player.kitSize}</p>
                        <p>Kit Name: {player.jerseyName || 'N/A'}</p>
                        {player.jerseyNumber &&
                          (participation?.type === 'Football' ||
                            participation?.type === 'Basketball') && (
                            <p>Kit Number: {player.jerseyNumber}</p>
                          )}
                      </div>
                    </div>
                    {playerInfo?.id === participation?.teamAdmin?.id && (
                      <button
                        type="button"
                        onClick={() => {
                          if (!isEditsLocked) {
                            startEditing(player.id!);
                          }
                        }}
                        className="p-2 text-sage-600 hover:bg-sage-50 rounded-lg disabled:cursor-not-allowed"
                        disabled={isEditsLocked}
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
