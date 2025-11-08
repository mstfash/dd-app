import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PLAYER, FETCH_APPLICATION_DATA } from '../utils/queries';
import { ApplicationDataType } from '../utils/types';
import { Participation } from '../hooks/useLeaguesState';

export interface PlayerInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  playerID: string;
  phoneNumber: string;
  jerseyName: string;
  bio: string;
  kitSize: string;
  jerseyNumber: number;
  isCaptain: boolean;
  paid: boolean;
  verified: boolean;
  position: string;
  photo: {
    url: string;
  };
  nationalIdImage: {
    url: string;
  };
  participation: Participation[];
  age: number;
}

interface AppState {
  playerInfo: PlayerInfo | null;
  applicationData: ApplicationDataType | null;
  isLoading: boolean;
  error: Error | null;
  updatePlayerInfo: (info: PlayerInfo) => void;
  refreshPlayerInfo: () => void;
  refreshApplicationData: () => Promise<void>;
}

// Create context
const AppStateContext = createContext<AppState | undefined>(undefined);

// Create provider component
export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(() => {
    const stored = localStorage.getItem('playerInfo');
    return stored ? JSON.parse(stored) : null;
  });

  const [applicationData, setApplicationData] =
    useState<ApplicationDataType | null>(() => {
      const stored = localStorage.getItem('applicationData');
      return stored ? JSON.parse(stored) : null;
    });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch player data
  const { data: playerData, refetch: refetchPlayer } = useQuery(GET_PLAYER, {
    variables: { id: playerInfo?.id },
    skip: !playerInfo?.id,
    pollInterval: 20000,
  });

  // Fetch application data
  const { data, refetch: refetchAppData } = useQuery(FETCH_APPLICATION_DATA, {
    pollInterval: 20000,
  });

  // Initial fetch of application data
  useEffect(() => {
    if (data) {
      setApplicationData(data);
      localStorage.setItem('applicationData', JSON.stringify(data));
    }
  }, [data]);

  // Update player info when data changes
  useEffect(() => {
    if (playerData?.player) {
      setPlayerInfo(playerData.player);
      localStorage.setItem('playerInfo', JSON.stringify(playerData.player));
    }
  }, [playerData]);

  const updatePlayerInfo = (info: PlayerInfo) => {
    setPlayerInfo(info);
    localStorage.setItem('playerInfo', JSON.stringify(info));
  };

  const refreshPlayerInfo = async () => {
    if (!playerInfo?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await refetchPlayer();
      if (result.data?.player) {
        setPlayerInfo(result.data.player);
        localStorage.setItem('playerInfo', JSON.stringify(result.data.player));
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to refresh player info')
      );
    } finally {
      setIsLoading(false);
    }
  };

  const refreshApplicationData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await refetchAppData();
      if (result.data) {
        setApplicationData(result.data);
        localStorage.setItem('applicationData', JSON.stringify(result.data));
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('Failed to refresh application data')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppStateContext.Provider
      value={{
        playerInfo,
        applicationData,
        isLoading,
        error,
        updatePlayerInfo,
        refreshPlayerInfo,
        refreshApplicationData,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

// Create hook for using the context
export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
