import { gql } from '@apollo/client';

export const REGISTER_TEAM = gql`
  mutation RegisterTeam($input: RegisterTeamInput!) {
    registerTeam(input: $input) {
      id
      sport
      teamName
      players {
        id
        firstName
        lastName
      }
    }
  }
`;

export const UPDATE_TEAM = gql`
  mutation UpdateTeam($id: ID!, $input: UpdateTeamInput!) {
    updateTeam(id: $id, input: $input) {
      id
      sport
      teamName
      players {
        id
        firstName
        lastName
      }
    }
  }
`;