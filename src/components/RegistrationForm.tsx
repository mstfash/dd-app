import { useState, useContext, useEffect } from 'react';
import { Trophy, UserPlus, Check, Plus, Users } from 'lucide-react';
import { Sport, Player } from '../types';
import { SPORTS_CONFIG } from '../config/sports';
import { RegistrationContext } from '../contexts/RegistrationContext';
import StepIndicator from './registration/StepIndicator';
import SportSelection from './registration/SportSelection';
import PlayerForm from './registration/PlayerForm';
import NavigationButtons from './registration/NavigationButtons';
import ErrorMessage from './registration/ErrorMessage';
import { useRegistration } from '../hooks/useRegistration';
import { useMutation } from '@apollo/client';
import {
  CREATE_PARTICIPATION,
  CREATE_PLAYER_MINIMAL,
  CREATE_TEAM_MINIMAL,
  UPDATE_PLAYER,
} from '../utils/mutations';
import useLeaguesState from '../hooks/useLeaguesState';
import { Link } from 'react-router-dom';
import { MAIN_LEAGUE } from '../utils/constants';

export default function RegistrationForm({
  teamId: incomingTeamId,
  partId: incomingPartId,
  step,
}: {
  teamId?: string;
  partId?: string;
  step?: number;
  onlyShowForm?: boolean;
}) {
  const [createPlayer] = useMutation(CREATE_PLAYER_MINIMAL);
  const [createTeam] = useMutation(CREATE_TEAM_MINIMAL);
  const [createParticipation] = useMutation(CREATE_PARTICIPATION);
  const [updatePlayerData] = useMutation(UPDATE_PLAYER);

  const { sport: contextSport } = useContext(RegistrationContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSport, setSelectedSport] = useState<Sport | ''>(contextSport);
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedTournament, setSelectedTournament] = useState('');
  const { currentCompetition, currentSeason } = useLeaguesState(MAIN_LEAGUE);

  const { checkExistanceCallback } = useRegistration();
  useEffect(() => {
    if (contextSport) {
      setSelectedSport(contextSport);
      // Scroll to form if coming from sport selection
      const formElement = document.getElementById('register');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [contextSport]);

  const currentConfig = selectedSport ? SPORTS_CONFIG[selectedSport] : null;

  const steps = [
    { title: 'Sport & Team', icon: Trophy },
    { title: 'Players', icon: UserPlus },
  ];

  const canProceedToPlayers = selectedSport && teamName && selectedTournament;
  const canProceedToPayment =
    players.length >= (currentConfig?.minPlayers || 0);

  const handleNext = async () => {
    setError(null);

    if (currentStep === 0 && canProceedToPlayers) {
      const teamValidation = await checkExistanceCallback({ teamName });
      if (!teamValidation.isValid) {
        setError(teamValidation.message as string);
        setIsSubmitting(false);
        return;
      }
      setCurrentStep(1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addPlayer = () => {
    if (!currentConfig || players.length >= currentConfig.maxPlayers) return;

    setPlayers([
      ...players,
      {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        playerID: '',
        photo: '',
        kitSize: '',
        email: '',
        jerseyNumber: '',
        teamName: '',
        sportType: '',
      },
    ]);
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const updatePlayer = (
    index: number,
    field: keyof Player,
    value: string | number | Date | File | null
  ) => {
    const newPlayers = [...players];
    if (field === 'playerIDFile' && value instanceof File) {
      // Directly set the file in the playerIDFile field
      newPlayers[index] = {
        ...newPlayers[index],
        playerIDFile: value,
      };
    } else {
      newPlayers[index] = { ...newPlayers[index], [field]: value };
    }
    setPlayers(newPlayers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSport || !currentConfig) return;

    setError(null);

    if (!acceptedTerms) {
      setError('You must accept to our terms and conditions to continue');
      return;
    }
    setIsSubmitting(true);

    try {
      const compId = currentCompetition?.id;
      const seasonId = currentSeason?.id;

      if (!compId || !seasonId) {
        setError('No id for competition or season');
        return;
      }

      if (!incomingTeamId) {
        const teamValidation = await checkExistanceCallback({ teamName });
        if (!teamValidation.isValid) {
          setError(teamValidation.message as string);
          setIsSubmitting(false);
          return;
        }
      }

      const createdPlayers = [];

      for await (const player of players) {
        try {
          // First try to find existing player by email
          const result = await checkExistanceCallback({ email: player.email });

          if (result.data) {
            createdPlayers.push(result.data);
            continue;
          }

          // If player doesn't exist, create new player
          const playerData = {
            firstName: player.firstName,
            lastName: player.lastName,
            email: player.email,
            phoneNumber: player.phoneNumber,
            playerID: player.playerID,
            jerseyNumber: player.jerseyNumber ? Number(player.jerseyNumber) : 1,
            kitSize: player.kitSize || 'Medium',
            hometown: 'N/A',
            position: 'N/A',
            secondPosition: 'N/A',
            ability: 'Beginner',
            skill: 'N/A',
            preferredFoot: 'N/A',
            nationalIdImage: {
              upload: player.playerIDFile,
            },
            photo: {
              upload: player.playerIDFile,
            },
            knowsUsFrom: 'Other',
          };
          const playerRes = await createPlayer({
            variables: { data: playerData },
          });

          if (!playerRes?.data?.createPlayer?.id) {
            throw new Error('Failed to create player record');
          }

          createdPlayers.push(playerRes.data.createPlayer);
        } catch (error) {
          setError(
            `Error processing player ${player.firstName}: ${error.message}`
          );
          setIsSubmitting(false);
          return;
        }
      }
      let teamId;
      if (incomingTeamId) {
        teamId = incomingTeamId;
      } else {
        const teamRes = await createTeam({
          variables: { data: { name: teamName } },
        });
        teamId = teamRes?.data?.createTeam?.id;
      }

      if (!teamId) throw new Error('Team ID not found');

      let partId;

      if (incomingPartId) {
        partId = incomingPartId;
      } else {
        const participationData = {
          name: `${currentSeason.name} ${teamName} ${currentCompetition?.name} ${selectedTournament}`,
          seasons: { connect: [{ id: seasonId }] },
          teams: { connect: [{ id: teamId }] },
          competition: { connect: { id: compId } },
          type: selectedSport,
          teamAdmin: {
            connect: { id: createdPlayers[0].id },
          },
          isVerified: false,
        };
        const pRes = await createParticipation({
          variables: { data: participationData },
        });
        partId = pRes?.data.createParticipation?.id;
      }

      if (!partId) throw new Error('Participation ID not found');

      for await (const player of createdPlayers) {
        const updatedPlayerData = {
          participation: {
            connect: [{ id: partId }],
          },
        };
        await updatePlayerData({
          variables: {
            id: player.id,
            data: updatedPlayerData,
          },
        });
      }
      setSuccessMessage('Everything is set, see you on the field!');
      setShowSuccess(true);
    } catch (error) {
      setError('An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="inset-0 flex items-center justify-center pb-36">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">
              Registration Complete!
            </h2>
            <p>
              New player Check your email for password. If no email received,
              you already have an account - please log in or reset password.
            </p>
            <p className="text-gray-600 mb-6">{successMessage}</p>

            <Link to="/team" replace>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-peach-400 text-white rounded-lg hover:bg-peach-300 transition-colors text-sm">
                <Users className="w-4 h-4" />
                View my team
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      className="py-20 bg-sage-50 relative overflow-hidden"
      id="register"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4 opacity-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <img src="/Stars-1.svg" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-5xl font-display font-bold text-center mb-4 text-sage-600 tracking-tight">
          Register Your Team
        </h2>
        <p className="text-sage-500 text-center max-w-2xl mx-auto mb-12 text-lg">
          Join the tournament by completing the registration form below. All
          fields marked with * are required.
        </p>

        <StepIndicator currentStep={step || currentStep} steps={steps} />

        <form onSubmit={handleSubmit} className="space-y-8 relative">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-10 border border-sage-100">
            <div
              className={`space-y-8 transition-all duration-500 ${
                currentStep === 0 ? 'block' : 'hidden'
              }`}
            >
              <SportSelection
                selectedSport={selectedSport}
                setSelectedSport={setSelectedSport}
                selectedTournament={selectedTournament}
                setSelectedTournament={setSelectedTournament}
                teamName={teamName}
                setTeamName={setTeamName}
              />
            </div>

            <div
              className={`space-y-6 transition-all duration-500 ${
                (step || currentStep) === 1 ? 'block' : 'hidden'
              }`}
            >
              {currentConfig && (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-display font-bold text-sage-600">
                      Players ({currentConfig.minPlayers}-
                      {currentConfig.maxPlayers})
                    </h3>
                    <button
                      type="button"
                      onClick={addPlayer}
                      disabled={players.length >= currentConfig.maxPlayers}
                      className="flex items-center gap-2 px-6 py-3 bg-peach-400 text-white rounded-xl hover:bg-peach-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 hover:shadow-lg font-display text-sm uppercase tracking-wider"
                    >
                      <Plus className="w-4 h-4" />
                      Add Player
                    </button>
                  </div>

                  {players.map((player, index) => (
                    <PlayerForm
                      key={index}
                      player={player}
                      index={index}
                      updatePlayer={updatePlayer}
                      removePlayer={removePlayer}
                      requiresKitNumber={currentConfig.requiresKitNumber}
                    />
                  ))}
                </>
              )}
            </div>

            {/* Terms and Conditions */}
            {currentStep === 1 && players.length > 0 && (
              <div className="flex items-start gap-2 mt-6 md:mt-8">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border border-sage-300 text-peach-400 focus:ring-peach-400 transition-all duration-300 cursor-pointer flex-shrink-0"
                  required
                />
                <label className="text-[13px] text-sage-500 leading-snug">
                  By checking this box, I confirm that all provided information
                  is accurate and agree to the tournament's terms and conditions
                  including the right for Zed Tournaments to keep my data and
                  national ID
                </label>
              </div>
            )}

            <NavigationButtons
              currentStep={currentStep}
              handleBack={handleBack}
              handleNext={handleNext}
              isSubmitting={isSubmitting}
              acceptedTerms={acceptedTerms}
              canProceedToNext={Boolean(
                currentStep === 0 ? canProceedToPlayers : canProceedToPayment
              )}
            />

            {error && <ErrorMessage message={error} />}
          </div>
        </form>
      </div>
    </section>
  );
}
