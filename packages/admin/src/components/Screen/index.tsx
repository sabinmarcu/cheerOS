import React from 'react';

import {
  AppWrapper,
  ScreenWrapper as StyledScreenWrapper,
} from './style';

export const ScreenWrapper: React.FC = ({ children }) => (
  <AppWrapper>
    <StyledScreenWrapper>
      {children}
    </StyledScreenWrapper>
  </AppWrapper>
);

export const withScreenWrapper = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any,
): React.FC => (props): React.ReactElement => (
  <ScreenWrapper>
    <Component {...props} />
  </ScreenWrapper>
);

export default ScreenWrapper;
