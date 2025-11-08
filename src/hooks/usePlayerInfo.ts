import { useAppState } from '../context/AppStateContext';

export function usePlayerInfo() {
  const {
    playerInfo,
    applicationData,
    isLoading,
    error,
    updatePlayerInfo,
    refreshPlayerInfo,
    refreshApplicationData,
  } = useAppState();

  return {
    playerInfo,
    applicationData,
    isLoading,
    error,
    updatePlayerInfo,
    refreshPlayerInfo,
    refreshApplicationData,
  };
}
