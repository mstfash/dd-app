import { gql } from '@apollo/client';

export const CREATE_PLAYER = gql`
  mutation createPlayer(
    $firstName: String!
    $lastName: String!
    $nickname: String!
    $playerID: String!
    $phoneNumber: String!
    $hometown: String!
    $weight: Float!
    $height: Float!
    $position: String!
    $dateOfBirth: String!
    $secondPosition: String!
    $ability: String!
    $skill: String!
    $preferredFoot: String!
    $jerseyName: String!
    $jerseyNumber: Int!
    $kitSize: String!
    $email: String!
    $nationalIdImage: ImageFieldInput!
    $isCaptain: Boolean!
    $paymentPlan: String!
    $photo: ImageFieldInput!
    $bio: String!
  ) {
    createPlayer(
      data: {
        firstName: $firstName
        lastName: $lastName
        nickname: $nickname
        playerID: $playerID
        phoneNumber: $phoneNumber
        hometown: $hometown
        weight: $weight
        height: $height
        position: $position
        dateOfBirth: $dateOfBirth
        secondPosition: $secondPosition
        ability: $ability
        skill: $skill
        preferredFoot: $preferredFoot
        jerseyName: $jerseyName
        jerseyNumber: $jerseyNumber
        kitSize: $kitSize
        email: $email
        nationalIdImage: $nationalIdImage
        photo: $photo
        isCaptain: $isCaptain
        paymentPlan: $paymentPlan
        bio: $bio
      }
    ) {
      id
    }
  }
`;

export const UPDATE_PLAYER = gql`
  mutation updatePlayer($id: ID!, $data: PlayerUpdateInput!) {
    updatePlayer(where: { id: $id }, data: $data) {
      id
    }
  }
`;

export const CREATE_TEAM = gql`
  mutation createTeam(
    $name: String!
    $mascot: String
    $secondMascot: String
    $teamLogo: ImageFieldInput
    $arabicName: String
  ) {
    createTeam(
      data: {
        name: $name
        mascot: $mascot
        secondMascot: $secondMascot
        teamLogo: $teamLogo
        arabicName: $arabicName
      }
    ) {
      id
    }
  }
`;

export const CREATE_PARTICIPATION = gql`
  mutation createParticipation($data: ParticipationCreateInput!) {
    createParticipation(data: $data) {
      id
    }
  }
`;

export const EDIT_PLAYER = gql`
  mutation updatePlayer(
    $firstName: String!
    $lastName: String!
    $nickname: String!
    $playerID: String!
    $phoneNumber: String!
    $hometown: String!
    $weight: Float!
    $height: Float!
    $position: String!
    $dateOfBirth: String!
    $secondPosition: String!
    $ability: String!
    $skill: String!
    $preferredFoot: String!
    $jerseyName: String!
    $jerseyNumber: Int!
    $kitSize: String!
    $email: String!
    $nationalIdImage: ImageFieldInput
    $isCaptain: Boolean!
    $paymentPlan: String!
    $photo: ImageFieldInput
    $bio: String!
  ) {
    updatePlayer(
      data: {
        firstName: $firstName
        lastName: $lastName
        nickname: $nickname
        playerID: $playerID
        phoneNumber: $phoneNumber
        hometown: $hometown
        weight: $weight
        height: $height
        position: $position
        dateOfBirth: $dateOfBirth
        secondPosition: $secondPosition
        ability: $ability
        skill: $skill
        preferredFoot: $preferredFoot
        jerseyName: $jerseyName
        jerseyNumber: $jerseyNumber
        kitSize: $kitSize
        email: $email
        nationalIdImage: $nationalIdImage
        photo: $photo
        isCaptain: $isCaptain
        paymentPlan: $paymentPlan
        bio: $bio
      }
    ) {
      id
    }
  }
`;

export const AUTH_PLAYER = gql`
  mutation authPlayerWithPassword($email: String!, $password: String!) {
    authPlayerWithPassword(email: $email, password: $password) {
      isCaptain
      verified
      paid
      firstName
      lastName
      id
      phoneNumber
      email
      playerID
      bio
      kitSize
      photo {
        url
      }
      nationalIdImage {
        url
      }
      participation {
        id
        name
        seasons {
          id
          seasonNumber
          name
        }
        competition {
          id
          name
        }
        teams {
          id
          name
          mascot
          secondMascot
        }
      }
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation forgetPlayerPassword($email: String!) {
    forgetPlayerPassword(email: $email) {
      id
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePlayerPassword(
    $email: String!
    $oldPassword: String!
    $newPassword: String!
  ) {
    changePlayerPassword(
      email: $email
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      id
    }
  }
`;

export const REQUEST_PLAYER = gql`
  mutation requestPlayer(
    $email: String!
    $teamName: String!
    $teamSecurityCode: String!
  ) {
    requestPlayer(
      email: $email
      teamName: $teamName
      teamSecurityCode: $teamSecurityCode
    ) {
      id
    }
  }
`;

export const UPDATE_MULTIPLE_PLAYERS = gql`
  mutation updatePlayers($data: [PlayerUpdateArgs!]!) {
    updatePlayers(data: $data) {
      id
    }
  }
`;

export const AUTH_ADMIN_WITH_PASSWORD = gql`
  mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          email
          id
          name
          role {
            name
          }
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export const UPDATE_MATCH = gql`
  mutation updateMatch($id: ID!, $data: MatchUpdateInput!) {
    updateMatch(where: { id: $id }, data: $data) {
      id
    }
  }
`;

export const UPDATE_PARTICIPATION = gql`
  mutation updateParticipation($id: ID!, $data: ParticipationUpdateInput!) {
    updateParticipation(where: { id: $id }, data: $data) {
      id
    }
  }
`;

export const CREATE_PAYMENT_ORDER = gql`
  mutation createPayment($data: PaymentCreateInput!) {
    createPayment(data: $data) {
      id
    }
  }
`;

export const CREATE_PLAYER_MINIMAL = gql`
  mutation createPlayer($data: PlayerCreateInput!) {
    createPlayer(data: $data) {
      id
    }
  }
`;

export const CREATE_TEAM_MINIMAL = gql`
  mutation createTeam($data: TeamCreateInput!) {
    createTeam(data: $data) {
      id
    }
  }
`;

export const CREATE_INVITES = gql`
  mutation createInvites($data: [InviteCreateInput!]!) {
    createInvites(data: $data) {
      id
    }
  }
`;
