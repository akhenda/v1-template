import { Star } from 'lucide-react';
import React from 'react';

import { cn } from '../lib/utils';

const ratingVariants = {
  default: { star: 'text-foreground', emptyStar: 'text-muted-foreground' },
  destructive: { star: 'text-red-500', emptyStar: 'text-red-200' },
  yellow: { star: 'text-yellow-500', emptyStar: 'text-yellow-200' },
};

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  totalStars?: number;
  size?: number;
  fill?: boolean;
  Icon?: React.ReactElement<{ size: number; className: string }>;
  variant?: keyof typeof ratingVariants;
}

const Ratings = ({
  rating,
  totalStars = 5,
  size = 20,
  fill = true,
  Icon = <Star />,
  variant = 'default',
  ...props
}: RatingsProps) => {
  const fullStars = Math.floor(rating);
  const partialStar =
    rating % 1 > 0 ? (
      <PartialStar
        fillPercentage={rating % 1}
        size={size}
        className={cn(ratingVariants[variant].star)}
        Icon={Icon}
      />
    ) : null;

  return (
    <div className={cn('flex items-center gap-2')} {...props}>
      {[...new Array(fullStars)].map((_, i) =>
        React.cloneElement(Icon, {
          key: i,
          size,
          className: cn(fill ? 'fill-current' : 'fill-transparent', ratingVariants[variant].star),
        }),
      )}
      {partialStar}
      {[...new Array(totalStars - fullStars - (partialStar ? 1 : 0))].map((_, i) =>
        React.cloneElement(Icon, {
          key: i + fullStars + 1,
          size,
          className: cn(ratingVariants[variant].emptyStar),
        }),
      )}
    </div>
  );
};

interface PartialStarProps {
  fillPercentage: number;
  size: number;
  className?: string;
  Icon: React.ReactElement<{ size: number; className: string }>;
}
const PartialStar = ({ ...props }: PartialStarProps) => {
  const { fillPercentage, size, className, Icon } = props;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {React.cloneElement(Icon, {
        size,
        className: cn('fill-transparent', className),
      })}
      <div
        style={{
          position: 'absolute',
          top: 0,
          overflow: 'hidden',
          width: `${fillPercentage * 100}%`,
        }}
      >
        {React.cloneElement(Icon, {
          size,
          className: cn('fill-current', className),
        })}
      </div>
    </div>
  );
};

export { Ratings };
