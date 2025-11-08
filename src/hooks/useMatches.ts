import { useQuery } from '@apollo/client';
import { FETCH_MATCHES } from '../utils/queries';
import { useMemo } from 'react';
import { MatchInterface } from '../utils/types';
import { MatchOrderByInput, MatchWhereInput } from '../__generated__/graphql';

export default function useMatches({
  where,
  orderBy,
  take,
  pollInterval,
}: {
  where: MatchWhereInput;
  orderBy?: MatchOrderByInput;
  take?: number;
  pollInterval?: number;
}) {
  const {
    data: matches,
    loading,
    error,
  } = useQuery(FETCH_MATCHES, {
    variables: {
      where,
      orderBy,
      take,
    },
    pollInterval,
  });
  return {
    matches: useMemo(() => {
      return (
        (matches?.matches?.map((m: MatchInterface) => ({
          ...m,
          type: m.type ? m.type : 'Football',
        })) as Array<MatchInterface>) || null
      );
    }, [matches]),
    loading,
    error,
  };
}
