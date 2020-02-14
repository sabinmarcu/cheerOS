import { useState, useMemo, useEffect } from 'react';
import { groupCollapsed, groupEnd, log } from '../utils/log';

export const prefix = "app";
export const logGroup = (
  message: string,
  key: string,
  ...rest: any[]
  ) => {
  groupCollapsed(`${message} %c${key}`, 'color: grey; font-size: 0.9em');
  rest.forEach((it: any) => {
    if (Array.isArray(it)) {
      log(...it);
    } else {
      log(it);
    }
  })
  groupEnd();
}
export const logState = (
  message: string,
  key: string,
  value: any
) => {
  logGroup(
    message,
    key,
    [`Key: %c${key}`, 'color: blue; text-decoration: underline'],
    [`LocalStorage Key: %c${[prefix, key].join(':')}`, 'color: blue; text-decoration: underline'],
    ['Value:', value],
  )
}
export const useLocalStorage = (key: string, defaultValue?: any) => {
  const [value, setValue] = useState(defaultValue);
  useEffect(
    () => {
      const val = localStorage.getItem([prefix, key].join(':'));
      if (val) {
        try {
          logState('⚙ LocalStorage Get', key, val);
          setValue(JSON.parse(val));
        } catch (e) {
          logState('❌ Could not parse LS data', key, val);
        }
      }
    },
    [key],
  );
  useEffect(
    () => {
      logState('⚙ LocalStorage Set', key, value);
      localStorage.setItem([prefix, key].join(':'), JSON.stringify(value));
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
      }: StorageEvent) => {
        try {
          const [ov, nv] = [JSON.parse((oldValue as string)), JSON.parse((newValue as string))];
          const isLocalstorage = storageArea === localStorage;
          const isRightKey = k === [prefix, key].join(':');
          const isNewValue = ov !== nv;
          if (isLocalstorage && isRightKey && isNewValue) {
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
      return () => window.removeEventListener('storage', handler);
    },
    [setValue, key, value]
  )
  return [value, setValue];
}

export default useLocalStorage;
