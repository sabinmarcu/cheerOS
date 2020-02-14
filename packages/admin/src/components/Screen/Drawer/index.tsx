import React from 'react';

import {
  AppBar,
  IconButton,
  Typography,
  ListItemText,
  List,
} from '@material-ui/core';
import ChevronIcon from '@material-ui/icons/ChevronRight';

import routes from '../../../config/routes';

import {
  StyledToolbar,
  StyledDrawer,
  ListItemLink,
} from './style';

export const AppDrawer: React.FC<{
  onClick: () => void,
  open: boolean,
}> = ({
  onClick,
  open,
}) => (
  <StyledDrawer>
    <AppBar position="static" color="default">
      <StyledToolbar open={open}>
        <Typography variant="h6">Sections:</Typography>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={onClick}
        >
          <ChevronIcon />
        </IconButton>
      </StyledToolbar>
    </AppBar>
    <List component="nav">
      {Object
        .values(routes)
        .map(({ route, name }) => (
          <ListItemLink key={[route, name].join(':')} to={route}>
            <ListItemText>{name}</ListItemText>
          </ListItemLink>
        ))}
    </List>
  </StyledDrawer>
);

export default AppDrawer;
