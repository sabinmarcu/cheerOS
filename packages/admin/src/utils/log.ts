/* eslint-disable no-console,@typescript-eslint/no-explicit-any */
import { executeOnDev } from './func';

export const log = (...args: any[]): any => {
  executeOnDev(console.log, ...args);
};

export default log;
