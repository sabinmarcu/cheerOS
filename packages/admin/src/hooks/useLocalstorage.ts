import { useState, useMemo, useEffect } from 'react';
import { groupCollapsed, groupEnd, log } from '../utils/log';

export const prefix = "app";
export const logState = (
  message: string,
  key: string,
  lsKey: string,
  value: any
) => {
  groupCollapsed(`${message} %c${key}`, 'color: grey; font-size: 0.9em');
  log(`Key: %c${key}`, 'color: blue; text-decoration: underline');
  log(`LocalStorage Key: %c${lsKey}`, 'color: blue; text-decoration: underline');
  log('Value:', value);
  groupEnd();
}
export const useLocalStorage = (key: string, defaultValue?: any) => {
  const lsKey = useMemo(
    () => [prefix, key].join(':'),
    [key],
  );
  const [value, setValue] = useState(defaultValue);
  useEffect(
    () => {
      const val = localStorage.getItem(lsKey);
      if (val) {
        try {
          logState('⚙ LocalStorage Get', key, lsKey, val);
          setValue(JSON.parse(val));
        } catch (e) {
          logState('❌ Could not parse LS data', key, lsKey, val);
        }
      }
    },
    [lsKey, key, setValue],
  );
  useEffect(
    () => {
      logState('⚙ LocalStorage Set', key, lsKey, value);
      localStorage.setItem(lsKey, JSON.stringify(value));
    },
    [key, lsKey, value],
  );
  return [value, setValue];
}

export default useLocalStorage;
