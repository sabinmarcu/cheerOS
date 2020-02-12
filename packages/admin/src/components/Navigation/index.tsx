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


export const AppNavigation: React.FC<{
  onClick: () => void;
}> = ({
  onClick,
}) => {
  const location = useLocation();
  const route = useMemo(
    () => Object.values(routes).find(({ route: r }) => r === location.pathname),
    [location.pathname],
  );
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onClick}
        >
          <MenuIcon />
        </IconButton>
        {route && <Typography>{route.name}</Typography>}
      </Toolbar>
    </AppBar>
  );
};

export default AppNavigation;
