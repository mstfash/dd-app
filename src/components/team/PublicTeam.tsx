import { useState, useEffect } from 'react';
import { Users, Trophy, UserX, ArrowLeft, X } from 'lucide-react';
import {
  GET_PARTICIPATION_BY_ID,
  GET_PLAYERS_PUBLIC,
} from '../../utils/queries';
import { useQuery } from '@apollo/client';

import { PlayerInterface } from '../../utils/types';

import { useNavigate, useParams } from 'react-router-dom';
import { SPORTS_CONFIG } from '../../constants/sports';
import { SERVER_URL } from '../../utils/constants';

// Add ImagePopup component
function ImagePopup({
  imageUrl,
  alt,
  onClose,
}: {
  imageUrl: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-center bg-black/80 w-screen h-screen md:h-full overflow-y-auto"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full mx-4 mt-[50px] md:mt-[100px]">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-peach-400 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-auto rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}

export default function PublicTeam() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const { data: participationData } = useQuery(GET_PARTICIPATION_BY_ID, {
    variables: { id: teamId },
    skip: !teamId,
  });

  const participation = participationData?.participation;
  const {
    data: playersData,
    loading: playersLoading,
    error: playersError,
  } = useQuery(GET_PLAYERS_PUBLIC, {
    variables: { id: teamId },
    skip: !teamId,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    setIsLoading(playersLoading);
  }, [playersLoading]);

  const returnTournament = () => {
    const id = participation?.name?.split(' ').pop();
    const type = participation?.type;
    if (type) {
      const found = SPORTS_CONFIG[type.toLowerCase()];
      if (found) {
        const tournament = found.tournaments.find((t) => t.id === id);
        if (tournament) {
          return (
            <div className="flex flex-row items-center flex-wrap gap-2 mr-2 mt-4">
              <span className="px-4 py-2 bg-orange-200 text-sage-00 rounded-lg inline-block capitalize">
                {`${tournament?.name}`}
              </span>

              {/* <span className="px-4 py-2 bg-orange-200 text-sage-00 rounded-lg inline-block capitalize">
                {` Fees: ${tournament?.registrationFee.toLocaleString()} EGP`}
              </span> */}
            </div>
          );
        }
      }
    }
    return (
      <span className="px-4 py-2 bg-orange-200 text-sage-00 rounded-lg mt-4 inline-block mr-2 capitalize">
        {participation?.name?.split(' ')?.pop()?.split('-').join(' ')}
      </span>
    );
  };

  if (isLoading || playersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600" />
      </div>
    );
  }

  if (!playersData && !playersLoading && !isLoading && playersError) {
    return (
      <div className="min-h-screen p-8 bg-brand-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-xl mx-auto">
          <h2 className="text-red-800 font-semibold mb-2">
            Error Loading Team Data
          </h2>
          <p className="text-red-600">
            {playersError?.message || 'Team not found'}
          </p>
        </div>
      </div>
    );
  }

  if (
    !playersLoading &&
    !isLoading &&
    playersData &&
    !playersData.players?.length
  ) {
    return (
      <div className="min-h-screen bg-brand-50 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto">
              <UserX className="w-8 h-8 text-brand-700" />
            </div>
            <h2 className="text-2xl font-display font-bold text-brand-700">
              No Team Found
            </h2>
            <p className="text-brand-400">
              You are not currently part of any team. Please contact your team
              administrator or the tournament organizers for assistance.
            </p>
            <div className="pt-4">
              <a
                href="/tournaments"
                className="inline-flex items-center gap-2 px-6 py-3 bg-peach-400 text-white rounded-lg hover:bg-peach-300 transition-colors"
              >
                <Trophy className="w-4 h-4" />
                View Tournaments
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-brand-50 py-12 px-4 w-full">
        <div className="max-w-6xl mx-auto w-full">
          <button
            onClick={() => navigate('/league')}
            className="flex items-center gap-2 px-4 py-2 text-brand-600 hover:text-brand-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-display">Back to Home</span>
          </button>
          {/* Team Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-display font-bold text-brand-700 mb-2">
              {participation?.teams?.[0]?.name}
            </h1>

            <div className="flex items-center gap-4 text-brand-400">
              <span className="flex items-center gap-2 capitalize">
                <Trophy className="w-4 h-4" />
                {participation?.type}
              </span>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center flex-wrap">
                {returnTournament()}

                <span className="px-4 py-2 bg-brand-100 text-brand-700 rounded-lg mt-4 inline-block">
                  {playersData?.players?.length} Players
                </span>
              </div>
            </div>
          </div>

          {/* Players List */}
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full">
            <h2 className="text-2xl font-display font-semibold text-brand-700 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Players
            </h2>
            <div className="grid gap-6">
              {playersData?.players.map((player: PlayerInterface) => (
                <div
                  key={player.id}
                  className="flex flex-col md:flex-row gap-2 border border-brand-200 rounded-xl p-6 hover:border-peach-400 transition-all duration-300"
                >
                  <div>
                    <img
                      src={
                        player?.photo?.url
                          ? SERVER_URL + player?.photo?.url
                          : 'https://i.ibb.co/RkxjQ1WG/zed4-09.png'
                      }
                      alt={`${player.firstName} ${player.lastName}`}
                      className="w-24 h-24 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() =>
                        setSelectedImage({
                          url: player?.photo?.url
                            ? SERVER_URL + player?.photo?.url
                            : 'https://i.ibb.co/RkxjQ1WG/zed4-09.png',
                          alt: `${player.firstName} ${player.lastName}`,
                        })
                      }
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-brand-700 mb-2 items-center">
                        {player.firstName} {player.lastName}{' '}
                        {player?.id === participation?.teamAdmin?.id && (
                          <span className="px-2 py-1 bg-brand-200 text-brand-700 rounded-lg inline-block text-xs">
                            Team Admin
                          </span>
                        )}
                      </h3>
                      <div className="space-y-1 text-brand-400">
                        <p>Kit Size: {player.kitSize}</p>
                        <p>Kit Name: {player.jerseyName || 'N/A'}</p>
                        {player.jerseyNumber &&
                          (participation?.type === 'Football' ||
                            participation?.type === 'Basketball') && (
                            <p>Kit Number: {player.jerseyNumber}</p>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add ImagePopup */}
      {selectedImage && (
        <ImagePopup
          imageUrl={selectedImage.url}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
