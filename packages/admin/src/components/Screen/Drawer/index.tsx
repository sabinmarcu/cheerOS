import React from 'react';

import {
  AppBar,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  List,
  Divider,
} from '@material-ui/core';
import ChevronIcon from '@material-ui/icons/ChevronRight';

import {routes, phoneRoutes} from '../../../config/routes';

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
        <ListSubheader>
            Admin:
        </ListSubheader>
        {Object
          .values(routes)
          .filter(({ hide }) => !hide)
          .map(({ route, name }) => (
            <ListItemLink key={[route, name].join(':')} to={route}>
              <ListItemText>{name}</ListItemText>
            </ListItemLink>
          ))}
      </List>
      <Divider />
      <List component="nav">
        <ListSubheader>
            Phone:
        </ListSubheader>
        {Object
          .values(phoneRoutes)
          .filter(({ hide }) => !hide)
          .map(({ route, name }) => (
            <ListItemLink key={[route, name].join(':')} to={route}>
              <ListItemText>{name}</ListItemText>
            </ListItemLink>
          ))}
      </List>
  </StyledDrawer>
);

export default AppDrawer;
