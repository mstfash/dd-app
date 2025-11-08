import type { Team, Player, TournamentCategory } from '../types';

// Mock team data
export const mockTeams: Team[] = [
  {
    id: '1',
    sport: 'football',
    teamName: 'Golden Eagles',
    createdAt: '2025-02-15T10:00:00Z',
    players: [
      {
        id: '1',
        firstName: 'Ahmed',
        lastName: 'Hassan',
        phoneNumber: '+201012345678',
        idPhotoUrl: 'https://example.com/photos/ahmed.jpg',
        kitSize: 'L',
        kitNumber: 10,
        dateOfBirth: '1995-05-15',
        gender: 'male'
      },
      {
        id: '2',
        firstName: 'Mohamed',
        lastName: 'Ibrahim',
        phoneNumber: '+201023456789',
        idPhotoUrl: 'https://example.com/photos/mohamed.jpg',
        kitSize: 'M',
        kitNumber: 7,
        dateOfBirth: '1996-08-22',
        gender: 'male'
      }
    ],
    registeredTournaments: [
      {
        id: '1',
        tournamentId: 'mens-football',
        paymentStatus: 'pending'
      }
    ]
  }
];

// Mock team captains data
export const mockTeamCaptains = [
  {
    username: 'demo',
    password: 'demo123',
    teamId: '1',
    playerId: '1'
  }
];

// Mock tournament categories
export const mockTournamentCategories: TournamentCategory[] = [
  {
    id: 'mens-football',
    sport: 'football',
    name: 'Men\'s 5aside Football',
    category: 'mens',
    gender: 'male',
    minPlayers: 5,
    maxPlayers: 7,
    registrationFee: 1000
  },
  {
    id: 'womens-football',
    sport: 'football',
    name: 'Women\'s 5aside Football',
    category: 'womens',
    gender: 'female',
    minPlayers: 5,
    maxPlayers: 7,
    registrationFee: 1000
  }
];

// Function to register a new team
export function registerTeam(teamData: Team) {
  const newTeam = {
    id: crypto.randomUUID(),
    ...teamData,
    createdAt: new Date().toISOString(),
    players: teamData.players.map(player => ({
      ...player,
      id: crypto.randomUUID()
    }))
  };
  
  mockTeams.push(newTeam);
  return newTeam;
}