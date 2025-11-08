import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_TEAMS = gql`
  query GetTeams {
    teams {
      id
      sport
      teamName
      createdAt
      players {
        id
        firstName
        lastName
        phoneNumber
        idPhotoUrl
        kitSize
        kitNumber
        dateOfBirth
        gender
      }
      registeredTournaments {
        id
        tournamentId
        paymentStatus
      }
    }
  }
`;

export function useTeams() {
  const { data, loading, error } = useQuery(GET_TEAMS);
  
  return {
    teams: data?.teams || [],
    loading,
    error
  };
}