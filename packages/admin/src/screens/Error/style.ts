import styled from '@emotion/styled';

import fonts from '../../config/fonts';

import {
  Typography
} from '@material-ui/core';

export const StyledWrapper = styled.div`
  max-width: 600px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  padding: 20px;
  box-sizing: border-box;
`;

export const StyledTypography = styled(Typography)`
  && {
    font-family: ${fonts.merienda};
    margin: 10px 0;
  }
`;
