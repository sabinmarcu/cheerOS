import React, {
  useMemo,
} from 'react';

import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import { useLocation } from 'react-router-dom';
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
  const route = useMemo(
    () => Object.values(routes).find(({ route: r }) => r === location.pathname),
    [location.pathname],
  );
  const [user, isLoggedIn] = useAdmin();
  const [logout, isAuthReady] = useAdminLogout();
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
        <StyledTypography variant="h5">{[
          isLoggedIn && user ? `${user.email}:` : undefined,
          route ? route.name : undefined
        ].join(' ')}</StyledTypography>
        <Button
          color="inherit"
          startIcon={isLoggedIn ? <PersonOutlineIcon /> : <PersonIcon />}
          onClick={isLoggedIn && isAuthReady ? (() => logout && logout()) : undefined}
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavigation;
