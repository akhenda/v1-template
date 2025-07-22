'use client';

import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '../lib/utils';

export interface FullScreenLoaderProps {
  /**
   * Whether the loader is visible
   */
  isLoading?: boolean;
  /**
   * Whether to display in full-screen mode or fit within parent container
   */
  fullScreen?: boolean;
  /**
   * The main message to display
   */
  message?: string;
  /**
   * Optional secondary message or instruction
   */
  subMessage?: string;
  /**
   * Animation style: 'bounce', 'pulse', 'wave', 'orbit'
   */
  animationStyle?: 'bounce' | 'pulse' | 'wave' | 'orbit';
  /**
   * Primary color for the animation elements
   */
  primaryColor?: string;
  /**
   * Secondary color for the animation elements
   */
  secondaryColor?: string;
  /**
   * Background color or gradient
   */
  backgroundColor?: string;
  /**
   * Number of animation elements (3-10)
   */
  elementCount?: number;
  /**
   * Optional className for additional styling
   */
  className?: string;
  /**
   * Animation speed multiplier (0.5-2)
   */
  speed?: number;
  /**
   * Optional callback when animation completes one cycle
   */
  onAnimationComplete?: () => void;
}

export function FullScreenLoaderComponent({
  isLoading = true,
  fullScreen = true,
  message = 'Loading...',
  subMessage,
  animationStyle = 'bounce',
  primaryColor = 'var(--color-primary)',
  secondaryColor = 'var(--color-muted-foreground)',
  backgroundColor,
  elementCount = 5,
  className,
  speed = 1,
  onAnimationComplete,
}: FullScreenLoaderProps) {
  const [mounted, setMounted] = useState(false);
  const [previousMessage, setPreviousMessage] = useState(message);
  const [previousSubMessage, setPreviousSubMessage] = useState(subMessage);

  // Ensure component only renders on client
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Track message changes for animations
  useEffect(() => {
    if (message !== previousMessage) setPreviousMessage(message);
  }, [message, previousMessage]);

  useEffect(() => {
    if (subMessage !== previousSubMessage) setPreviousSubMessage(subMessage);
  }, [subMessage, previousSubMessage]);

  // Limit element count to reasonable range
  const safeElementCount = Math.min(Math.max(elementCount, 3), 10);

  // Create array for animation elements
  const elements = Array.from({ length: safeElementCount }, (_, i) => i);

  // Get default background color based on mode
  const finalBackgroundColor =
    backgroundColor || (fullScreen ? 'rgba(255, 255, 255, 0.9)' : 'transparent');

  // Animation variants for the main container
  const containerVariants = {
    hidden: { opacity: 0, scale: fullScreen ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut', staggerChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      scale: fullScreen ? 1 : 0.95,
      transition: { duration: 0.3, ease: 'easeIn' },
    },
  };

  // Animation variants for the message (slide up from bottom, exit to top)
  const messageVariants = {
    hidden: { opacity: 0, y: fullScreen ? 50 : 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30, duration: 0.6 },
    },
    exit: {
      opacity: 0,
      y: fullScreen ? -50 : -30,
      scale: 0.9,
      transition: { duration: 0.4, ease: 'easeIn' },
    },
  };

  // Animation variants for the sub-message (fade in/out)
  const subMessageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3, ease: 'easeIn' },
    },
  };

  // Animation variants for the loading elements container
  const elementsContainerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.05 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3, ease: 'easeIn' },
    },
  };

  // Animation variants for individual loading elements
  const elementVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 400, damping: 25 },
    },
  };

  // Animation variants based on style for the loading elements
  const getAnimationVariants = () => {
    const baseTransition = {
      duration: 2.5 / speed,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'easeInOut',
    };

    switch (animationStyle) {
      case 'bounce':
        return {
          initial: (i: number) => ({
            y: 0,
            scale: 1,
            opacity: 0.7,
            transition: { ...baseTransition, delay: i * 0.1 },
          }),
          animate: (i: number) => ({
            y: [-20, 0, -20],
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
            transition: { ...baseTransition, delay: i * 0.1 },
          }),
        };
      case 'pulse':
        return {
          initial: (i: number) => ({
            scale: 1,
            opacity: 0.5,
            transition: { ...baseTransition, delay: i * 0.15 },
          }),
          animate: (i: number) => ({
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
            transition: { ...baseTransition, delay: i * 0.15 },
          }),
        };
      case 'wave':
        return {
          initial: (i: number) => ({
            y: 0,
            opacity: 0.5,
            transition: { ...baseTransition, delay: i * 0.1 },
          }),
          animate: (i: number) => ({
            y: [0, -30, 0],
            opacity: [0.5, 1, 0.5],
            transition: { ...baseTransition, delay: i * 0.1 },
          }),
        };
      case 'orbit':
        return {
          initial: (i: number) => ({
            rotate: 0,
            x: 0,
            y: 0,
            opacity: 0.7,
            transition: { ...baseTransition, delay: i * 0.1 },
          }),
          animate: (i: number) => ({
            rotate: 360,
            x: [0, 30 * Math.cos((2 * Math.PI * i) / safeElementCount), 0],
            y: [0, 30 * Math.sin((2 * Math.PI * i) / safeElementCount), 0],
            opacity: [0.7, 1, 0.7],
            transition: { ...baseTransition, delay: i * 0.1 },
          }),
        };
      default:
        return { initial: {}, animate: {} };
    }
  };

  const variants = getAnimationVariants();

  // Get element shape based on animation style and mode
  const getElementShape = (index: number) => {
    const baseSize = animationStyle === 'orbit' ? (fullScreen ? 12 : 8) : fullScreen ? 16 : 12;
    const size = baseSize - (index % 3) * 2;

    const baseStyle = {
      width: size,
      height: size,
      backgroundColor: index % 2 === 0 ? primaryColor : secondaryColor,
    };

    switch (animationStyle) {
      case 'bounce':
      case 'pulse':
        return (
          <motion.div
            className="rounded-full"
            style={baseStyle}
            custom={index}
            variants={{ ...elementVariants, ...variants }}
            initial="initial"
            animate={['visible', 'animate']}
            onAnimationComplete={index === 0 ? onAnimationComplete : undefined}
          />
        );
      case 'wave':
        return (
          <motion.div
            className="rounded-md"
            style={{
              ...baseStyle,
              width: fullScreen ? 8 : 6,
              height: (fullScreen ? 24 : 18) + (index % 3) * (fullScreen ? 8 : 6),
            }}
            custom={index}
            variants={{ ...elementVariants, ...variants }}
            initial="initial"
            animate={['visible', 'animate']}
            onAnimationComplete={index === 0 ? onAnimationComplete : undefined}
          />
        );
      case 'orbit':
        return (
          <motion.div
            className="rounded-full"
            style={baseStyle}
            custom={index}
            variants={{ ...elementVariants, ...variants }}
            initial="initial"
            animate={['visible', 'animate']}
            onAnimationComplete={index === 0 ? onAnimationComplete : undefined}
          />
        );
      default:
        return (
          <motion.div
            className="rounded-full"
            style={baseStyle}
            custom={index}
            variants={{ ...elementVariants, ...variants }}
            initial="initial"
            animate={['visible', 'animate']}
            onAnimationComplete={index === 0 ? onAnimationComplete : undefined}
          />
        );
    }
  };

  // Get responsive classes based on fullScreen prop
  const getContainerClasses = () => {
    if (fullScreen) return 'fixed inset-0 z-50 flex flex-col items-center justify-center';

    return 'relative w-full min-h-[300px] flex flex-col items-center justify-center rounded-lg border';
  };

  // Get content spacing based on fullScreen prop
  const getContentSpacing = () => {
    if (fullScreen) return 'space-y-8';

    return 'space-y-4';
  };

  // Get text sizes based on fullScreen prop
  const getTextSizes = () => {
    if (fullScreen) {
      return { message: 'text-xl font-medium', subMessage: 'text-sm text-muted-foreground' };
    }

    return { message: 'text-lg font-medium', subMessage: 'text-xs text-muted-foreground' };
  };

  const textSizes = getTextSizes();

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className={cn(getContainerClasses(), className)}
          style={{ backgroundColor: finalBackgroundColor }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className={cn('flex flex-col items-center justify-center', getContentSpacing())}
            variants={elementsContainerVariants}
          >
            {/* Loading Animation Elements */}
            <motion.div
              className={cn(
                'flex items-center justify-center',
                animationStyle === 'wave'
                  ? fullScreen
                    ? 'space-x-2'
                    : 'space-x-1'
                  : fullScreen
                    ? 'space-x-4'
                    : 'space-x-3',
              )}
              variants={elementsContainerVariants}
            >
              {elements.map((index) => (
                <motion.div key={index} variants={elementVariants}>
                  {getElementShape(index)}
                </motion.div>
              ))}
            </motion.div>

            {/* Text Content */}
            <div
              className={cn('max-w-md px-4 text-center', fullScreen ? 'space-y-2' : 'space-y-1')}
            >
              {/* Main Message - Slides up from bottom, exits to top */}
              <AnimatePresence mode="wait">
                <motion.h3
                  key={message} // Key ensures re-animation when message changes
                  className={textSizes.message}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {message}
                </motion.h3>
              </AnimatePresence>

              {/* Sub Message - Fades in/out */}
              <AnimatePresence mode="wait">
                {subMessage && (
                  <motion.p
                    key={subMessage} // Key ensures re-animation when subMessage changes
                    className={textSizes.subMessage}
                    variants={subMessageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {subMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const FullScreenLoader = React.memo(FullScreenLoaderComponent);
