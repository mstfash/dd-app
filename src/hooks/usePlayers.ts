import { useQuery } from '@apollo/client';
import {
  FETCH_ALL_PLAYERS_DATA,
  FETCH_PUBLIC_PLAYERS_DATA,
} from '../utils/queries';
import { PlayerOrderByInput, PlayerWhereInput } from '../__generated__/graphql';
import { useMemo } from 'react';
import { PlayerInterface } from '../utils/types';

export default function usePlayers({
  where,
  orderBy,
  take,
  skip,
  isPublic = true,
}: {
  where: PlayerWhereInput;
  orderBy?: PlayerOrderByInput;
  take?: number;
  skip?: number;
  isPublic?: boolean;
}) {
  const { data, loading, error } = useQuery(
    isPublic ? FETCH_PUBLIC_PLAYERS_DATA : FETCH_ALL_PLAYERS_DATA,
    {
      variables: {
        where,
        orderBy,
        take,
        skip,
      },
    }
  );

  const players = useMemo(() => {
    return (data?.players as Array<PlayerInterface>) || null;
  }, [data]);

  return {
    players,
    loading,
    error,
  };
}
