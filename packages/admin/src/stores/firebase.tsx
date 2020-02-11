import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useDebugValue,
} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { log } from '../utils/log';
import { config as firebaseConfig } from '../config/firebase';

if (process.env.NODE_ENV !== 'production') {
  window.firebase = firebase;
}

export type FirebaseContextType = [
  firebase.app.App | null,
  typeof firebase,
]

export const FirebaseContext = createContext<FirebaseContextType>([null, firebase]);

export const useFirebaseProvider = (config = firebaseConfig): FirebaseContextType => {
  const [app, setApp] = useState <firebase.app.App | null>(null);
  useEffect(
    () => {
      log('🔔 Initializing Firebase App with Config', config);
      setApp(firebase.initializeApp(config));
    },
    [config],
  );
  useDebugValue(`App ${app ? 'Connected' : 'Disconnected'}`);
  return [app, firebase];
};

export const FirebaseProvider: React.FC = ({ children }) => {
  const firebaseContext = useFirebaseProvider();
  return (
    <FirebaseContext.Provider value={firebaseContext}>
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.displayName = 'FirebaseProvider';

export const useFirebase = (): FirebaseContextType => {
  const data = useContext(FirebaseContext);
  useDebugValue(`App ${data[0] ? 'Connected' : 'Disconnected'}`);
  return data;
};

export default firebase;
