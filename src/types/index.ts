export type Sport = 'Football' | 'Padel' | 'Basketball' | 'Padbol';

export interface Tournament {
  id: string;
  name: string;
  category: string;
  minPlayers: number;
  maxPlayers: number;
  registrationFee: number;
  prizePool: number;
}

export interface Schedule {
  days: string;
  time: string;
  format: string;
  details: string[];
}

export interface SportConfig {
  name: Sport;
  minPlayers: number;
  maxPlayers: number;
  requiresKitNumber: boolean;
  tournaments: Tournament[];
  image: string;
  schedule: Schedule;
}

export interface Player {
  firstName: string;
  lastName: string;
  playerID: string;
  jerseyNumber: string;
  kitSize: string;
  teamName: string;
  phoneNumber: string;
  email: string;
  sportType: string;
  playerIDFile?: File;
  photo: string;
}

export interface Team {
  id?: string;
  sport: Sport;
  teamName: string;
  players: Player[];
  createdAt?: string;
  registeredTournaments?: {
    id: string;
    tournamentId: string;
    paymentStatus: 'pending' | 'paid';
  }[];
}
