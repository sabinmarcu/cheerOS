import React, {
  useCallback,
} from 'react';


import { AppNavigation } from '../Navigation';
import { AppDrawer } from '../Drawer';

import { useLocalStorage } from '../../hooks/useLocalstorage';

import {
  StyledWrapper,
  StyledContent,
  StyledContentWrapper,
} from './style';

export const ScreenWrapper: React.FC = ({ children }) => {
  const [open, setOpen] = useLocalStorage('appLayoutDrawerOpen', true);
  const toggle = useCallback(
    () => setOpen(!open),
    [open, setOpen],
  );
  return (
    <StyledWrapper>
      <AppDrawer onClick={toggle} open={open} />
      <StyledContentWrapper open={open}>
        <AppNavigation onClick={toggle} open={open} />
        <StyledContent>
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
