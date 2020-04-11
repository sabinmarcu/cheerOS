import React, {
  useMemo,
} from 'react';

import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Tooltip,
  Typography,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

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
      ? (isAuthReady ? (() => logout && logout().then(() => history.push(routes.root.route))) : undefined)
      : (() => history.push(routes.login.route)),
    [history, logout, isLoggedIn, isAuthReady],
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
        <StyledTypography variant="h5">{[
          route ? route.name : undefined
        ].join(' ')}</StyledTypography>
        <Tooltip
          disableHoverListener={!isLoggedIn}
          disableTouchListener={!isLoggedIn}
          disableFocusListener={!isLoggedIn}
          title={isLoggedIn && user && user.email}
        >
          <Button
            color="inherit"
            startIcon={isLoggedIn ? <PersonOutlineIcon /> : <PersonIcon />}
            onClick={accountClick}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavigation;
