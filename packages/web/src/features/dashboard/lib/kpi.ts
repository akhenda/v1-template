import { BriefcaseIcon, MessageSquareXIcon, PresentationIcon, SparklesIcon } from 'lucide-react';

/* -------------  types ------------- */

import applications from '../../fixtures/example.json';
import type { Application, KPICard } from '../types';

const removeTrailingZeroRegex = /\.0$/;

/* -------------  helpers ------------- */

// Round to one decimal unless it’s an integer.
const pct = (curr: number, prev: number) => {
  return prev === 0
    ? '—'
    : `${(((curr - prev) * 100) / Number.parseFloat(prev.toFixed(1).replace(removeTrailingZeroRegex, ''))).toFixed(1)}%`;
};

// Monday of the week containing the given date
const mondayOf = (iso: string) => {
  const d = new Date(iso);
  const wd = d.getDay(); // 0-Sun … 6-Sat
  const diff = (wd === 0 ? -6 : 1) - wd;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

// One-week-earlier Monday
const previousMonday = (m: Date) => new Date(m.getTime() - 7 * 24 * 3600_000);

/* -------------  main function ------------- */

/**
 * Build KPI-card data for the week that contains `dateISO`.
 *
 * @param apps              All application rows
 * @param dateISO           Any date inside the target week (yyyy-MM-dd)
 * @param lastCardHistory  Optional map { 'yyyy-MM-dd–Mon': number }
 */
export function buildWeeklyKPI(
  apps: Application[],
  dateISO: string,
  lastCardHistory: Record<string, number> = {},
): KPICard[] {
  const weekStart = mondayOf(dateISO);
  const prevStart = previousMonday(weekStart);

  const key = weekStart.toISOString().slice(0, 10);
  const prevKey = prevStart.toISOString().slice(0, 10);

  const init = { applied: 0, rejected: 0, interviews: 0 };
  const curr = { ...init };
  const prev = { ...init };

  const isInWeek = (d: Date, start: Date) =>
    d >= start && d < new Date(start.getTime() + 7 * 24 * 3600_000);

  for (const app of apps) {
    let bucket: typeof curr | typeof prev | null;

    const d = new Date(app.date);
    const isPrevWeek = isInWeek(d, prevStart);
    const isThisWeek = isInWeek(d, weekStart);

    if (isThisWeek) bucket = curr;
    else if (isPrevWeek) bucket = prev;
    else bucket = null;

    if (!bucket) continue;

    switch (app.status) {
      case 'applied':
        bucket.applied++;
        break;
      case 'rejected':
        bucket.rejected++;
        break;
      case 'interview':
      case 'offer':
        bucket.interviews++;
        break;
      default:
        break;
    }
  }

  // helper to decide "up/down" label
  const trend = (delta: number): 'up' | 'down' => (delta >= 0 ? 'up' : 'down');
  const color = (name: KPICard['name'], delta: number): 'success' | 'danger' => {
    if (name === 'Rejections') return delta < 0 ? 'success' : 'danger';

    return delta >= 0 ? 'success' : 'danger';
  };

  const kpis: KPICard[] = [
    {
      name: 'Applications',
      stat: String(curr.applied),
      prevStat: String(prev.applied),
      change: pct(curr.applied, prev.applied),
      trend: trend(curr.applied - prev.applied),
      color: color('Applications', curr.applied - prev.applied),
      Icon: BriefcaseIcon,
    },
    {
      name: 'Rejections',
      stat: String(curr.rejected),
      prevStat: String(prev.rejected),
      change: pct(curr.rejected, prev.rejected),
      trend: trend(curr.rejected - prev.rejected),
      color: color('Rejections', curr.rejected - prev.rejected),
      Icon: MessageSquareXIcon,
    },
    {
      name: 'Interviews',
      stat: String(curr.interviews),
      prevStat: String(prev.interviews),
      change: pct(curr.interviews, prev.interviews),
      trend: trend(curr.interviews - prev.interviews),
      color: color('Interviews', curr.interviews - prev.interviews),
      Icon: PresentationIcon,
    },
    // {
    //   name: 'AI Credits',
    //   stat: String(lastCardHistory[key] ?? 0),
    //   prevStat: String(lastCardHistory[prevKey] ?? 0),
    //   change: pct(lastCardHistory[key] ?? 0, lastCardHistory[prevKey] ?? 0),
    //   trend: trend((lastCardHistory[key] ?? 0) - (lastCardHistory[prevKey] ?? 0)),
    //   color: color('AI Credits', (lastCardHistory[key] ?? 0) - (lastCardHistory[prevKey] ?? 0)),
    //   Icon: SparklesIcon,
    // },
    {
      name: 'ATS Score',
      stat: `${String(lastCardHistory[key] ?? 0)}%`,
      prevStat: `${String(lastCardHistory[prevKey] ?? 0)}%`,
      change: pct(lastCardHistory[key] ?? 0, lastCardHistory[prevKey] ?? 0),
      trend: trend((lastCardHistory[key] ?? 0) - (lastCardHistory[prevKey] ?? 0)),
      color: color('AI Credits', (lastCardHistory[key] ?? 0) - (lastCardHistory[prevKey] ?? 0)),
      Icon: SparklesIcon,
    },
  ];

  return kpis;
}

/* ───── Example ─────
import applications from './applications.json'

const kpiCards = buildWeeklyKPI(applications, '2025-04-30', {
  '2025-04-28': 43,      // week of 28 Apr 2025
  '2025-04-21': 60,      // week of 21 Apr 2025
})
console.log(kpiCards)
*/

export const kpiCards = buildWeeklyKPI(applications as Application[], '2025-04-30', {
  '2025-04-27': 85, // week of 28 Apr 2025
  '2025-04-20': 78, // week of 21 Apr 2025
});
