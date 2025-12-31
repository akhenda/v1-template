'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { ArrowRightIcon, CoinsIcon } from 'lucide-react';

import { useUpdateEffect } from '../../hooks/use-update-effect';
import { cn } from '../../lib/utils';
import { EnhancedButton } from '../enhanced-button';
import { Loader } from '../loader';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Textarea } from '../ui/textarea';

import type { AIActionButtonProps } from './button';
import { AIActionButton } from './button';

export type AIActionDialogStatus = 'init' | 'instructions' | 'dialog' | 'results';
export type AIActionDialogProps = AIActionButtonProps & {
  credits: number;
  cost?: number;
  status?: AIActionDialogStatus;
  title?: string;
  buttonText?: string;
  resultOptions?: string[];
  skipInstructions?: boolean;
  skipResults?: boolean;
  onAction: () => void;
};

const dummyResults = [
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. Quos quod repellat quia. Nisi, quos. Quos quod repellat quia. Nisi, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. Quos quod repellat quia. Nisi, quos. Quos quod repellat quia. Nisi, quos.',
  'Consectetur adipisicing elit. Quisquam, voluptates. Quos quod repellat quia. Nisi, quos. Quos quod repellat quia. Nisi, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. Quos quod repellat quia. Nisi, quos. Quos quod repellat quia. Nisi, quos.',
  'Ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. Quos quod repellat quia. Nisi, quos. Quos quod repellat quia. Nisi, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. Quos quod repellat quia. Nisi, quos. Quos quod repellat quia. Nisi, quos.',
];

function AIActionCredits({
  credits,
  className,
  textClassName,
}: {
  credits: number;
  className?: string;
  textClassName?: string;
}) {
  return (
    <div className={cn('mt-2 flex flex-row items-center gap-2', className)}>
      <CoinsIcon className="size-4 text-emerald-500" />
      <p className={cn('font-semibold text-destructive text-sm', textClassName)}>
        {credits} {credits > 1 || credits === 0 ? 'Credits' : 'Credit'} left
      </p>
    </div>
  );
}

export function AIActionDialogComponent({
  size,
  className,
  loading,

  status = 'init',
  credits = 0,
  cost = 1,
  title = 'Enhance this section using AI ✨',
  actionText = 'Enhance with AI',
  buttonText = 'Enhance with AI',

  skipResults = false,
  skipInstructions = false,
  resultOptions = dummyResults,
  onAction,
  ...rest
}: AIActionDialogProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [step, setStep] = useState<AIActionDialogStatus>(() =>
    credits < 10 ? 'init' : 'instructions',
  );

  useUpdateEffect(() => {
    if (status !== 'init') setStep(status);
  }, [status]);

  const onReset = useCallback(() => {
    setOpenPopover(false);
    setOpenDialog(false);

    if (credits > 10) setStep('instructions');
    else setStep('init');
  }, []);

  const onConfirm = useCallback(() => {
    onAction();
    setStep('dialog');
    setOpenPopover(false);
    setOpenDialog(true);
  }, []);

  const onContinue = useCallback(() => {
    // if (!skipInstructions) return setStep('instructions');

    // return onConfirm();
    setStep('instructions');
  }, []);

  useEffect(() => {
    if (!openDialog && !['init', 'instructions'].includes(step)) setTimeout(onReset, 500);
  }, [openDialog, step]);

  // useEffect(() => {
  //   if (step === 'dialog' && !skipResults) {
  //     setTimeout(() => {
  //       setStep('results');
  //     }, 7000);
  //   }

  //   if (step === 'dialog' && skipResults) {
  //     setTimeout(() => {
  //       setOpenDialog(false);
  //     }, 7000);
  //   }
  // }, [step]);

  useEffect(() => {
    if (step === 'dialog' && !skipResults) setStep('results');
    if (step === 'results' && skipResults) setOpenDialog(false);
  }, [step]);

  return (
    <Dialog onOpenChange={setOpenDialog} open={openDialog}>
      <Popover onOpenChange={setOpenPopover} open={openPopover}>
        <PopoverTrigger asChild>
          <AIActionButton
            actionText={actionText}
            className={className}
            loading={loading}
            size={size}
            // onClick={skipInstructions && credits > 10 ? onConfirm : undefined}
            {...rest}
          />
        </PopoverTrigger>
        <PopoverContent className="w-70">
          <div className="flex flex-col space-y-2">
            <h4 className="mb-2 font-medium text-[0.98rem] leading-none">{title}</h4>
            {step === 'init' && (
              <>
                <div className="mt-2 flex flex-row items-center gap-2">
                  <CoinsIcon className="size-4 text-emerald-500" />
                  <p className="font-semibold text-destructive text-sm">
                    {credits} {credits > 1 || credits === 0 ? 'Credits' : 'Credit'} left
                  </p>
                </div>
                <div className="mb-4 flex w-full gap-2">
                  {credits > 0 && (
                    <p className="text-sm">
                      Your ResumeMoto credits are about to run out. Buy more credits or upgrade to
                      Pro for unlimited access.
                    </p>
                  )}
                  {credits === 0 && (
                    <p className="text-sm">
                      You have exhausted your ResumeMoto credits. Buy more credits or upgrade to Pro
                      for unlimited access.
                    </p>
                  )}
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Button className="border-2 border-primary bg-transparent" variant="outline">
                    ⚡ Upgrade
                  </Button>
                  <div className={cn('w-full', { 'cursor-not-allowed': credits < cost })}>
                    <Button className="w-full" disabled={credits < cost} onClick={onContinue}>
                      {buttonText} ({cost} {cost > 1 ? 'Credits' : 'Credit'})
                    </Button>
                  </div>
                </div>
              </>
            )}
            {step === 'instructions' && (
              <>
                {skipInstructions ? (
                  <p className="inline">
                    This actions requires{' '}
                    <span className="font-bold text-sm">
                      <CoinsIcon className="inline size-4 text-emerald-500" />
                      {cost} {cost > 1 ? 'Credits' : 'Credit'}
                    </span>
                    . Are you sure you want to proceed?
                  </p>
                ) : (
                  <Textarea
                    className="min-h-32"
                    placeholder="Optional: You can provide any instructions you would like the AI to follow when enhancing the content."
                  />
                )}
                <div
                  className={cn('flex w-full justify-end', {
                    'cursor-not-allowed': credits < cost,
                  })}
                >
                  <DialogTrigger asChild>
                    <Button className="w-fit" disabled={credits < cost} onClick={onConfirm}>
                      {buttonText}
                    </Button>
                  </DialogTrigger>
                </div>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <DialogContent className="bg-card sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{step === 'results' ? 'Results' : 'Enhancing with AI'}</DialogTitle>
          <DialogDescription className="mb-2 font-medium text-[0.98rem] leading-none">
            {title}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <AIActionCredits className="justify-end" credits={credits} />
          {step === 'dialog' && (
            <div className="flex flex-col items-center justify-center gap-2">
              <Loader className="my-4" type="ellipsis" />
              <span>Enhancing with AI...</span>
            </div>
          )}
          {step === 'results' && (
            <div className="flex flex-col gap-4">
              {resultOptions.map((result, index) => (
                <div className="flex flex-col space-y-2 rounded-md border p-3" key={index}>
                  <p className="text-sm">{result}</p>
                  <EnhancedButton
                    className="h-7 w-fit self-end"
                    effect="ringHover"
                    icon={ArrowRightIcon}
                    iconPlacement="right"
                    size="sm"
                    variant="secondary"
                  >
                    Use
                  </EnhancedButton>
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-start">
          {credits < 10 && <Button>⚡ Upgrade</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

AIActionDialogComponent.displayName = 'AIActionDialog';
export const AIActionDialog = React.memo(AIActionDialogComponent);
