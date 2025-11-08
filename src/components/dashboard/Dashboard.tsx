import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLogin from './DashboardLogin';
import TeamsList from './TeamsList';
import TeamDetails from './TeamDetails';
import useLeaguesState from '../../hooks/useLeaguesState';
import { MAIN_LEAGUE_ID } from '../../utils/constants';
import useParticipations from '../../hooks/useParticipations';
import { GET_TEAM_PLAYERS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { currentCompetition, lastSeason } = useLeaguesState(MAIN_LEAGUE_ID);

  const { participations, loading } = useParticipations({
    competition: {
      id: {
        equals: currentCompetition?.id,
      },
    },
    seasons: {
      some: {
        id: {
          equals: lastSeason?.id,
        },
      },
    },
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { teamId } = useParams();

  const { data: playersData, loading: isFetchingPlayer } = useQuery(
    GET_TEAM_PLAYERS,
    {
      variables: { id: teamId },
      skip: !teamId,
    }
  );
  const teamPlayers = playersData?.players || [];

  const navigate = useNavigate();
  const isFetching = loading || isLoading || isFetchingPlayer;
  useEffect(() => {
    setIsLoading(true);
    const auth = localStorage.getItem('dashboardAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setTimeout(() => setIsLoading(false), 2500);
  }, []);

  if (!isAuthenticated && !isFetching) {
    return <DashboardLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  if (isFetching) {
    return (
      <div className="w-full h-screen flex flex-row items-center justify-center bg-brand-600">
        <Loader2 className="animate-spin w-12 h-12 text-court-500" />
      </div>
    );
  }

  if (teamId) {
    const participation = participations.find((p) => p.id === teamId);

    if (!participation) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-50 p-4">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-brand-600 mb-4">
              Team Not Found
            </h2>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-court-500 hover:text-court-400"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      );
    }

    return (
      <TeamDetails
        players={teamPlayers}
        teamName={participation.teams?.[0].name}
        participation={participation}
      />
    );
  }

  return participations?.length > 0 ? (
    <TeamsList
      participations={participations.filter(
        (p) => !p.name.toLowerCase().includes('transfer market')
      )}
    />
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-brand-50 p-4">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-brand-600 mb-4">
          No teams found
        </h2>
      </div>
    </div>
  );
}
