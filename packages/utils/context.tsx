import React, { createElement, ReactElement } from 'react';
import { log } from './log';

export const CombineContexts: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contexts: React.FC<any>[];
}> = ({
  children,
  contexts,
}) => contexts.reverse().reduce(
  (prev, it) => {
    log('⌛ Mounting Context:', it.displayName);
    return createElement(it, { children: prev });
  },
  (children as ReactElement),
);

export default CombineContexts;
