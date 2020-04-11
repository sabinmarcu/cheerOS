import React, { createElement, ReactElement } from 'react';
import { log } from './log';

export const CombineContexts: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contexts: (
    React.FC<any> |
    [React.FC<any>, Record<string, any>]
  )[];
}> = ({
  children,
  contexts,
}) => contexts.reverse().reduce(
  (prev, it) => {
    let ctx;
    let props;
    if (Array.isArray(it)) {
      [ctx, props] = it;
    } else {
      ctx = it;
      props = {};
    }
    log('⌛ Mounting Context:', ctx.displayName);
    return createElement(ctx, { children: prev, ...props });
  },
  (children as ReactElement),
);

export default CombineContexts;
