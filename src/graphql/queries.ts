import { gql } from '@apollo/client';

export const GET_TEAMS = gql`
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

export const GET_TEAM = gql`
  query GetTeam($id: ID!) {
    team(id: $id) {
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