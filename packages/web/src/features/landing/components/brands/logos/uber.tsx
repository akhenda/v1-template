import { cn } from '@repo/design-system/lib/utils';

import type { LogoProps } from '../types';

export function Uber({ className, overrideColor, ...rest }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      viewBox="0 0 4706.3 825"
      fill="currentColor"
      className={cn('text-gray-600', className)}
      {...rest}
    >
      <path
        // Fill attribute removed from path as well, inherit from SVG or CSS
        d="M764 0h181v574c0 302-193 408-473 408C193 982 0 876 0 574V23C0 7 8 0 24 0h181v565c0 181 80 256 267 256 188 0 268-75 268-256V23c0-16 8-23 24-23zm2049 157v242h458c8 0 11 4 8 12l-50 124c-5 11-12 16-27 16h-269c-88 0-120 27-120 86v171h620c8 0 11 4 8 12l-52 129c-5 11-12 16-27 16h-679c-52 0-72-18-72-57V67c0-47 26-67 94-67h728c8 0 11 4 8 11l-52 130c-5 11-12 16-27 16h-549zm-575 541c0 193-136 267-327 267h-506c-53 0-72-18-72-57V67c0-47 25-67 94-67h411c180 0 354 31 354 245 0 92-33 170-112 211 109 29 158 127 158 242zm-706-296h321c106 0 136-41 136-125s-30-124-136-124h-321v249zm503 278c0-89-31-133-145-133h-237c-88 0-121 27-121 86v179h358c114 0 145-44 145-132zm2660 285h-184c-15 0-21-6-27-16l-195-352h-179c-88 0-121 27-121 86v282h-176c-16 0-24-8-24-23V67c0-47 26-67 94-67h413c241 0 386 63 386 297 0 181-87 252-195 280l217 371c4 6 4 17-9 17zm-216-664c0-98-27-146-153-146h-337v292h337c126 0 153-47 153-146z"
      />
    </svg>
  );
}
