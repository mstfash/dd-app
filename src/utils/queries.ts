import { gql } from '@apollo/client';

export const GET_TEAMS = gql`
  {
    teams {
      id
      name
      mascot
      mascotLogo
      secondMascot
      teamLogo {
        url
      }
    }
  }
`;

export const GET_PARTICIPATIONS = gql`
  query getParticipations {
    participations {
      id
      name
      seasons {
        id
        seasonNumber
        name
      }
      teams {
        id
        name
        mascot
        secondMascot
      }
      teamAdmin {
        id
        firstName
        lastName
        email
      }
      playersCount
      type
    }
  }
`;

export const FETCH_PARTICIPATIONS = gql`
  query getParticipations($where: ParticipationWhereInput) {
    participations(where: $where) {
      id
      name
      competition {
        id
        name
      }
      seasons {
        id
        seasonNumber
        name
      }
      teams {
        id
        name
        mascot
        secondMascot
        teamLogo {
          url
        }
      }
      teamAdmin {
        id
        firstName
        lastName
        email
      }
      playersCount
      type
    }
  }
`;

export const GET_TEAM_BY_NAME = gql`
  query getTeamByName($name: String!) {
    team(where: { name: $name }) {
      name
      id
    }
  }
`;
export const GET_PARTICIPATION_BY_NAME = gql`
  query getParticipations($name: String!) {
    participation(where: { name: $name }) {
      id
      name
      seasons {
        id
        seasonNumber
        name
      }
      competition {
        name
        id
      }
      teams {
        id
        name
        mascot
        secondMascot
      }
      teamAdmin {
        id
        firstName
        lastName
        email
      }
      playersCount
      type
    }
  }
`;

export const GET_SEASONS = gql`
  {
    seasons {
      id
      seasonNumber
      name
      startDate
      endDate
    }
  }
`;

export const GET_TEAM = gql`
  query team($id: ID!) {
    team(where: { id: $id }) {
      id
      name
      mascotLogo
      mascot
      secondMascot
      teamLogo {
        url
      }
    }
  }
`;

export const GET_PARTICIPATION_BY_ID = gql`
  query getParticipation($id: ID!, $name: String = "AL Elite") {
    participation(where: { id: $id }) {
      id
      name
      seasons {
        id
        seasonNumber
        name
      }
      competition {
        name
        id
        maxPlayersCount
      }
      teams {
        id
        name
        teamLogo {
          url
        }
        mascot
        secondMascot
      }
      lineUp
      teamAdmin {
        id
        firstName
        lastName
        email
      }
      playersCount
      type
    }
    seasonsCount(
      where: { competitions: { some: { name: { contains: $name } } } }
    )
  }
`;

export const GET_TEAM_PLAYERS = gql`
  query teamPlayers($id: ID!) {
    players(where: { participation: { some: { id: { in: [$id] } } } }) {
      id
      email
      firstName
      lastName
      nickname
      playerID
      phoneNumber
      hometown
      weight
      height
      position
      dateOfBirth
      secondPosition
      ability
      skill
      preferredFoot
      jerseyName
      jerseyNumber
      kitSize
      email
      verified
      paid
      age
      isCaptain
      nationalIdImage {
        url
      }
      photo {
        url
      }
    }
  }
`;

export const GET_TEAM_PLAYERS_NO_DBL = gql`
  query teamPlayers($id: ID!, $comp: String!, $ignoredSeason: String!) {
    players(
      where: {
        participation: {
          some: { id: { in: [$id] } }
          none: {
            AND: {
              name: { contains: $ignoredSeason }
              competition: { name: { contains: $comp } }
            }
          }
        }
      }
    ) {
      id
      email
      firstName
      lastName
      nickname
      playerID
      phoneNumber
      hometown
      weight
      height
      position
      dateOfBirth
      secondPosition
      ability
      skill
      preferredFoot
      jerseyName
      jerseyNumber
      kitSize
      email
      verified
      paid
      suspended
      isCaptain
      age
      photo {
        url
      }
    }
  }
`;

export const GET_PLAYERS_UNIQUE = gql`
  query getPlyers($where: PlayerWhereInput! = {}) {
    players(where: $where) {
      id
    }
  }
`;

export const GET_TEAM_UNIQUE = gql`
  query getTeam($where: TeamWhereUniqueInput!) {
    team(where: $where) {
      id
    }
  }
`;

export const GET_PARTICIPATION_UNIQUE = gql`
  query getParticipation($where: ParticipationWhereUniqueInput!) {
    participation(where: $where) {
      id
    }
  }
`;

export const GET_PLAYER = gql`
  query getPlayer($id: ID!) {
    player(where: { id: $id }) {
      id
      email
      firstName
      lastName
      nickname
      playerID
      phoneNumber
      hometown
      weight
      height
      position
      dateOfBirth
      secondPosition
      ability
      skill
      preferredFoot
      jerseyName
      jerseyNumber
      kitSize
      email
      verified
      paid
      isCaptain
      bio
      age
      paymentPlan
      photo {
        url
      }
      nationalIdImage {
        url
      }
      participation {
        id
        name
        competition {
          id
          name
        }
        seasons {
          id
          seasonNumber
          name
        }
        teams {
          id
          name
          mascot
          secondMascot
        }
        teamAdmin {
          id
          email
          firstName
          lastName
        }
        playersCount
        type
      }
    }
  }
`;

export const FETCH_APPLICATION_DATA = gql`
  query applicationData {
    competitions {
      id
      name
      seasons {
        id
        seasonNumber
        name
      }
      currentSeason {
        id
        name
        seasonNumber
      }
      disableRegistration
      disableEdits
      isTournament
      minPlayersCount
      maxPlayersCount
      isOpenForPayment
      isPublic
      logo {
        url
      }
      baseColor
      mainSportType
      textColor
      seasonDetails {
        document
      }
      leagueRules {
        document
      }
    }
    seasons {
      id
      seasonNumber
      name
      startDate
      endDate
    }
  }
`;

export const FETCH_COMPETITIONS = gql`
  query fetchCompetitions {
    competitions {
      id
      name
      disableRegistration
      disableEdits
      isTournament
      minPlayersCount
      maxPlayersCount
      isOpenForPayment
      isPublic
      currentSeason {
        id
        name
        seasonNumber
      }
      logo {
        url
      }
      baseColor
      mainSportType
      textColor
    }
  }
`;

export const GET_PARTICIPATIONS_BY_SEASON_ID = gql`
  query getParticipations($id: ID!) {
    participations(where: { seasons: { some: { id: { in: [$id] } } } }) {
      id
      name
      isVerified
      seasons {
        id
        seasonNumber
        name
      }
      teams {
        id
        name
        mascot
        secondMascot
        mascotLogo
        teamLogo {
          url
        }
      }
      teamAdmin {
        id
        email
        firstName
        lastName
      }
      playersCount
      type
    }
  }
`;

export const FETCH_LEAGUE_MATCHES = gql`
  query fetchLeagueMatches($id: ID!, $seasonId: ID!) {
    matches(
      where: {
        season: { id: { in: [$seasonId] } }
        competition: { id: { in: [$id] } }
      }
    ) {
      isMatchLive
      inMatchTime
      isMatchEnded
      id
      competition {
        name
      }
      stage
      matchDate
      actionDetails
      type
      season {
        id
        name
      }
      group
      firstHalfStartTime
      secondHalfStartTime
      homeTeamScore
      awayTeamScore
      homeTeamExtraPoints
      awayTeamExtraPoints
      penalties
      videosUrls
      homeTeam {
        id
        group
        name
        teams {
          id
          name
          teamLogo {
            url
          }
          mascotLogo
        }
      }
      awayTeam {
        id
        group
        name
        teams {
          id
          name
          teamLogo {
            url
          }
          mascotLogo
        }
      }
    }
  }
`;

export const FETCH_STANDINGS = gql`
  query fetchStandings($where: leagueTableWhereInput!) {
    leagueTables(where: $where) {
      competition {
        id
        name
      }
      season {
        id
        name
      }
      table
      topScorer
      topAssist
      topGoalie
      topCard
      topPlayer
    }
  }
`;

export const FETCH_MATCHES = gql`
  query fetchMatches(
    $where: MatchWhereInput! = {}
    $orderBy: [MatchOrderByInput!]! = []
    $take: Int
    $skip: Int! = 0
  ) {
    matches(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      isMatchLive
      inMatchTime
      isMatchEnded
      id
      stage
      matchDate
      firstHalfStartTime
      secondHalfStartTime
      homeTeamFormation
      awayTeamFormation
      homeTeamFairPlayPoints
      awayTeamFairPlayPoints
      type
      group
      videosUrls
      actionDetails
      competition {
        id
        name
      }
      homeTeamScore
      awayTeamScore
      penalties
      lineUp
      statistics
      stadium
      referee
      homeTeam {
        id
        name
        group
        seasons {
          id
          name
        }
        teams {
          id
          name
          teamLogo {
            url
          }
          mascotLogo
        }
      }
      awayTeam {
        id
        name
        seasons {
          id
          name
        }
        group
        teams {
          id
          name
          teamLogo {
            url
          }
          mascotLogo
        }
      }
    }
  }
`;

export const FETCH_MATCH_BY_ID = gql`
  query fetchMatch($id: ID!) {
    match(where: { id: $id }) {
      id
      matchDate
      homeTeamScore
      awayTeamScore
      firstHalfStartTime
      secondHalfStartTime
      homeTeamFormation
      awayTeamFormation
      homeTeamFairPlayPoints
      awayTeamFairPlayPoints
      isMatchEnded
      isMatchLive
      stage
      videosUrls
      homeTeam {
        name
        id
        teams {
          id
          name
          teamLogo {
            url
          }
          mascotLogo
        }
      }
      awayTeam {
        name
        id
        teams {
          id
          name
          teamLogo {
            url
          }
          mascotLogo
        }
      }
      competition {
        name
      }
      actionDetails
      lineUp
      statistics
      penalties
      stadium
      referee
    }
  }
`;

export const FETCH_TRANSFER_MARKET = gql`
  query fetchTM(
    $name: String!
    $transferMarketName: String!
    $firstName: String
    $lastName: String
    $take: Int!
    $skip: Int!
  ) {
    playersCount(
      where: {
        participation: {
          every: {
            OR: [
              { name: { contains: $transferMarketName } }
              { name: { not: { contains: $name } } }
            ]
          }
        }
        OR: [
          { firstName: { contains: $firstName } }
          { lastName: { contains: $lastName } }
        ]
      }
    )
    players(
      where: {
        participation: {
          every: {
            OR: [
              { name: { equals: $transferMarketName } }
              { name: { not: { contains: $name } } }
            ]
          }
        }
        OR: [
          { firstName: { contains: $firstName } }
          { lastName: { contains: $lastName } }
        ]
      }
      take: $take
      skip: $skip
      orderBy: [{ id: desc }]
    ) {
      id
      email
      firstName
      lastName
      nickname
      playerID
      phoneNumber
      hometown
      weight
      height
      position
      dateOfBirth
      secondPosition
      ability
      skill
      preferredFoot
      jerseyName
      jerseyNumber
      kitSize
      email
      verified
      paid
      isCaptain
      bio
      age
      paymentPlan
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
        teams {
          id
          name
          mascot
          secondMascot
        }
        teamAdmin {
          id
          email
          firstName
          lastName
        }
        playersCount
        type
      }
    }
  }
`;

export const FETCH_PLAYERS = gql`
  query fetchPlayers(
    $seasonId: ID!
    $compId: ID!
    $firstName: String
    $lastName: String
    $email: String
  ) {
    playersCount(
      where: {
        participation: {
          none: {
            seasons: { some: { id: { in: [$seasonId] } } }
            competition: { id: { equals: $compId } }
          }
        }
        OR: [
          { firstName: { contains: $firstName } }
          { lastName: { contains: $lastName } }
          { email: { contains: $email } }
        ]
      }
    )
    players(
      where: {
        participation: {
          none: {
            seasons: { some: { id: { in: [$seasonId] } } }
            competition: { id: { equals: $compId } }
          }
        }
        OR: [
          { firstName: { contains: $firstName } }
          { lastName: { contains: $lastName } }
          { email: { contains: $email } }
        ]
      }
    ) {
      id
      email
      firstName
      lastName

      photo {
        url
      }
      nationalIdImage {
        url
      }
    }
  }
`;

export const FETCH_H2H = gql`
  query getMatches($ids: [ID!]) {
    matches(
      where: {
        season: { id: { in: [$seasonId] } }
        homeTeam: { id: { in: ids } }
        awayTeam: { id: { in: ids } }
      }
    ) {
      id
      season {
        id
        seasonNumber
        name
      }
      isMatchEnded
      inMatchTime
      isMatchLive
      hasWithdrawnTeam
      firstHalfStartTime
      homeTeamFairPlayPoints
      awayTeamFairPlayPoints
      homeTeamScore
      awayTeamScore
      type
      group
      referee
      matchDate
      lineUp
      actionDetails
      videosUrls
      homeTeam {
        name
        id
        teams {
          name
        }
      }
      awayTeam {
        name
        id
        teams {
          name
        }
      }
      competition {
        name
        id
      }
    }
  }
`;

export const GET_AUTHENTICATED_USER = gql`
  query {
    authenticatedItem {
      ... on User {
        email
        id
        name
        role {
          name
        }
      }
    }
  }
`;

export const FETCH_DELL_COMPETITIONS = gql`
  query {
    dellCompetitons {
      awayTeam {
        id
        name
        teamLogo {
          url
        }
      }
      homeTeam {
        id
        name
        teamLogo {
          url
        }
      }
      homeTeamScore
      awayTeamScore
      homeTeamExtraPoints
      awayTeamExtraPoints
      id
      isMatchEnded
      isMatchLive
      matchDate
      stage
      group
      type
    }
  }
`;

export const GET_PRICING_PLANS = gql`
  query getPaymentPlans($compId: ID!, $seasonId: ID!) {
    paymentPlans(
      where: {
        competition: { id: { equals: $compId } }
        season: { id: { equals: $seasonId } }
      }
    ) {
      id
      name
      competition {
        id
        name
      }
      season {
        id
        name
      }
      amount
      planName
      per
      description
      currency
      count
      includes
      extraAmount
      extraAmountDescription
      uiOrder
    }
  }
`;

export const GET_PARTICIPATION_INVITES = gql`
  query getInvites($partId: ID!, $invitedBy: ID!) {
    invites(
      where: {
        participation: { id: { equals: $partId } }
        invitedBy: { id: { equals: $invitedBy } }
      }
    ) {
      id
      participation {
        id
        name
      }
      status
      player {
        id
        name
        photo {
          url
        }
        firstName
        lastName
        name
        email
        phoneNumber
        age
      }
    }
  }
`;

export const FETCH_PAYMENTS = gql`
  query ($where: PaymentWhereInput!) {
    payments(where: $where) {
      id
      amount
      currency
      isFulfilled
      pending
      success
      createdAt
      orderId
      paymentMethod
      participation {
        id
        name
        teams {
          id
          name
        }
        competition {
          id
          name
        }
      }
      plan {
        id
        name
        planName
        isInstallment
        competition {
          id
          name
        }
      }
      player {
        id
        name
        email
      }
    }
  }
`;

export const FETCH_PAYMENT_DISCOUNTS = gql`
  query fetchPaymentDiscounts($where: PaymentDiscountWhereInput = {}) {
    paymentDiscounts(where: $where) {
      id
      amount
      type
      paymentPlans {
        id
        name
      }
      maxDiscountUsage
    }
  }
`;

export const GET_PLAYERS_PUBLIC = gql`
  query teamPlayers($id: ID!) {
    players(where: { participation: { some: { id: { in: [$id] } } } }) {
      id
      firstName
      lastName
      photo {
        url
      }
      jerseyNumber
      jerseyName
    }
  }
`;

export const FETCH_PUBLIC_PLAYERS_DATA = gql`
  query fetchPlayers(
    $where: PlayerWhereInput! = {}
    $orderBy: [PlayerOrderByInput!]! = []
    $take: Int
    $skip: Int! = 0
  ) {
    players(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      firstName
      lastName
      nickname
      hometown
      weight
      height
      position
      dateOfBirth
      secondPosition
      ability
      skill
      preferredFoot
      jerseyName
      jerseyNumber
      kitSize
      age
      photo {
        url
      }
      assessment
      participation {
        id
        name
        teams {
          id
          name
          teamLogo {
            url
          }
        }
      }
    }
  }
`;

export const FETCH_ALL_PLAYERS_DATA = gql`
  query fetchPlayers(
    $where: PlayerWhereInput! = {}
    $orderBy: [PlayerOrderByInput!]! = []
    $take: Int
    $skip: Int! = 0
  ) {
    players(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      email
      firstName
      lastName
      nickname
      playerID
      phoneNumber
      hometown
      weight
      height
      position
      dateOfBirth
      secondPosition
      ability
      skill
      preferredFoot
      jerseyName
      jerseyNumber
      kitSize
      email
      verified
      paid
      isCaptain
      participation {
        id
        name
        competition {
          name
          id
        }
        teams {
          name
          id
          mascot
          mascotLogo
          secondMascot
          teamLogo {
            url
          }
        }
        seasons {
          seasonNumber
          name
        }
      }
    }
  }
`;
