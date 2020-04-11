import React, {
  useState,
  useMemo,
  useEffect,
  createContext,
  useContext,
  useDebugValue,
} from 'react';

import {
  useHistory, useLocation,
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
export type RouteType = {
  route: string;
  code?: number;
  text?: string;
  hide?: boolean;
  name: string;
  component: React.ComponentType<any>;
}
export type RoutesGenericType = {
  [key: string]: RouteType;
};
export type RoutesType = {
  root: RouteType;
  login: RouteType;
} & RoutesGenericType;

export const AuthContext = createContext<AuthContextType>([null, null]);

export const useAuthContext = (routes: RoutesType): AuthContextType => {
  const [app] = useFirebase();
  const history = useHistory();
  const location = useLocation();
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
  useEffect(
    () => {
      if (user && location.pathname === routes.login.route) {
        const to = (location.state && (location.state as { r?: string }).r) || routes.root.route;
        log('⚙ Redirecting to %s', to);
        history.push(to);
      }
    },
    [user, history, location.state],
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

export const AuthProvider: React.FC<RoutesType> = ({ children, routes }) => {
  const authContext = useAuthContext(routes);
  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.displayName = 'AuthProvider';

export const PoorMansRedirect: React.FC<{
  to: string;
}> = ({
  to,
}) => {
  const history = useHistory();
  useEffect(
    () => {
      if (history) {
        history.push(to, { r: window.location.pathname });
      }
    },
    [],
  );
  return null;
};

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
  return <PoorMansRedirect to={redirect} />;
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
