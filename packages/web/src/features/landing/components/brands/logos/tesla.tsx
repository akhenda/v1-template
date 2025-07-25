import { cn } from '@repo/design-system/lib/utils';

import type { LogoProps } from '../types';

export function Tesla({ className, overrideColor, ...rest }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2423.5"
      height="829"
      version="1.0"
      viewBox="0 0 278.7 36.3"
      fill="currentColor"
      className={cn('text-gray-600', className)}
      {...rest}
    >
      <style>{`.st0{fill:${overrideColor ? 'currentColor' : '#5e5e5e'}}`}</style>
      <g id="TESLA">
        <path
          d="M238.1 14.4v21.9h7V21.7h25.6v14.6h7V14.4h-39.6m6.2-7.1h27c3.8-.7 6.5-4.1 7.3-7.3H237c.8 3.2 3.6 6.5 7.3 7.3m-27.5 29c3.5-1.5 5.4-4.1 6.2-7.1h-31.5V.1h-7.1v36.2h32.4M131.9 7.2h25c3.8-1.1 6.9-4 7.7-7.1H125v21.4h32.4V29H132c-4 1.1-7.4 3.8-9.1 7.3h41.5V14.4H132l-.1-7.2m-61.6.1h27c3.8-.7 6.6-4.1 7.3-7.3H62.9c.8 3.2 3.6 6.5 7.4 7.3m0 14.3h27c3.8-.7 6.6-4.1 7.3-7.3H62.9c.8 3.2 3.6 6.5 7.4 7.3m0 14.7h27c3.8-.7 6.6-4.1 7.3-7.3H62.9c.8 3.2 3.6 6.6 7.4 7.3M0 .1c.8 3.2 3.6 6.4 7.3 7.2h11.4l.6.2v28.7h7.1V7.5l.6-.2h11.4c3.8-1 6.5-4 7.3-7.2V0L0 .1"
          className="st0"
        />
      </g>
    </svg>
  );
}
