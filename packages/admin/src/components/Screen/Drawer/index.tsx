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
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { useIsMobile } from '@cheeros/hooks/useBreakpoints';

import {adminRoutes, phoneRoutes} from '../../../config/routes';

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
}) => {
  const isMobile = useIsMobile();
  return (
    <StyledDrawer open={open}>
      <AppBar position="static" color="default">
        <StyledToolbar open={open}>
          <Typography variant="h6">Sections:</Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={onClick}
          >
            {isMobile ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </StyledToolbar>
        </AppBar>
        <List component="nav">
          <ListSubheader>
              Admin:
          </ListSubheader>
          {Object
            .values(adminRoutes)
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
}

export default AppDrawer;
