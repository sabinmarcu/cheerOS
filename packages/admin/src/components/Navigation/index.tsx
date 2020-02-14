import React, {
  useMemo,
} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

import { useLocation } from 'react-router-dom';
import { routes } from '../../config/routes';

import {
  StyledButtonWrapper,
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
  return (
    <AppBar position="static">
      <Toolbar>
        <StyledButtonWrapper open={open}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onClick}
          >
            <MenuIcon />
          </IconButton>
        </StyledButtonWrapper>
        {route && <Typography variant="h5">{route.name}</Typography>}
      </Toolbar>
    </AppBar>
  );
};

export default AppNavigation;
