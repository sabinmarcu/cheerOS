import React, {
  useState,
  useMemo,
  useEffect,
  createContext,
  useContext,
  useDebugValue,
} from 'react';

import {
  Redirect,
} from 'react-router-dom';

import firebase from 'firebase/app';
import { log } from '@cheeros/utils/log';

import {
  CircularProgress,
} from '@material-ui/core';
import {
  Admin,
} from './types';


import { useFirebase } from './firebase';

export type AuthContextType = [(Admin | null | undefined), (firebase.auth.Auth | null)];

export const AuthContext = createContext<AuthContextType>([null, null]);

export const useAuthContext = (): AuthContextType => {
  const [app] = useFirebase();
  const auth = useMemo(
    () => (app ? app.auth() : null),
    [app],
  );
  const [user, setUser] = useState<Admin | null | undefined>(undefined);
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

export const useAdmin = (): [Admin | null | undefined, boolean] => {
  const [user] = useContext(AuthContext);
  const hasUser = useMemo(
    () => !!user,
    [user],
  );
  useDebugValue(
    user
      ? `User: ${user.email}`
      : 'No User',
  );
  return [user, hasUser];
};

export const useAdminLogin = (): [Function | null, boolean] => {
  const [, auth] = useContext(AuthContext);
  const hasAuth = useMemo(
    () => !!auth,
    [auth],
  );
  const authFunction = useMemo(
    () => (
      auth
        ? (
          email: string,
          password: string,
        ): Promise<firebase.auth.UserCredential> => auth.signInWithEmailAndPassword(
          email,
          password,
        )
        : null
    ),
    [auth],
  );
  return [authFunction, hasAuth];
};

export const useAdminLogout = (): [Function | null, boolean] => {
  const [, auth] = useContext(AuthContext);
  const hasAuth = useMemo(
    () => !!auth,
    [auth],
  );
  const authFunction = useMemo(
    () => (
      auth
        ? (): Promise<void> => auth.signOut()
        : null
    ),
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

export type AuthGuardProps = {
  requiresLogin?: boolean;
  redirect?: string;
};
export const AuthGuard: React.FC<AuthGuardProps> = ({
  requiresLogin = true,
  redirect = '/',
  children,
}) => {
  const [user, hasUser] = useAdmin();
  if (typeof user === 'undefined') {
    return <CircularProgress style={{ width: 100, height: 100 }} />;
  }
  if (requiresLogin === hasUser) {
    return <>{children}</>;
  }
  return <Redirect to={redirect} />;
};


export const withAuthGuard = ({
  requiresLogin = true,
  redirect = '/',
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: AuthGuardProps) => (Component: any): React.FC => (props): React.ReactElement => (
  <AuthGuard
    requiresLogin={requiresLogin}
    redirect={redirect}
  >
    <Component {...props} />
  </AuthGuard>
);
