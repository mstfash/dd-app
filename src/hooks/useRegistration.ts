/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLazyQuery } from '@apollo/client';
import { GET_TEAM_UNIQUE, GET_PLAYERS_UNIQUE } from '../utils/queries';
import { useCallback } from 'react';

interface RegistrationChecker {
  email?: string;
  phoneNumber?: string;
  playerID?: string;
  teamName?: string;
}

interface ValidationResult {
  isValid: boolean;
  message?: string;
  data: any;
}

export function useRegistration(): {
  checkExistanceCallback: ({
    email,
    phoneNumber,
    playerID,
    teamName,
  }: RegistrationChecker) => Promise<ValidationResult>;
} {
  const [getPlayers] = useLazyQuery(GET_PLAYERS_UNIQUE);
  const [getTeam] = useLazyQuery(GET_TEAM_UNIQUE);

  const checkExistanceCallback = useCallback(
    async ({
      email,
      phoneNumber,
      playerID,
      teamName,
    }: RegistrationChecker): Promise<ValidationResult> => {
      try {
        if (teamName) {
          const foundTeam = await getTeam({
            variables: { where: { name: teamName } },
          });
          if (foundTeam?.data?.team?.id) {
            return {
              isValid: false,
              message: `Team "${teamName}" already exists. Please choose another name.`,
              data: foundTeam.data,
            };
          }
        }

        if (email) {
          const normalizedEmail = email.trim();
          const { data } = await getPlayers({
            variables: {
              where: {
                email: { equals: normalizedEmail },
              },
            },
          });
          console.log({ data, email });
          if (data?.players.length) {
            return {
              isValid: false,
              message: `Email "${email}" is already registered. Please use another email or login if this is your account.`,
              data: data.players[0],
            };
          }
        }

        if (phoneNumber) {
          const { data } = await getPlayers({
            variables: { where: { phoneNumber: { equals: phoneNumber } } },
          });
          if (data?.players.length) {
            return {
              isValid: false,
              message: `Phone number "${phoneNumber}" is already registered to another player.`,
              data: data.players[0],
            };
          }
        }

        if (playerID) {
          const { data } = await getPlayers({
            variables: { where: { playerID: { equals: playerID } } },
          });
          if (data?.players.length) {
            return {
              isValid: false,
              message: `Player ID is already registered to another player.`,
              data: data.players[0],
            };
          }
        }

        return { isValid: true, data: null, message: '' };
      } catch (error) {
        console.error(error);
        return {
          isValid: false,
          message:
            'An error occurred while checking registration details. Please try again.',
          data: null,
        };
      }
    },
    [getPlayers, getTeam]
  );

  return { checkExistanceCallback };
}
