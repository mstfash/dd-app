import { Trophy } from 'lucide-react';
import { MatchInterface } from '../../../utils/types';

const SPORT_ACTIONS = {
  football: {
    goal: { icon: '⚽', label: 'Goal' },
    'yellow card': { icon: '🟨', label: 'Yellow Card' },
    'red card': { icon: '🟥', label: 'Red Card' },
    substitution: { icon: '🔄', label: 'Substitution' },
    assist: { icon: '👟', label: 'Assist' },
  },
  basketball: {
    points: { icon: '🏀', label: 'Points' },
    twopointer: { icon: '2️⃣', label: 'Two Pointer' },
    threepointer: { icon: '3️⃣', label: 'Three Pointer' },
    freethrow: { icon: '🎯', label: 'Free Throw' },
    foul: { icon: '🟨', label: 'Foul' },
    substitution: { icon: '🔄', label: 'Substitution' },
    timeout: { icon: '⏱️', label: 'Timeout' },
    assist: { icon: '🤝', label: 'Assist' },
  },
  padel: {
    point: { icon: '🎾', label: 'Point' },
    game: { icon: '🎯', label: 'Game' },
    set: { icon: '🏆', label: 'Set' },
    timeout: { icon: '⏱️', label: 'Timeout' },
  },
  padbol: {
    point: { icon: '⚽', label: 'Point' },
    set: { icon: '🏆', label: 'Set' },
    timeout: { icon: '⏱️', label: 'Timeout' },
  },
};

const BASKETBALL_POINT_VALUES: Record<string, number> = {
  freethrow: 1,
  twopointer: 2,
  threepointer: 3,
};

const BASKETBALL_POINT_LABELS: Record<string, string> = {
  freethrow: 'Free Throw',
  twopointer: 'Two Pointer',
  threepointer: 'Three Pointer',
};

const QUARTER_LABELS = ['Q1', 'Q2', 'Q3', 'Q4'];
const QUARTER_LENGTH_MINUTES = 12;

type TimelineAction = MatchInterface['actionDetails'][number];

const formatDisplayTime = (time?: string) => {
  if (!time) return '--';
  const trimmed = time.trim();
  if (!trimmed) return '--';
  if (trimmed.includes(':')) return trimmed;
  return `${trimmed.replace(/[^0-9.]/g, '')}'`;
};

const parseActionMinutes = (time?: string) => {
  if (!time) return null;
  const sanitized = time.replace(/[^0-9:]/g, '');
  if (!sanitized) return null;
  if (sanitized.includes(':')) {
    const [minutesPart, secondsPart] = sanitized.split(':');
    const minutes = Number(minutesPart);
    const seconds = Number(secondsPart);
    if (!Number.isNaN(minutes)) {
      return minutes + (Number.isNaN(seconds) ? 0 : seconds / 60);
    }
  }
  const minutes = Number(sanitized);
  return Number.isNaN(minutes) ? null : minutes;
};

const deriveQuarterFromAction = (action: TimelineAction) => {
  if (typeof action.quarter === 'string' && action.quarter.trim()) {
    const normalized = action.quarter.trim().toUpperCase();
    if (normalized.startsWith('Q') || normalized.startsWith('OT')) {
      return normalized;
    }
    return normalized.startsWith('O')
      ? `OT${normalized.slice(1)}`
      : `Q${normalized}`;
  }
  if (typeof action.quarter === 'number') {
    if (action.quarter <= QUARTER_LABELS.length) {
      return QUARTER_LABELS[action.quarter - 1] || 'Q1';
    }
    const overtimeIndex = action.quarter - QUARTER_LABELS.length;
    return overtimeIndex > 1 ? `OT${overtimeIndex}` : 'OT';
  }
  const minutes = parseActionMinutes(action.time);
  if (minutes === null) {
    return 'Q1';
  }
  const index = Math.floor(minutes / QUARTER_LENGTH_MINUTES);
  if (index >= QUARTER_LABELS.length) {
    return 'OT';
  }
  return QUARTER_LABELS[index];
};

interface ActionIconProps {
  type: string;
  sport: string;
  pointType?: string;
}

function ActionIcon({ type, sport, pointType }: ActionIconProps) {
  const sportActions =
    SPORT_ACTIONS[sport.toLowerCase() as keyof typeof SPORT_ACTIONS];
  if (!sportActions) return null;

  const sanitizeKey = (value: string) =>
    value.toLowerCase().replace(/[^a-z]/g, '');
  const normalizedType = sanitizeKey(type);
  let action = sportActions[normalizedType as keyof typeof sportActions];

  if (!action && pointType) {
    const normalizedPointType = sanitizeKey(pointType);
    action = sportActions[normalizedPointType as keyof typeof sportActions];
  }
  if (!action) return null;

  return (
    <div className="w-6 h-6 flex items-center justify-center text-lg">
      {action.icon}
    </div>
  );
}

function getAdditionalInfo(action: TimelineAction, sport: string): string {
  switch (sport.toLowerCase()) {
    case 'basketball':
      if (
        action.type?.toLowerCase() === 'points' ||
        typeof action.pointType === 'string'
      ) {
        const pointKey = action.pointType?.toLowerCase().replace(/[^a-z]/g, '');
        const resolvedLabel = pointKey
          ? BASKETBALL_POINT_LABELS[pointKey] || 'Field Goal'
          : `${action.points || 2}-Point Play`;
        const resolvedValue =
          typeof action.points === 'number'
            ? action.points
            : pointKey
            ? BASKETBALL_POINT_VALUES[pointKey]
            : undefined;
        return resolvedValue
          ? `${resolvedLabel} • ${resolvedValue} pts`
          : resolvedLabel;
      }
      break;
    case 'padel':
    case 'padbol':
      if (action.type === 'point') {
        return `Point ${action.score || ''}`;
      } else if (action.type === 'set') {
        return `Set ${action.setNumber || ''}`;
      }
      break;
  }
  return '';
}

interface ActionCardProps {
  action: TimelineAction;
  match: MatchInterface;
}

function ActionCard({ action, match }: ActionCardProps) {
  const additionalInfo = getAdditionalInfo(action, match.type);
  const isBasketball = match.type.toLowerCase() === 'basketball';
  const quarterLabel = isBasketball ? deriveQuarterFromAction(action) : '';
  const displayTime = formatDisplayTime(action.time);

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Left side - Home team actions */}
      <div
        className={`flex-1 text-right ${!action.isHomeTeam ? 'invisible' : ''}`}
      >
        {action.isHomeTeam && (
          <div className="inline-flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm border border-brand-100">
            <div>
              <div className="text-lg font-medium text-brand-700">
                {action.name}
                {action.isOwnGoal && (
                  <span className="text-court-500 ml-1">(OG)</span>
                )}
                {action.isPenaltyGoal && (
                  <span className="text-court-500 ml-1">(P)</span>
                )}
              </div>
              {action.assistName && (
                <div className="text-sm text-brand-400">
                  Assist: {action.assistName}
                </div>
              )}
              {additionalInfo && (
                <div className="text-xs font-semibold uppercase tracking-wide text-brand-400">
                  {additionalInfo}
                </div>
              )}
            </div>
            <ActionIcon
              type={action.type}
              sport={match.type}
              pointType={action.pointType}
            />
          </div>
        )}
      </div>

      {/* Center - Time */}
      <div className="flex flex-col items-center min-w-[80px] relative gap-1">
        <div className="absolute top-1/2 left-1/2 w-14 h-14 bg-white border border-brand-100 rounded-full -translate-x-1/2 -translate-y-1/2" />
        {quarterLabel && (
          <div className="relative z-10 text-xs font-semibold uppercase tracking-[0.3em] text-brand-400">
            {quarterLabel}
          </div>
        )}
        <div className="relative z-10 text-xl font-display font-bold text-court-500">
          {displayTime}
        </div>
      </div>

      {/* Right side - Away team actions */}
      <div className={`flex-1 ${action.isHomeTeam ? 'invisible' : ''}`}>
        {!action.isHomeTeam && (
          <div className="inline-flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm border border-brand-100">
            <ActionIcon
              type={action.type}
              sport={match.type}
              pointType={action.pointType}
            />
            <div>
              <div className="text-lg font-medium text-brand-700">
                {action.name}
                {action.isOwnGoal && (
                  <span className="text-court-500 ml-1">(OG)</span>
                )}
                {action.isPenaltyGoal && (
                  <span className="text-court-500 ml-1">(P)</span>
                )}
              </div>
              {action.assistName && (
                <div className="text-sm text-brand-400">
                  Assist: {action.assistName}
                </div>
              )}
              {additionalInfo && (
                <div className="text-xs font-semibold uppercase tracking-wide text-brand-400">
                  {additionalInfo}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface MatchActionsProps {
  match: MatchInterface;
}

export default function MatchActions({ match }: MatchActionsProps) {
  const sortedActions = [...(match?.actionDetails || [])].sort((a, b) => {
    const timeA = parseActionMinutes(a.time) ?? Number.MAX_SAFE_INTEGER;
    const timeB = parseActionMinutes(b.time) ?? Number.MAX_SAFE_INTEGER;
    return timeA - timeB;
  });
  return (
    <div>
      <h3 className="text-xl font-display font-semibold text-brand-700 mb-8 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-court-500" />
        {match.type.charAt(0).toUpperCase() + match.type.slice(1)} Match Events
      </h3>

      {sortedActions.length > 0 ? (
        <div className="relative">
          {/* Timeline */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-brand-200 -translate-x-1/2"></div>

          <div className="space-y-16">
            {sortedActions.map((action, index) => (
              <ActionCard key={index} action={action} match={match} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
          <p className="text-brand-400">
            No {match.type} match events recorded yet.
          </p>
        </div>
      )}
    </div>
  );
}
