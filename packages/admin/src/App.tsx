import React from 'react';
import {
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import { FirebaseProvider } from './stores/firebase';
import { AuthProvider } from './stores/auth';
import { CombineContexts } from './utils/context';
import { routes } from './config/routes';

export const App: React.FC = () => (
  <Router>
    <CombineContexts
      contexts={[
        FirebaseProvider,
        AuthProvider,
      ]}
    >
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
    </CombineContexts>
  </Router>
);

export default App;
