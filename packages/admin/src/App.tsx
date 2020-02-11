import React from 'react';
import { FirebaseProvider } from './stores/firebase';
import { AuthProvider } from './stores/auth';
import { CombineContexts } from './utils/context';

export const App: React.FC = () => (
  <CombineContexts 
    contexts={[
      FirebaseProvider,
      AuthProvider,
    ]}
  >
    <h1>This is awesome!</h1>
  </CombineContexts>
);

export default App;
