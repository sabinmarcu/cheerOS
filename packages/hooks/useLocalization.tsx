/* eslint-disable no-restricted-syntax */

import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  useMemo,
  useDebugValue,
} from 'react';

import { getLangNameFromCode } from 'language-name-map';

import {
  log, group, groupCollapsed, groupEnd,
} from '@cheeros/utils/log';

import { negotiateLanguages } from '@fluent/langneg';
import { FluentBundle, FluentResource } from '@fluent/bundle';
import { ReactLocalization, LocalizationProvider } from '@fluent/react';
import { useLocalStorage } from './useLocalStorage';

const fetchTranslation = async ([locale, url]: [string, string]): Promise<[string, string]> => {
  const response = await fetch(url);
  const messages = await response.text();
  groupCollapsed('Fetching Locale', locale);
  log('Response', messages);
  groupEnd();
  return [locale, messages];
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* lazyParseBundles(fetchedMessages: Array<[string, string]>) {
  for (const [locale, messages] of fetchedMessages) {
    const resource = new FluentResource(messages);
    const bundle = new FluentBundle(locale);
    log('Parsing Bundle', locale);
    bundle.addResource(resource);
    yield bundle;
  }
}

export type LocaleMapType = { [key: string]: string };
export type LocaleContextType = {
  locales: LocaleMapType;
  currentLocales: string[];
  changeLocales: (locales: Array<string>) => void;
  defaultLocale: string;
}
export const LocaleContext = createContext<LocaleContextType>({
  locales: {},
  currentLocales: [],
  changeLocales: () => { /* nop */ },
  defaultLocale: 'en',
});

export const AppLocalizationProvider: React.FC<{
  locales: LocaleMapType;
  defaultLocale: string;
}> = ({
  children,
  locales,
  defaultLocale,
}) => {
  const [currentLocales, setCurrentLocales] = useLocalStorage('locale', [defaultLocale]);
  const [l10n, setL10n] = useState<ReactLocalization | null>(null);

  const changeLocales = useCallback(
    (userLocales: Array<string>) => {
      (async (): Promise<void> => {
        groupCollapsed('✈ Setting Localization');
        log('User Locales: ', userLocales);
        log('Registered Locales', locales);
        log('Default Locale', defaultLocale);

        const loc = negotiateLanguages(
          userLocales,
          Object.keys(locales),
          { defaultLocale },
        );
        setCurrentLocales(loc);

        const localeMap = (loc.map((l: string) => [l, locales[l]]) as [string, string][]);
        const fetchedMessages = await Promise.all(
          localeMap.map(fetchTranslation),
        );

        group('⤵ Locale Map');
        localeMap
          .forEach(([key, value], index) => {
            groupCollapsed(key);
            log('Path', value);
            group('Messages');
            log(fetchedMessages[index][1]);
            groupEnd();
            groupEnd();
          });
        groupEnd();
        groupEnd();

        const bundles = lazyParseBundles(fetchedMessages);
        setL10n(new ReactLocalization(bundles));
      })();
    },
    [setCurrentLocales, setL10n, locales, defaultLocale],
  );

  useEffect(
    () => changeLocales(currentLocales || navigator.languages as Array<string>),
    [],
  );

  if (!l10n) {
    return null;
  }

  return (
    <LocaleContext.Provider value={{
      locales,
      currentLocales: (currentLocales as string[]),
      changeLocales,
      defaultLocale,
    }}
    >
      <LocalizationProvider l10n={l10n}>
        {children}
      </LocalizationProvider>
    </LocaleContext.Provider>
  );
};

export const useLocalization = () => {
  const {
    locales,
    currentLocales,
    changeLocales,
    defaultLocale,
  } = useContext(LocaleContext);
  const localeMap = useMemo(
    () => Object.keys(locales)
      .reduce(
        (prev, it) => ({
          ...prev,
          [it]: getLangNameFromCode(it).name,
        }),
        {},
      ),
    [locales],
  );
  const setLocale = useCallback(
    ({ target: { value } }) => {
      if (Object.keys(locales).includes(value)) {
        changeLocales([value, defaultLocale]);
      }
    },
    [changeLocales, locales],
  );
  useDebugValue(currentLocales.map((it) => getLangNameFromCode(it).name).join(', '));
  return {
    localeMap,
    currentLocales,
    setLocale,
  };
};

export default AppLocalizationProvider;
