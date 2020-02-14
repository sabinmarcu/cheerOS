import React, {
  useState,
  useMemo,
  useEffect,
  createContext,
  useContext,
  useDebugValue,
} from 'react';

import firebase from 'firebase/app';
import { log } from '@cheeros/utils/log';

import {
  Admin,
} from './types';

import { useFirebase } from './firebase';

export type AuthContextType = [(Admin | null), (firebase.auth.Auth | null)];

export const AuthContext = createContext<AuthContextType>([null, null]);

export const useAuthContext = (): AuthContextType => {
  const [app] = useFirebase();
  const auth = useMemo(
    () => (app ? app.auth() : null),
    [app],
  );
  const [user, setUser] = useState<Admin | null>(null);
  useEffect(
    () => {
      if (!auth) {
        return undefined;
      }
      return auth.onAuthStateChanged((usr) => {
        log('🔑 New Auth State', usr);
        setUser(usr && usr.email ? { email: usr.email } : null);
      });
    },
    [auth, setUser],
  );
  useDebugValue([
    'Auth',
    auth ? 'Connected' : 'Disconnected',
    ';',
    user ? user.email : 'No User',
  ].join(' '));
  return [user, auth];
};

export const useAdmin = (): [Admin | null, boolean] => {
  const [user] = useContext(AuthContext);
  const hasUser = useMemo(
    () => !!user,
    [user],
  );
  useDebugValue(user
    ? `User: ${user.email}`
    : 'No User');
  return [user, hasUser];
};

export const useAdminLogin = (): [Function | null, boolean] => {
  const [, auth] = useContext(AuthContext);
  const hasAuth = useMemo(
    () => !!auth,
    [auth],
  );
  const authFunction = useMemo(
    () => (auth ? auth.signInWithEmailAndPassword : null),
    [auth],
  );
  return [authFunction, hasAuth];
};

export const AuthProvider: React.FC = ({ children }) => {
  const authContext = useAuthContext();
  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.displayName = 'AuthProvider';
