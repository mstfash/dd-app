/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import timeZone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { MatchInterface, Team } from './types';
dayjs.extend(timeZone);
dayjs.extend(utc);
export const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const isBrowser = typeof window !== 'undefined';

export const SmoothVerticalScrolling = (
  e: any,
  time: number,
  where: string
) => {
  const eTop = e.getBoundingClientRect().top;
  const eAmt = eTop / 100;
  let curTime = 0;
  while (curTime <= time) {
    window.setTimeout(SVS_B, curTime, eAmt, where);
    curTime += time / 100;
  }
};

const SVS_B = (eAmt: number, where: string) => {
  if (where === 'center' || where === '') window.scrollBy(0, eAmt / 2);
  if (where === 'top') window.scrollBy(0, eAmt);
};

export const returnDate = (date: string) => {
  if (!date) return 'TBD';
  return dayjs(date).tz('Africa/Cairo').format('DD MMM');
};
export const returnTimeAnyway = (date: string) => {
  if (!date) return 'TBD';
  return dayjs(date).format('h:mm A');
};

export const isSecondHalfStarted = (date: string) => {
  if (!date) {
    return false;
  }
  const now = dayjs().tz('Africa/Cairo');
  if (now.isAfter(dayjs(date).tz('Africa/Cairo'))) {
    return true;
  }
  return false;
};

export const returnTime = (date: string, matchTime?: string) => {
  if (!date) return 'TBD';
  const hours = dayjs(date).format('h:mm A');
  const now = dayjs().tz('Africa/Cairo');
  if (now.isAfter(dayjs(date).tz('Africa/Cairo'))) {
    if (!matchTime) return '';
    return matchTime !== 'Full Time' && matchTime !== 'Half Time'
      ? matchTime + '`'
      : matchTime;
  }
  if (Number(hours.split(':')[0]) >= 12) {
    return 'TBD';
  }
  return hours;
};

export const returnInMatchTime = (match: MatchInterface) => {
  if (!match) return '';
  const { firstHalfStartTime, competition, inMatchTime, matchDate } = match;
  if (match.inMatchTime) return match.inMatchTime;
  if (competition?.name === 'AL Elite') {
    const nowToTZ = dayjs(new Date()).utc().tz('Africa/Cairo');
    const time = firstHalfStartTime ? firstHalfStartTime : matchDate;
    const dateToTZ = dayjs(time).utc().tz('Africa/Cairo');
    const diff = nowToTZ.diff(dateToTZ, 'm');
    let modTime;
    if (diff >= 43 && diff < 50) {
      modTime = 'Half Time';
    } else if (diff >= 90) {
      modTime = 'Full Time';
    } else if (diff >= 50 && diff < 90) {
      modTime = String(diff - 50 + 45);
    } else {
      modTime = String(diff);
    }

    return modTime;
  }

  return inMatchTime;
};

export const now = dayjs.utc().tz('Africa/Cairo').format();
export const less2Hours = dayjs(dayjs().tz('Africa/Cairo').subtract(2, 'h'))
  .utc()
  .format();

export const mapKeyToName = (key: string | undefined) => {
  if (key === 'Egyptian Amateur League' || !key) {
    return 'AL Elite';
  }
  return key;
};

export const isElite = (key: string | undefined) => {
  if (key === 'Egyptian Amateur League' || key === 'AL Elite' || !key) {
    return true;
  }
  return false;
};

export const lowerCaseNoSpaces = (str: string) => {
  return str.toLowerCase().replace(/\s/g, '-');
};

export const upperCaseFirstLetterWithSpaces = (str: string) => {
  return str
    .toLowerCase()
    .split('-')
    .map((txt) =>
      txt.toLowerCase() === 'al'
        ? 'AL'
        : txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
    .join(' ');
};

export const returnImage = (team: Partial<Team>) => {
  return team?.teamLogo && team.teamLogo?.url
    ? team.teamLogo.url
    : team?.mascotLogo;
};

export function youtube_parser(url: string) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}
