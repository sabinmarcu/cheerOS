/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { FC } from 'react';
import { executeOnDev } from '../utils/func';

export type RoutesImportType = {
  [key: string]: {
    route: string;
    options?: Record<string, string>;
    default: FC;
  };
};

export type RoutesType = {
  [key: string]: {
    name: string;
    route: string;
    component: FC;
    options?: Record<string, string>;
  };
};

const routes: RoutesImportType = require('../screens/*/index.tsx');

const routesMap: RoutesType = {};
for (const routeName in routes) {
  const mod = routes[routeName];
  const route = {
    name: routeName,
    route: mod.route,
    options: mod.options,
    component: mod.default,
  };
  routesMap[routeName.toLowerCase()] = route;
}

executeOnDev(() => {
  console.groupCollapsed(
    '⚓ Routes Found:',
    Object.keys(routesMap).length,
  );
  const values = Object.values(routesMap);
  const maxRouteSize = values.reduce(
    (prev, { route }) => (prev > route.length ? prev : route.length),
    0,
  );
  values.forEach(({ route, name }) => console.log([
    route,
    Array(maxRouteSize - route.length).fill(' ').join(''),
    ':',
    name,
  ].join(' ')));
  console.groupEnd();
});

export default routesMap;
