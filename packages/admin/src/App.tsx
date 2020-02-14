import React from 'react';
import {
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import { FirebaseProvider } from '@cheeros/stores/firebase';
import { AuthProvider } from '@cheeros/stores/auth';
import { CombineContexts } from '@cheeros/utils/context';
import { routes } from './config/routes';
import { ScreenWrapper } from './components/Screen';

export const App: React.FC = () => (
  <Router>
    <CombineContexts
      contexts={[
        FirebaseProvider,
        AuthProvider,
      ]}
    >
      <ScreenWrapper>
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
      </ScreenWrapper>
    </CombineContexts>
  </Router>
);

export default App;
