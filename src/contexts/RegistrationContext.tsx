import { createContext, useState, ReactNode, useCallback } from 'react';
import type { Sport } from '../types';

interface RegistrationContextType {
  sport: Sport | '';
  setSport: (sport: Sport | '') => void;
}

export const RegistrationContext = createContext<RegistrationContextType>({
  sport: '',
  setSport: () => {}
});

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [sport, setSport] = useState<Sport | ''>('');

  return (
    <RegistrationContext.Provider value={{ sport, setSport }}>
      {children}
    </RegistrationContext.Provider>
  );
}