import React, {
  useState,
  useCallback,
} from 'react';

import {
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import ChevronIcon from '@material-ui/icons/ChevronRight';

import { AppNavigation } from '../Navigation';

import {
  StyledWrapper,
  StyledContent,
  StyledDrawer,
  StyledContentWrapper,
} from './style';

export const ScreenWrapper: React.FC = ({ children }) => {
  const [open, setOpen] = useState(true);
  const toggle = useCallback(
    () => setOpen(!open),
    [open, setOpen],
  );
  return (
    <StyledWrapper>
      <StyledDrawer
        // open={open}
        // variant="persistent"
        // anchor="left"
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={toggle}
            >
              <ChevronIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </StyledDrawer>
      <StyledContentWrapper
        // open={open}
      >
        <AppNavigation onClick={toggle} />
        <StyledContent>
          <div>{open ? 'Dick Open' : 'Dick Closed'}</div>
          {children}
        </StyledContent>
      </StyledContentWrapper>
    </StyledWrapper>
  );
};

export const withScreenWrapper = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any,
): React.FC => (props): React.ReactElement => (
  <ScreenWrapper>
    <Component {...props} />
  </ScreenWrapper>
);

export default ScreenWrapper;
