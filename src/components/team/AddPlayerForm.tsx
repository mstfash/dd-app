import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Player } from '../../types';
import PlayerForm from '../registration/PlayerForm';
import { useMutation } from '@apollo/client';
import { CREATE_PLAYER_MINIMAL, UPDATE_PLAYER } from '../../utils/mutations';
import { useRegistration } from '../../hooks/useRegistration';
interface AddPlayerFormProps {
  teamId: string;
  partId: string;
  sportType: string;
  onSuccess: () => void;
  requiresKitNumber?: boolean;
  isDisabled?: boolean;
}

export default function AddPlayerForm({
  partId,
  sportType,
  onSuccess,
  requiresKitNumber,
  isDisabled = false,
}: AddPlayerFormProps) {
  const [createPlayer] = useMutation(CREATE_PLAYER_MINIMAL);
  const [updatePlayerData] = useMutation(UPDATE_PLAYER);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { checkExistanceCallback } = useRegistration();

  useEffect(() => {
    if (isDisabled) {
      setPlayers([]);
    }
  }, [isDisabled]);

  const addPlayer = () => {
    if (isDisabled) return;
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
        sportType,
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
    setError(null);
    if (isDisabled) {
      setError(
        'New player registrations are currently closed for this competition.'
      );
      return;
    }
    setIsSubmitting(true);

    try {
      const createdPlayers = [];

      for (const player of players) {
        const result = await checkExistanceCallback({ email: player.email });
        if (result.data) {
          createdPlayers.push(result.data);
          continue;
        }
        try {
          const playerData = {
            firstName: player.firstName,
            lastName: player.lastName,
            email: player.email,
            phoneNumber: player.phoneNumber,
            playerID: String(Math.floor(Math.random() * 10000000000)),
            jerseyNumber: player.jerseyNumber ? Number(player.jerseyNumber) : 1,
            kitSize: player.kitSize || 'Medium',
            hometown: 'N/A',
            position: 'N/A',
            secondPosition: 'N/A',
            ability: 'Beginner',
            skill: 'N/A',
            preferredFoot: 'N/A',
            knowsUsFrom: 'Other',
            receiveEmails: false,
          };

          const playerRes = await createPlayer({
            variables: { data: playerData },
          });

          if (!playerRes?.data?.createPlayer?.id) {
            throw new Error('Failed to create player record');
          }

          createdPlayers.push(playerRes.data.createPlayer);
        } catch (error) {
          throw new Error(
            `Error processing player ${player.firstName}: ${error.message}`
          );
        }
      }

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
      setPlayers([]);
      onSuccess();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h3 className="text-xl font-display font-bold text-sage-600">
          Add New Players
        </h3>
        <button
          type="button"
          onClick={addPlayer}
          className="flex items-center gap-2 px-6 py-3 bg-peach-400 text-white rounded-xl hover:bg-peach-300 transition-all transform hover:scale-105 hover:shadow-lg font-display text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          disabled={isDisabled}
        >
          <Plus className="w-4 h-4" />
          Add Player
        </button>
      </div>

      {isDisabled && (
        <div className="rounded-xl border border-sage-200 bg-sage-50 px-4 py-3 text-sm text-sage-600">
          New player registrations are currently locked for this competition.
          Please check back later or contact league operations for assistance.
        </div>
      )}

      {players.length > 0 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {players.map((player, index) => (
            <PlayerForm
              key={index}
              player={player}
              index={index}
              updatePlayer={updatePlayer}
              removePlayer={removePlayer}
              requiresKitNumber={requiresKitNumber}
            />
          ))}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-sage-600 text-white rounded-lg hover:bg-sage-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Adding Players...' : 'Add Players'}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
