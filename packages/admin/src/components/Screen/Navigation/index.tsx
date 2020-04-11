import React, {
  useMemo,
} from 'react';

import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Tooltip,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import { Localized } from '@fluent/react';

import {
  useLocation,
  useHistory
} from 'react-router-dom';
import { routes } from '../../../config/routes';

import {
  useAdmin,
  useAdminLogout,
} from '@cheeros/stores/auth';

import {
  StyledButtonWrapper,
  StyledTypography,
} from './style';

export const AppNavigation: React.FC<{
  onClick: () => void,
  open: boolean,
}> = ({
  onClick,
  open,
}) => {
  const location = useLocation();
  const history = useHistory();
  const route = useMemo(
    () => Object.values(routes).find(({ route: r }) => r === location.pathname),
    [location.pathname],
  );
  const [user, isLoggedIn] = useAdmin();
  const [logout, isAuthReady] = useAdminLogout();
  const accountClick = useMemo(
    () => isLoggedIn
      ? (isAuthReady
        ? (() => logout && logout().then(
          () => history.push(routes.root.route, {r: window.location.pathname})
        ))
        : undefined
      )
      : (() => history.push(
        routes.login.route,
        {
          r: (location.state && (location.state as { r?: string }).r)
          || window.location.pathname
        }
      )),
    [isLoggedIn, isAuthReady, logout, history, location.state],
  );
  return (
    <AppBar position="static">
      <Toolbar>
        <StyledButtonWrapper open={open}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onClick}
          >
            <MenuIcon />
          </IconButton>
        </StyledButtonWrapper>
        <StyledTypography variant="h5">
          {route
            ? <Localized id={`${route.translationId}`}>{route.name}</Localized>
            : undefined
          }
        </StyledTypography>
        <Tooltip
          title={isLoggedIn && user ? user.email : ''}
        >
          <Button
            color="inherit"
            startIcon={isLoggedIn ? <PersonOutlineIcon /> : <PersonIcon />}
            onClick={accountClick}
          >
            <Localized id="login-action" vars={{ isLoggedIn: `${isLoggedIn}` }} />
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavigation;
