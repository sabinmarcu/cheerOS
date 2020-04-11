import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { FirebaseProvider } from '@cheeros/stores/firebase';
import { AuthProvider } from '@cheeros/stores/auth';
import { BreakpointsProvider } from '@cheeros/hooks/useBreakpoints';
import { CombineContexts } from '@cheeros/utils/context';
import { routes, phoneRoutes, errors } from './config/routes';
import { ScreenWrapper } from './components/Screen';
import { ErrorScreen } from './screens/Error';

import { breakpoints } from './config/constants';

const allRoutes = {...routes, ...phoneRoutes};
export const App: React.FC = () => (
  <Router>
    <CombineContexts
      contexts={[
        FirebaseProvider,
        AuthProvider,
        [BreakpointsProvider, { breakpoints }],
      ]}
    >
      <ScreenWrapper>
        <Switch>
          {Object
            .entries(allRoutes)
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
                  text,
                },
              ]) => (
                  <Route
                    exact
                    path={route}
                    key={name}
                    render={() => <Component {...{code, text}} />}
                  />
                ),
            )}
            <Route
              path="/"
              render={() => (
                <ErrorScreen
                  code={errors['404'].code}
                  text={errors['404'].text}
                  />
              )}
            />
        </Switch>
      </ScreenWrapper>
    </CombineContexts>
  </Router>
);

export default App;
