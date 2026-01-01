'use client';

import React from 'react';

import { motion } from 'framer-motion';

import { cn } from '../../../lib/utils';

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  const colors = [
    '#93c5fd',
    '#f9a8d4',
    '#86efac',
    '#fde047',
    '#fca5a5',
    '#d8b4fe',
    '#93c5fd',
    '#a5b4fc',
    '#c4b5fd',
  ];
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className={cn(
        '-top-1/4 -translate-x-1/2 -translate-y-1/2 absolute left-1/4 z-0 flex h-full w-full p-4',
        className,
      )}
      style={{
        transform:
          'translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)',
      }}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div className="relative h-8 w-16 border-slate-700 border-l" key={`row${i}`}>
          {cols.map((__, j) => (
            <motion.div
              animate={{
                transition: { duration: 2 },
              }}
              className="relative h-8 w-16 border-slate-700 border-t border-r"
              key={`col${j}`}
              whileHover={{
                backgroundColor: `${getRandomColor()}`,
                transition: { duration: 0 },
              }}
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  className="-top-3.5 -left-5.5 pointer-events-none absolute h-6 w-10 stroke-[1px] text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 6v12m6-6H6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
