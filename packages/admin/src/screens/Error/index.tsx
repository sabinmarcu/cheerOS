import React from 'react';

import {
  CenterLayout
} from '../../components/Layout';

import {
  StyledTypography,
  StyledWrapper
} from './style';

export const ErrorScreen: React.FC<{
  code: number,
  text: string
}> = ({
  code,
  text,
}) => (
  <CenterLayout>
    <StyledWrapper>
      <StyledTypography variant="h1">{code}</StyledTypography>
      <StyledTypography variant="h5">{text}</StyledTypography>
    </StyledWrapper>
  </CenterLayout>
)

export default ErrorScreen;
