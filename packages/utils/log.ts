/* eslint-disable no-console,@typescript-eslint/no-explicit-any */
import { executeOnDev } from './func';

export const log = (...args: any[]): any => {
  executeOnDev(console.log, ...args);
};

export const group = (...args: any[]): any => {
  executeOnDev(console.group, ...args);
};

export const groupCollapsed = (...args: any[]): any => {
  executeOnDev(console.groupCollapsed, ...args);
};

export const groupEnd = (...args: any[]): any => {
  executeOnDev(console.groupEnd, ...args);
};

export default log;
