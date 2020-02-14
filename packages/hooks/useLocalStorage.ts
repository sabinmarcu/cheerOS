/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { groupCollapsed, groupEnd, log } from '@cheeros/utils/log';

export const prefix = 'app';
export const logGroup = (
  message: string,
  key: string,
  ...rest: any[]
): void => {
  groupCollapsed(`${message} %c${key}`, 'color: grey; font-size: 0.9em');
  rest.forEach((it: any) => {
    if (Array.isArray(it)) {
      log(...it);
    } else {
      log(it);
    }
  });
  groupEnd();
};

export const logState = (
  message: string,
  key: string,
  value: any,
): void => {
  logGroup(
    message,
    key,
    [`Key: %c${key}`, 'color: blue; text-decoration: underline'],
    [`LocalStorage Key: %c${[prefix, key].join(':')}`, 'color: blue; text-decoration: underline'],
    ['Value:', value],
  );
};

export const useLocalStorage = (key: string, defaultValue?: any): [any, (value: any) => void] => {
  const [value, setValue] = useState(
    ((): any => {
      const val = localStorage.getItem([prefix, key].join(':'));
      if (val) {
        try {
          logState('⚙ LocalStorage Get', key, val);
          return JSON.parse(val);
        } catch (e) {
          logState('❌ Could not parse LS data', key, val);
        }
        return defaultValue;
      }
      return null;
    })(),
  );
  useEffect(
    () => {
      let shouldUpdate = true;
      try {
        const existingValue = localStorage.getItem([prefix, (key)].join(':'));
        if (existingValue && JSON.parse(existingValue) === value) {
          shouldUpdate = false;
        }
      } catch (e) {
        // Nope
      }
      if (shouldUpdate) {
        logState('⚙ LocalStorage Set', key, value);
        localStorage.setItem([prefix, key].join(':'), JSON.stringify(value));
      }
    },
    [key, value],
  );
  useEffect(
    () => {
      const handler = ({
        storageArea,
        key: k,
        oldValue,
        newValue,
      }: StorageEvent): ((() => void) | void) => {
        try {
          const [ov, nv] = [JSON.parse((oldValue as string)), JSON.parse((newValue as string))];
          const isLocalStorage = storageArea === localStorage;
          const isRightKey = k === [prefix, key].join(':');
          const isNewValue = ov !== nv;
          if (isLocalStorage && isRightKey && isNewValue) {
            logGroup(
              '⚙ LocalStorage Event',
              key,
              [`Old Value: %c${ov}`, 'color: red; text-decoration: underline'],
              [`New Value: %c${nv}`, 'color: green; text-decoration: underline'],
            );
            setValue(nv);
          }
        } catch (e) {
          logState('❌ Could not parse LS data from Event', key, newValue);
        }
      };
      window.addEventListener('storage', handler);
      return (): void => window.removeEventListener('storage', handler);
    },
    [setValue, key, value],
  );
  return [value, setValue];
};

export default useLocalStorage;
