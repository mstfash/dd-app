import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { Participation } from './useLeaguesState';
import { FETCH_PARTICIPATIONS } from '../utils/queries';
import { ParticipationWhereInput } from '../__generated__/graphql';

export default function useParticipations(where: ParticipationWhereInput) {
  const { data, loading, error } = useQuery(FETCH_PARTICIPATIONS, {
    variables: {
      where: where,
    },
  });

  const participations = useMemo(() => {
    return (data?.participations as Array<Participation>) || null;
  }, [data]);

  return {
    participations,
    loading,
    error,
  };
}
