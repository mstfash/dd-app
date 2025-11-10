import { Users } from 'lucide-react';
import { BasketballMatchSummary, MatchInterface } from '../../../utils/types';
import { simplifyTeamName } from '../utils/statsUtils';

const SPORT_POSITIONS = {
  football: {
    defaultPositions: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
    label: 'Position',
  },
  basketball: {
    defaultPositions: [
      'Point Guard',
      'Shooting Guard',
      'Small Forward',
      'Power Forward',
      'Center',
    ],
    label: 'Position',
  },
  padel: {
    defaultPositions: ['Drive', 'Reves'],
    label: 'Side',
  },
  padbol: {
    defaultPositions: ['Server', 'Receiver'],
    label: 'Role',
  },
};

interface MatchLineupProps {
  match: MatchInterface;
}

interface LineupPlayer {
  name: string;
  isCaptain: boolean;
  position: string;
  sport: string;
}

interface LineupSectionProps {
  title: string;
  players: LineupPlayer[];
}

const isBasketballSummary = (
  detail: MatchInterface['actionDetails'][number]
): detail is BasketballMatchSummary => {
  if (!detail || typeof detail !== 'object') return false;
  const sport = (detail as BasketballMatchSummary).sport;
  return typeof sport === 'string' && sport.toLowerCase() === 'basketball';
};

const fallbackPosition = (sport: string, index: number) => {
  const defaults =
    SPORT_POSITIONS[sport as keyof typeof SPORT_POSITIONS]?.defaultPositions ||
    [];
  if (!defaults.length) return 'Player';
  return defaults[index % defaults.length];
};

const normalizeName = (name?: string) =>
  (name || '').replace(/\s+/g, ' ').trim().toLowerCase();

function buildBasketballFallback(
  match: MatchInterface,
  isHomeTeam: boolean
): LineupPlayer[] {
  if (match.type.toLowerCase() !== 'basketball') return [];
  const summary = (match.actionDetails || []).find(isBasketballSummary);
  if (!summary) return [];

  const summaryPlayers = isHomeTeam
    ? summary.teams.home.players
    : summary.teams.away.players;
  if (!summaryPlayers?.length) return [];

  const lineup = match.lineUp.filter(
    (player) => player.isHomeTeam === isHomeTeam
  );

  return summaryPlayers.map((summaryPlayer, index) => {
    const normalized = normalizeName(summaryPlayer.playerName);
    const lineupPlayer = lineup.find(
      (player) => normalizeName(player.name) === normalized
    );
    const position =
      lineupPlayer?.position ||
      fallbackPosition(match.type.toLowerCase(), index);

    return {
      name: summaryPlayer.playerName || `Player ${index + 1}`,
      isCaptain: Boolean(lineupPlayer?.isCaptain),
      position,
      sport: match.type,
    };
  });
}

function LineupSection({ title, players }: LineupSectionProps) {
  return (
    <div className="mb-8">
      <h4 className="text-lg font-medium text-brand-700 mb-4">{title}</h4>
      {players.length ? (
        <div className="space-y-3">
          {players.map((player, index) => (
            <div
              key={`${player.name}-${index}`}
              className="flex items-center justify-between bg-brand-50 rounded-lg p-4"
            >
              <div>
                <div className="font-medium text-brand-700">
                  {player.name}{' '}
                  {player.isCaptain && (
                    <span className="text-court-500">(C)</span>
                  )}
                </div>
                <div className="text-sm text-brand-400">
                  {SPORT_POSITIONS[player.sport as keyof typeof SPORT_POSITIONS]
                    ?.label || 'Position'}
                  : {player.position}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-brand-300 italic">
          Lineup details not available.
        </div>
      )}
    </div>
  );
}

export default function MatchLineup({ match }: MatchLineupProps) {
  const sport = match.type.toLowerCase();

  const homeStartersRaw = match.lineUp
    .filter((player) => player.isHomeTeam && !player.isSub)
    .map((p) => ({ ...p, sport: match.type }));
  const homeSubstitutes = match.lineUp
    .filter((player) => player.isHomeTeam && player.isSub)
    .map((p) => ({ ...p, sport: match.type }));
  const awayStartersRaw = match.lineUp
    .filter((player) => !player.isHomeTeam && !player.isSub)
    .map((p) => ({ ...p, sport: match.type }));
  const awaySubstitutes = match.lineUp
    .filter((player) => !player.isHomeTeam && player.isSub)
    .map((p) => ({ ...p, sport: match.type }));

  const homeStarters: LineupPlayer[] =
    homeStartersRaw.length > 0
      ? homeStartersRaw
      : buildBasketballFallback(match, true);
  const awayStarters: LineupPlayer[] =
    awayStartersRaw.length > 0
      ? awayStartersRaw
      : buildBasketballFallback(match, false);

  return (
    <div>
      <h3 className="text-xl font-display font-semibold text-brand-700 mb-6 flex items-center gap-2">
        <Users className="w-5 h-5 text-court-500" />
        {match.type.charAt(0).toUpperCase() + match.type.slice(1)} Lineup
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-brand-700">
            {simplifyTeamName(
              match.homeTeam.teams[0]?.name || match.homeTeam.name
            )}
          </h3>
          <LineupSection
            title={
              sport === 'padel' || sport === 'padbol'
                ? 'Players'
                : 'Starting Lineup'
            }
            players={homeStarters}
          />
          {homeSubstitutes.length > 0 && (
            <LineupSection title="Substitutes" players={homeSubstitutes} />
          )}
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium text-brand-700">
            {simplifyTeamName(
              match.awayTeam.teams[0]?.name || match.awayTeam.name
            )}
          </h3>
          <LineupSection
            title={
              sport === 'padel' || sport === 'padbol'
                ? 'Players'
                : 'Starting Lineup'
            }
            players={awayStarters}
          />
          {awaySubstitutes.length > 0 && (
            <LineupSection title="Substitutes" players={awaySubstitutes} />
          )}
        </div>
      </div>
    </div>
  );
}
