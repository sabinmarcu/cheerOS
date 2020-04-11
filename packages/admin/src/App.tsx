import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import { FirebaseProvider } from '@cheeros/stores/firebase';
import { AuthProvider } from '@cheeros/stores/auth';
import { BreakpointsProvider } from '@cheeros/hooks/useBreakpoints';
import { AppLocalizationProvider } from '@cheeros/hooks/useLocalization';
import { CombineContexts } from '@cheeros/utils/context';
import { routes, errors } from './config/routes';
import { ScreenWrapper } from './components/Screen';
import { ErrorScreen } from './screens/Error';

import { breakpoints } from './config/constants';

const ctx = require.context('./l10n');
const ctxKeys = ctx.keys();
const flcs = ctxKeys.reduce(
  (prev, it) => ({
    ...prev,
    [it.match(/\/([^.]+)[^\/]+$/)![1]]: ctx(it),
  }),
  {},
);

export const App: React.FC = () => (
  <Router>
    <CombineContexts
      contexts={[
        FirebaseProvider,
        [AuthProvider, { routes }],
        [BreakpointsProvider, { breakpoints }],
        [AppLocalizationProvider, { locales: flcs, defaultLocale: 'ro' }],
      ]}
    >
      <ScreenWrapper>
        <Switch>
          {Object
            .entries(routes)
            .map(
              ([
                name,
                {
                  route,
                  component,
                },
              ]) => (
                  <Route
                    exact
                    path={route}
                    key={name}
                    component={component}
                  />
                ),
          )}
          {Object
            .entries(errors)
            .map(
              ([
                name,
                {
                  route,
                  component: Component,
                  code,
                  translationId,
                },
              ]) => (
                  <Route
                    exact
                    path={route}
                    key={name}
                    render={() => <Component {...{code, translationId}} />}
                  />
                ),
            )}
            <Route
              path="/"
              render={() => (
                <ErrorScreen
                  code={errors['404'].code!}
                  translationId={errors['404'].translationId!}
                  />
              )}
            />
        </Switch>
      </ScreenWrapper>
    </CombineContexts>
  </Router>
);

export default App;
