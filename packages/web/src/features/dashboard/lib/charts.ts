import applications from '../../fixtures/example.json';
import type { Application } from '../types';

/**
 * Period to aggregate by
 */
type Period = 'day' | 'week' | 'month';

/**
 * One data point for the chart
 */
interface ChartRow {
  /**
   * yyyy-MM-dd  → daily
   * yyyy-MM     → monthly
   * yyyy-MM-dd  (Monday of the week) → weekly
   */
  date: string;
  applied: number;
  rejected: number;
  interview: number;
}

/**
 * Build chart-ready, time-bucketed statistics from a list of applications.
 *
 * @param apps     List of applications
 * @param period   Bucket size: 'day' | 'week' | 'month' (default: 'day')
 */
export function buildChartData(apps: Application[], period: Period = 'day'): ChartRow[] {
  /**
   * yyyy-MM-dd helper
   */
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(
      2,
      '0',
    )}`;

  /**
   * Resolve the bucket label for a given date string
   */
  const bucketKey = (isoDate: string): string => {
    const d = new Date(isoDate);

    switch (period) {
      case 'month':
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

      case 'week': {
        // ISO-8601 Monday
        const monday = new Date(d);
        const wd = monday.getDay(); // 0-Sun … 6-Sat
        const diff = (wd === 0 ? -6 : 1) - wd;
        monday.setDate(monday.getDate() + diff);
        return fmt(monday);
      }

      default: // day
        return fmt(d);
    }
  };

  const buckets = new Map<string, ChartRow>();

  for (const app of apps) {
    const key = bucketKey(app.date);
    if (!buckets.has(key)) buckets.set(key, { date: key, applied: 0, rejected: 0, interview: 0 });

    const row = buckets.get(key)!;

    switch (app.status) {
      case 'applied':
        row.applied++;
        break;
      case 'rejected':
        row.rejected++;
        break;
      case 'interview':
      case 'offer': // treat “offer” as having reached interview stage
        row.interview++;
        break;
      default:
        // ignore any other custom statuses, or handle as you wish
        break;
    }
  }

  // return chronologically sorted rows
  return [...buckets.values()].sort((a, b) => a.date.localeCompare(b.date));
}

/* ────────────────  Example  ──────────────── */

// import applications from './applications.json'
// const chartDaily   = buildChartData(applications, 'day')
// const chartWeekly  = buildChartData(applications, 'week')
// const chartMonthly = buildChartData(applications, 'month')

export const chartDaily = buildChartData(applications as Application[], 'day');
