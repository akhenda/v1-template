'use client';

import { ArrowRightIcon, Eclipse, RocketIcon, TicketPercent, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { PropsWithClassName } from '@repo/types';

import { cn } from '../../lib/utils';
import { useAppearanceContext } from '../../providers/theme';

import { Button } from '../ui/button';

type BannerProps = PropsWithClassName<{ type?: 'announcement' | 'sale' | 'feature' | 'basic' }>;

// Define the sale end date - eg: new Date('2024-12-31T23:59:59');
const saleEndDate = new Date(Date.now() + 9 * 60 * 60 * 1000 + 45 * 60 * 1000 + 24 * 1000); // Setting 9h 45m 24s from now for demo purposes

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
};

function SaleBanner({ className }: PropsWithClassName) {
  const { themeClass, gradientClass, spacingClass } = useAppearanceContext();

  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = saleEndDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });

        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    // Calculate immediately and then every second
    calculateTimeLeft();

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible || timeLeft.isExpired) return null;

  return (
    <div
      className={cn(
        'dark bg-muted px-4 py-3 text-foreground',
        themeClass,
        gradientClass,
        spacingClass,
        className,
      )}
    >
      <div className="container mx-auto flex gap-2 px-5 md:items-center">
        <div className="flex grow gap-3 md:items-center">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 max-md:mt-0.5"
            aria-hidden="true"
          >
            <TicketPercent className="opacity-80" size={16} />
          </div>
          <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className="space-y-0.5">
              <p className="font-medium text-sm">Black Friday Sale!</p>
              <p className="text-muted-foreground text-sm">
                It kicks off today and is available for just 24 hours—don&lsquo;t miss out!
              </p>
            </div>
            <div className="flex gap-3 max-md:flex-wrap">
              <div className="flex items-center divide-x divide-primary-foreground rounded-md bg-primary/15 text-sm tabular-nums">
                {timeLeft.days > 0 && (
                  <span className="flex h-8 items-center justify-center p-2">
                    {timeLeft.days}
                    <span className="text-muted-foreground">d</span>
                  </span>
                )}
                <span className="flex h-8 items-center justify-center p-2">
                  {timeLeft.hours.toString().padStart(2, '0')}
                  <span className="text-muted-foreground">h</span>
                </span>
                <span className="flex h-8 items-center justify-center p-2">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                  <span className="text-muted-foreground">m</span>
                </span>
                <span className="flex h-8 items-center justify-center p-2">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                  <span className="text-muted-foreground">s</span>
                </span>
              </div>
              <Button size="sm" className="text-sm">
                Buy now
              </Button>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
          onClick={() => setIsVisible(false)}
          aria-label="Close banner"
        >
          <XIcon
            size={16}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  );
}

function NewFeatureBanner({ className }: PropsWithClassName) {
  const [isVisible, setIsVisible] = useState(true);
  const { themeClass, gradientClass, spacingClass } = useAppearanceContext();

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'dark bg-muted px-4 py-3 text-foreground',
        themeClass,
        gradientClass,
        spacingClass,
        className,
      )}
    >
      <div className="container mx-auto flex gap-2 px-5 md:items-center">
        <div className="flex grow gap-3 md:items-center">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 max-md:mt-0.5"
            aria-hidden="true"
          >
            <RocketIcon className="opacity-80" size={16} />
          </div>
          <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className="space-y-0.5">
              <p className="font-medium text-sm">Boost your experience with Origin UI</p>
              <p className="text-muted-foreground text-sm">
                The new feature is live! Try it out and let us know what you think.
              </p>
            </div>
            <div className="flex gap-2 max-md:flex-wrap">
              <Button size="sm" className="text-sm">
                Try now
              </Button>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
          onClick={() => setIsVisible(false)}
          aria-label="Close banner"
        >
          <XIcon
            size={16}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  );
}

function AnnouncementBanner({ className }: PropsWithClassName) {
  const [isVisible, setIsVisible] = useState(true);
  const { themeClass, gradientClass, spacingClass } = useAppearanceContext();

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'dark bg-muted px-4 py-3 text-foreground md:py-2',
        themeClass,
        gradientClass,
        spacingClass,
        className,
      )}
    >
      <div className="flex gap-2 md:items-center">
        <div className="flex grow gap-3 md:items-center md:justify-center">
          <Eclipse className="shrink-0 opacity-60 max-md:mt-0.5" size={16} aria-hidden="true" />
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <p className="text-sm">
              It&lsquo;s live and ready to use! Start exploring the latest addition to your toolkit.
            </p>
            <div className="flex gap-2 max-md:flex-wrap">
              <Button size="sm" className="rounded-full">
                Learn more
              </Button>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
          onClick={() => setIsVisible(false)}
          aria-label="Close banner"
        >
          <XIcon
            size={16}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  );
}

function BasicBanner({ className }: PropsWithClassName) {
  const { themeClass, gradientClass, spacingClass } = useAppearanceContext();

  return (
    <div
      className={cn(
        'dark bg-muted px-4 py-3 text-foreground',
        themeClass,
        gradientClass,
        spacingClass,
        className,
      )}
    >
      <p className="flex justify-center text-sm">
        <a href="/" className="group">
          <span className="me-1 text-base leading-none">✨</span>
          Introducing transactional and marketing emails
          <ArrowRightIcon
            className="-mt-0.5 ms-2 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
            size={16}
            aria-hidden="true"
          />
        </a>
      </p>
    </div>
  );
}

export function Banner({ type, className }: BannerProps) {
  if (type === 'announcement') return <AnnouncementBanner className={className} />;
  if (type === 'sale') return <SaleBanner className={className} />;
  if (type === 'feature') return <NewFeatureBanner className={className} />;

  return <BasicBanner className={className} />;
}
