/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type Arena = {
  __typename?: 'Arena';
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  maxParticipants?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  participants?: Maybe<Array<ArenaParticipant>>;
  participantsCount?: Maybe<Scalars['Int']['output']>;
  registrationDeadline?: Maybe<Scalars['DateTime']['output']>;
  season?: Maybe<Season>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};


export type ArenaParticipantsArgs = {
  cursor?: InputMaybe<ArenaParticipantWhereUniqueInput>;
  orderBy?: Array<ArenaParticipantOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ArenaParticipantWhereInput;
};


export type ArenaParticipantsCountArgs = {
  where?: ArenaParticipantWhereInput;
};

export type ArenaCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  maxParticipants?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  participants?: InputMaybe<ArenaParticipantRelateToManyForCreateInput>;
  registrationDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  season?: InputMaybe<SeasonRelateToOneForCreateInput>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type ArenaManyRelationFilter = {
  every?: InputMaybe<ArenaWhereInput>;
  none?: InputMaybe<ArenaWhereInput>;
  some?: InputMaybe<ArenaWhereInput>;
};

export type ArenaOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  endDate?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  maxParticipants?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  registrationDeadline?: InputMaybe<OrderDirection>;
  startDate?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
};

export type ArenaParticipant = {
  __typename?: 'ArenaParticipant';
  arena?: Maybe<Arena>;
  id: Scalars['ID']['output'];
  joinedAt?: Maybe<Scalars['DateTime']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type ArenaParticipantCreateInput = {
  arena?: InputMaybe<ArenaRelateToOneForCreateInput>;
  joinedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type ArenaParticipantManyRelationFilter = {
  every?: InputMaybe<ArenaParticipantWhereInput>;
  none?: InputMaybe<ArenaParticipantWhereInput>;
  some?: InputMaybe<ArenaParticipantWhereInput>;
};

export type ArenaParticipantOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  joinedAt?: InputMaybe<OrderDirection>;
  rank?: InputMaybe<OrderDirection>;
  score?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
};

export type ArenaParticipantRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ArenaParticipantWhereUniqueInput>>;
  create?: InputMaybe<Array<ArenaParticipantCreateInput>>;
};

export type ArenaParticipantRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ArenaParticipantWhereUniqueInput>>;
  create?: InputMaybe<Array<ArenaParticipantCreateInput>>;
  disconnect?: InputMaybe<Array<ArenaParticipantWhereUniqueInput>>;
  set?: InputMaybe<Array<ArenaParticipantWhereUniqueInput>>;
};

export type ArenaParticipantUpdateArgs = {
  data: ArenaParticipantUpdateInput;
  where: ArenaParticipantWhereUniqueInput;
};

export type ArenaParticipantUpdateInput = {
  arena?: InputMaybe<ArenaRelateToOneForUpdateInput>;
  joinedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type ArenaParticipantWhereInput = {
  AND?: InputMaybe<Array<ArenaParticipantWhereInput>>;
  NOT?: InputMaybe<Array<ArenaParticipantWhereInput>>;
  OR?: InputMaybe<Array<ArenaParticipantWhereInput>>;
  arena?: InputMaybe<ArenaWhereInput>;
  id?: InputMaybe<IdFilter>;
  joinedAt?: InputMaybe<DateTimeNullableFilter>;
  rank?: InputMaybe<IntNullableFilter>;
  score?: InputMaybe<IntNullableFilter>;
  status?: InputMaybe<StringNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type ArenaParticipantWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ArenaRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ArenaWhereUniqueInput>>;
  create?: InputMaybe<Array<ArenaCreateInput>>;
};

export type ArenaRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ArenaWhereUniqueInput>>;
  create?: InputMaybe<Array<ArenaCreateInput>>;
  disconnect?: InputMaybe<Array<ArenaWhereUniqueInput>>;
  set?: InputMaybe<Array<ArenaWhereUniqueInput>>;
};

export type ArenaRelateToOneForCreateInput = {
  connect?: InputMaybe<ArenaWhereUniqueInput>;
  create?: InputMaybe<ArenaCreateInput>;
};

export type ArenaRelateToOneForUpdateInput = {
  connect?: InputMaybe<ArenaWhereUniqueInput>;
  create?: InputMaybe<ArenaCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ArenaUpdateArgs = {
  data: ArenaUpdateInput;
  where: ArenaWhereUniqueInput;
};

export type ArenaUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  maxParticipants?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  participants?: InputMaybe<ArenaParticipantRelateToManyForUpdateInput>;
  registrationDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  season?: InputMaybe<SeasonRelateToOneForUpdateInput>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type ArenaWhereInput = {
  AND?: InputMaybe<Array<ArenaWhereInput>>;
  NOT?: InputMaybe<Array<ArenaWhereInput>>;
  OR?: InputMaybe<Array<ArenaWhereInput>>;
  description?: InputMaybe<StringFilter>;
  endDate?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  maxParticipants?: InputMaybe<IntNullableFilter>;
  name?: InputMaybe<StringFilter>;
  participants?: InputMaybe<ArenaParticipantManyRelationFilter>;
  registrationDeadline?: InputMaybe<DateTimeNullableFilter>;
  season?: InputMaybe<SeasonWhereInput>;
  startDate?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<StringNullableFilter>;
};

export type ArenaWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type AuthenticatedItem = User;

export type Badge = {
  __typename?: 'Badge';
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  requirements?: Maybe<Scalars['JSON']['output']>;
  userBadges?: Maybe<Array<UserBadge>>;
  userBadgesCount?: Maybe<Scalars['Int']['output']>;
};


export type BadgeUserBadgesArgs = {
  cursor?: InputMaybe<UserBadgeWhereUniqueInput>;
  orderBy?: Array<UserBadgeOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserBadgeWhereInput;
};


export type BadgeUserBadgesCountArgs = {
  where?: UserBadgeWhereInput;
};

export type BadgeCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  requirements?: InputMaybe<Scalars['JSON']['input']>;
  userBadges?: InputMaybe<UserBadgeRelateToManyForCreateInput>;
};

export type BadgeOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  icon?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isActive?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type BadgeRelateToOneForCreateInput = {
  connect?: InputMaybe<BadgeWhereUniqueInput>;
  create?: InputMaybe<BadgeCreateInput>;
};

export type BadgeRelateToOneForUpdateInput = {
  connect?: InputMaybe<BadgeWhereUniqueInput>;
  create?: InputMaybe<BadgeCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BadgeUpdateArgs = {
  data: BadgeUpdateInput;
  where: BadgeWhereUniqueInput;
};

export type BadgeUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  requirements?: InputMaybe<Scalars['JSON']['input']>;
  userBadges?: InputMaybe<UserBadgeRelateToManyForUpdateInput>;
};

export type BadgeWhereInput = {
  AND?: InputMaybe<Array<BadgeWhereInput>>;
  NOT?: InputMaybe<Array<BadgeWhereInput>>;
  OR?: InputMaybe<Array<BadgeWhereInput>>;
  description?: InputMaybe<StringFilter>;
  icon?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  isActive?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
  userBadges?: InputMaybe<UserBadgeManyRelationFilter>;
};

export type BadgeWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type BeProPlayer = {
  __typename?: 'BeProPlayer';
  ability?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  kitSize?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  paid?: Maybe<Scalars['Boolean']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<ImageFieldOutput>;
  position?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  skill?: Maybe<Scalars['String']['output']>;
};

export type BeProPlayerCreateInput = {
  ability?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  kitSize?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  paid?: InputMaybe<Scalars['Boolean']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  photo?: InputMaybe<ImageFieldInput>;
  position?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  skill?: InputMaybe<Scalars['String']['input']>;
};

export type BeProPlayerOrderByInput = {
  ability?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  firstName?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  kitSize?: InputMaybe<OrderDirection>;
  lastName?: InputMaybe<OrderDirection>;
  location?: InputMaybe<OrderDirection>;
  paid?: InputMaybe<OrderDirection>;
  phoneNumber?: InputMaybe<OrderDirection>;
  position?: InputMaybe<OrderDirection>;
  province?: InputMaybe<OrderDirection>;
  skill?: InputMaybe<OrderDirection>;
};

export type BeProPlayerUpdateArgs = {
  data: BeProPlayerUpdateInput;
  where: BeProPlayerWhereUniqueInput;
};

export type BeProPlayerUpdateInput = {
  ability?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  kitSize?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  paid?: InputMaybe<Scalars['Boolean']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  photo?: InputMaybe<ImageFieldInput>;
  position?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  skill?: InputMaybe<Scalars['String']['input']>;
};

export type BeProPlayerWhereInput = {
  AND?: InputMaybe<Array<BeProPlayerWhereInput>>;
  NOT?: InputMaybe<Array<BeProPlayerWhereInput>>;
  OR?: InputMaybe<Array<BeProPlayerWhereInput>>;
  ability?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  kitSize?: InputMaybe<StringNullableFilter>;
  lastName?: InputMaybe<StringFilter>;
  location?: InputMaybe<StringFilter>;
  paid?: InputMaybe<BooleanFilter>;
  phoneNumber?: InputMaybe<StringFilter>;
  position?: InputMaybe<StringNullableFilter>;
  province?: InputMaybe<StringNullableFilter>;
  skill?: InputMaybe<StringNullableFilter>;
};

export type BeProPlayerWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilter>;
};

export type Community = {
  __typename?: 'Community';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  leaderboards?: Maybe<Array<Leaderboard>>;
  leaderboardsCount?: Maybe<Scalars['Int']['output']>;
  memberships?: Maybe<Array<CommunityMembership>>;
  membershipsCount?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  seasons?: Maybe<Array<Season>>;
  seasonsCount?: Maybe<Scalars['Int']['output']>;
};


export type CommunityLeaderboardsArgs = {
  cursor?: InputMaybe<LeaderboardWhereUniqueInput>;
  orderBy?: Array<LeaderboardOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LeaderboardWhereInput;
};


export type CommunityLeaderboardsCountArgs = {
  where?: LeaderboardWhereInput;
};


export type CommunityMembershipsArgs = {
  cursor?: InputMaybe<CommunityMembershipWhereUniqueInput>;
  orderBy?: Array<CommunityMembershipOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CommunityMembershipWhereInput;
};


export type CommunityMembershipsCountArgs = {
  where?: CommunityMembershipWhereInput;
};


export type CommunitySeasonsArgs = {
  cursor?: InputMaybe<SeasonWhereUniqueInput>;
  orderBy?: Array<SeasonOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: SeasonWhereInput;
};


export type CommunitySeasonsCountArgs = {
  where?: SeasonWhereInput;
};

export type CommunityCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  leaderboards?: InputMaybe<LeaderboardRelateToManyForCreateInput>;
  memberships?: InputMaybe<CommunityMembershipRelateToManyForCreateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  seasons?: InputMaybe<SeasonRelateToManyForCreateInput>;
};

export type CommunityMembership = {
  __typename?: 'CommunityMembership';
  community?: Maybe<Community>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  joinedAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type CommunityMembershipCreateInput = {
  community?: InputMaybe<CommunityRelateToOneForCreateInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  joinedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type CommunityMembershipManyRelationFilter = {
  every?: InputMaybe<CommunityMembershipWhereInput>;
  none?: InputMaybe<CommunityMembershipWhereInput>;
  some?: InputMaybe<CommunityMembershipWhereInput>;
};

export type CommunityMembershipOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  isActive?: InputMaybe<OrderDirection>;
  joinedAt?: InputMaybe<OrderDirection>;
  role?: InputMaybe<OrderDirection>;
};

export type CommunityMembershipRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CommunityMembershipWhereUniqueInput>>;
  create?: InputMaybe<Array<CommunityMembershipCreateInput>>;
};

export type CommunityMembershipRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CommunityMembershipWhereUniqueInput>>;
  create?: InputMaybe<Array<CommunityMembershipCreateInput>>;
  disconnect?: InputMaybe<Array<CommunityMembershipWhereUniqueInput>>;
  set?: InputMaybe<Array<CommunityMembershipWhereUniqueInput>>;
};

export type CommunityMembershipUpdateArgs = {
  data: CommunityMembershipUpdateInput;
  where: CommunityMembershipWhereUniqueInput;
};

export type CommunityMembershipUpdateInput = {
  community?: InputMaybe<CommunityRelateToOneForUpdateInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  joinedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type CommunityMembershipWhereInput = {
  AND?: InputMaybe<Array<CommunityMembershipWhereInput>>;
  NOT?: InputMaybe<Array<CommunityMembershipWhereInput>>;
  OR?: InputMaybe<Array<CommunityMembershipWhereInput>>;
  community?: InputMaybe<CommunityWhereInput>;
  id?: InputMaybe<IdFilter>;
  isActive?: InputMaybe<BooleanFilter>;
  joinedAt?: InputMaybe<DateTimeNullableFilter>;
  role?: InputMaybe<StringNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type CommunityMembershipWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CommunityOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isActive?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type CommunityRelateToOneForCreateInput = {
  connect?: InputMaybe<CommunityWhereUniqueInput>;
  create?: InputMaybe<CommunityCreateInput>;
};

export type CommunityRelateToOneForUpdateInput = {
  connect?: InputMaybe<CommunityWhereUniqueInput>;
  create?: InputMaybe<CommunityCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CommunityUpdateArgs = {
  data: CommunityUpdateInput;
  where: CommunityWhereUniqueInput;
};

export type CommunityUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  leaderboards?: InputMaybe<LeaderboardRelateToManyForUpdateInput>;
  memberships?: InputMaybe<CommunityMembershipRelateToManyForUpdateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  seasons?: InputMaybe<SeasonRelateToManyForUpdateInput>;
};

export type CommunityWhereInput = {
  AND?: InputMaybe<Array<CommunityWhereInput>>;
  NOT?: InputMaybe<Array<CommunityWhereInput>>;
  OR?: InputMaybe<Array<CommunityWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  isActive?: InputMaybe<BooleanFilter>;
  leaderboards?: InputMaybe<LeaderboardManyRelationFilter>;
  memberships?: InputMaybe<CommunityMembershipManyRelationFilter>;
  name?: InputMaybe<StringFilter>;
  seasons?: InputMaybe<SeasonManyRelationFilter>;
};

export type CommunityWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Competition = {
  __typename?: 'Competition';
  baseColor?: Maybe<Scalars['String']['output']>;
  currentSeason?: Maybe<Season>;
  disableEdits?: Maybe<Scalars['Boolean']['output']>;
  disableRegistration?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  isOpenForPayment?: Maybe<Scalars['Boolean']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  isTournament?: Maybe<Scalars['Boolean']['output']>;
  leagueRules?: Maybe<Competition_LeagueRules_Document>;
  logo?: Maybe<ImageFieldOutput>;
  mainSportType?: Maybe<Scalars['String']['output']>;
  maxPlayersCount?: Maybe<Scalars['Int']['output']>;
  minPlayersCount?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  seasonDetails?: Maybe<Competition_SeasonDetails_Document>;
  seasons?: Maybe<Array<Season>>;
  seasonsCount?: Maybe<Scalars['Int']['output']>;
  textColor?: Maybe<Scalars['String']['output']>;
};


export type CompetitionSeasonsArgs = {
  cursor?: InputMaybe<SeasonWhereUniqueInput>;
  orderBy?: Array<SeasonOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: SeasonWhereInput;
};


export type CompetitionSeasonsCountArgs = {
  where?: SeasonWhereInput;
};

export type CompetitionCreateInput = {
  baseColor?: InputMaybe<Scalars['String']['input']>;
  currentSeason?: InputMaybe<SeasonRelateToOneForCreateInput>;
  disableEdits?: InputMaybe<Scalars['Boolean']['input']>;
  disableRegistration?: InputMaybe<Scalars['Boolean']['input']>;
  isOpenForPayment?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  isTournament?: InputMaybe<Scalars['Boolean']['input']>;
  leagueRules?: InputMaybe<Scalars['JSON']['input']>;
  logo?: InputMaybe<ImageFieldInput>;
  mainSportType?: InputMaybe<Scalars['String']['input']>;
  maxPlayersCount?: InputMaybe<Scalars['Int']['input']>;
  minPlayersCount?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  seasonDetails?: InputMaybe<Scalars['JSON']['input']>;
  seasons?: InputMaybe<SeasonRelateToManyForCreateInput>;
  textColor?: InputMaybe<Scalars['String']['input']>;
};

export type CompetitionManyRelationFilter = {
  every?: InputMaybe<CompetitionWhereInput>;
  none?: InputMaybe<CompetitionWhereInput>;
  some?: InputMaybe<CompetitionWhereInput>;
};

export type CompetitionOrderByInput = {
  baseColor?: InputMaybe<OrderDirection>;
  disableEdits?: InputMaybe<OrderDirection>;
  disableRegistration?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isOpenForPayment?: InputMaybe<OrderDirection>;
  isPublic?: InputMaybe<OrderDirection>;
  isTournament?: InputMaybe<OrderDirection>;
  mainSportType?: InputMaybe<OrderDirection>;
  maxPlayersCount?: InputMaybe<OrderDirection>;
  minPlayersCount?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  textColor?: InputMaybe<OrderDirection>;
};

export type CompetitionRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CompetitionWhereUniqueInput>>;
  create?: InputMaybe<Array<CompetitionCreateInput>>;
};

export type CompetitionRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CompetitionWhereUniqueInput>>;
  create?: InputMaybe<Array<CompetitionCreateInput>>;
  disconnect?: InputMaybe<Array<CompetitionWhereUniqueInput>>;
  set?: InputMaybe<Array<CompetitionWhereUniqueInput>>;
};

export type CompetitionRelateToOneForCreateInput = {
  connect?: InputMaybe<CompetitionWhereUniqueInput>;
  create?: InputMaybe<CompetitionCreateInput>;
};

export type CompetitionRelateToOneForUpdateInput = {
  connect?: InputMaybe<CompetitionWhereUniqueInput>;
  create?: InputMaybe<CompetitionCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CompetitionUpdateArgs = {
  data: CompetitionUpdateInput;
  where: CompetitionWhereUniqueInput;
};

export type CompetitionUpdateInput = {
  baseColor?: InputMaybe<Scalars['String']['input']>;
  currentSeason?: InputMaybe<SeasonRelateToOneForUpdateInput>;
  disableEdits?: InputMaybe<Scalars['Boolean']['input']>;
  disableRegistration?: InputMaybe<Scalars['Boolean']['input']>;
  isOpenForPayment?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  isTournament?: InputMaybe<Scalars['Boolean']['input']>;
  leagueRules?: InputMaybe<Scalars['JSON']['input']>;
  logo?: InputMaybe<ImageFieldInput>;
  mainSportType?: InputMaybe<Scalars['String']['input']>;
  maxPlayersCount?: InputMaybe<Scalars['Int']['input']>;
  minPlayersCount?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  seasonDetails?: InputMaybe<Scalars['JSON']['input']>;
  seasons?: InputMaybe<SeasonRelateToManyForUpdateInput>;
  textColor?: InputMaybe<Scalars['String']['input']>;
};

export type CompetitionWhereInput = {
  AND?: InputMaybe<Array<CompetitionWhereInput>>;
  NOT?: InputMaybe<Array<CompetitionWhereInput>>;
  OR?: InputMaybe<Array<CompetitionWhereInput>>;
  baseColor?: InputMaybe<StringFilter>;
  currentSeason?: InputMaybe<SeasonWhereInput>;
  disableEdits?: InputMaybe<BooleanFilter>;
  disableRegistration?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<IdFilter>;
  isOpenForPayment?: InputMaybe<BooleanFilter>;
  isPublic?: InputMaybe<BooleanFilter>;
  isTournament?: InputMaybe<BooleanFilter>;
  mainSportType?: InputMaybe<StringFilter>;
  maxPlayersCount?: InputMaybe<IntNullableFilter>;
  minPlayersCount?: InputMaybe<IntNullableFilter>;
  name?: InputMaybe<StringFilter>;
  seasons?: InputMaybe<SeasonManyRelationFilter>;
  textColor?: InputMaybe<StringFilter>;
};

export type CompetitionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Competition_LeagueRules_Document = {
  __typename?: 'Competition_leagueRules_Document';
  document: Scalars['JSON']['output'];
};


export type Competition_LeagueRules_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type Competition_SeasonDetails_Document = {
  __typename?: 'Competition_seasonDetails_Document';
  document: Scalars['JSON']['output'];
};


export type Competition_SeasonDetails_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type DashAdmin = {
  __typename?: 'DashAdmin';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<PasswordState>;
  role?: Maybe<Array<Role>>;
  roleCount?: Maybe<Scalars['Int']['output']>;
};


export type DashAdminRoleArgs = {
  cursor?: InputMaybe<RoleWhereUniqueInput>;
  orderBy?: Array<RoleOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: RoleWhereInput;
};


export type DashAdminRoleCountArgs = {
  where?: RoleWhereInput;
};

export type DashAdminCreateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<RoleRelateToManyForCreateInput>;
};

export type DashAdminManyRelationFilter = {
  every?: InputMaybe<DashAdminWhereInput>;
  none?: InputMaybe<DashAdminWhereInput>;
  some?: InputMaybe<DashAdminWhereInput>;
};

export type DashAdminOrderByInput = {
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type DashAdminRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<DashAdminWhereUniqueInput>>;
  create?: InputMaybe<Array<DashAdminCreateInput>>;
};

export type DashAdminRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<DashAdminWhereUniqueInput>>;
  create?: InputMaybe<Array<DashAdminCreateInput>>;
  disconnect?: InputMaybe<Array<DashAdminWhereUniqueInput>>;
  set?: InputMaybe<Array<DashAdminWhereUniqueInput>>;
};

export type DashAdminUpdateArgs = {
  data: DashAdminUpdateInput;
  where: DashAdminWhereUniqueInput;
};

export type DashAdminUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<RoleRelateToManyForUpdateInput>;
};

export type DashAdminWhereInput = {
  AND?: InputMaybe<Array<DashAdminWhereInput>>;
  NOT?: InputMaybe<Array<DashAdminWhereInput>>;
  OR?: InputMaybe<Array<DashAdminWhereInput>>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  role?: InputMaybe<RoleManyRelationFilter>;
};

export type DashAdminWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DellCompetiton = {
  __typename?: 'DellCompetiton';
  awayTeam?: Maybe<Team>;
  awayTeamExtraPoints?: Maybe<Scalars['Int']['output']>;
  awayTeamScore?: Maybe<Scalars['Int']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  group?: Maybe<Scalars['String']['output']>;
  homeTeam?: Maybe<Team>;
  homeTeamExtraPoints?: Maybe<Scalars['Int']['output']>;
  homeTeamScore?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  isMatchEnded?: Maybe<Scalars['Boolean']['output']>;
  isMatchLive?: Maybe<Scalars['Boolean']['output']>;
  matchDate?: Maybe<Scalars['DateTime']['output']>;
  stage?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type DellCompetitonCreateInput = {
  awayTeam?: InputMaybe<TeamRelateToOneForCreateInput>;
  awayTeamExtraPoints?: InputMaybe<Scalars['Int']['input']>;
  awayTeamScore?: InputMaybe<Scalars['Int']['input']>;
  comments?: InputMaybe<Scalars['String']['input']>;
  group?: InputMaybe<Scalars['String']['input']>;
  homeTeam?: InputMaybe<TeamRelateToOneForCreateInput>;
  homeTeamExtraPoints?: InputMaybe<Scalars['Int']['input']>;
  homeTeamScore?: InputMaybe<Scalars['Int']['input']>;
  isMatchEnded?: InputMaybe<Scalars['Boolean']['input']>;
  isMatchLive?: InputMaybe<Scalars['Boolean']['input']>;
  matchDate?: InputMaybe<Scalars['DateTime']['input']>;
  stage?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type DellCompetitonOrderByInput = {
  awayTeamExtraPoints?: InputMaybe<OrderDirection>;
  awayTeamScore?: InputMaybe<OrderDirection>;
  comments?: InputMaybe<OrderDirection>;
  group?: InputMaybe<OrderDirection>;
  homeTeamExtraPoints?: InputMaybe<OrderDirection>;
  homeTeamScore?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isMatchEnded?: InputMaybe<OrderDirection>;
  isMatchLive?: InputMaybe<OrderDirection>;
  matchDate?: InputMaybe<OrderDirection>;
  stage?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
};

export type DellCompetitonUpdateArgs = {
  data: DellCompetitonUpdateInput;
  where: DellCompetitonWhereUniqueInput;
};

export type DellCompetitonUpdateInput = {
  awayTeam?: InputMaybe<TeamRelateToOneForUpdateInput>;
  awayTeamExtraPoints?: InputMaybe<Scalars['Int']['input']>;
  awayTeamScore?: InputMaybe<Scalars['Int']['input']>;
  comments?: InputMaybe<Scalars['String']['input']>;
  group?: InputMaybe<Scalars['String']['input']>;
  homeTeam?: InputMaybe<TeamRelateToOneForUpdateInput>;
  homeTeamExtraPoints?: InputMaybe<Scalars['Int']['input']>;
  homeTeamScore?: InputMaybe<Scalars['Int']['input']>;
  isMatchEnded?: InputMaybe<Scalars['Boolean']['input']>;
  isMatchLive?: InputMaybe<Scalars['Boolean']['input']>;
  matchDate?: InputMaybe<Scalars['DateTime']['input']>;
  stage?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type DellCompetitonWhereInput = {
  AND?: InputMaybe<Array<DellCompetitonWhereInput>>;
  NOT?: InputMaybe<Array<DellCompetitonWhereInput>>;
  OR?: InputMaybe<Array<DellCompetitonWhereInput>>;
  awayTeam?: InputMaybe<TeamWhereInput>;
  awayTeamExtraPoints?: InputMaybe<IntNullableFilter>;
  awayTeamScore?: InputMaybe<IntNullableFilter>;
  comments?: InputMaybe<StringFilter>;
  group?: InputMaybe<StringNullableFilter>;
  homeTeam?: InputMaybe<TeamWhereInput>;
  homeTeamExtraPoints?: InputMaybe<IntNullableFilter>;
  homeTeamScore?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IdFilter>;
  isMatchEnded?: InputMaybe<BooleanFilter>;
  isMatchLive?: InputMaybe<BooleanFilter>;
  matchDate?: InputMaybe<DateTimeNullableFilter>;
  stage?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<StringNullableFilter>;
};

export type DellCompetitonWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type HomePage = {
  __typename?: 'HomePage';
  about?: Maybe<Array<Image>>;
  aboutCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  partners?: Maybe<Array<Partner>>;
  partnersCount?: Maybe<Scalars['Int']['output']>;
  slidesContent?: Maybe<Scalars['JSON']['output']>;
  slidesImages?: Maybe<Array<Image>>;
  slidesImagesCount?: Maybe<Scalars['Int']['output']>;
};


export type HomePageAboutArgs = {
  cursor?: InputMaybe<ImageWhereUniqueInput>;
  orderBy?: Array<ImageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ImageWhereInput;
};


export type HomePageAboutCountArgs = {
  where?: ImageWhereInput;
};


export type HomePagePartnersArgs = {
  cursor?: InputMaybe<PartnerWhereUniqueInput>;
  orderBy?: Array<PartnerOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PartnerWhereInput;
};


export type HomePagePartnersCountArgs = {
  where?: PartnerWhereInput;
};


export type HomePageSlidesImagesArgs = {
  cursor?: InputMaybe<ImageWhereUniqueInput>;
  orderBy?: Array<ImageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ImageWhereInput;
};


export type HomePageSlidesImagesCountArgs = {
  where?: ImageWhereInput;
};

export type HomePageCreateInput = {
  about?: InputMaybe<ImageRelateToManyForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  partners?: InputMaybe<PartnerRelateToManyForCreateInput>;
  slidesContent?: InputMaybe<Scalars['JSON']['input']>;
  slidesImages?: InputMaybe<ImageRelateToManyForCreateInput>;
};

export type HomePageOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
};

export type HomePageUpdateArgs = {
  data: HomePageUpdateInput;
  where?: HomePageWhereUniqueInput;
};

export type HomePageUpdateInput = {
  about?: InputMaybe<ImageRelateToManyForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  partners?: InputMaybe<PartnerRelateToManyForUpdateInput>;
  slidesContent?: InputMaybe<Scalars['JSON']['input']>;
  slidesImages?: InputMaybe<ImageRelateToManyForUpdateInput>;
};

export type HomePageWhereInput = {
  AND?: InputMaybe<Array<HomePageWhereInput>>;
  NOT?: InputMaybe<Array<HomePageWhereInput>>;
  OR?: InputMaybe<Array<HomePageWhereInput>>;
  about?: InputMaybe<ImageManyRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  partners?: InputMaybe<PartnerManyRelationFilter>;
  slidesImages?: InputMaybe<ImageManyRelationFilter>;
};

export type HomePageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Image = {
  __typename?: 'Image';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<ImageFieldOutput>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ImageCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum ImageExtension {
  Gif = 'gif',
  Jpg = 'jpg',
  Png = 'png',
  Webp = 'webp'
}

export type ImageFieldInput = {
  upload: Scalars['Upload']['input'];
};

export type ImageFieldOutput = {
  __typename?: 'ImageFieldOutput';
  extension: ImageExtension;
  filesize: Scalars['Int']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type ImageManyRelationFilter = {
  every?: InputMaybe<ImageWhereInput>;
  none?: InputMaybe<ImageWhereInput>;
  some?: InputMaybe<ImageWhereInput>;
};

export type ImageOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type ImageRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  create?: InputMaybe<Array<ImageCreateInput>>;
};

export type ImageRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  create?: InputMaybe<Array<ImageCreateInput>>;
  disconnect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  set?: InputMaybe<Array<ImageWhereUniqueInput>>;
};

export type ImageUpdateArgs = {
  data: ImageUpdateInput;
  where: ImageWhereUniqueInput;
};

export type ImageUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ImageWhereInput = {
  AND?: InputMaybe<Array<ImageWhereInput>>;
  NOT?: InputMaybe<Array<ImageWhereInput>>;
  OR?: InputMaybe<Array<ImageWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  title?: InputMaybe<StringFilter>;
};

export type ImageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Invite = {
  __typename?: 'Invite';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  invitedBy?: Maybe<Player>;
  participation?: Maybe<Participation>;
  player?: Maybe<Player>;
  status?: Maybe<Scalars['String']['output']>;
};

export type InviteCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  invitedBy?: InputMaybe<PlayerRelateToOneForCreateInput>;
  participation?: InputMaybe<ParticipationRelateToOneForCreateInput>;
  player?: InputMaybe<PlayerRelateToOneForCreateInput>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type InviteOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
};

export type InviteUpdateArgs = {
  data: InviteUpdateInput;
  where: InviteWhereUniqueInput;
};

export type InviteUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  invitedBy?: InputMaybe<PlayerRelateToOneForUpdateInput>;
  participation?: InputMaybe<ParticipationRelateToOneForUpdateInput>;
  player?: InputMaybe<PlayerRelateToOneForUpdateInput>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type InviteWhereInput = {
  AND?: InputMaybe<Array<InviteWhereInput>>;
  NOT?: InputMaybe<Array<InviteWhereInput>>;
  OR?: InputMaybe<Array<InviteWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  invitedBy?: InputMaybe<PlayerWhereInput>;
  participation?: InputMaybe<ParticipationWhereInput>;
  player?: InputMaybe<PlayerWhereInput>;
  status?: InputMaybe<StringNullableFilter>;
};

export type InviteWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String']['input'];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: 'KeystoneAdminUIFieldGroupMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars['String']['output'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fieldMeta?: Maybe<Scalars['JSON']['output']>;
  isFilterable: Scalars['Boolean']['output'];
  isNonNull?: Maybe<Array<KeystoneAdminUiFieldMetaIsNonNull>>;
  isOrderable: Scalars['Boolean']['output'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String']['output'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String']['output'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int']['output'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export enum KeystoneAdminUiFieldMetaIsNonNull {
  Create = 'create',
  Read = 'read',
  Update = 'update'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read'
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = 'form',
  Sidebar = 'sidebar'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars['Boolean']['output'];
  hideDelete: Scalars['Boolean']['output'];
  initialColumns: Array<Scalars['String']['output']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean']['output'];
  isSingleton: Scalars['Boolean']['output'];
  itemQueryName: Scalars['String']['output'];
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
  labelField: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  pageSize: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  plural: Scalars['String']['output'];
  singular: Scalars['String']['output'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String']['output'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type Leaderboard = {
  __typename?: 'Leaderboard';
  community?: Maybe<Community>;
  description?: Maybe<Scalars['String']['output']>;
  entries?: Maybe<Array<LeaderboardEntry>>;
  entriesCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  season?: Maybe<Season>;
};


export type LeaderboardEntriesArgs = {
  cursor?: InputMaybe<LeaderboardEntryWhereUniqueInput>;
  orderBy?: Array<LeaderboardEntryOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LeaderboardEntryWhereInput;
};


export type LeaderboardEntriesCountArgs = {
  where?: LeaderboardEntryWhereInput;
};

export type LeaderboardCreateInput = {
  community?: InputMaybe<CommunityRelateToOneForCreateInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  entries?: InputMaybe<LeaderboardEntryRelateToManyForCreateInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<SeasonRelateToOneForCreateInput>;
};

export type LeaderboardEntry = {
  __typename?: 'LeaderboardEntry';
  id: Scalars['ID']['output'];
  leaderboard?: Maybe<Leaderboard>;
  rank?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type LeaderboardEntryCreateInput = {
  leaderboard?: InputMaybe<LeaderboardRelateToOneForCreateInput>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type LeaderboardEntryManyRelationFilter = {
  every?: InputMaybe<LeaderboardEntryWhereInput>;
  none?: InputMaybe<LeaderboardEntryWhereInput>;
  some?: InputMaybe<LeaderboardEntryWhereInput>;
};

export type LeaderboardEntryOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  rank?: InputMaybe<OrderDirection>;
  score?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type LeaderboardEntryRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<LeaderboardEntryWhereUniqueInput>>;
  create?: InputMaybe<Array<LeaderboardEntryCreateInput>>;
};

export type LeaderboardEntryRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<LeaderboardEntryWhereUniqueInput>>;
  create?: InputMaybe<Array<LeaderboardEntryCreateInput>>;
  disconnect?: InputMaybe<Array<LeaderboardEntryWhereUniqueInput>>;
  set?: InputMaybe<Array<LeaderboardEntryWhereUniqueInput>>;
};

export type LeaderboardEntryUpdateArgs = {
  data: LeaderboardEntryUpdateInput;
  where: LeaderboardEntryWhereUniqueInput;
};

export type LeaderboardEntryUpdateInput = {
  leaderboard?: InputMaybe<LeaderboardRelateToOneForUpdateInput>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type LeaderboardEntryWhereInput = {
  AND?: InputMaybe<Array<LeaderboardEntryWhereInput>>;
  NOT?: InputMaybe<Array<LeaderboardEntryWhereInput>>;
  OR?: InputMaybe<Array<LeaderboardEntryWhereInput>>;
  id?: InputMaybe<IdFilter>;
  leaderboard?: InputMaybe<LeaderboardWhereInput>;
  rank?: InputMaybe<IntFilter>;
  score?: InputMaybe<IntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type LeaderboardEntryWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type LeaderboardManyRelationFilter = {
  every?: InputMaybe<LeaderboardWhereInput>;
  none?: InputMaybe<LeaderboardWhereInput>;
  some?: InputMaybe<LeaderboardWhereInput>;
};

export type LeaderboardOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isActive?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type LeaderboardRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<LeaderboardWhereUniqueInput>>;
  create?: InputMaybe<Array<LeaderboardCreateInput>>;
};

export type LeaderboardRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<LeaderboardWhereUniqueInput>>;
  create?: InputMaybe<Array<LeaderboardCreateInput>>;
  disconnect?: InputMaybe<Array<LeaderboardWhereUniqueInput>>;
  set?: InputMaybe<Array<LeaderboardWhereUniqueInput>>;
};

export type LeaderboardRelateToOneForCreateInput = {
  connect?: InputMaybe<LeaderboardWhereUniqueInput>;
  create?: InputMaybe<LeaderboardCreateInput>;
};

export type LeaderboardRelateToOneForUpdateInput = {
  connect?: InputMaybe<LeaderboardWhereUniqueInput>;
  create?: InputMaybe<LeaderboardCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LeaderboardUpdateArgs = {
  data: LeaderboardUpdateInput;
  where: LeaderboardWhereUniqueInput;
};

export type LeaderboardUpdateInput = {
  community?: InputMaybe<CommunityRelateToOneForUpdateInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  entries?: InputMaybe<LeaderboardEntryRelateToManyForUpdateInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<SeasonRelateToOneForUpdateInput>;
};

export type LeaderboardWhereInput = {
  AND?: InputMaybe<Array<LeaderboardWhereInput>>;
  NOT?: InputMaybe<Array<LeaderboardWhereInput>>;
  OR?: InputMaybe<Array<LeaderboardWhereInput>>;
  community?: InputMaybe<CommunityWhereInput>;
  description?: InputMaybe<StringFilter>;
  entries?: InputMaybe<LeaderboardEntryManyRelationFilter>;
  id?: InputMaybe<IdFilter>;
  isActive?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
  season?: InputMaybe<SeasonWhereInput>;
};

export type LeaderboardWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Match = {
  __typename?: 'Match';
  actionDetails?: Maybe<Scalars['JSON']['output']>;
  awayTeam?: Maybe<Participation>;
  awayTeamExtraPoints?: Maybe<Scalars['Int']['output']>;
  awayTeamFairPlayPoints?: Maybe<Scalars['Boolean']['output']>;
  awayTeamFormation?: Maybe<Scalars['String']['output']>;
  awayTeamScore?: Maybe<Scalars['Int']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  competition?: Maybe<Competition>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  exportMatchScoreSheet?: Maybe<Scalars['JSON']['output']>;
  firstHalfStartTime?: Maybe<Scalars['DateTime']['output']>;
  group?: Maybe<Scalars['String']['output']>;
  hasWithdrawnTeam?: Maybe<Scalars['Boolean']['output']>;
  homeTeam?: Maybe<Participation>;
  homeTeamExtraPoints?: Maybe<Scalars['Int']['output']>;
  homeTeamFairPlayPoints?: Maybe<Scalars['Boolean']['output']>;
  homeTeamFormation?: Maybe<Scalars['String']['output']>;
  homeTeamScore?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  inMatchTime?: Maybe<Scalars['String']['output']>;
  isMatchEnded?: Maybe<Scalars['Boolean']['output']>;
  isMatchLive?: Maybe<Scalars['Boolean']['output']>;
  lineUp?: Maybe<Scalars['JSON']['output']>;
  lineupCountPerTeam?: Maybe<Scalars['Int']['output']>;
  matchDate?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  penalties?: Maybe<Scalars['JSON']['output']>;
  referee?: Maybe<Scalars['String']['output']>;
  season?: Maybe<Season>;
  secondHalfStartTime?: Maybe<Scalars['DateTime']['output']>;
  stadium?: Maybe<Scalars['String']['output']>;
  stage?: Maybe<Scalars['String']['output']>;
  statistics?: Maybe<Scalars['JSON']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  videosUrls?: Maybe<Scalars['String']['output']>;
};

export type MatchCreateInput = {
  actionDetails?: InputMaybe<Scalars['JSON']['input']>;
  awayTeam?: InputMaybe<ParticipationRelateToOneForCreateInput>;
  awayTeamExtraPoints?: InputMaybe<Scalars['Int']['input']>;
  awayTeamFairPlayPoints?: InputMaybe<Scalars['Boolean']['input']>;
  awayTeamFormation?: InputMaybe<Scalars['String']['input']>;
  awayTeamScore?: InputMaybe<Scalars['Int']['input']>;
  comments?: InputMaybe<Scalars['String']['input']>;
  competition?: InputMaybe<CompetitionRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstHalfStartTime?: InputMaybe<Scalars['DateTime']['input']>;
  group?: InputMaybe<Scalars['String']['input']>;
  hasWithdrawnTeam?: InputMaybe<Scalars['Boolean']['input']>;
  homeTeam?: InputMaybe<ParticipationRelateToOneForCreateInput>;
  homeTeamExtraPoints?: InputMaybe<Scalars['Int']['input']>;
  homeTeamFairPlayPoints?: InputMaybe<Scalars['Boolean']['input']>;
  homeTeamFormation?: InputMaybe<Scalars['String']['input']>;
  homeTeamScore?: InputMaybe<Scalars['Int']['input']>;
  inMatchTime?: InputMaybe<Scalars['String']['input']>;
  isMatchEnded?: InputMaybe<Scalars['Boolean']['input']>;
  isMatchLive?: InputMaybe<Scalars['Boolean']['input']>;
  lineUp?: InputMaybe<Scalars['JSON']['input']>;
  lineupCountPerTeam?: InputMaybe<Scalars['Int']['input']>;
  matchDate?: InputMaybe<Scalars['DateTime']['input']>;
  penalties?: InputMaybe<Scalars['JSON']['input']>;
  referee?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<SeasonRelateToOneForCreateInput>;
  secondHalfStartTime?: InputMaybe<Scalars['DateTime']['input']>;
  stadium?: InputMaybe<Scalars['String']['input']>;
  stage?: InputMaybe<Scalars['String']['input']>;
  statistics?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  videosUrls?: InputMaybe<Scalars['String']['input']>;
};

export type MatchOrderByInput = {
  awayTeamExtraPoints?: InputMaybe<OrderDirection>;
  awayTeamFairPlayPoints?: InputMaybe<OrderDirection>;
  awayTeamFormation?: InputMaybe<OrderDirection>;
  awayTeamScore?: InputMaybe<OrderDirection>;
  comments?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  firstHalfStartTime?: InputMaybe<OrderDirection>;
  group?: InputMaybe<OrderDirection>;
  hasWithdrawnTeam?: InputMaybe<OrderDirection>;
  homeTeamExtraPoints?: InputMaybe<OrderDirection>;
  homeTeamFairPlayPoints?: InputMaybe<OrderDirection>;
  homeTeamFormation?: InputMaybe<OrderDirection>;
  homeTeamScore?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  inMatchTime?: InputMaybe<OrderDirection>;
  isMatchEnded?: InputMaybe<OrderDirection>;
  isMatchLive?: InputMaybe<OrderDirection>;
  lineupCountPerTeam?: InputMaybe<OrderDirection>;
  matchDate?: InputMaybe<OrderDirection>;
  referee?: InputMaybe<OrderDirection>;
  secondHalfStartTime?: InputMaybe<OrderDirection>;
  stadium?: InputMaybe<OrderDirection>;
  stage?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
  videosUrls?: InputMaybe<OrderDirection>;
};

export type MatchRelateToOneForCreateInput = {
  connect?: InputMaybe<MatchWhereUniqueInput>;
  create?: InputMaybe<MatchCreateInput>;
};

export type MatchRelateToOneForUpdateInput = {
  connect?: InputMaybe<MatchWhereUniqueInput>;
  create?: InputMaybe<MatchCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MatchUpdateArgs = {
  data: MatchUpdateInput;
  where: MatchWhereUniqueInput;
};

export type MatchUpdateInput = {
  actionDetails?: InputMaybe<Scalars['JSON']['input']>;
  awayTeam?: InputMaybe<ParticipationRelateToOneForUpdateInput>;
  awayTeamExtraPoints?: InputMaybe<Scalars['Int']['input']>;
  awayTeamFairPlayPoints?: InputMaybe<Scalars['Boolean']['input']>;
  awayTeamFormation?: InputMaybe<Scalars['String']['input']>;
  awayTeamScore?: InputMaybe<Scalars['Int']['input']>;
  comments?: InputMaybe<Scalars['String']['input']>;
  competition?: InputMaybe<CompetitionRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstHalfStartTime?: InputMaybe<Scalars['DateTime']['input']>;
  group?: InputMaybe<Scalars['String']['input']>;
  hasWithdrawnTeam?: InputMaybe<Scalars['Boolean']['input']>;
  homeTeam?: InputMaybe<ParticipationRelateToOneForUpdateInput>;
  homeTeamExtraPoints?: InputMaybe<Scalars['Int']['input']>;
  homeTeamFairPlayPoints?: InputMaybe<Scalars['Boolean']['input']>;
  homeTeamFormation?: InputMaybe<Scalars['String']['input']>;
  homeTeamScore?: InputMaybe<Scalars['Int']['input']>;
  inMatchTime?: InputMaybe<Scalars['String']['input']>;
  isMatchEnded?: InputMaybe<Scalars['Boolean']['input']>;
  isMatchLive?: InputMaybe<Scalars['Boolean']['input']>;
  lineUp?: InputMaybe<Scalars['JSON']['input']>;
  lineupCountPerTeam?: InputMaybe<Scalars['Int']['input']>;
  matchDate?: InputMaybe<Scalars['DateTime']['input']>;
  penalties?: InputMaybe<Scalars['JSON']['input']>;
  referee?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<SeasonRelateToOneForUpdateInput>;
  secondHalfStartTime?: InputMaybe<Scalars['DateTime']['input']>;
  stadium?: InputMaybe<Scalars['String']['input']>;
  stage?: InputMaybe<Scalars['String']['input']>;
  statistics?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  videosUrls?: InputMaybe<Scalars['String']['input']>;
};

export type MatchWhereInput = {
  AND?: InputMaybe<Array<MatchWhereInput>>;
  NOT?: InputMaybe<Array<MatchWhereInput>>;
  OR?: InputMaybe<Array<MatchWhereInput>>;
  awayTeam?: InputMaybe<ParticipationWhereInput>;
  awayTeamExtraPoints?: InputMaybe<IntNullableFilter>;
  awayTeamFairPlayPoints?: InputMaybe<BooleanFilter>;
  awayTeamFormation?: InputMaybe<StringNullableFilter>;
  awayTeamScore?: InputMaybe<IntNullableFilter>;
  comments?: InputMaybe<StringFilter>;
  competition?: InputMaybe<CompetitionWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  firstHalfStartTime?: InputMaybe<DateTimeNullableFilter>;
  group?: InputMaybe<StringNullableFilter>;
  hasWithdrawnTeam?: InputMaybe<BooleanFilter>;
  homeTeam?: InputMaybe<ParticipationWhereInput>;
  homeTeamExtraPoints?: InputMaybe<IntNullableFilter>;
  homeTeamFairPlayPoints?: InputMaybe<BooleanFilter>;
  homeTeamFormation?: InputMaybe<StringNullableFilter>;
  homeTeamScore?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IdFilter>;
  inMatchTime?: InputMaybe<StringFilter>;
  isMatchEnded?: InputMaybe<BooleanFilter>;
  isMatchLive?: InputMaybe<BooleanFilter>;
  lineupCountPerTeam?: InputMaybe<IntNullableFilter>;
  matchDate?: InputMaybe<DateTimeNullableFilter>;
  referee?: InputMaybe<StringFilter>;
  season?: InputMaybe<SeasonWhereInput>;
  secondHalfStartTime?: InputMaybe<DateTimeNullableFilter>;
  stadium?: InputMaybe<StringFilter>;
  stage?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<StringNullableFilter>;
  videosUrls?: InputMaybe<StringFilter>;
};

export type MatchWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authPlayerWithPassword?: Maybe<Player>;
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  changePlayerPassword?: Maybe<Player>;
  createArena?: Maybe<Arena>;
  createArenaParticipant?: Maybe<ArenaParticipant>;
  createArenaParticipants?: Maybe<Array<Maybe<ArenaParticipant>>>;
  createArenas?: Maybe<Array<Maybe<Arena>>>;
  createBadge?: Maybe<Badge>;
  createBadges?: Maybe<Array<Maybe<Badge>>>;
  createBeProPlayer?: Maybe<BeProPlayer>;
  createBeProPlayers?: Maybe<Array<Maybe<BeProPlayer>>>;
  createCommunities?: Maybe<Array<Maybe<Community>>>;
  createCommunity?: Maybe<Community>;
  createCommunityMembership?: Maybe<CommunityMembership>;
  createCommunityMemberships?: Maybe<Array<Maybe<CommunityMembership>>>;
  createCommunitySeasons?: Maybe<Array<Maybe<CommunitySeason>>>;
  createCompetition?: Maybe<Competition>;
  createCompetitions?: Maybe<Array<Maybe<Competition>>>;
  createDashAdmin?: Maybe<DashAdmin>;
  createDashAdmins?: Maybe<Array<Maybe<DashAdmin>>>;
  createDellCompetiton?: Maybe<DellCompetiton>;
  createDellCompetitons?: Maybe<Array<Maybe<DellCompetiton>>>;
  createHomePage?: Maybe<HomePage>;
  createHomePages?: Maybe<Array<Maybe<HomePage>>>;
  createImage?: Maybe<Image>;
  createImages?: Maybe<Array<Maybe<Image>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createInvite?: Maybe<Invite>;
  createInvites?: Maybe<Array<Maybe<Invite>>>;
  createLeaderboard?: Maybe<Leaderboard>;
  createLeaderboardEntries?: Maybe<Array<Maybe<LeaderboardEntry>>>;
  createLeaderboardEntry?: Maybe<LeaderboardEntry>;
  createLeaderboards?: Maybe<Array<Maybe<Leaderboard>>>;
  createLeagueCorrespondences?: Maybe<Array<Maybe<LeagueCorrespondence>>>;
  createLeagueInfos?: Maybe<Array<Maybe<LeagueInfo>>>;
  createLeagueTables?: Maybe<Array<Maybe<LeagueTable>>>;
  createMatch?: Maybe<Match>;
  createMatches?: Maybe<Array<Maybe<Match>>>;
  createNew?: Maybe<New>;
  createNews?: Maybe<Array<Maybe<New>>>;
  createPSC?: Maybe<Psc>;
  createPSCS?: Maybe<Array<Maybe<Psc>>>;
  createParticipation?: Maybe<Participation>;
  createParticipations?: Maybe<Array<Maybe<Participation>>>;
  createPartner?: Maybe<Partner>;
  createPartners?: Maybe<Array<Maybe<Partner>>>;
  createPayment?: Maybe<Payment>;
  createPaymentDiscount?: Maybe<PaymentDiscount>;
  createPaymentDiscounts?: Maybe<Array<Maybe<PaymentDiscount>>>;
  createPaymentPlan?: Maybe<PaymentPlan>;
  createPaymentPlans?: Maybe<Array<Maybe<PaymentPlan>>>;
  createPayments?: Maybe<Array<Maybe<Payment>>>;
  createPlayer?: Maybe<Player>;
  createPlayers?: Maybe<Array<Maybe<Player>>>;
  createRole?: Maybe<Role>;
  createRoles?: Maybe<Array<Maybe<Role>>>;
  createSeason?: Maybe<Season>;
  createSeasons?: Maybe<Array<Maybe<Season>>>;
  createTeam?: Maybe<Team>;
  createTeams?: Maybe<Array<Maybe<Team>>>;
  createUser?: Maybe<User>;
  createUserBadge?: Maybe<UserBadge>;
  createUserBadges?: Maybe<Array<Maybe<UserBadge>>>;
  createUserMemberShips?: Maybe<Array<Maybe<UserMemberShip>>>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  createZohoBooks?: Maybe<Array<Maybe<ZohoBook>>>;
  createcommunitySeason?: Maybe<CommunitySeason>;
  createleagueCorrespondence?: Maybe<LeagueCorrespondence>;
  createleagueInfo?: Maybe<LeagueInfo>;
  createleagueTable?: Maybe<LeagueTable>;
  createuserMemberShip?: Maybe<UserMemberShip>;
  createzohoBook?: Maybe<ZohoBook>;
  deleteArena?: Maybe<Arena>;
  deleteArenaParticipant?: Maybe<ArenaParticipant>;
  deleteArenaParticipants?: Maybe<Array<Maybe<ArenaParticipant>>>;
  deleteArenas?: Maybe<Array<Maybe<Arena>>>;
  deleteBadge?: Maybe<Badge>;
  deleteBadges?: Maybe<Array<Maybe<Badge>>>;
  deleteBeProPlayer?: Maybe<BeProPlayer>;
  deleteBeProPlayers?: Maybe<Array<Maybe<BeProPlayer>>>;
  deleteCommunities?: Maybe<Array<Maybe<Community>>>;
  deleteCommunity?: Maybe<Community>;
  deleteCommunityMembership?: Maybe<CommunityMembership>;
  deleteCommunityMemberships?: Maybe<Array<Maybe<CommunityMembership>>>;
  deleteCommunitySeasons?: Maybe<Array<Maybe<CommunitySeason>>>;
  deleteCompetition?: Maybe<Competition>;
  deleteCompetitions?: Maybe<Array<Maybe<Competition>>>;
  deleteDashAdmin?: Maybe<DashAdmin>;
  deleteDashAdmins?: Maybe<Array<Maybe<DashAdmin>>>;
  deleteDellCompetiton?: Maybe<DellCompetiton>;
  deleteDellCompetitons?: Maybe<Array<Maybe<DellCompetiton>>>;
  deleteHomePage?: Maybe<HomePage>;
  deleteHomePages?: Maybe<Array<Maybe<HomePage>>>;
  deleteImage?: Maybe<Image>;
  deleteImages?: Maybe<Array<Maybe<Image>>>;
  deleteInvite?: Maybe<Invite>;
  deleteInvites?: Maybe<Array<Maybe<Invite>>>;
  deleteLeaderboard?: Maybe<Leaderboard>;
  deleteLeaderboardEntries?: Maybe<Array<Maybe<LeaderboardEntry>>>;
  deleteLeaderboardEntry?: Maybe<LeaderboardEntry>;
  deleteLeaderboards?: Maybe<Array<Maybe<Leaderboard>>>;
  deleteLeagueCorrespondences?: Maybe<Array<Maybe<LeagueCorrespondence>>>;
  deleteLeagueInfos?: Maybe<Array<Maybe<LeagueInfo>>>;
  deleteLeagueTables?: Maybe<Array<Maybe<LeagueTable>>>;
  deleteMatch?: Maybe<Match>;
  deleteMatches?: Maybe<Array<Maybe<Match>>>;
  deleteNew?: Maybe<New>;
  deleteNews?: Maybe<Array<Maybe<New>>>;
  deletePSC?: Maybe<Psc>;
  deletePSCS?: Maybe<Array<Maybe<Psc>>>;
  deleteParticipation?: Maybe<Participation>;
  deleteParticipations?: Maybe<Array<Maybe<Participation>>>;
  deletePartner?: Maybe<Partner>;
  deletePartners?: Maybe<Array<Maybe<Partner>>>;
  deletePayment?: Maybe<Payment>;
  deletePaymentDiscount?: Maybe<PaymentDiscount>;
  deletePaymentDiscounts?: Maybe<Array<Maybe<PaymentDiscount>>>;
  deletePaymentPlan?: Maybe<PaymentPlan>;
  deletePaymentPlans?: Maybe<Array<Maybe<PaymentPlan>>>;
  deletePayments?: Maybe<Array<Maybe<Payment>>>;
  deletePlayer?: Maybe<Player>;
  deletePlayers?: Maybe<Array<Maybe<Player>>>;
  deleteRole?: Maybe<Role>;
  deleteRoles?: Maybe<Array<Maybe<Role>>>;
  deleteSeason?: Maybe<Season>;
  deleteSeasons?: Maybe<Array<Maybe<Season>>>;
  deleteTeam?: Maybe<Team>;
  deleteTeams?: Maybe<Array<Maybe<Team>>>;
  deleteUser?: Maybe<User>;
  deleteUserBadge?: Maybe<UserBadge>;
  deleteUserBadges?: Maybe<Array<Maybe<UserBadge>>>;
  deleteUserMemberShips?: Maybe<Array<Maybe<UserMemberShip>>>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  deleteZohoBooks?: Maybe<Array<Maybe<ZohoBook>>>;
  deletecommunitySeason?: Maybe<CommunitySeason>;
  deleteleagueCorrespondence?: Maybe<LeagueCorrespondence>;
  deleteleagueInfo?: Maybe<LeagueInfo>;
  deleteleagueTable?: Maybe<LeagueTable>;
  deleteuserMemberShip?: Maybe<UserMemberShip>;
  deletezohoBook?: Maybe<ZohoBook>;
  endSession: Scalars['Boolean']['output'];
  forgetPlayerPassword?: Maybe<Player>;
  requestPlayer?: Maybe<Player>;
  sendEmailToPlayer?: Maybe<Player>;
  updateArena?: Maybe<Arena>;
  updateArenaParticipant?: Maybe<ArenaParticipant>;
  updateArenaParticipants?: Maybe<Array<Maybe<ArenaParticipant>>>;
  updateArenas?: Maybe<Array<Maybe<Arena>>>;
  updateBadge?: Maybe<Badge>;
  updateBadges?: Maybe<Array<Maybe<Badge>>>;
  updateBeProPlayer?: Maybe<BeProPlayer>;
  updateBeProPlayers?: Maybe<Array<Maybe<BeProPlayer>>>;
  updateCommunities?: Maybe<Array<Maybe<Community>>>;
  updateCommunity?: Maybe<Community>;
  updateCommunityMembership?: Maybe<CommunityMembership>;
  updateCommunityMemberships?: Maybe<Array<Maybe<CommunityMembership>>>;
  updateCommunitySeasons?: Maybe<Array<Maybe<CommunitySeason>>>;
  updateCompetition?: Maybe<Competition>;
  updateCompetitions?: Maybe<Array<Maybe<Competition>>>;
  updateDashAdmin?: Maybe<DashAdmin>;
  updateDashAdmins?: Maybe<Array<Maybe<DashAdmin>>>;
  updateDellCompetiton?: Maybe<DellCompetiton>;
  updateDellCompetitons?: Maybe<Array<Maybe<DellCompetiton>>>;
  updateHomePage?: Maybe<HomePage>;
  updateHomePages?: Maybe<Array<Maybe<HomePage>>>;
  updateImage?: Maybe<Image>;
  updateImages?: Maybe<Array<Maybe<Image>>>;
  updateInvite?: Maybe<Invite>;
  updateInvites?: Maybe<Array<Maybe<Invite>>>;
  updateLeaderboard?: Maybe<Leaderboard>;
  updateLeaderboardEntries?: Maybe<Array<Maybe<LeaderboardEntry>>>;
  updateLeaderboardEntry?: Maybe<LeaderboardEntry>;
  updateLeaderboards?: Maybe<Array<Maybe<Leaderboard>>>;
  updateLeagueCorrespondences?: Maybe<Array<Maybe<LeagueCorrespondence>>>;
  updateLeagueInfos?: Maybe<Array<Maybe<LeagueInfo>>>;
  updateLeagueTables?: Maybe<Array<Maybe<LeagueTable>>>;
  updateMatch?: Maybe<Match>;
  updateMatches?: Maybe<Array<Maybe<Match>>>;
  updateNew?: Maybe<New>;
  updateNews?: Maybe<Array<Maybe<New>>>;
  updatePSC?: Maybe<Psc>;
  updatePSCS?: Maybe<Array<Maybe<Psc>>>;
  updateParticipation?: Maybe<Participation>;
  updateParticipations?: Maybe<Array<Maybe<Participation>>>;
  updatePartner?: Maybe<Partner>;
  updatePartners?: Maybe<Array<Maybe<Partner>>>;
  updatePayment?: Maybe<Payment>;
  updatePaymentDiscount?: Maybe<PaymentDiscount>;
  updatePaymentDiscounts?: Maybe<Array<Maybe<PaymentDiscount>>>;
  updatePaymentPlan?: Maybe<PaymentPlan>;
  updatePaymentPlans?: Maybe<Array<Maybe<PaymentPlan>>>;
  updatePayments?: Maybe<Array<Maybe<Payment>>>;
  updatePlayer?: Maybe<Player>;
  updatePlayers?: Maybe<Array<Maybe<Player>>>;
  updateRole?: Maybe<Role>;
  updateRoles?: Maybe<Array<Maybe<Role>>>;
  updateSeason?: Maybe<Season>;
  updateSeasons?: Maybe<Array<Maybe<Season>>>;
  updateTeam?: Maybe<Team>;
  updateTeams?: Maybe<Array<Maybe<Team>>>;
  updateUser?: Maybe<User>;
  updateUserBadge?: Maybe<UserBadge>;
  updateUserBadges?: Maybe<Array<Maybe<UserBadge>>>;
  updateUserMemberShips?: Maybe<Array<Maybe<UserMemberShip>>>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
  updateZohoBooks?: Maybe<Array<Maybe<ZohoBook>>>;
  updatecommunitySeason?: Maybe<CommunitySeason>;
  updateleagueCorrespondence?: Maybe<LeagueCorrespondence>;
  updateleagueInfo?: Maybe<LeagueInfo>;
  updateleagueTable?: Maybe<LeagueTable>;
  updateuserMemberShip?: Maybe<UserMemberShip>;
  updatezohoBook?: Maybe<ZohoBook>;
};


export type MutationAuthPlayerWithPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationChangePlayerPasswordArgs = {
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationCreateArenaArgs = {
  data: ArenaCreateInput;
};


export type MutationCreateArenaParticipantArgs = {
  data: ArenaParticipantCreateInput;
};


export type MutationCreateArenaParticipantsArgs = {
  data: Array<ArenaParticipantCreateInput>;
};


export type MutationCreateArenasArgs = {
  data: Array<ArenaCreateInput>;
};


export type MutationCreateBadgeArgs = {
  data: BadgeCreateInput;
};


export type MutationCreateBadgesArgs = {
  data: Array<BadgeCreateInput>;
};


export type MutationCreateBeProPlayerArgs = {
  data: BeProPlayerCreateInput;
};


export type MutationCreateBeProPlayersArgs = {
  data: Array<BeProPlayerCreateInput>;
};


export type MutationCreateCommunitiesArgs = {
  data: Array<CommunityCreateInput>;
};


export type MutationCreateCommunityArgs = {
  data: CommunityCreateInput;
};


export type MutationCreateCommunityMembershipArgs = {
  data: CommunityMembershipCreateInput;
};


export type MutationCreateCommunityMembershipsArgs = {
  data: Array<CommunityMembershipCreateInput>;
};


export type MutationCreateCommunitySeasonsArgs = {
  data: Array<CommunitySeasonCreateInput>;
};


export type MutationCreateCompetitionArgs = {
  data: CompetitionCreateInput;
};


export type MutationCreateCompetitionsArgs = {
  data: Array<CompetitionCreateInput>;
};


export type MutationCreateDashAdminArgs = {
  data: DashAdminCreateInput;
};


export type MutationCreateDashAdminsArgs = {
  data: Array<DashAdminCreateInput>;
};


export type MutationCreateDellCompetitonArgs = {
  data: DellCompetitonCreateInput;
};


export type MutationCreateDellCompetitonsArgs = {
  data: Array<DellCompetitonCreateInput>;
};


export type MutationCreateHomePageArgs = {
  data: HomePageCreateInput;
};


export type MutationCreateHomePagesArgs = {
  data: Array<HomePageCreateInput>;
};


export type MutationCreateImageArgs = {
  data: ImageCreateInput;
};


export type MutationCreateImagesArgs = {
  data: Array<ImageCreateInput>;
};


export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};


export type MutationCreateInviteArgs = {
  data: InviteCreateInput;
};


export type MutationCreateInvitesArgs = {
  data: Array<InviteCreateInput>;
};


export type MutationCreateLeaderboardArgs = {
  data: LeaderboardCreateInput;
};


export type MutationCreateLeaderboardEntriesArgs = {
  data: Array<LeaderboardEntryCreateInput>;
};


export type MutationCreateLeaderboardEntryArgs = {
  data: LeaderboardEntryCreateInput;
};


export type MutationCreateLeaderboardsArgs = {
  data: Array<LeaderboardCreateInput>;
};


export type MutationCreateLeagueCorrespondencesArgs = {
  data: Array<LeagueCorrespondenceCreateInput>;
};


export type MutationCreateLeagueInfosArgs = {
  data: Array<LeagueInfoCreateInput>;
};


export type MutationCreateLeagueTablesArgs = {
  data: Array<LeagueTableCreateInput>;
};


export type MutationCreateMatchArgs = {
  data: MatchCreateInput;
};


export type MutationCreateMatchesArgs = {
  data: Array<MatchCreateInput>;
};


export type MutationCreateNewArgs = {
  data: NewCreateInput;
};


export type MutationCreateNewsArgs = {
  data: Array<NewCreateInput>;
};


export type MutationCreatePscArgs = {
  data: PscCreateInput;
};


export type MutationCreatePscsArgs = {
  data: Array<PscCreateInput>;
};


export type MutationCreateParticipationArgs = {
  data: ParticipationCreateInput;
};


export type MutationCreateParticipationsArgs = {
  data: Array<ParticipationCreateInput>;
};


export type MutationCreatePartnerArgs = {
  data: PartnerCreateInput;
};


export type MutationCreatePartnersArgs = {
  data: Array<PartnerCreateInput>;
};


export type MutationCreatePaymentArgs = {
  data: PaymentCreateInput;
};


export type MutationCreatePaymentDiscountArgs = {
  data: PaymentDiscountCreateInput;
};


export type MutationCreatePaymentDiscountsArgs = {
  data: Array<PaymentDiscountCreateInput>;
};


export type MutationCreatePaymentPlanArgs = {
  data: PaymentPlanCreateInput;
};


export type MutationCreatePaymentPlansArgs = {
  data: Array<PaymentPlanCreateInput>;
};


export type MutationCreatePaymentsArgs = {
  data: Array<PaymentCreateInput>;
};


export type MutationCreatePlayerArgs = {
  data: PlayerCreateInput;
};


export type MutationCreatePlayersArgs = {
  data: Array<PlayerCreateInput>;
};


export type MutationCreateRoleArgs = {
  data: RoleCreateInput;
};


export type MutationCreateRolesArgs = {
  data: Array<RoleCreateInput>;
};


export type MutationCreateSeasonArgs = {
  data: SeasonCreateInput;
};


export type MutationCreateSeasonsArgs = {
  data: Array<SeasonCreateInput>;
};


export type MutationCreateTeamArgs = {
  data: TeamCreateInput;
};


export type MutationCreateTeamsArgs = {
  data: Array<TeamCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUserBadgeArgs = {
  data: UserBadgeCreateInput;
};


export type MutationCreateUserBadgesArgs = {
  data: Array<UserBadgeCreateInput>;
};


export type MutationCreateUserMemberShipsArgs = {
  data: Array<UserMemberShipCreateInput>;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationCreateZohoBooksArgs = {
  data: Array<ZohoBookCreateInput>;
};


export type MutationCreatecommunitySeasonArgs = {
  data: CommunitySeasonCreateInput;
};


export type MutationCreateleagueCorrespondenceArgs = {
  data: LeagueCorrespondenceCreateInput;
};


export type MutationCreateleagueInfoArgs = {
  data: LeagueInfoCreateInput;
};


export type MutationCreateleagueTableArgs = {
  data: LeagueTableCreateInput;
};


export type MutationCreateuserMemberShipArgs = {
  data: UserMemberShipCreateInput;
};


export type MutationCreatezohoBookArgs = {
  data: ZohoBookCreateInput;
};


export type MutationDeleteArenaArgs = {
  where: ArenaWhereUniqueInput;
};


export type MutationDeleteArenaParticipantArgs = {
  where: ArenaParticipantWhereUniqueInput;
};


export type MutationDeleteArenaParticipantsArgs = {
  where: Array<ArenaParticipantWhereUniqueInput>;
};


export type MutationDeleteArenasArgs = {
  where: Array<ArenaWhereUniqueInput>;
};


export type MutationDeleteBadgeArgs = {
  where: BadgeWhereUniqueInput;
};


export type MutationDeleteBadgesArgs = {
  where: Array<BadgeWhereUniqueInput>;
};


export type MutationDeleteBeProPlayerArgs = {
  where: BeProPlayerWhereUniqueInput;
};


export type MutationDeleteBeProPlayersArgs = {
  where: Array<BeProPlayerWhereUniqueInput>;
};


export type MutationDeleteCommunitiesArgs = {
  where: Array<CommunityWhereUniqueInput>;
};


export type MutationDeleteCommunityArgs = {
  where: CommunityWhereUniqueInput;
};


export type MutationDeleteCommunityMembershipArgs = {
  where: CommunityMembershipWhereUniqueInput;
};


export type MutationDeleteCommunityMembershipsArgs = {
  where: Array<CommunityMembershipWhereUniqueInput>;
};


export type MutationDeleteCommunitySeasonsArgs = {
  where: Array<CommunitySeasonWhereUniqueInput>;
};


export type MutationDeleteCompetitionArgs = {
  where: CompetitionWhereUniqueInput;
};


export type MutationDeleteCompetitionsArgs = {
  where: Array<CompetitionWhereUniqueInput>;
};


export type MutationDeleteDashAdminArgs = {
  where: DashAdminWhereUniqueInput;
};


export type MutationDeleteDashAdminsArgs = {
  where: Array<DashAdminWhereUniqueInput>;
};


export type MutationDeleteDellCompetitonArgs = {
  where: DellCompetitonWhereUniqueInput;
};


export type MutationDeleteDellCompetitonsArgs = {
  where: Array<DellCompetitonWhereUniqueInput>;
};


export type MutationDeleteHomePageArgs = {
  where?: HomePageWhereUniqueInput;
};


export type MutationDeleteHomePagesArgs = {
  where: Array<HomePageWhereUniqueInput>;
};


export type MutationDeleteImageArgs = {
  where: ImageWhereUniqueInput;
};


export type MutationDeleteImagesArgs = {
  where: Array<ImageWhereUniqueInput>;
};


export type MutationDeleteInviteArgs = {
  where: InviteWhereUniqueInput;
};


export type MutationDeleteInvitesArgs = {
  where: Array<InviteWhereUniqueInput>;
};


export type MutationDeleteLeaderboardArgs = {
  where: LeaderboardWhereUniqueInput;
};


export type MutationDeleteLeaderboardEntriesArgs = {
  where: Array<LeaderboardEntryWhereUniqueInput>;
};


export type MutationDeleteLeaderboardEntryArgs = {
  where: LeaderboardEntryWhereUniqueInput;
};


export type MutationDeleteLeaderboardsArgs = {
  where: Array<LeaderboardWhereUniqueInput>;
};


export type MutationDeleteLeagueCorrespondencesArgs = {
  where: Array<LeagueCorrespondenceWhereUniqueInput>;
};


export type MutationDeleteLeagueInfosArgs = {
  where: Array<LeagueInfoWhereUniqueInput>;
};


export type MutationDeleteLeagueTablesArgs = {
  where: Array<LeagueTableWhereUniqueInput>;
};


export type MutationDeleteMatchArgs = {
  where: MatchWhereUniqueInput;
};


export type MutationDeleteMatchesArgs = {
  where: Array<MatchWhereUniqueInput>;
};


export type MutationDeleteNewArgs = {
  where: NewWhereUniqueInput;
};


export type MutationDeleteNewsArgs = {
  where: Array<NewWhereUniqueInput>;
};


export type MutationDeletePscArgs = {
  where: PscWhereUniqueInput;
};


export type MutationDeletePscsArgs = {
  where: Array<PscWhereUniqueInput>;
};


export type MutationDeleteParticipationArgs = {
  where: ParticipationWhereUniqueInput;
};


export type MutationDeleteParticipationsArgs = {
  where: Array<ParticipationWhereUniqueInput>;
};


export type MutationDeletePartnerArgs = {
  where: PartnerWhereUniqueInput;
};


export type MutationDeletePartnersArgs = {
  where: Array<PartnerWhereUniqueInput>;
};


export type MutationDeletePaymentArgs = {
  where: PaymentWhereUniqueInput;
};


export type MutationDeletePaymentDiscountArgs = {
  where: PaymentDiscountWhereUniqueInput;
};


export type MutationDeletePaymentDiscountsArgs = {
  where: Array<PaymentDiscountWhereUniqueInput>;
};


export type MutationDeletePaymentPlanArgs = {
  where: PaymentPlanWhereUniqueInput;
};


export type MutationDeletePaymentPlansArgs = {
  where: Array<PaymentPlanWhereUniqueInput>;
};


export type MutationDeletePaymentsArgs = {
  where: Array<PaymentWhereUniqueInput>;
};


export type MutationDeletePlayerArgs = {
  where: PlayerWhereUniqueInput;
};


export type MutationDeletePlayersArgs = {
  where: Array<PlayerWhereUniqueInput>;
};


export type MutationDeleteRoleArgs = {
  where: RoleWhereUniqueInput;
};


export type MutationDeleteRolesArgs = {
  where: Array<RoleWhereUniqueInput>;
};


export type MutationDeleteSeasonArgs = {
  where: SeasonWhereUniqueInput;
};


export type MutationDeleteSeasonsArgs = {
  where: Array<SeasonWhereUniqueInput>;
};


export type MutationDeleteTeamArgs = {
  where: TeamWhereUniqueInput;
};


export type MutationDeleteTeamsArgs = {
  where: Array<TeamWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUserBadgeArgs = {
  where: UserBadgeWhereUniqueInput;
};


export type MutationDeleteUserBadgesArgs = {
  where: Array<UserBadgeWhereUniqueInput>;
};


export type MutationDeleteUserMemberShipsArgs = {
  where: Array<UserMemberShipWhereUniqueInput>;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationDeleteZohoBooksArgs = {
  where: Array<ZohoBookWhereUniqueInput>;
};


export type MutationDeletecommunitySeasonArgs = {
  where: CommunitySeasonWhereUniqueInput;
};


export type MutationDeleteleagueCorrespondenceArgs = {
  where: LeagueCorrespondenceWhereUniqueInput;
};


export type MutationDeleteleagueInfoArgs = {
  where: LeagueInfoWhereUniqueInput;
};


export type MutationDeleteleagueTableArgs = {
  where: LeagueTableWhereUniqueInput;
};


export type MutationDeleteuserMemberShipArgs = {
  where: UserMemberShipWhereUniqueInput;
};


export type MutationDeletezohoBookArgs = {
  where?: ZohoBookWhereUniqueInput;
};


export type MutationForgetPlayerPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationRequestPlayerArgs = {
  email: Scalars['String']['input'];
  teamName: Scalars['String']['input'];
  teamSecurityCode: Scalars['String']['input'];
};


export type MutationSendEmailToPlayerArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateArenaArgs = {
  data: ArenaUpdateInput;
  where: ArenaWhereUniqueInput;
};


export type MutationUpdateArenaParticipantArgs = {
  data: ArenaParticipantUpdateInput;
  where: ArenaParticipantWhereUniqueInput;
};


export type MutationUpdateArenaParticipantsArgs = {
  data: Array<ArenaParticipantUpdateArgs>;
};


export type MutationUpdateArenasArgs = {
  data: Array<ArenaUpdateArgs>;
};


export type MutationUpdateBadgeArgs = {
  data: BadgeUpdateInput;
  where: BadgeWhereUniqueInput;
};


export type MutationUpdateBadgesArgs = {
  data: Array<BadgeUpdateArgs>;
};


export type MutationUpdateBeProPlayerArgs = {
  data: BeProPlayerUpdateInput;
  where: BeProPlayerWhereUniqueInput;
};


export type MutationUpdateBeProPlayersArgs = {
  data: Array<BeProPlayerUpdateArgs>;
};


export type MutationUpdateCommunitiesArgs = {
  data: Array<CommunityUpdateArgs>;
};


export type MutationUpdateCommunityArgs = {
  data: CommunityUpdateInput;
  where: CommunityWhereUniqueInput;
};


export type MutationUpdateCommunityMembershipArgs = {
  data: CommunityMembershipUpdateInput;
  where: CommunityMembershipWhereUniqueInput;
};


export type MutationUpdateCommunityMembershipsArgs = {
  data: Array<CommunityMembershipUpdateArgs>;
};


export type MutationUpdateCommunitySeasonsArgs = {
  data: Array<CommunitySeasonUpdateArgs>;
};


export type MutationUpdateCompetitionArgs = {
  data: CompetitionUpdateInput;
  where: CompetitionWhereUniqueInput;
};


export type MutationUpdateCompetitionsArgs = {
  data: Array<CompetitionUpdateArgs>;
};


export type MutationUpdateDashAdminArgs = {
  data: DashAdminUpdateInput;
  where: DashAdminWhereUniqueInput;
};


export type MutationUpdateDashAdminsArgs = {
  data: Array<DashAdminUpdateArgs>;
};


export type MutationUpdateDellCompetitonArgs = {
  data: DellCompetitonUpdateInput;
  where: DellCompetitonWhereUniqueInput;
};


export type MutationUpdateDellCompetitonsArgs = {
  data: Array<DellCompetitonUpdateArgs>;
};


export type MutationUpdateHomePageArgs = {
  data: HomePageUpdateInput;
  where?: HomePageWhereUniqueInput;
};


export type MutationUpdateHomePagesArgs = {
  data: Array<HomePageUpdateArgs>;
};


export type MutationUpdateImageArgs = {
  data: ImageUpdateInput;
  where: ImageWhereUniqueInput;
};


export type MutationUpdateImagesArgs = {
  data: Array<ImageUpdateArgs>;
};


export type MutationUpdateInviteArgs = {
  data: InviteUpdateInput;
  where: InviteWhereUniqueInput;
};


export type MutationUpdateInvitesArgs = {
  data: Array<InviteUpdateArgs>;
};


export type MutationUpdateLeaderboardArgs = {
  data: LeaderboardUpdateInput;
  where: LeaderboardWhereUniqueInput;
};


export type MutationUpdateLeaderboardEntriesArgs = {
  data: Array<LeaderboardEntryUpdateArgs>;
};


export type MutationUpdateLeaderboardEntryArgs = {
  data: LeaderboardEntryUpdateInput;
  where: LeaderboardEntryWhereUniqueInput;
};


export type MutationUpdateLeaderboardsArgs = {
  data: Array<LeaderboardUpdateArgs>;
};


export type MutationUpdateLeagueCorrespondencesArgs = {
  data: Array<LeagueCorrespondenceUpdateArgs>;
};


export type MutationUpdateLeagueInfosArgs = {
  data: Array<LeagueInfoUpdateArgs>;
};


export type MutationUpdateLeagueTablesArgs = {
  data: Array<LeagueTableUpdateArgs>;
};


export type MutationUpdateMatchArgs = {
  data: MatchUpdateInput;
  where: MatchWhereUniqueInput;
};


export type MutationUpdateMatchesArgs = {
  data: Array<MatchUpdateArgs>;
};


export type MutationUpdateNewArgs = {
  data: NewUpdateInput;
  where: NewWhereUniqueInput;
};


export type MutationUpdateNewsArgs = {
  data: Array<NewUpdateArgs>;
};


export type MutationUpdatePscArgs = {
  data: PscUpdateInput;
  where: PscWhereUniqueInput;
};


export type MutationUpdatePscsArgs = {
  data: Array<PscUpdateArgs>;
};


export type MutationUpdateParticipationArgs = {
  data: ParticipationUpdateInput;
  where: ParticipationWhereUniqueInput;
};


export type MutationUpdateParticipationsArgs = {
  data: Array<ParticipationUpdateArgs>;
};


export type MutationUpdatePartnerArgs = {
  data: PartnerUpdateInput;
  where: PartnerWhereUniqueInput;
};


export type MutationUpdatePartnersArgs = {
  data: Array<PartnerUpdateArgs>;
};


export type MutationUpdatePaymentArgs = {
  data: PaymentUpdateInput;
  where: PaymentWhereUniqueInput;
};


export type MutationUpdatePaymentDiscountArgs = {
  data: PaymentDiscountUpdateInput;
  where: PaymentDiscountWhereUniqueInput;
};


export type MutationUpdatePaymentDiscountsArgs = {
  data: Array<PaymentDiscountUpdateArgs>;
};


export type MutationUpdatePaymentPlanArgs = {
  data: PaymentPlanUpdateInput;
  where: PaymentPlanWhereUniqueInput;
};


export type MutationUpdatePaymentPlansArgs = {
  data: Array<PaymentPlanUpdateArgs>;
};


export type MutationUpdatePaymentsArgs = {
  data: Array<PaymentUpdateArgs>;
};


export type MutationUpdatePlayerArgs = {
  data: PlayerUpdateInput;
  where: PlayerWhereUniqueInput;
};


export type MutationUpdatePlayersArgs = {
  data: Array<PlayerUpdateArgs>;
};


export type MutationUpdateRoleArgs = {
  data: RoleUpdateInput;
  where: RoleWhereUniqueInput;
};


export type MutationUpdateRolesArgs = {
  data: Array<RoleUpdateArgs>;
};


export type MutationUpdateSeasonArgs = {
  data: SeasonUpdateInput;
  where: SeasonWhereUniqueInput;
};


export type MutationUpdateSeasonsArgs = {
  data: Array<SeasonUpdateArgs>;
};


export type MutationUpdateTeamArgs = {
  data: TeamUpdateInput;
  where: TeamWhereUniqueInput;
};


export type MutationUpdateTeamsArgs = {
  data: Array<TeamUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUserBadgeArgs = {
  data: UserBadgeUpdateInput;
  where: UserBadgeWhereUniqueInput;
};


export type MutationUpdateUserBadgesArgs = {
  data: Array<UserBadgeUpdateArgs>;
};


export type MutationUpdateUserMemberShipsArgs = {
  data: Array<UserMemberShipUpdateArgs>;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};


export type MutationUpdateZohoBooksArgs = {
  data: Array<ZohoBookUpdateArgs>;
};


export type MutationUpdatecommunitySeasonArgs = {
  data: CommunitySeasonUpdateInput;
  where: CommunitySeasonWhereUniqueInput;
};


export type MutationUpdateleagueCorrespondenceArgs = {
  data: LeagueCorrespondenceUpdateInput;
  where: LeagueCorrespondenceWhereUniqueInput;
};


export type MutationUpdateleagueInfoArgs = {
  data: LeagueInfoUpdateInput;
  where: LeagueInfoWhereUniqueInput;
};


export type MutationUpdateleagueTableArgs = {
  data: LeagueTableUpdateInput;
  where: LeagueTableWhereUniqueInput;
};


export type MutationUpdateuserMemberShipArgs = {
  data: UserMemberShipUpdateInput;
  where: UserMemberShipWhereUniqueInput;
};


export type MutationUpdatezohoBookArgs = {
  data: ZohoBookUpdateInput;
  where?: ZohoBookWhereUniqueInput;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type New = {
  __typename?: 'New';
  competition?: Maybe<Competition>;
  content?: Maybe<New_Content_Document>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  match?: Maybe<Match>;
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaImage?: Maybe<ImageFieldOutput>;
  season?: Maybe<Season>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type NewCreateInput = {
  competition?: InputMaybe<CompetitionRelateToOneForCreateInput>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  match?: InputMaybe<MatchRelateToOneForCreateInput>;
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  metaImage?: InputMaybe<ImageFieldInput>;
  season?: InputMaybe<SeasonRelateToOneForCreateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type NewOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  metaDescription?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type NewUpdateArgs = {
  data: NewUpdateInput;
  where: NewWhereUniqueInput;
};

export type NewUpdateInput = {
  competition?: InputMaybe<CompetitionRelateToOneForUpdateInput>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  match?: InputMaybe<MatchRelateToOneForUpdateInput>;
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  metaImage?: InputMaybe<ImageFieldInput>;
  season?: InputMaybe<SeasonRelateToOneForUpdateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type NewWhereInput = {
  AND?: InputMaybe<Array<NewWhereInput>>;
  NOT?: InputMaybe<Array<NewWhereInput>>;
  OR?: InputMaybe<Array<NewWhereInput>>;
  competition?: InputMaybe<CompetitionWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  match?: InputMaybe<MatchWhereInput>;
  metaDescription?: InputMaybe<StringFilter>;
  season?: InputMaybe<SeasonWhereInput>;
  slug?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type NewWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type New_Content_Document = {
  __typename?: 'New_content_Document';
  document: Scalars['JSON']['output'];
};


export type New_Content_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Psc = {
  __typename?: 'PSC';
  ageGroup?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  teamCaptainEmail?: Maybe<Scalars['String']['output']>;
  teamCaptainMobile?: Maybe<Scalars['String']['output']>;
  teamCaptainName?: Maybe<Scalars['String']['output']>;
  teamCount?: Maybe<Scalars['String']['output']>;
  teamName?: Maybe<Scalars['String']['output']>;
};

export type PscCreateInput = {
  ageGroup?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  teamCaptainEmail?: InputMaybe<Scalars['String']['input']>;
  teamCaptainMobile?: InputMaybe<Scalars['String']['input']>;
  teamCaptainName?: InputMaybe<Scalars['String']['input']>;
  teamCount?: InputMaybe<Scalars['String']['input']>;
  teamName?: InputMaybe<Scalars['String']['input']>;
};

export type PscOrderByInput = {
  ageGroup?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  teamCaptainEmail?: InputMaybe<OrderDirection>;
  teamCaptainMobile?: InputMaybe<OrderDirection>;
  teamCaptainName?: InputMaybe<OrderDirection>;
  teamCount?: InputMaybe<OrderDirection>;
  teamName?: InputMaybe<OrderDirection>;
};

export type PscUpdateArgs = {
  data: PscUpdateInput;
  where: PscWhereUniqueInput;
};

export type PscUpdateInput = {
  ageGroup?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  teamCaptainEmail?: InputMaybe<Scalars['String']['input']>;
  teamCaptainMobile?: InputMaybe<Scalars['String']['input']>;
  teamCaptainName?: InputMaybe<Scalars['String']['input']>;
  teamCount?: InputMaybe<Scalars['String']['input']>;
  teamName?: InputMaybe<Scalars['String']['input']>;
};

export type PscWhereInput = {
  AND?: InputMaybe<Array<PscWhereInput>>;
  NOT?: InputMaybe<Array<PscWhereInput>>;
  OR?: InputMaybe<Array<PscWhereInput>>;
  ageGroup?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  teamCaptainEmail?: InputMaybe<StringFilter>;
  teamCaptainMobile?: InputMaybe<StringFilter>;
  teamCaptainName?: InputMaybe<StringFilter>;
  teamCount?: InputMaybe<StringFilter>;
  teamName?: InputMaybe<StringFilter>;
};

export type PscWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  teamName?: InputMaybe<Scalars['String']['input']>;
};

export type Participation = {
  __typename?: 'Participation';
  competition?: Maybe<Competition>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  group?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isFullyPaid?: Maybe<Scalars['Boolean']['output']>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  joinOrMigrateLeague?: Maybe<Scalars['JSON']['output']>;
  lineUp?: Maybe<Scalars['JSON']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  payments?: Maybe<Scalars['JSON']['output']>;
  playersCount?: Maybe<Scalars['JSON']['output']>;
  seasons?: Maybe<Array<Season>>;
  seasonsCount?: Maybe<Scalars['Int']['output']>;
  teamAdmin?: Maybe<Player>;
  teamCaptain?: Maybe<Scalars['JSON']['output']>;
  teams?: Maybe<Array<Team>>;
  teamsCount?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};


export type ParticipationSeasonsArgs = {
  cursor?: InputMaybe<SeasonWhereUniqueInput>;
  orderBy?: Array<SeasonOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: SeasonWhereInput;
};


export type ParticipationSeasonsCountArgs = {
  where?: SeasonWhereInput;
};


export type ParticipationTeamsArgs = {
  cursor?: InputMaybe<TeamWhereUniqueInput>;
  orderBy?: Array<TeamOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TeamWhereInput;
};


export type ParticipationTeamsCountArgs = {
  where?: TeamWhereInput;
};

export type ParticipationCreateInput = {
  competition?: InputMaybe<CompetitionRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  group?: InputMaybe<Scalars['String']['input']>;
  isFullyPaid?: InputMaybe<Scalars['Boolean']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lineUp?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  seasons?: InputMaybe<SeasonRelateToManyForCreateInput>;
  teamAdmin?: InputMaybe<PlayerRelateToOneForCreateInput>;
  teams?: InputMaybe<TeamRelateToManyForCreateInput>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ParticipationManyRelationFilter = {
  every?: InputMaybe<ParticipationWhereInput>;
  none?: InputMaybe<ParticipationWhereInput>;
  some?: InputMaybe<ParticipationWhereInput>;
};

export type ParticipationOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  group?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isFullyPaid?: InputMaybe<OrderDirection>;
  isVerified?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
};

export type ParticipationRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ParticipationWhereUniqueInput>>;
  create?: InputMaybe<Array<ParticipationCreateInput>>;
};

export type ParticipationRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ParticipationWhereUniqueInput>>;
  create?: InputMaybe<Array<ParticipationCreateInput>>;
  disconnect?: InputMaybe<Array<ParticipationWhereUniqueInput>>;
  set?: InputMaybe<Array<ParticipationWhereUniqueInput>>;
};

export type ParticipationRelateToOneForCreateInput = {
  connect?: InputMaybe<ParticipationWhereUniqueInput>;
  create?: InputMaybe<ParticipationCreateInput>;
};

export type ParticipationRelateToOneForUpdateInput = {
  connect?: InputMaybe<ParticipationWhereUniqueInput>;
  create?: InputMaybe<ParticipationCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ParticipationUpdateArgs = {
  data: ParticipationUpdateInput;
  where: ParticipationWhereUniqueInput;
};

export type ParticipationUpdateInput = {
  competition?: InputMaybe<CompetitionRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  group?: InputMaybe<Scalars['String']['input']>;
  isFullyPaid?: InputMaybe<Scalars['Boolean']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lineUp?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  seasons?: InputMaybe<SeasonRelateToManyForUpdateInput>;
  teamAdmin?: InputMaybe<PlayerRelateToOneForUpdateInput>;
  teams?: InputMaybe<TeamRelateToManyForUpdateInput>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ParticipationWhereInput = {
  AND?: InputMaybe<Array<ParticipationWhereInput>>;
  NOT?: InputMaybe<Array<ParticipationWhereInput>>;
  OR?: InputMaybe<Array<ParticipationWhereInput>>;
  competition?: InputMaybe<CompetitionWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  group?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IdFilter>;
  isFullyPaid?: InputMaybe<BooleanFilter>;
  isVerified?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
  seasons?: InputMaybe<SeasonManyRelationFilter>;
  teamAdmin?: InputMaybe<PlayerWhereInput>;
  teams?: InputMaybe<TeamManyRelationFilter>;
  type?: InputMaybe<StringNullableFilter>;
};

export type ParticipationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Partner = {
  __typename?: 'Partner';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<ImageFieldOutput>;
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type PartnerCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type PartnerManyRelationFilter = {
  every?: InputMaybe<PartnerWhereInput>;
  none?: InputMaybe<PartnerWhereInput>;
  some?: InputMaybe<PartnerWhereInput>;
};

export type PartnerOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  url?: InputMaybe<OrderDirection>;
};

export type PartnerRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<PartnerWhereUniqueInput>>;
  create?: InputMaybe<Array<PartnerCreateInput>>;
};

export type PartnerRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<PartnerWhereUniqueInput>>;
  create?: InputMaybe<Array<PartnerCreateInput>>;
  disconnect?: InputMaybe<Array<PartnerWhereUniqueInput>>;
  set?: InputMaybe<Array<PartnerWhereUniqueInput>>;
};

export type PartnerUpdateArgs = {
  data: PartnerUpdateInput;
  where: PartnerWhereUniqueInput;
};

export type PartnerUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type PartnerWhereInput = {
  AND?: InputMaybe<Array<PartnerWhereInput>>;
  NOT?: InputMaybe<Array<PartnerWhereInput>>;
  OR?: InputMaybe<Array<PartnerWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type PartnerWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean']['output'];
};

export type Payment = {
  __typename?: 'Payment';
  amount?: Maybe<Scalars['String']['output']>;
  checkPayment?: Maybe<Scalars['JSON']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<PaymentDiscount>;
  id: Scalars['ID']['output'];
  intentionId?: Maybe<Scalars['String']['output']>;
  isFulfilled?: Maybe<Scalars['Boolean']['output']>;
  isInvoiceEmailed?: Maybe<Scalars['Boolean']['output']>;
  orderId?: Maybe<Scalars['String']['output']>;
  orderResponse?: Maybe<Scalars['JSON']['output']>;
  participation?: Maybe<Participation>;
  paymentMethod?: Maybe<Scalars['String']['output']>;
  pending?: Maybe<Scalars['Boolean']['output']>;
  plan?: Maybe<PaymentPlan>;
  player?: Maybe<Player>;
  salesReceiptId?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  txId?: Maybe<Scalars['String']['output']>;
};

export type PaymentCreateInput = {
  amount?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  discount?: InputMaybe<PaymentDiscountRelateToOneForCreateInput>;
  intentionId?: InputMaybe<Scalars['String']['input']>;
  isFulfilled?: InputMaybe<Scalars['Boolean']['input']>;
  isInvoiceEmailed?: InputMaybe<Scalars['Boolean']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderResponse?: InputMaybe<Scalars['JSON']['input']>;
  participation?: InputMaybe<ParticipationRelateToOneForCreateInput>;
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  pending?: InputMaybe<Scalars['Boolean']['input']>;
  plan?: InputMaybe<PaymentPlanRelateToOneForCreateInput>;
  player?: InputMaybe<PlayerRelateToOneForCreateInput>;
  salesReceiptId?: InputMaybe<Scalars['String']['input']>;
  success?: InputMaybe<Scalars['Boolean']['input']>;
  txId?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentDiscount = {
  __typename?: 'PaymentDiscount';
  amount?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  maxDiscountUsage?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  paymentPlans?: Maybe<Array<PaymentPlan>>;
  paymentPlansCount?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};


export type PaymentDiscountPaymentPlansArgs = {
  cursor?: InputMaybe<PaymentPlanWhereUniqueInput>;
  orderBy?: Array<PaymentPlanOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PaymentPlanWhereInput;
};


export type PaymentDiscountPaymentPlansCountArgs = {
  where?: PaymentPlanWhereInput;
};

export type PaymentDiscountCreateInput = {
  amount?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  maxDiscountUsage?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  paymentPlans?: InputMaybe<PaymentPlanRelateToManyForCreateInput>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentDiscountOrderByInput = {
  amount?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  maxDiscountUsage?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
};

export type PaymentDiscountRelateToOneForCreateInput = {
  connect?: InputMaybe<PaymentDiscountWhereUniqueInput>;
  create?: InputMaybe<PaymentDiscountCreateInput>;
};

export type PaymentDiscountRelateToOneForUpdateInput = {
  connect?: InputMaybe<PaymentDiscountWhereUniqueInput>;
  create?: InputMaybe<PaymentDiscountCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PaymentDiscountUpdateArgs = {
  data: PaymentDiscountUpdateInput;
  where: PaymentDiscountWhereUniqueInput;
};

export type PaymentDiscountUpdateInput = {
  amount?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  maxDiscountUsage?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  paymentPlans?: InputMaybe<PaymentPlanRelateToManyForUpdateInput>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentDiscountWhereInput = {
  AND?: InputMaybe<Array<PaymentDiscountWhereInput>>;
  NOT?: InputMaybe<Array<PaymentDiscountWhereInput>>;
  OR?: InputMaybe<Array<PaymentDiscountWhereInput>>;
  amount?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  maxDiscountUsage?: InputMaybe<IntNullableFilter>;
  name?: InputMaybe<StringFilter>;
  paymentPlans?: InputMaybe<PaymentPlanManyRelationFilter>;
  type?: InputMaybe<StringNullableFilter>;
};

export type PaymentDiscountWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type PaymentManyRelationFilter = {
  every?: InputMaybe<PaymentWhereInput>;
  none?: InputMaybe<PaymentWhereInput>;
  some?: InputMaybe<PaymentWhereInput>;
};

export type PaymentOrderByInput = {
  amount?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  currency?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  intentionId?: InputMaybe<OrderDirection>;
  isFulfilled?: InputMaybe<OrderDirection>;
  isInvoiceEmailed?: InputMaybe<OrderDirection>;
  orderId?: InputMaybe<OrderDirection>;
  paymentMethod?: InputMaybe<OrderDirection>;
  pending?: InputMaybe<OrderDirection>;
  salesReceiptId?: InputMaybe<OrderDirection>;
  success?: InputMaybe<OrderDirection>;
  txId?: InputMaybe<OrderDirection>;
};

export type PaymentPlan = {
  __typename?: 'PaymentPlan';
  amount?: Maybe<Scalars['Int']['output']>;
  competition?: Maybe<Competition>;
  count?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  extraAmount?: Maybe<Scalars['Int']['output']>;
  extraAmountDescription?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  includes?: Maybe<Scalars['String']['output']>;
  isInstallment?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  per?: Maybe<Scalars['String']['output']>;
  planName?: Maybe<Scalars['String']['output']>;
  season?: Maybe<Season>;
  title?: Maybe<Scalars['String']['output']>;
  uiOrder?: Maybe<Scalars['Int']['output']>;
};

export type PaymentPlanCreateInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  competition?: InputMaybe<CompetitionRelateToOneForCreateInput>;
  count?: InputMaybe<Scalars['Int']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  extraAmount?: InputMaybe<Scalars['Int']['input']>;
  extraAmountDescription?: InputMaybe<Scalars['String']['input']>;
  includes?: InputMaybe<Scalars['String']['input']>;
  isInstallment?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  per?: InputMaybe<Scalars['String']['input']>;
  planName?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<SeasonRelateToOneForCreateInput>;
  uiOrder?: InputMaybe<Scalars['Int']['input']>;
};

export type PaymentPlanManyRelationFilter = {
  every?: InputMaybe<PaymentPlanWhereInput>;
  none?: InputMaybe<PaymentPlanWhereInput>;
  some?: InputMaybe<PaymentPlanWhereInput>;
};

export type PaymentPlanOrderByInput = {
  amount?: InputMaybe<OrderDirection>;
  count?: InputMaybe<OrderDirection>;
  currency?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  extraAmount?: InputMaybe<OrderDirection>;
  extraAmountDescription?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  includes?: InputMaybe<OrderDirection>;
  isInstallment?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  per?: InputMaybe<OrderDirection>;
  planName?: InputMaybe<OrderDirection>;
  uiOrder?: InputMaybe<OrderDirection>;
};

export type PaymentPlanRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<PaymentPlanWhereUniqueInput>>;
  create?: InputMaybe<Array<PaymentPlanCreateInput>>;
};

export type PaymentPlanRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<PaymentPlanWhereUniqueInput>>;
  create?: InputMaybe<Array<PaymentPlanCreateInput>>;
  disconnect?: InputMaybe<Array<PaymentPlanWhereUniqueInput>>;
  set?: InputMaybe<Array<PaymentPlanWhereUniqueInput>>;
};

export type PaymentPlanRelateToOneForCreateInput = {
  connect?: InputMaybe<PaymentPlanWhereUniqueInput>;
  create?: InputMaybe<PaymentPlanCreateInput>;
};

export type PaymentPlanRelateToOneForUpdateInput = {
  connect?: InputMaybe<PaymentPlanWhereUniqueInput>;
  create?: InputMaybe<PaymentPlanCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PaymentPlanUpdateArgs = {
  data: PaymentPlanUpdateInput;
  where: PaymentPlanWhereUniqueInput;
};

export type PaymentPlanUpdateInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  competition?: InputMaybe<CompetitionRelateToOneForUpdateInput>;
  count?: InputMaybe<Scalars['Int']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  extraAmount?: InputMaybe<Scalars['Int']['input']>;
  extraAmountDescription?: InputMaybe<Scalars['String']['input']>;
  includes?: InputMaybe<Scalars['String']['input']>;
  isInstallment?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  per?: InputMaybe<Scalars['String']['input']>;
  planName?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<SeasonRelateToOneForUpdateInput>;
  uiOrder?: InputMaybe<Scalars['Int']['input']>;
};

export type PaymentPlanWhereInput = {
  AND?: InputMaybe<Array<PaymentPlanWhereInput>>;
  NOT?: InputMaybe<Array<PaymentPlanWhereInput>>;
  OR?: InputMaybe<Array<PaymentPlanWhereInput>>;
  amount?: InputMaybe<IntFilter>;
  competition?: InputMaybe<CompetitionWhereInput>;
  count?: InputMaybe<IntNullableFilter>;
  currency?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  extraAmount?: InputMaybe<IntNullableFilter>;
  extraAmountDescription?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  includes?: InputMaybe<StringFilter>;
  isInstallment?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
  per?: InputMaybe<StringFilter>;
  planName?: InputMaybe<StringFilter>;
  season?: InputMaybe<SeasonWhereInput>;
  uiOrder?: InputMaybe<IntNullableFilter>;
};

export type PaymentPlanWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type PaymentRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<PaymentWhereUniqueInput>>;
  create?: InputMaybe<Array<PaymentCreateInput>>;
};

export type PaymentRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<PaymentWhereUniqueInput>>;
  create?: InputMaybe<Array<PaymentCreateInput>>;
  disconnect?: InputMaybe<Array<PaymentWhereUniqueInput>>;
  set?: InputMaybe<Array<PaymentWhereUniqueInput>>;
};

export type PaymentUpdateArgs = {
  data: PaymentUpdateInput;
  where: PaymentWhereUniqueInput;
};

export type PaymentUpdateInput = {
  amount?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  discount?: InputMaybe<PaymentDiscountRelateToOneForUpdateInput>;
  intentionId?: InputMaybe<Scalars['String']['input']>;
  isFulfilled?: InputMaybe<Scalars['Boolean']['input']>;
  isInvoiceEmailed?: InputMaybe<Scalars['Boolean']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderResponse?: InputMaybe<Scalars['JSON']['input']>;
  participation?: InputMaybe<ParticipationRelateToOneForUpdateInput>;
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  pending?: InputMaybe<Scalars['Boolean']['input']>;
  plan?: InputMaybe<PaymentPlanRelateToOneForUpdateInput>;
  player?: InputMaybe<PlayerRelateToOneForUpdateInput>;
  salesReceiptId?: InputMaybe<Scalars['String']['input']>;
  success?: InputMaybe<Scalars['Boolean']['input']>;
  txId?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentWhereInput = {
  AND?: InputMaybe<Array<PaymentWhereInput>>;
  NOT?: InputMaybe<Array<PaymentWhereInput>>;
  OR?: InputMaybe<Array<PaymentWhereInput>>;
  amount?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  currency?: InputMaybe<StringFilter>;
  discount?: InputMaybe<PaymentDiscountWhereInput>;
  id?: InputMaybe<IdFilter>;
  intentionId?: InputMaybe<StringFilter>;
  isFulfilled?: InputMaybe<BooleanFilter>;
  isInvoiceEmailed?: InputMaybe<BooleanFilter>;
  orderId?: InputMaybe<StringFilter>;
  participation?: InputMaybe<ParticipationWhereInput>;
  paymentMethod?: InputMaybe<StringNullableFilter>;
  pending?: InputMaybe<BooleanFilter>;
  plan?: InputMaybe<PaymentPlanWhereInput>;
  player?: InputMaybe<PlayerWhereInput>;
  salesReceiptId?: InputMaybe<StringFilter>;
  success?: InputMaybe<BooleanFilter>;
  txId?: InputMaybe<StringFilter>;
};

export type PaymentWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
};

export type Player = {
  __typename?: 'Player';
  SendQRCode?: Maybe<Scalars['JSON']['output']>;
  ability?: Maybe<Scalars['String']['output']>;
  age?: Maybe<Scalars['Int']['output']>;
  assessment?: Maybe<Scalars['JSON']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  booksCustomerId?: Maybe<Scalars['String']['output']>;
  competitions?: Maybe<Array<Competition>>;
  competitionsCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dateOfBirth?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  hometown?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isCaptain?: Maybe<Scalars['Boolean']['output']>;
  isCurrentTeamVerified?: Maybe<Scalars['JSON']['output']>;
  jerseyName?: Maybe<Scalars['String']['output']>;
  jerseyNumber?: Maybe<Scalars['Int']['output']>;
  kitSize?: Maybe<Scalars['String']['output']>;
  knowsUsFrom?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  loginPass?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nationalIdImage?: Maybe<ImageFieldOutput>;
  nickname?: Maybe<Scalars['String']['output']>;
  paid?: Maybe<Scalars['Boolean']['output']>;
  participation?: Maybe<Array<Participation>>;
  participationCount?: Maybe<Scalars['Int']['output']>;
  paymentPlan?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<ImageFieldOutput>;
  playerID?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  preferredFoot?: Maybe<Scalars['String']['output']>;
  receiveEmails?: Maybe<Scalars['Boolean']['output']>;
  secondPosition?: Maybe<Scalars['String']['output']>;
  sendEmail?: Maybe<Scalars['JSON']['output']>;
  setPassword?: Maybe<Scalars['JSON']['output']>;
  skill?: Maybe<Scalars['String']['output']>;
  suspended?: Maybe<Scalars['Boolean']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  work?: Maybe<Scalars['String']['output']>;
};


export type PlayerCompetitionsArgs = {
  cursor?: InputMaybe<CompetitionWhereUniqueInput>;
  orderBy?: Array<CompetitionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CompetitionWhereInput;
};


export type PlayerCompetitionsCountArgs = {
  where?: CompetitionWhereInput;
};


export type PlayerParticipationArgs = {
  cursor?: InputMaybe<ParticipationWhereUniqueInput>;
  orderBy?: Array<ParticipationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ParticipationWhereInput;
};


export type PlayerParticipationCountArgs = {
  where?: ParticipationWhereInput;
};

export type PlayerCreateInput = {
  ability?: InputMaybe<Scalars['String']['input']>;
  age?: InputMaybe<Scalars['Int']['input']>;
  assessment?: InputMaybe<Scalars['JSON']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  booksCustomerId?: InputMaybe<Scalars['String']['input']>;
  competitions?: InputMaybe<CompetitionRelateToManyForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  hometown?: InputMaybe<Scalars['String']['input']>;
  isCaptain?: InputMaybe<Scalars['Boolean']['input']>;
  jerseyName?: InputMaybe<Scalars['String']['input']>;
  jerseyNumber?: InputMaybe<Scalars['Int']['input']>;
  kitSize?: InputMaybe<Scalars['String']['input']>;
  knowsUsFrom?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  loginPass?: InputMaybe<Scalars['String']['input']>;
  nationalIdImage?: InputMaybe<ImageFieldInput>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  paid?: InputMaybe<Scalars['Boolean']['input']>;
  participation?: InputMaybe<ParticipationRelateToManyForCreateInput>;
  paymentPlan?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  photo?: InputMaybe<ImageFieldInput>;
  playerID?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  preferredFoot?: InputMaybe<Scalars['String']['input']>;
  receiveEmails?: InputMaybe<Scalars['Boolean']['input']>;
  secondPosition?: InputMaybe<Scalars['String']['input']>;
  skill?: InputMaybe<Scalars['String']['input']>;
  suspended?: InputMaybe<Scalars['Boolean']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  work?: InputMaybe<Scalars['String']['input']>;
};

export type PlayerOrderByInput = {
  ability?: InputMaybe<OrderDirection>;
  age?: InputMaybe<OrderDirection>;
  bio?: InputMaybe<OrderDirection>;
  booksCustomerId?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  dateOfBirth?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  firstName?: InputMaybe<OrderDirection>;
  height?: InputMaybe<OrderDirection>;
  hometown?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isCaptain?: InputMaybe<OrderDirection>;
  jerseyName?: InputMaybe<OrderDirection>;
  jerseyNumber?: InputMaybe<OrderDirection>;
  kitSize?: InputMaybe<OrderDirection>;
  knowsUsFrom?: InputMaybe<OrderDirection>;
  lastName?: InputMaybe<OrderDirection>;
  loginPass?: InputMaybe<OrderDirection>;
  nickname?: InputMaybe<OrderDirection>;
  paid?: InputMaybe<OrderDirection>;
  paymentPlan?: InputMaybe<OrderDirection>;
  phoneNumber?: InputMaybe<OrderDirection>;
  playerID?: InputMaybe<OrderDirection>;
  position?: InputMaybe<OrderDirection>;
  preferredFoot?: InputMaybe<OrderDirection>;
  receiveEmails?: InputMaybe<OrderDirection>;
  secondPosition?: InputMaybe<OrderDirection>;
  skill?: InputMaybe<OrderDirection>;
  suspended?: InputMaybe<OrderDirection>;
  verified?: InputMaybe<OrderDirection>;
  weight?: InputMaybe<OrderDirection>;
  work?: InputMaybe<OrderDirection>;
};

export type PlayerRelateToOneForCreateInput = {
  connect?: InputMaybe<PlayerWhereUniqueInput>;
  create?: InputMaybe<PlayerCreateInput>;
};

export type PlayerRelateToOneForUpdateInput = {
  connect?: InputMaybe<PlayerWhereUniqueInput>;
  create?: InputMaybe<PlayerCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PlayerUpdateArgs = {
  data: PlayerUpdateInput;
  where: PlayerWhereUniqueInput;
};

export type PlayerUpdateInput = {
  ability?: InputMaybe<Scalars['String']['input']>;
  age?: InputMaybe<Scalars['Int']['input']>;
  assessment?: InputMaybe<Scalars['JSON']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  booksCustomerId?: InputMaybe<Scalars['String']['input']>;
  competitions?: InputMaybe<CompetitionRelateToManyForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  hometown?: InputMaybe<Scalars['String']['input']>;
  isCaptain?: InputMaybe<Scalars['Boolean']['input']>;
  jerseyName?: InputMaybe<Scalars['String']['input']>;
  jerseyNumber?: InputMaybe<Scalars['Int']['input']>;
  kitSize?: InputMaybe<Scalars['String']['input']>;
  knowsUsFrom?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  loginPass?: InputMaybe<Scalars['String']['input']>;
  nationalIdImage?: InputMaybe<ImageFieldInput>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  paid?: InputMaybe<Scalars['Boolean']['input']>;
  participation?: InputMaybe<ParticipationRelateToManyForUpdateInput>;
  paymentPlan?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  photo?: InputMaybe<ImageFieldInput>;
  playerID?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  preferredFoot?: InputMaybe<Scalars['String']['input']>;
  receiveEmails?: InputMaybe<Scalars['Boolean']['input']>;
  secondPosition?: InputMaybe<Scalars['String']['input']>;
  skill?: InputMaybe<Scalars['String']['input']>;
  suspended?: InputMaybe<Scalars['Boolean']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  work?: InputMaybe<Scalars['String']['input']>;
};

export type PlayerWhereInput = {
  AND?: InputMaybe<Array<PlayerWhereInput>>;
  NOT?: InputMaybe<Array<PlayerWhereInput>>;
  OR?: InputMaybe<Array<PlayerWhereInput>>;
  ability?: InputMaybe<StringNullableFilter>;
  age?: InputMaybe<IntNullableFilter>;
  bio?: InputMaybe<StringFilter>;
  booksCustomerId?: InputMaybe<StringFilter>;
  competitions?: InputMaybe<CompetitionManyRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  dateOfBirth?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  height?: InputMaybe<FloatNullableFilter>;
  hometown?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IdFilter>;
  isCaptain?: InputMaybe<BooleanFilter>;
  jerseyName?: InputMaybe<StringFilter>;
  jerseyNumber?: InputMaybe<IntFilter>;
  kitSize?: InputMaybe<StringNullableFilter>;
  knowsUsFrom?: InputMaybe<StringNullableFilter>;
  lastName?: InputMaybe<StringFilter>;
  loginPass?: InputMaybe<StringFilter>;
  nickname?: InputMaybe<StringFilter>;
  paid?: InputMaybe<BooleanFilter>;
  participation?: InputMaybe<ParticipationManyRelationFilter>;
  paymentPlan?: InputMaybe<StringNullableFilter>;
  phoneNumber?: InputMaybe<StringFilter>;
  playerID?: InputMaybe<StringFilter>;
  position?: InputMaybe<StringNullableFilter>;
  preferredFoot?: InputMaybe<StringNullableFilter>;
  receiveEmails?: InputMaybe<BooleanFilter>;
  secondPosition?: InputMaybe<StringNullableFilter>;
  skill?: InputMaybe<StringNullableFilter>;
  suspended?: InputMaybe<BooleanFilter>;
  verified?: InputMaybe<BooleanFilter>;
  weight?: InputMaybe<FloatNullableFilter>;
  work?: InputMaybe<StringFilter>;
};

export type PlayerWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  playerID?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  arena?: Maybe<Arena>;
  arenaParticipant?: Maybe<ArenaParticipant>;
  arenaParticipants?: Maybe<Array<ArenaParticipant>>;
  arenaParticipantsCount?: Maybe<Scalars['Int']['output']>;
  arenas?: Maybe<Array<Arena>>;
  arenasCount?: Maybe<Scalars['Int']['output']>;
  authenticatedItem?: Maybe<AuthenticatedItem>;
  badge?: Maybe<Badge>;
  badges?: Maybe<Array<Badge>>;
  badgesCount?: Maybe<Scalars['Int']['output']>;
  beProPlayer?: Maybe<BeProPlayer>;
  beProPlayers?: Maybe<Array<BeProPlayer>>;
  beProPlayersCount?: Maybe<Scalars['Int']['output']>;
  communities?: Maybe<Array<Community>>;
  communitiesCount?: Maybe<Scalars['Int']['output']>;
  community?: Maybe<Community>;
  communityMembership?: Maybe<CommunityMembership>;
  communityMemberships?: Maybe<Array<CommunityMembership>>;
  communityMembershipsCount?: Maybe<Scalars['Int']['output']>;
  communitySeason?: Maybe<CommunitySeason>;
  communitySeasons?: Maybe<Array<CommunitySeason>>;
  communitySeasonsCount?: Maybe<Scalars['Int']['output']>;
  competition?: Maybe<Competition>;
  competitions?: Maybe<Array<Competition>>;
  competitionsCount?: Maybe<Scalars['Int']['output']>;
  dashAdmin?: Maybe<DashAdmin>;
  dashAdmins?: Maybe<Array<DashAdmin>>;
  dashAdminsCount?: Maybe<Scalars['Int']['output']>;
  dellCompetiton?: Maybe<DellCompetiton>;
  dellCompetitons?: Maybe<Array<DellCompetiton>>;
  dellCompetitonsCount?: Maybe<Scalars['Int']['output']>;
  homePage?: Maybe<HomePage>;
  homePages?: Maybe<Array<HomePage>>;
  homePagesCount?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Image>;
  images?: Maybe<Array<Image>>;
  imagesCount?: Maybe<Scalars['Int']['output']>;
  invite?: Maybe<Invite>;
  invites?: Maybe<Array<Invite>>;
  invitesCount?: Maybe<Scalars['Int']['output']>;
  keystone: KeystoneMeta;
  leaderboard?: Maybe<Leaderboard>;
  leaderboardEntries?: Maybe<Array<LeaderboardEntry>>;
  leaderboardEntriesCount?: Maybe<Scalars['Int']['output']>;
  leaderboardEntry?: Maybe<LeaderboardEntry>;
  leaderboards?: Maybe<Array<Leaderboard>>;
  leaderboardsCount?: Maybe<Scalars['Int']['output']>;
  leagueCorrespondence?: Maybe<LeagueCorrespondence>;
  leagueCorrespondences?: Maybe<Array<LeagueCorrespondence>>;
  leagueCorrespondencesCount?: Maybe<Scalars['Int']['output']>;
  leagueInfo?: Maybe<LeagueInfo>;
  leagueInfos?: Maybe<Array<LeagueInfo>>;
  leagueInfosCount?: Maybe<Scalars['Int']['output']>;
  leagueTable?: Maybe<LeagueTable>;
  leagueTables?: Maybe<Array<LeagueTable>>;
  leagueTablesCount?: Maybe<Scalars['Int']['output']>;
  match?: Maybe<Match>;
  matches?: Maybe<Array<Match>>;
  matchesCount?: Maybe<Scalars['Int']['output']>;
  new?: Maybe<New>;
  news?: Maybe<Array<New>>;
  newsCount?: Maybe<Scalars['Int']['output']>;
  pSC?: Maybe<Psc>;
  pSCS?: Maybe<Array<Psc>>;
  pSCSCount?: Maybe<Scalars['Int']['output']>;
  participation?: Maybe<Participation>;
  participations?: Maybe<Array<Participation>>;
  participationsCount?: Maybe<Scalars['Int']['output']>;
  partner?: Maybe<Partner>;
  partners?: Maybe<Array<Partner>>;
  partnersCount?: Maybe<Scalars['Int']['output']>;
  payment?: Maybe<Payment>;
  paymentDiscount?: Maybe<PaymentDiscount>;
  paymentDiscounts?: Maybe<Array<PaymentDiscount>>;
  paymentDiscountsCount?: Maybe<Scalars['Int']['output']>;
  paymentPlan?: Maybe<PaymentPlan>;
  paymentPlans?: Maybe<Array<PaymentPlan>>;
  paymentPlansCount?: Maybe<Scalars['Int']['output']>;
  payments?: Maybe<Array<Payment>>;
  paymentsCount?: Maybe<Scalars['Int']['output']>;
  player?: Maybe<Player>;
  players?: Maybe<Array<Player>>;
  playersCount?: Maybe<Scalars['Int']['output']>;
  role?: Maybe<Role>;
  roles?: Maybe<Array<Role>>;
  rolesCount?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Season>;
  seasons?: Maybe<Array<Season>>;
  seasonsCount?: Maybe<Scalars['Int']['output']>;
  team?: Maybe<Team>;
  teams?: Maybe<Array<Team>>;
  teamsCount?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
  userBadge?: Maybe<UserBadge>;
  userBadges?: Maybe<Array<UserBadge>>;
  userBadgesCount?: Maybe<Scalars['Int']['output']>;
  userMemberShip?: Maybe<UserMemberShip>;
  userMemberShips?: Maybe<Array<UserMemberShip>>;
  userMemberShipsCount?: Maybe<Scalars['Int']['output']>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
  zohoBook?: Maybe<ZohoBook>;
  zohoBooks?: Maybe<Array<ZohoBook>>;
  zohoBooksCount?: Maybe<Scalars['Int']['output']>;
};


export type QueryArenaArgs = {
  where: ArenaWhereUniqueInput;
};


export type QueryArenaParticipantArgs = {
  where: ArenaParticipantWhereUniqueInput;
};


export type QueryArenaParticipantsArgs = {
  cursor?: InputMaybe<ArenaParticipantWhereUniqueInput>;
  orderBy?: Array<ArenaParticipantOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ArenaParticipantWhereInput;
};


export type QueryArenaParticipantsCountArgs = {
  where?: ArenaParticipantWhereInput;
};


export type QueryArenasArgs = {
  cursor?: InputMaybe<ArenaWhereUniqueInput>;
  orderBy?: Array<ArenaOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ArenaWhereInput;
};


export type QueryArenasCountArgs = {
  where?: ArenaWhereInput;
};


export type QueryBadgeArgs = {
  where: BadgeWhereUniqueInput;
};


export type QueryBadgesArgs = {
  cursor?: InputMaybe<BadgeWhereUniqueInput>;
  orderBy?: Array<BadgeOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: BadgeWhereInput;
};


export type QueryBadgesCountArgs = {
  where?: BadgeWhereInput;
};


export type QueryBeProPlayerArgs = {
  where: BeProPlayerWhereUniqueInput;
};


export type QueryBeProPlayersArgs = {
  cursor?: InputMaybe<BeProPlayerWhereUniqueInput>;
  orderBy?: Array<BeProPlayerOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: BeProPlayerWhereInput;
};


export type QueryBeProPlayersCountArgs = {
  where?: BeProPlayerWhereInput;
};


export type QueryCommunitiesArgs = {
  cursor?: InputMaybe<CommunityWhereUniqueInput>;
  orderBy?: Array<CommunityOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CommunityWhereInput;
};


export type QueryCommunitiesCountArgs = {
  where?: CommunityWhereInput;
};


export type QueryCommunityArgs = {
  where: CommunityWhereUniqueInput;
};


export type QueryCommunityMembershipArgs = {
  where: CommunityMembershipWhereUniqueInput;
};


export type QueryCommunityMembershipsArgs = {
  cursor?: InputMaybe<CommunityMembershipWhereUniqueInput>;
  orderBy?: Array<CommunityMembershipOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CommunityMembershipWhereInput;
};


export type QueryCommunityMembershipsCountArgs = {
  where?: CommunityMembershipWhereInput;
};


export type QueryCommunitySeasonArgs = {
  where: CommunitySeasonWhereUniqueInput;
};


export type QueryCommunitySeasonsArgs = {
  cursor?: InputMaybe<CommunitySeasonWhereUniqueInput>;
  orderBy?: Array<CommunitySeasonOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CommunitySeasonWhereInput;
};


export type QueryCommunitySeasonsCountArgs = {
  where?: CommunitySeasonWhereInput;
};


export type QueryCompetitionArgs = {
  where: CompetitionWhereUniqueInput;
};


export type QueryCompetitionsArgs = {
  cursor?: InputMaybe<CompetitionWhereUniqueInput>;
  orderBy?: Array<CompetitionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CompetitionWhereInput;
};


export type QueryCompetitionsCountArgs = {
  where?: CompetitionWhereInput;
};


export type QueryDashAdminArgs = {
  where: DashAdminWhereUniqueInput;
};


export type QueryDashAdminsArgs = {
  cursor?: InputMaybe<DashAdminWhereUniqueInput>;
  orderBy?: Array<DashAdminOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: DashAdminWhereInput;
};


export type QueryDashAdminsCountArgs = {
  where?: DashAdminWhereInput;
};


export type QueryDellCompetitonArgs = {
  where: DellCompetitonWhereUniqueInput;
};


export type QueryDellCompetitonsArgs = {
  cursor?: InputMaybe<DellCompetitonWhereUniqueInput>;
  orderBy?: Array<DellCompetitonOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: DellCompetitonWhereInput;
};


export type QueryDellCompetitonsCountArgs = {
  where?: DellCompetitonWhereInput;
};


export type QueryHomePageArgs = {
  where?: HomePageWhereUniqueInput;
};


export type QueryHomePagesArgs = {
  cursor?: InputMaybe<HomePageWhereUniqueInput>;
  orderBy?: Array<HomePageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: HomePageWhereInput;
};


export type QueryHomePagesCountArgs = {
  where?: HomePageWhereInput;
};


export type QueryImageArgs = {
  where: ImageWhereUniqueInput;
};


export type QueryImagesArgs = {
  cursor?: InputMaybe<ImageWhereUniqueInput>;
  orderBy?: Array<ImageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ImageWhereInput;
};


export type QueryImagesCountArgs = {
  where?: ImageWhereInput;
};


export type QueryInviteArgs = {
  where: InviteWhereUniqueInput;
};


export type QueryInvitesArgs = {
  cursor?: InputMaybe<InviteWhereUniqueInput>;
  orderBy?: Array<InviteOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InviteWhereInput;
};


export type QueryInvitesCountArgs = {
  where?: InviteWhereInput;
};


export type QueryLeaderboardArgs = {
  where: LeaderboardWhereUniqueInput;
};


export type QueryLeaderboardEntriesArgs = {
  cursor?: InputMaybe<LeaderboardEntryWhereUniqueInput>;
  orderBy?: Array<LeaderboardEntryOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LeaderboardEntryWhereInput;
};


export type QueryLeaderboardEntriesCountArgs = {
  where?: LeaderboardEntryWhereInput;
};


export type QueryLeaderboardEntryArgs = {
  where: LeaderboardEntryWhereUniqueInput;
};


export type QueryLeaderboardsArgs = {
  cursor?: InputMaybe<LeaderboardWhereUniqueInput>;
  orderBy?: Array<LeaderboardOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LeaderboardWhereInput;
};


export type QueryLeaderboardsCountArgs = {
  where?: LeaderboardWhereInput;
};


export type QueryLeagueCorrespondenceArgs = {
  where: LeagueCorrespondenceWhereUniqueInput;
};


export type QueryLeagueCorrespondencesArgs = {
  cursor?: InputMaybe<LeagueCorrespondenceWhereUniqueInput>;
  orderBy?: Array<LeagueCorrespondenceOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LeagueCorrespondenceWhereInput;
};


export type QueryLeagueCorrespondencesCountArgs = {
  where?: LeagueCorrespondenceWhereInput;
};


export type QueryLeagueInfoArgs = {
  where: LeagueInfoWhereUniqueInput;
};


export type QueryLeagueInfosArgs = {
  cursor?: InputMaybe<LeagueInfoWhereUniqueInput>;
  orderBy?: Array<LeagueInfoOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LeagueInfoWhereInput;
};


export type QueryLeagueInfosCountArgs = {
  where?: LeagueInfoWhereInput;
};


export type QueryLeagueTableArgs = {
  where: LeagueTableWhereUniqueInput;
};


export type QueryLeagueTablesArgs = {
  cursor?: InputMaybe<LeagueTableWhereUniqueInput>;
  orderBy?: Array<LeagueTableOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LeagueTableWhereInput;
};


export type QueryLeagueTablesCountArgs = {
  where?: LeagueTableWhereInput;
};


export type QueryMatchArgs = {
  where: MatchWhereUniqueInput;
};


export type QueryMatchesArgs = {
  cursor?: InputMaybe<MatchWhereUniqueInput>;
  orderBy?: Array<MatchOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: MatchWhereInput;
};


export type QueryMatchesCountArgs = {
  where?: MatchWhereInput;
};


export type QueryNewArgs = {
  where: NewWhereUniqueInput;
};


export type QueryNewsArgs = {
  cursor?: InputMaybe<NewWhereUniqueInput>;
  orderBy?: Array<NewOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: NewWhereInput;
};


export type QueryNewsCountArgs = {
  where?: NewWhereInput;
};


export type QueryPScArgs = {
  where: PscWhereUniqueInput;
};


export type QueryPScsArgs = {
  cursor?: InputMaybe<PscWhereUniqueInput>;
  orderBy?: Array<PscOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PscWhereInput;
};


export type QueryPScsCountArgs = {
  where?: PscWhereInput;
};


export type QueryParticipationArgs = {
  where: ParticipationWhereUniqueInput;
};


export type QueryParticipationsArgs = {
  cursor?: InputMaybe<ParticipationWhereUniqueInput>;
  orderBy?: Array<ParticipationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ParticipationWhereInput;
};


export type QueryParticipationsCountArgs = {
  where?: ParticipationWhereInput;
};


export type QueryPartnerArgs = {
  where: PartnerWhereUniqueInput;
};


export type QueryPartnersArgs = {
  cursor?: InputMaybe<PartnerWhereUniqueInput>;
  orderBy?: Array<PartnerOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PartnerWhereInput;
};


export type QueryPartnersCountArgs = {
  where?: PartnerWhereInput;
};


export type QueryPaymentArgs = {
  where: PaymentWhereUniqueInput;
};


export type QueryPaymentDiscountArgs = {
  where: PaymentDiscountWhereUniqueInput;
};


export type QueryPaymentDiscountsArgs = {
  cursor?: InputMaybe<PaymentDiscountWhereUniqueInput>;
  orderBy?: Array<PaymentDiscountOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PaymentDiscountWhereInput;
};


export type QueryPaymentDiscountsCountArgs = {
  where?: PaymentDiscountWhereInput;
};


export type QueryPaymentPlanArgs = {
  where: PaymentPlanWhereUniqueInput;
};


export type QueryPaymentPlansArgs = {
  cursor?: InputMaybe<PaymentPlanWhereUniqueInput>;
  orderBy?: Array<PaymentPlanOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PaymentPlanWhereInput;
};


export type QueryPaymentPlansCountArgs = {
  where?: PaymentPlanWhereInput;
};


export type QueryPaymentsArgs = {
  cursor?: InputMaybe<PaymentWhereUniqueInput>;
  orderBy?: Array<PaymentOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PaymentWhereInput;
};


export type QueryPaymentsCountArgs = {
  where?: PaymentWhereInput;
};


export type QueryPlayerArgs = {
  where: PlayerWhereUniqueInput;
};


export type QueryPlayersArgs = {
  cursor?: InputMaybe<PlayerWhereUniqueInput>;
  orderBy?: Array<PlayerOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PlayerWhereInput;
};


export type QueryPlayersCountArgs = {
  where?: PlayerWhereInput;
};


export type QueryRoleArgs = {
  where: RoleWhereUniqueInput;
};


export type QueryRolesArgs = {
  cursor?: InputMaybe<RoleWhereUniqueInput>;
  orderBy?: Array<RoleOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: RoleWhereInput;
};


export type QueryRolesCountArgs = {
  where?: RoleWhereInput;
};


export type QuerySeasonArgs = {
  where: SeasonWhereUniqueInput;
};


export type QuerySeasonsArgs = {
  cursor?: InputMaybe<SeasonWhereUniqueInput>;
  orderBy?: Array<SeasonOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: SeasonWhereInput;
};


export type QuerySeasonsCountArgs = {
  where?: SeasonWhereInput;
};


export type QueryTeamArgs = {
  where: TeamWhereUniqueInput;
};


export type QueryTeamsArgs = {
  cursor?: InputMaybe<TeamWhereUniqueInput>;
  orderBy?: Array<TeamOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TeamWhereInput;
};


export type QueryTeamsCountArgs = {
  where?: TeamWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUserBadgeArgs = {
  where: UserBadgeWhereUniqueInput;
};


export type QueryUserBadgesArgs = {
  cursor?: InputMaybe<UserBadgeWhereUniqueInput>;
  orderBy?: Array<UserBadgeOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserBadgeWhereInput;
};


export type QueryUserBadgesCountArgs = {
  where?: UserBadgeWhereInput;
};


export type QueryUserMemberShipArgs = {
  where: UserMemberShipWhereUniqueInput;
};


export type QueryUserMemberShipsArgs = {
  cursor?: InputMaybe<UserMemberShipWhereUniqueInput>;
  orderBy?: Array<UserMemberShipOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserMemberShipWhereInput;
};


export type QueryUserMemberShipsCountArgs = {
  where?: UserMemberShipWhereInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};


export type QueryZohoBookArgs = {
  where?: ZohoBookWhereUniqueInput;
};


export type QueryZohoBooksArgs = {
  cursor?: InputMaybe<ZohoBookWhereUniqueInput>;
  orderBy?: Array<ZohoBookOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ZohoBookWhereInput;
};


export type QueryZohoBooksCountArgs = {
  where?: ZohoBookWhereInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type Role = {
  __typename?: 'Role';
  assignedTo?: Maybe<Array<User>>;
  assignedToCount?: Maybe<Scalars['Int']['output']>;
  assignedToDashAdmin?: Maybe<Array<DashAdmin>>;
  assignedToDashAdminCount?: Maybe<Scalars['Int']['output']>;
  canUserCreate?: Maybe<Scalars['Boolean']['output']>;
  canUserEditOtherPeople?: Maybe<Scalars['Boolean']['output']>;
  canUserManageAll?: Maybe<Scalars['Boolean']['output']>;
  canUserManagePeople?: Maybe<Scalars['Boolean']['output']>;
  canUserManageRoles?: Maybe<Scalars['Boolean']['output']>;
  canUserSeeOtherPeople?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};


export type RoleAssignedToArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type RoleAssignedToCountArgs = {
  where?: UserWhereInput;
};


export type RoleAssignedToDashAdminArgs = {
  cursor?: InputMaybe<DashAdminWhereUniqueInput>;
  orderBy?: Array<DashAdminOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: DashAdminWhereInput;
};


export type RoleAssignedToDashAdminCountArgs = {
  where?: DashAdminWhereInput;
};

export type RoleCreateInput = {
  assignedTo?: InputMaybe<UserRelateToManyForCreateInput>;
  assignedToDashAdmin?: InputMaybe<DashAdminRelateToManyForCreateInput>;
  canUserCreate?: InputMaybe<Scalars['Boolean']['input']>;
  canUserEditOtherPeople?: InputMaybe<Scalars['Boolean']['input']>;
  canUserManageAll?: InputMaybe<Scalars['Boolean']['input']>;
  canUserManagePeople?: InputMaybe<Scalars['Boolean']['input']>;
  canUserManageRoles?: InputMaybe<Scalars['Boolean']['input']>;
  canUserSeeOtherPeople?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type RoleManyRelationFilter = {
  every?: InputMaybe<RoleWhereInput>;
  none?: InputMaybe<RoleWhereInput>;
  some?: InputMaybe<RoleWhereInput>;
};

export type RoleOrderByInput = {
  canUserCreate?: InputMaybe<OrderDirection>;
  canUserEditOtherPeople?: InputMaybe<OrderDirection>;
  canUserManageAll?: InputMaybe<OrderDirection>;
  canUserManagePeople?: InputMaybe<OrderDirection>;
  canUserManageRoles?: InputMaybe<OrderDirection>;
  canUserSeeOtherPeople?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type RoleRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<RoleWhereUniqueInput>>;
  create?: InputMaybe<Array<RoleCreateInput>>;
};

export type RoleRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<RoleWhereUniqueInput>>;
  create?: InputMaybe<Array<RoleCreateInput>>;
  disconnect?: InputMaybe<Array<RoleWhereUniqueInput>>;
  set?: InputMaybe<Array<RoleWhereUniqueInput>>;
};

export type RoleRelateToOneForCreateInput = {
  connect?: InputMaybe<RoleWhereUniqueInput>;
  create?: InputMaybe<RoleCreateInput>;
};

export type RoleRelateToOneForUpdateInput = {
  connect?: InputMaybe<RoleWhereUniqueInput>;
  create?: InputMaybe<RoleCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RoleUpdateArgs = {
  data: RoleUpdateInput;
  where: RoleWhereUniqueInput;
};

export type RoleUpdateInput = {
  assignedTo?: InputMaybe<UserRelateToManyForUpdateInput>;
  assignedToDashAdmin?: InputMaybe<DashAdminRelateToManyForUpdateInput>;
  canUserCreate?: InputMaybe<Scalars['Boolean']['input']>;
  canUserEditOtherPeople?: InputMaybe<Scalars['Boolean']['input']>;
  canUserManageAll?: InputMaybe<Scalars['Boolean']['input']>;
  canUserManagePeople?: InputMaybe<Scalars['Boolean']['input']>;
  canUserManageRoles?: InputMaybe<Scalars['Boolean']['input']>;
  canUserSeeOtherPeople?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type RoleWhereInput = {
  AND?: InputMaybe<Array<RoleWhereInput>>;
  NOT?: InputMaybe<Array<RoleWhereInput>>;
  OR?: InputMaybe<Array<RoleWhereInput>>;
  assignedTo?: InputMaybe<UserManyRelationFilter>;
  assignedToDashAdmin?: InputMaybe<DashAdminManyRelationFilter>;
  canUserCreate?: InputMaybe<BooleanFilter>;
  canUserEditOtherPeople?: InputMaybe<BooleanFilter>;
  canUserManageAll?: InputMaybe<BooleanFilter>;
  canUserManagePeople?: InputMaybe<BooleanFilter>;
  canUserManageRoles?: InputMaybe<BooleanFilter>;
  canUserSeeOtherPeople?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
};

export type RoleWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Season = {
  __typename?: 'Season';
  arenas?: Maybe<Array<Arena>>;
  arenasCount?: Maybe<Scalars['Int']['output']>;
  community?: Maybe<Community>;
  competitions?: Maybe<Array<Competition>>;
  competitionsCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  leaderboards?: Maybe<Array<Leaderboard>>;
  leaderboardsCount?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  registerationDeadline?: Maybe<Scalars['DateTime']['output']>;
  seasonNumber?: Maybe<Scalars['Int']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  updateTable?: Maybe<Scalars['Boolean']['output']>;
};


export type SeasonArenasArgs = {
  cursor?: InputMaybe<ArenaWhereUniqueInput>;
  orderBy?: Array<ArenaOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ArenaWhereInput;
};


export type SeasonArenasCountArgs = {
  where?: ArenaWhereInput;
};


export type SeasonCompetitionsArgs = {
  cursor?: InputMaybe<CompetitionWhereUniqueInput>;
  orderBy?: Array<CompetitionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CompetitionWhereInput;
};


export type SeasonCompetitionsCountArgs = {
  where?: CompetitionWhereInput;
};


export type SeasonLeaderboardsArgs = {
  cursor?: InputMaybe<LeaderboardWhereUniqueInput>;
  orderBy?: Array<LeaderboardOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LeaderboardWhereInput;
};


export type SeasonLeaderboardsCountArgs = {
  where?: LeaderboardWhereInput;
};

export type SeasonCreateInput = {
  arenas?: InputMaybe<ArenaRelateToManyForCreateInput>;
  community?: InputMaybe<CommunityRelateToOneForCreateInput>;
  competitions?: InputMaybe<CompetitionRelateToManyForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  leaderboards?: InputMaybe<LeaderboardRelateToManyForCreateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  registerationDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  seasonNumber?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  updateTable?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SeasonManyRelationFilter = {
  every?: InputMaybe<SeasonWhereInput>;
  none?: InputMaybe<SeasonWhereInput>;
  some?: InputMaybe<SeasonWhereInput>;
};

export type SeasonOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  endDate?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  registerationDeadline?: InputMaybe<OrderDirection>;
  seasonNumber?: InputMaybe<OrderDirection>;
  startDate?: InputMaybe<OrderDirection>;
  updateTable?: InputMaybe<OrderDirection>;
};

export type SeasonRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<SeasonWhereUniqueInput>>;
  create?: InputMaybe<Array<SeasonCreateInput>>;
};

export type SeasonRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<SeasonWhereUniqueInput>>;
  create?: InputMaybe<Array<SeasonCreateInput>>;
  disconnect?: InputMaybe<Array<SeasonWhereUniqueInput>>;
  set?: InputMaybe<Array<SeasonWhereUniqueInput>>;
};

export type SeasonRelateToOneForCreateInput = {
  connect?: InputMaybe<SeasonWhereUniqueInput>;
  create?: InputMaybe<SeasonCreateInput>;
};

export type SeasonRelateToOneForUpdateInput = {
  connect?: InputMaybe<SeasonWhereUniqueInput>;
  create?: InputMaybe<SeasonCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SeasonUpdateArgs = {
  data: SeasonUpdateInput;
  where: SeasonWhereUniqueInput;
};

export type SeasonUpdateInput = {
  arenas?: InputMaybe<ArenaRelateToManyForUpdateInput>;
  community?: InputMaybe<CommunityRelateToOneForUpdateInput>;
  competitions?: InputMaybe<CompetitionRelateToManyForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  leaderboards?: InputMaybe<LeaderboardRelateToManyForUpdateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  registerationDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  seasonNumber?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  updateTable?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SeasonWhereInput = {
  AND?: InputMaybe<Array<SeasonWhereInput>>;
  NOT?: InputMaybe<Array<SeasonWhereInput>>;
  OR?: InputMaybe<Array<SeasonWhereInput>>;
  arenas?: InputMaybe<ArenaManyRelationFilter>;
  community?: InputMaybe<CommunityWhereInput>;
  competitions?: InputMaybe<CompetitionManyRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  endDate?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  leaderboards?: InputMaybe<LeaderboardManyRelationFilter>;
  name?: InputMaybe<StringFilter>;
  registerationDeadline?: InputMaybe<DateTimeFilter>;
  seasonNumber?: InputMaybe<IntFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  updateTable?: InputMaybe<BooleanFilter>;
};

export type SeasonWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Team = {
  __typename?: 'Team';
  arabicName?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  mascot?: Maybe<Scalars['String']['output']>;
  mascotLogo?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  secondMascot?: Maybe<Scalars['String']['output']>;
  teamLogo?: Maybe<ImageFieldOutput>;
};

export type TeamCreateInput = {
  arabicName?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  mascot?: InputMaybe<Scalars['String']['input']>;
  mascotLogo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  secondMascot?: InputMaybe<Scalars['String']['input']>;
  teamLogo?: InputMaybe<ImageFieldInput>;
};

export type TeamManyRelationFilter = {
  every?: InputMaybe<TeamWhereInput>;
  none?: InputMaybe<TeamWhereInput>;
  some?: InputMaybe<TeamWhereInput>;
};

export type TeamOrderByInput = {
  arabicName?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  mascot?: InputMaybe<OrderDirection>;
  mascotLogo?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  secondMascot?: InputMaybe<OrderDirection>;
};

export type TeamRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TeamWhereUniqueInput>>;
  create?: InputMaybe<Array<TeamCreateInput>>;
};

export type TeamRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TeamWhereUniqueInput>>;
  create?: InputMaybe<Array<TeamCreateInput>>;
  disconnect?: InputMaybe<Array<TeamWhereUniqueInput>>;
  set?: InputMaybe<Array<TeamWhereUniqueInput>>;
};

export type TeamRelateToOneForCreateInput = {
  connect?: InputMaybe<TeamWhereUniqueInput>;
  create?: InputMaybe<TeamCreateInput>;
};

export type TeamRelateToOneForUpdateInput = {
  connect?: InputMaybe<TeamWhereUniqueInput>;
  create?: InputMaybe<TeamCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TeamUpdateArgs = {
  data: TeamUpdateInput;
  where: TeamWhereUniqueInput;
};

export type TeamUpdateInput = {
  arabicName?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  mascot?: InputMaybe<Scalars['String']['input']>;
  mascotLogo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  secondMascot?: InputMaybe<Scalars['String']['input']>;
  teamLogo?: InputMaybe<ImageFieldInput>;
};

export type TeamWhereInput = {
  AND?: InputMaybe<Array<TeamWhereInput>>;
  NOT?: InputMaybe<Array<TeamWhereInput>>;
  OR?: InputMaybe<Array<TeamWhereInput>>;
  arabicName?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  mascot?: InputMaybe<StringNullableFilter>;
  mascotLogo?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  secondMascot?: InputMaybe<StringNullableFilter>;
};

export type TeamWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  arenaParticipations?: Maybe<Array<ArenaParticipant>>;
  arenaParticipationsCount?: Maybe<Scalars['Int']['output']>;
  badges?: Maybe<Array<UserBadge>>;
  badgesCount?: Maybe<Scalars['Int']['output']>;
  communityMemberships?: Maybe<Array<CommunityMembership>>;
  communityMembershipsCount?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  experience?: Maybe<Scalars['Int']['output']>;
  globalRank?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  level?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<PasswordState>;
  role?: Maybe<Role>;
};


export type UserArenaParticipationsArgs = {
  cursor?: InputMaybe<ArenaParticipantWhereUniqueInput>;
  orderBy?: Array<ArenaParticipantOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ArenaParticipantWhereInput;
};


export type UserArenaParticipationsCountArgs = {
  where?: ArenaParticipantWhereInput;
};


export type UserBadgesArgs = {
  cursor?: InputMaybe<UserBadgeWhereUniqueInput>;
  orderBy?: Array<UserBadgeOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserBadgeWhereInput;
};


export type UserBadgesCountArgs = {
  where?: UserBadgeWhereInput;
};


export type UserCommunityMembershipsArgs = {
  cursor?: InputMaybe<CommunityMembershipWhereUniqueInput>;
  orderBy?: Array<CommunityMembershipOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CommunityMembershipWhereInput;
};


export type UserCommunityMembershipsCountArgs = {
  where?: CommunityMembershipWhereInput;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure';
  message: Scalars['String']['output'];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordFailure | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess';
  item: User;
  sessionToken: Scalars['String']['output'];
};

export type UserBadge = {
  __typename?: 'UserBadge';
  badge?: Maybe<Badge>;
  earnedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  user?: Maybe<User>;
};

export type UserBadgeCreateInput = {
  badge?: InputMaybe<BadgeRelateToOneForCreateInput>;
  earnedAt?: InputMaybe<Scalars['DateTime']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type UserBadgeManyRelationFilter = {
  every?: InputMaybe<UserBadgeWhereInput>;
  none?: InputMaybe<UserBadgeWhereInput>;
  some?: InputMaybe<UserBadgeWhereInput>;
};

export type UserBadgeOrderByInput = {
  earnedAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
};

export type UserBadgeRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<UserBadgeWhereUniqueInput>>;
  create?: InputMaybe<Array<UserBadgeCreateInput>>;
};

export type UserBadgeRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<UserBadgeWhereUniqueInput>>;
  create?: InputMaybe<Array<UserBadgeCreateInput>>;
  disconnect?: InputMaybe<Array<UserBadgeWhereUniqueInput>>;
  set?: InputMaybe<Array<UserBadgeWhereUniqueInput>>;
};

export type UserBadgeUpdateArgs = {
  data: UserBadgeUpdateInput;
  where: UserBadgeWhereUniqueInput;
};

export type UserBadgeUpdateInput = {
  badge?: InputMaybe<BadgeRelateToOneForUpdateInput>;
  earnedAt?: InputMaybe<Scalars['DateTime']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type UserBadgeWhereInput = {
  AND?: InputMaybe<Array<UserBadgeWhereInput>>;
  NOT?: InputMaybe<Array<UserBadgeWhereInput>>;
  OR?: InputMaybe<Array<UserBadgeWhereInput>>;
  badge?: InputMaybe<BadgeWhereInput>;
  earnedAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type UserBadgeWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type UserCreateInput = {
  arenaParticipations?: InputMaybe<ArenaParticipantRelateToManyForCreateInput>;
  badges?: InputMaybe<UserBadgeRelateToManyForCreateInput>;
  communityMemberships?: InputMaybe<CommunityMembershipRelateToManyForCreateInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  experience?: InputMaybe<Scalars['Int']['input']>;
  globalRank?: InputMaybe<Scalars['Int']['input']>;
  level?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<RoleRelateToOneForCreateInput>;
};

export type UserManyRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserOrderByInput = {
  email?: InputMaybe<OrderDirection>;
  experience?: InputMaybe<OrderDirection>;
  globalRank?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  level?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type UserRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  create?: InputMaybe<Array<UserCreateInput>>;
};

export type UserRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  create?: InputMaybe<Array<UserCreateInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserRelateToOneForCreateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
};

export type UserRelateToOneForUpdateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  arenaParticipations?: InputMaybe<ArenaParticipantRelateToManyForUpdateInput>;
  badges?: InputMaybe<UserBadgeRelateToManyForUpdateInput>;
  communityMemberships?: InputMaybe<CommunityMembershipRelateToManyForUpdateInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  experience?: InputMaybe<Scalars['Int']['input']>;
  globalRank?: InputMaybe<Scalars['Int']['input']>;
  level?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<RoleRelateToOneForUpdateInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  arenaParticipations?: InputMaybe<ArenaParticipantManyRelationFilter>;
  badges?: InputMaybe<UserBadgeManyRelationFilter>;
  communityMemberships?: InputMaybe<CommunityMembershipManyRelationFilter>;
  email?: InputMaybe<StringFilter>;
  experience?: InputMaybe<IntNullableFilter>;
  globalRank?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IdFilter>;
  level?: InputMaybe<IntNullableFilter>;
  name?: InputMaybe<StringFilter>;
  role?: InputMaybe<RoleWhereInput>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CommunitySeason = {
  __typename?: 'communitySeason';
  competition?: Maybe<Competition>;
  id: Scalars['ID']['output'];
  metaData?: Maybe<Scalars['JSON']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  season?: Maybe<Season>;
};

export type CommunitySeasonCreateInput = {
  competition?: InputMaybe<CompetitionRelateToOneForCreateInput>;
  metaData?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<SeasonRelateToOneForCreateInput>;
};

export type CommunitySeasonOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type CommunitySeasonRelateToOneForCreateInput = {
  connect?: InputMaybe<CommunitySeasonWhereUniqueInput>;
  create?: InputMaybe<CommunitySeasonCreateInput>;
};

export type CommunitySeasonRelateToOneForUpdateInput = {
  connect?: InputMaybe<CommunitySeasonWhereUniqueInput>;
  create?: InputMaybe<CommunitySeasonCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CommunitySeasonUpdateArgs = {
  data: CommunitySeasonUpdateInput;
  where: CommunitySeasonWhereUniqueInput;
};

export type CommunitySeasonUpdateInput = {
  competition?: InputMaybe<CompetitionRelateToOneForUpdateInput>;
  metaData?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<SeasonRelateToOneForUpdateInput>;
};

export type CommunitySeasonWhereInput = {
  AND?: InputMaybe<Array<CommunitySeasonWhereInput>>;
  NOT?: InputMaybe<Array<CommunitySeasonWhereInput>>;
  OR?: InputMaybe<Array<CommunitySeasonWhereInput>>;
  competition?: InputMaybe<CompetitionWhereInput>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  season?: InputMaybe<SeasonWhereInput>;
};

export type CommunitySeasonWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type LeagueCorrespondence = {
  __typename?: 'leagueCorrespondence';
  editorDesign?: Maybe<Scalars['String']['output']>;
  emailHtml?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type LeagueCorrespondenceCreateInput = {
  editorDesign?: InputMaybe<Scalars['String']['input']>;
  emailHtml?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type LeagueCorrespondenceOrderByInput = {
  editorDesign?: InputMaybe<OrderDirection>;
  emailHtml?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type LeagueCorrespondenceUpdateArgs = {
  data: LeagueCorrespondenceUpdateInput;
  where: LeagueCorrespondenceWhereUniqueInput;
};

export type LeagueCorrespondenceUpdateInput = {
  editorDesign?: InputMaybe<Scalars['String']['input']>;
  emailHtml?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type LeagueCorrespondenceWhereInput = {
  AND?: InputMaybe<Array<LeagueCorrespondenceWhereInput>>;
  NOT?: InputMaybe<Array<LeagueCorrespondenceWhereInput>>;
  OR?: InputMaybe<Array<LeagueCorrespondenceWhereInput>>;
  editorDesign?: InputMaybe<StringNullableFilter>;
  emailHtml?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
};

export type LeagueCorrespondenceWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type LeagueInfo = {
  __typename?: 'leagueInfo';
  competition?: Maybe<Competition>;
  disableEdits?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  isRegistrationOn?: Maybe<Scalars['Boolean']['output']>;
  isTeamRegistrationOn?: Maybe<Scalars['Boolean']['output']>;
  leagueRules?: Maybe<LeagueInfo_LeagueRules_Document>;
  seasonDetails?: Maybe<LeagueInfo_SeasonDetails_Document>;
  slogan?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  title2?: Maybe<Scalars['String']['output']>;
};

export type LeagueInfoCreateInput = {
  competition?: InputMaybe<CompetitionRelateToOneForCreateInput>;
  disableEdits?: InputMaybe<Scalars['Boolean']['input']>;
  isRegistrationOn?: InputMaybe<Scalars['Boolean']['input']>;
  isTeamRegistrationOn?: InputMaybe<Scalars['Boolean']['input']>;
  leagueRules?: InputMaybe<Scalars['JSON']['input']>;
  seasonDetails?: InputMaybe<Scalars['JSON']['input']>;
  slogan?: InputMaybe<Scalars['String']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  title2?: InputMaybe<Scalars['String']['input']>;
};

export type LeagueInfoOrderByInput = {
  disableEdits?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isRegistrationOn?: InputMaybe<OrderDirection>;
  isTeamRegistrationOn?: InputMaybe<OrderDirection>;
  slogan?: InputMaybe<OrderDirection>;
  subtitle?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
  title2?: InputMaybe<OrderDirection>;
};

export type LeagueInfoUpdateArgs = {
  data: LeagueInfoUpdateInput;
  where: LeagueInfoWhereUniqueInput;
};

export type LeagueInfoUpdateInput = {
  competition?: InputMaybe<CompetitionRelateToOneForUpdateInput>;
  disableEdits?: InputMaybe<Scalars['Boolean']['input']>;
  isRegistrationOn?: InputMaybe<Scalars['Boolean']['input']>;
  isTeamRegistrationOn?: InputMaybe<Scalars['Boolean']['input']>;
  leagueRules?: InputMaybe<Scalars['JSON']['input']>;
  seasonDetails?: InputMaybe<Scalars['JSON']['input']>;
  slogan?: InputMaybe<Scalars['String']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  title2?: InputMaybe<Scalars['String']['input']>;
};

export type LeagueInfoWhereInput = {
  AND?: InputMaybe<Array<LeagueInfoWhereInput>>;
  NOT?: InputMaybe<Array<LeagueInfoWhereInput>>;
  OR?: InputMaybe<Array<LeagueInfoWhereInput>>;
  competition?: InputMaybe<CompetitionWhereInput>;
  disableEdits?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<IdFilter>;
  isRegistrationOn?: InputMaybe<BooleanFilter>;
  isTeamRegistrationOn?: InputMaybe<BooleanFilter>;
  slogan?: InputMaybe<StringFilter>;
  subtitle?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  title2?: InputMaybe<StringFilter>;
};

export type LeagueInfoWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type LeagueInfo_LeagueRules_Document = {
  __typename?: 'leagueInfo_leagueRules_Document';
  document: Scalars['JSON']['output'];
};


export type LeagueInfo_LeagueRules_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type LeagueInfo_SeasonDetails_Document = {
  __typename?: 'leagueInfo_seasonDetails_Document';
  document: Scalars['JSON']['output'];
};


export type LeagueInfo_SeasonDetails_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type LeagueTable = {
  __typename?: 'leagueTable';
  competition?: Maybe<Competition>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  season?: Maybe<Season>;
  table?: Maybe<Scalars['JSON']['output']>;
  topAssist?: Maybe<Scalars['JSON']['output']>;
  topCard?: Maybe<Scalars['JSON']['output']>;
  topGoalie?: Maybe<Scalars['JSON']['output']>;
  topPlayer?: Maybe<Scalars['JSON']['output']>;
  topScorer?: Maybe<Scalars['JSON']['output']>;
  updateTable?: Maybe<Scalars['Boolean']['output']>;
};

export type LeagueTableCreateInput = {
  competition?: InputMaybe<CompetitionRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  season?: InputMaybe<SeasonRelateToOneForCreateInput>;
  table?: InputMaybe<Scalars['JSON']['input']>;
  topAssist?: InputMaybe<Scalars['JSON']['input']>;
  topCard?: InputMaybe<Scalars['JSON']['input']>;
  topGoalie?: InputMaybe<Scalars['JSON']['input']>;
  topPlayer?: InputMaybe<Scalars['JSON']['input']>;
  topScorer?: InputMaybe<Scalars['JSON']['input']>;
  updateTable?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LeagueTableOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  updateTable?: InputMaybe<OrderDirection>;
};

export type LeagueTableUpdateArgs = {
  data: LeagueTableUpdateInput;
  where: LeagueTableWhereUniqueInput;
};

export type LeagueTableUpdateInput = {
  competition?: InputMaybe<CompetitionRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  season?: InputMaybe<SeasonRelateToOneForUpdateInput>;
  table?: InputMaybe<Scalars['JSON']['input']>;
  topAssist?: InputMaybe<Scalars['JSON']['input']>;
  topCard?: InputMaybe<Scalars['JSON']['input']>;
  topGoalie?: InputMaybe<Scalars['JSON']['input']>;
  topPlayer?: InputMaybe<Scalars['JSON']['input']>;
  topScorer?: InputMaybe<Scalars['JSON']['input']>;
  updateTable?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LeagueTableWhereInput = {
  AND?: InputMaybe<Array<LeagueTableWhereInput>>;
  NOT?: InputMaybe<Array<LeagueTableWhereInput>>;
  OR?: InputMaybe<Array<LeagueTableWhereInput>>;
  competition?: InputMaybe<CompetitionWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  season?: InputMaybe<SeasonWhereInput>;
  updateTable?: InputMaybe<BooleanFilter>;
};

export type LeagueTableWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type UserMemberShip = {
  __typename?: 'userMemberShip';
  community?: Maybe<Competition>;
  communitySeason?: Maybe<CommunitySeason>;
  id: Scalars['ID']['output'];
  metaData?: Maybe<Scalars['JSON']['output']>;
  participation?: Maybe<Participation>;
  payment?: Maybe<Array<Payment>>;
  paymentCount?: Maybe<Scalars['Int']['output']>;
  player?: Maybe<Player>;
  season?: Maybe<Season>;
};


export type UserMemberShipPaymentArgs = {
  cursor?: InputMaybe<PaymentWhereUniqueInput>;
  orderBy?: Array<PaymentOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PaymentWhereInput;
};


export type UserMemberShipPaymentCountArgs = {
  where?: PaymentWhereInput;
};

export type UserMemberShipCreateInput = {
  community?: InputMaybe<CompetitionRelateToOneForCreateInput>;
  communitySeason?: InputMaybe<CommunitySeasonRelateToOneForCreateInput>;
  metaData?: InputMaybe<Scalars['JSON']['input']>;
  participation?: InputMaybe<ParticipationRelateToOneForCreateInput>;
  payment?: InputMaybe<PaymentRelateToManyForCreateInput>;
  player?: InputMaybe<PlayerRelateToOneForCreateInput>;
  season?: InputMaybe<SeasonRelateToOneForCreateInput>;
};

export type UserMemberShipOrderByInput = {
  id?: InputMaybe<OrderDirection>;
};

export type UserMemberShipUpdateArgs = {
  data: UserMemberShipUpdateInput;
  where: UserMemberShipWhereUniqueInput;
};

export type UserMemberShipUpdateInput = {
  community?: InputMaybe<CompetitionRelateToOneForUpdateInput>;
  communitySeason?: InputMaybe<CommunitySeasonRelateToOneForUpdateInput>;
  metaData?: InputMaybe<Scalars['JSON']['input']>;
  participation?: InputMaybe<ParticipationRelateToOneForUpdateInput>;
  payment?: InputMaybe<PaymentRelateToManyForUpdateInput>;
  player?: InputMaybe<PlayerRelateToOneForUpdateInput>;
  season?: InputMaybe<SeasonRelateToOneForUpdateInput>;
};

export type UserMemberShipWhereInput = {
  AND?: InputMaybe<Array<UserMemberShipWhereInput>>;
  NOT?: InputMaybe<Array<UserMemberShipWhereInput>>;
  OR?: InputMaybe<Array<UserMemberShipWhereInput>>;
  community?: InputMaybe<CompetitionWhereInput>;
  communitySeason?: InputMaybe<CommunitySeasonWhereInput>;
  id?: InputMaybe<IdFilter>;
  participation?: InputMaybe<ParticipationWhereInput>;
  payment?: InputMaybe<PaymentManyRelationFilter>;
  player?: InputMaybe<PlayerWhereInput>;
  season?: InputMaybe<SeasonWhereInput>;
};

export type UserMemberShipWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ZohoBook = {
  __typename?: 'zohoBook';
  access_token?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  refresh_token?: Maybe<Scalars['String']['output']>;
};

export type ZohoBookCreateInput = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
};

export type ZohoBookOrderByInput = {
  access_token?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  refresh_token?: InputMaybe<OrderDirection>;
};

export type ZohoBookUpdateArgs = {
  data: ZohoBookUpdateInput;
  where?: ZohoBookWhereUniqueInput;
};

export type ZohoBookUpdateInput = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
};

export type ZohoBookWhereInput = {
  AND?: InputMaybe<Array<ZohoBookWhereInput>>;
  NOT?: InputMaybe<Array<ZohoBookWhereInput>>;
  OR?: InputMaybe<Array<ZohoBookWhereInput>>;
  access_token?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  refresh_token?: InputMaybe<StringFilter>;
};

export type ZohoBookWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};
