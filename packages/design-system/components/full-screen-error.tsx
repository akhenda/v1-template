'use client';

import type React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, Wifi, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '../lib/utils';
import { Button } from './ui/button';

export interface FullScreenErrorProps {
  /**
   * Whether the error screen is visible
   */
  isVisible?: boolean;
  /**
   * Whether to display in full-screen mode or fit within parent container
   */
  fullScreen?: boolean;
  /**
   * Error type affects styling and default icon
   */
  errorType?: 'error' | 'warning' | 'critical' | 'network' | 'notFound';
  /**
   * Main error title
   */
  title?: string;
  /**
   * Error description or message
   */
  message?: string;
  /**
   * Additional details or technical information
   */
  details?: string;
  /**
   * Animation style for the error icon/elements
   */
  animationStyle?: 'shake' | 'pulse' | 'bounce' | 'glow' | 'float';
  /**
   * Primary color for error elements
   */
  primaryColor?: string;
  /**
   * Secondary color for accents
   */
  secondaryColor?: string;
  /**
   * Background color or gradient
   */
  backgroundColor?: string;
  /**
   * Custom icon component (overrides default)
   */
  customIcon?: React.ReactNode;
  /**
   * Size of the main icon
   */
  iconSize?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Action buttons configuration
   */
  actions?: Array<{
    label: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    icon?: React.ReactNode;
    onClick: () => void;
    primary?: boolean;
  }>;
  /**
   * Optional className for additional styling
   */
  className?: string;
  /**
   * Animation speed multiplier
   */
  speed?: number;
  /**
   * Whether to show decorative background elements
   */
  showBackgroundElements?: boolean;
  /**
   * Callback when error screen is dismissed
   */
  onDismiss?: () => void;
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
export function FullScreenError({
  isVisible = true,
  fullScreen = true,
  errorType = 'error',
  title,
  message,
  details,
  animationStyle = 'shake',
  primaryColor,
  secondaryColor,
  backgroundColor,
  customIcon,
  iconSize = 'lg',
  actions = [],
  className,
  speed = 1,
  showBackgroundElements = true,
  onDismiss,
}: FullScreenErrorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Default configurations based on error type
  const getErrorConfig = () => {
    switch (errorType) {
      case 'error':
        return {
          defaultTitle: 'Something went wrong',
          defaultMessage: 'We encountered an unexpected error. Please try again.',
          defaultPrimaryColor: '#ef4444',
          defaultSecondaryColor: '#fca5a5',
          defaultIcon: <XCircle className="h-full w-full" />,
        };
      case 'warning':
        return {
          defaultTitle: 'Warning',
          defaultMessage: 'Please review the information and try again.',
          defaultPrimaryColor: '#f59e0b',
          defaultSecondaryColor: '#fde68a',
          defaultIcon: <AlertTriangle className="h-full w-full" />,
        };
      case 'critical':
        return {
          defaultTitle: 'Critical Error',
          defaultMessage: 'A critical error has occurred. Please contact support immediately.',
          defaultPrimaryColor: '#dc2626',
          defaultSecondaryColor: '#fecaca',
          defaultIcon: <AlertCircle className="h-full w-full" />,
        };
      case 'network':
        return {
          defaultTitle: 'Connection Error',
          defaultMessage: 'Unable to connect to the server. Please check your internet connection.',
          defaultPrimaryColor: '#6366f1',
          defaultSecondaryColor: '#c7d2fe',
          defaultIcon: <Wifi className="h-full w-full" />,
        };
      case 'notFound':
        return {
          defaultTitle: 'Page Not Found',
          defaultMessage: "The page you're looking for doesn't exist or has been moved.",
          defaultPrimaryColor: '#8b5cf6',
          defaultSecondaryColor: '#ddd6fe',
          defaultIcon: <AlertCircle className="h-full w-full" />,
        };
      default:
        return {
          defaultTitle: 'Error',
          defaultMessage: 'An error occurred.',
          defaultPrimaryColor: '#ef4444',
          defaultSecondaryColor: '#fca5a5',
          defaultIcon: <XCircle className="h-full w-full" />,
        };
    }
  };

  const config = getErrorConfig();
  const finalTitle = title || config.defaultTitle;
  const finalMessage = message || config.defaultMessage;
  const finalPrimaryColor = primaryColor || config.defaultPrimaryColor;
  const finalSecondaryColor = secondaryColor || config.defaultSecondaryColor;
  const finalBackgroundColor =
    backgroundColor || (fullScreen ? 'rgba(255, 255, 255, 0.95)' : 'transparent');

  // Icon size mapping - adjust for container mode
  const getIconSizeMap = () => {
    if (fullScreen) return { sm: 'w-16 h-16', md: 'w-24 h-24', lg: 'w-32 h-32', xl: 'w-40 h-40' };

    return { sm: 'w-12 h-12', md: 'w-16 h-16', lg: 'w-20 h-20', xl: 'w-24 h-24' };
  };

  const iconSizeMap = getIconSizeMap();

  // Animation variants
  const getIconAnimation = () => {
    const baseTransition = {
      duration: 2 / speed,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'easeInOut' as const,
    };

    switch (animationStyle) {
      case 'shake':
        return {
          x: [-2, 2, -2, 2, 0],
          transition: {
            duration: 0.5 / speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut' as const,
          },
        };
      case 'pulse':
        return { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8], transition: baseTransition };
      case 'bounce':
        return { y: [0, -10, 0], transition: baseTransition };
      case 'glow':
        return { scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8], transition: baseTransition };
      case 'float':
        return { y: [0, -8, 0], rotate: [0, 2, 0, -2, 0], transition: baseTransition };
      default:
        return { transition: { duration: 0 } };
    }
  };

  // Background decoration elements
  const BackgroundElements = () => {
    if (!showBackgroundElements) return null;

    const elementCount = fullScreen ? 6 : 3;
    const baseSize = fullScreen ? 100 : 60;

    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: elementCount }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              backgroundColor: i % 2 === 0 ? finalPrimaryColor : finalSecondaryColor,
              width: baseSize + i * (fullScreen ? 20 : 10),
              height: baseSize + i * (fullScreen ? 20 : 10),
              left: `${10 + i * 15}%`,
              top: `${5 + i * 10}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    );
  };

  // Get responsive classes based on fullScreen prop
  const getContainerClasses = () => {
    if (fullScreen) return 'fixed inset-0 z-50 flex flex-col items-center justify-center';

    return 'relative w-full min-h-[400px] flex flex-col items-center justify-center rounded-lg border';
  };

  // Get content spacing based on fullScreen prop
  const getContentSpacing = () => {
    if (fullScreen) return 'space-y-8 max-w-2xl mx-auto px-4';

    return 'space-y-4 max-w-lg mx-auto px-6 py-8';
  };

  // Get text sizes based on fullScreen prop
  const getTextSizes = () => {
    if (fullScreen) {
      return {
        title: 'text-3xl md:text-4xl font-bold text-gray-900',
        message: 'text-lg text-gray-600 max-w-md text-center',
        details: 'text-sm text-gray-500 max-w-lg',
      };
    }

    return {
      title: 'text-xl md:text-2xl font-bold text-gray-900',
      message: 'text-base text-gray-600 max-w-sm',
      details: 'text-xs text-gray-500 max-w-md',
    };
  };

  const textSizes = getTextSizes();

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(getContainerClasses(), className)}
          style={{ backgroundColor: finalBackgroundColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <BackgroundElements />

          <div
            className={cn(
              'relative flex flex-col items-center justify-center text-center',
              getContentSpacing(),
            )}
          >
            {/* Error Icon */}
            <motion.div
              className={cn('flex items-center justify-center', iconSizeMap[iconSize])}
              style={{ color: finalPrimaryColor }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, ...getIconAnimation() }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {customIcon || config.defaultIcon}
            </motion.div>

            {/* Error Content */}
            <motion.div
              className={cn('flex flex-col items-center', fullScreen ? 'space-y-4' : 'space-y-3')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h1 className={textSizes.title}>{finalTitle}</h1>

              <p className={textSizes.message}>{finalMessage}</p>

              {details && (
                <motion.details
                  className={textSizes.details}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <summary className="cursor-pointer transition-colors hover:text-gray-700">
                    Technical Details
                  </summary>
                  <div
                    className={cn(
                      'mt-2 rounded-md bg-gray-100 p-3 text-left font-mono',
                      fullScreen ? 'text-xs' : 'text-[10px]',
                    )}
                  >
                    {details}
                  </div>
                </motion.details>
              )}
            </motion.div>

            {/* Action Buttons */}
            {actions.length > 0 && (
              <motion.div
                className={cn('flex flex-wrap justify-center gap-3', !fullScreen && 'gap-2')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || (action.primary ? 'default' : 'outline')}
                    onClick={action.onClick}
                    size={fullScreen ? 'default' : 'sm'}
                    className="flex items-center gap-2"
                  >
                    {action.icon}
                    {action.label}
                  </Button>
                ))}
              </motion.div>
            )}

            {/* Dismiss Button */}
            {onDismiss && (
              <motion.button
                className={cn(
                  'absolute p-2 text-gray-400 transition-colors hover:text-gray-600',
                  fullScreen ? 'top-4 right-4' : 'top-2 right-2',
                )}
                onClick={onDismiss}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <XCircle className={fullScreen ? 'h-6 w-6' : 'h-5 w-5'} />
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
