'use client';

/**
 * Implementation based on github.com/epicweb-dev/epic-stack
 */

import { type ButtonHTMLAttributes, useState } from 'react';

import { callAll } from '../lib';

export function useDoubleCheck() {
  const [doubleCheck, setDoubleCheck] = useState(false);

  function getButtonProps(props?: ButtonHTMLAttributes<HTMLButtonElement>) {
    const onBlur: ButtonHTMLAttributes<HTMLButtonElement>['onBlur'] = () => setDoubleCheck(false);
    const onClick: ButtonHTMLAttributes<HTMLButtonElement>['onClick'] = doubleCheck
      ? undefined
      : (e) => {
          e.preventDefault();
          setDoubleCheck(true);
        };

    const onKeyUp: ButtonHTMLAttributes<HTMLButtonElement>['onKeyUp'] = (e) => {
      if (e.key === 'Escape') setDoubleCheck(false);
    };

    return {
      ...props,
      onBlur: callAll(onBlur, props?.onBlur),
      onClick: callAll(onClick, props?.onClick),
      onKeyUp: callAll(onKeyUp, props?.onKeyUp),
    };
  }

  return { doubleCheck, getButtonProps };
}
