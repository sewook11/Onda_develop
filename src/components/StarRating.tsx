'use client';

import { Star } from 'lucide-react';
import clsx from 'clsx';

type StarRatingProps = {
  rating: number; // 0~5
  size?: number;
  className?: string;
};

const StarRating = ({ rating, size = 20, className }: StarRatingProps) => {
  return (
    <div className={clsx("flex gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((n) => {
        const fillPercentage = Math.min(Math.max(rating - (n - 1), 0), 1) * 100;

        return (
          <div key={n} className="relative w-fit" style={{ width: size, height: size }}>
            {/* 빈 별 */}
            <Star size={size} className="text-accent-main" />

            {/* 채워지는 별 */}
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{
                width: `${fillPercentage}%`,
                height: size,
              }}
            >
              <Star
                size={size}
                className="text-transparent"
                style={{
                  fill: 'url(#grad)',
                }}
              />
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F26B38" />
                    <stop offset="100%" stopColor="#F26B38" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
