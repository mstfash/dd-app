import { useQuery } from '@apollo/client';
import { FETCH_STANDINGS } from '../utils/queries';
import { useMemo } from 'react';
import { LeagueTableType, TableType } from '../utils/types';

export default function useLeagueTables(where: any) {
  const { data, loading, error } = useQuery(FETCH_STANDINGS, {
    variables: {
      where: where,
    },
  });

  const leagueTables = useMemo(() => {
    const tablesArr = (data?.leagueTables as Array<LeagueTableType>) || null;
    if (tablesArr && tablesArr.length) {
      return tablesArr.map((tables) => {
        return {
          ...tables,
          topScorer:
            tables.topPlayer &&
            [...tables.topPlayer]
              .sort((a, b) => Number(b.goals) - Number(a.goals))
              .slice(0, 30),
          topAssist:
            tables.topPlayer &&
            [...tables.topPlayer]
              .filter((p) => Number(p.assists) > 0)
              .sort((a, b) => Number(b.assists) - Number(a.assists)),

          topGoalie:
            tables.topPlayer &&
            [...tables.topPlayer]
              .filter((p) => p.position === 'GK')
              .sort((a, b) => {
                if (Number(b.PLD) === Number(a.PLD)) {
                  return Number(a.inGoals) - Number(b.inGoals);
                }
                return Number(b.PLD) - Number(a.PLD);
              })
              .slice(0, 30),

          topCard:
            tables.topPlayer &&
            [...tables.topPlayer]
              .sort((a, b) => {
                // sorty topCards by highest PLD with lowest yellowCard and lowest redCard
                if (Number(b.PLD) === Number(a.PLD)) {
                  if (Number(a.yellowCard) === Number(b.yellowCard)) {
                    return Number(b.redCard) - Number(a.redCard);
                  }
                  return Number(b.yellowCard) - Number(a.yellowCard);
                }
                return Number(b.PLD) - Number(a.PLD);
              })
              .slice(0, 30),
        };
      });
    }
    return [];
  }, [data]);

  return {
    leagueTables,
    loading,
    error,
  };
}

export const orderedTable = (data: TableType[]) => {
  if (!data?.length) return [];

  // // split data into array of arrays each array should have equal PTS points
  const samePointsArr: Array<TableType[]> = data.reduce(
    (acc: any, curr: any) => {
      const index = acc.findIndex((x: any) => x[0].PTS === curr.PTS);
      if (index === -1) {
        acc.push([curr]);
      } else {
        acc[index].push(curr);
      }
      return acc;
    },
    []
  );

  samePointsArr.map((chunk) => {
    if (chunk.length > 1) {
      const h2h: any = {};
      const ids = chunk.map((x) => x.partId);
      chunk.forEach((team) => {
        h2h[team.team] = 0;
        team?.scoreSheet?.forEach((x) => {
          if (ids.includes(x.homeTeamId) && ids.includes(x.awayTeamId)) {
            if (
              x.homeTeamId === team.partId &&
              x.homeTeamScore > x.awayTeamScore
            ) {
              h2h[team.team] += 3;
            } else if (
              x.awayTeamId === team.partId &&
              x.homeTeamScore < x.awayTeamScore
            ) {
              h2h[team.team] += 3;
            } else if (x.awayTeamScore === x.homeTeamScore) {
              h2h[team.team] += 1;
            }
          }
        });
      });
      return chunk.sort((a, b) => {
        if (a.PTS === b.PTS) {
          if (h2h[b.team] === h2h[a.team]) {
            if (Number(b.GD) === Number(a.GD)) {
              return Number(b.FP) - Number(a.FP);
            } else {
              return Number(b.GD) - Number(a.GD);
            }
          }

          return h2h[b.team] - h2h[a.team];
        }
        return Number(b.PTS) - Number(a.PTS);
      });
    }
    return chunk;
  });

  return samePointsArr.flat().sort((a, b) => Number(b.PTS) - Number(a.PTS));
};

export const tableToGroups = (table: TableType[]) => {
  return table?.reduce(
    (acc: { [key: string]: TableType[] }, item: TableType) => {
      const groupName = item.participation?.group ?? 'null';
      acc[groupName] ? acc[groupName].push(item) : (acc[groupName] = [item]);
      return acc;
    },
    {}
  );
};
