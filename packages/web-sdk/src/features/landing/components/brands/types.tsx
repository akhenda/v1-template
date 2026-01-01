import type { SVGProps } from 'react';

import type { PropsWithClassName } from '@repo/types';

export type LogoProps = SVGProps<SVGSVGElement> & PropsWithClassName<{ overrideColor?: boolean }>;
