import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Download,
  X,
  User,
  Phone,
  Mail,
  Trophy,
  Shield,
  Users,
  Calendar,
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TeamPDFDocument from './TeamPDFDocument';
import { PlayerInfo } from '../../context/AppStateContext';
import { SERVER_URL } from '../../utils/constants';
import { Participation } from '../../hooks/useLeaguesState';

interface TeamDetailsProps {
  players: PlayerInfo[];
  teamName: string;
  participation: Participation;
}

export default function TeamDetails({
  players,
  teamName,
  participation,
}: TeamDetailsProps) {
  const navigate = useNavigate();
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerInfo | null>(null);
  const [isPdfReady, setIsPdfReady] = useState(false);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPdfReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPlayer(null);
      }
    };

    if (selectedPlayer) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedPlayer]);

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedPlayer(null);
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 py-12 px-4">
      {selectedPlayer && (
        <div
          className="w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center left-0  top-0 z-50"
          onClick={handleModalClick}
          style={{ position: 'fixed' }}
        >
          <div className="relative bg-white rounded-2xl overflow-hidden max-w-2xl w-full">
            <button
              onClick={() => setSelectedPlayer(null)}
              className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/40 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={
                selectedPlayer.photo?.url
                  ? SERVER_URL + selectedPlayer.photo?.url
                  : `/logo.jpeg`
              }
              alt={`${selectedPlayer.firstName} ${selectedPlayer.lastName}`}
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm text-white p-4">
              <h3 className="text-xl font-medium">
                {selectedPlayer.firstName} {selectedPlayer.lastName}
              </h3>
              <p className="text-white/80">{selectedPlayer.position}</p>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto">
        {/* Navigation Bar */}
        <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <button
              onClick={() =>
                navigate(
                  `/dashboard?category=${searchParams.get(
                    'category'
                  )}&sportType=${searchParams.get(
                    'sportType'
                  )}&query=${searchParams.get('query')}`
                )
              }
              className="flex items-center gap-2 px-4 py-2 text-brand-600 hover:text-brand-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-display">Back to Dashboard</span>
            </button>

            {isPdfReady && (
              <PDFDownloadLink
                document={
                  <TeamPDFDocument
                    players={players}
                    teamName={participation.name}
                    onlyIds
                  />
                }
                fileName={`${teamName
                  .toLowerCase()
                  .replace(/\s+/g, '-')}-players.pdf`}
              >
                {({ loading, error }) => (
                  <button
                    className={`flex items-center gap-2 px-4 py-2 bg-court-500 text-brand-950 rounded-lg hover:bg-court-400 transition-colors ${
                      loading || error ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={loading || !!error}
                  >
                    <Download className="w-5 h-5" />
                    {loading ? 'Generating PDF...' : 'Export IDs'}
                  </button>
                )}
              </PDFDownloadLink>
            )}

            {/* {isPdfReady && (
              <PDFDownloadLink
                document={
                  <TeamPDFDocument
                    players={players}
                    teamName={participation.name}
                  />
                }
                fileName={`${teamName
                  .toLowerCase()
                  .replace(/\s+/g, '-')}-players.pdf`}
              >
                {({ loading, error }) => (
                  <button
                    className={`flex items-center gap-2 px-4 py-2 bg-peach-400 text-white rounded-lg hover:bg-peach-300 transition-colors ${
                      loading || error ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={loading || !!error}
                  >
                    <Download className="w-5 h-5" />
                    {loading ? 'Generating PDF...' : 'Export PDF'}
                  </button>
                )}
              </PDFDownloadLink>
            )} */}
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-20">
          {/* Team Header */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-brand-100">
            <h1 className="text-3xl font-display font-bold text-court-500 mb-2">
              {teamName}
            </h1>
            <div className="md:flex-row flex-col flex md:items-center gap-4 text-brand-500 text-sm mb-6">
              <span className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                {participation.competition.name}
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {participation.playersCount} Players
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {participation.seasons[0]?.name}
              </span>
            </div>
            <div className="flex items-center gap-4 text-brand-500">
              <span className="flex items-center gap-2">Team Details</span>
            </div>
          </div>

          {/* Players Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player) => (
              <div
                key={player.id}
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-brand-100 hover:border-court-400 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={
                        player.photo?.url
                          ? SERVER_URL + player.photo?.url
                          : `/logo.jpeg`
                      }
                      alt={`${player.firstName} ${player.lastName}`}
                      className="w-16 h-16 rounded-full object-cover cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setSelectedPlayer(player)}
                    />
                    <div>
                      <h3 className="font-medium text-brand-600">
                        {player.firstName} {player.lastName}
                      </h3>
                      <p className="text-sm text-brand-400">
                        {player.position}
                        {player.bio?.includes('Administrator') && (
                          <span className="ml-2 text-court-500">
                            • Team Admin
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-brand-500">
                      <User className="w-4 h-4" />
                      <span>ID: {player.playerID}</span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-500">
                      <Phone className="w-4 h-4" />
                      <span>{player.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-500">
                      <Mail className="w-4 h-4" />
                      <span>{player.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-500">
                      <Shield className="w-4 h-4" />
                      <span>Kit Size: {player.kitSize}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
