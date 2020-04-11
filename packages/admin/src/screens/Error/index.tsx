import React from 'react';

import {Localized} from '@fluent/react';

import {
  CenterLayout
} from '../../components/Layout';

import {
  StyledTypography,
  StyledWrapper
} from './style';

export const ErrorScreen: React.FC<{
  code: number,
  translationId: string
}> = ({
  code,
  translationId,
}) => (
  <CenterLayout>
    <StyledWrapper>
      <StyledTypography variant="h1">{code}</StyledTypography>
      <StyledTypography variant="h5">
        <Localized id={`${translationId}`} />
      </StyledTypography>
    </StyledWrapper>
  </CenterLayout>
)

export default ErrorScreen;
