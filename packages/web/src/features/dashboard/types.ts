import type { LucideIcon } from 'lucide-react';

export const ApplicationStatuses = {
  DRAFT: 'draft',
  APPLIED: 'applied',
  REJECTED: 'rejected',
  INTERVIEW: 'interview',
  OFFER: 'offer',
  EXPIRED: 'expired',
} as const;

export type ApplicationStatus = (typeof ApplicationStatuses)[keyof typeof ApplicationStatuses];

/**
 * A single job-application record
 */
export interface Application {
  id: number;
  company: string;
  position: string;
  date: string; // ISO-8601 date (yyyy-MM-dd)
  status: ApplicationStatus;
  atsScore: number;
}

export type KPICardName =
  | 'Applications'
  | 'Rejections'
  | 'Interviews'
  | 'AI Credits'
  | 'ATS Score'
  | 'Last ATS Score';
export type KPICardTrend = 'up' | 'down';
export type KPICardColor = 'success' | 'danger';

export interface KPICard {
  name: KPICardName;
  stat: string; // current-week value
  prevStat: string; // prior-week value
  change: string; // ±xx%
  trend: KPICardTrend;
  color: KPICardColor;
  Icon?: LucideIcon;
}
