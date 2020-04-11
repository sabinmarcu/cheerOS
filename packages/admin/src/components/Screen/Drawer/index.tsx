import React from 'react';

import {
  AppBar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';

import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { Localized } from '@fluent/react';

import { useIsMobile } from '@cheeros/hooks/useBreakpoints';
import { useLocalization } from '@cheeros/hooks/useLocalization';

import {
  useAdmin,
} from '@cheeros/stores/auth';

import {adminRoutes, phoneRoutes} from '../../../config/routes';

import {
  StyledToolbar,
  StyledDrawer,
  ListItemLink,
  Bottom,
} from './style';

export const AppDrawer: React.FC<{
  onClick: () => void,
  open: boolean,
}> = ({
  onClick,
  open,
}) => {
  const isMobile = useIsMobile();
  const [user, isLoggedIn] = useAdmin();
  const { currentLocales, localeMap, setLocale } = useLocalization();
  return (
    <StyledDrawer open={open}>
      <AppBar position="static" color="default">
        <StyledToolbar open={open}>
          <Typography variant="h6"><Localized id='sections'>Sections</Localized>:</Typography>
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
            <Localized id="logged-in" vars={{ isLoggedIn: `${isLoggedIn}` }} />
          </ListSubheader>
          {isLoggedIn && user &&
            <ListItem>
              <ListItemText>
                {user.email}
              </ListItemText>
            </ListItem>
          }
        </List>
        {isLoggedIn && <>
          <Divider />
          <List component="nav">
            <ListSubheader>
              <Localized id='admin'>Admin</Localized>:
            </ListSubheader>
            {Object.values(adminRoutes)
              .filter(({ hide }) => !hide)
              .map(({ route, name, translationId }) => (
                <ListItemLink key={[route, name].join(':')} to={route}>
                  <ListItemText>
                    <Localized id={`${translationId}`}>{name}</Localized>
                  </ListItemText>
                </ListItemLink>
              ))}
          </List>
          <Divider />
          <List component="nav">
            <ListSubheader>
                <Localized id='device'>Device</Localized>:
            </ListSubheader>
            {Object
              .values(phoneRoutes)
              .filter(({ hide }) => !hide)
              .map(({ route, name, translationId }) => (
                <ListItemLink key={[route, name].join(':')} to={route}>
                  <Localized id={`${translationId}`}>{name}</Localized>
                </ListItemLink>
              ))}
          </List>
        </>}
        <Bottom>
          <List>
            <ListItem>
              <FormControl fullWidth>
                <InputLabel id='locale'>
                  <Localized id="language">Language</Localized>
                </InputLabel>
                <Select
                  labelId='locale'
                  autoWidth
                  value={currentLocales[0]}
                  onChange={setLocale}
                >
                  {Object.entries(localeMap)
                    .map(([key, value]) =>
                      <MenuItem key={key} value={key}>{`${value}`}</MenuItem>
                    )}
                </Select>
              </FormControl>
            </ListItem>
          </List>
        </Bottom>
    </StyledDrawer>
  );
}

export default AppDrawer;
