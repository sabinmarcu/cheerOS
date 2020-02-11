/* eslint-disable @typescript-eslint/no-explicit-any */

export const executeOnDev = (handler: Function, ...args: any[]): any => {
  if (process.env.NODE_ENV !== 'production') {
    return handler(...args);
  }
};

export default executeOnDev;
