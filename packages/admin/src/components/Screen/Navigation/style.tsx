import styled from '@emotion/styled';

import {
  Typography,
} from '@material-ui/core';
import { withBreakpoints, Breakpoints } from '@cheeros/hooks/useBreakpoints';

import { styles } from '../../../config/constants';
const { drawer: { animation } } = styles;

export const StyledButtonWrapper = withBreakpoints(
  styled.div<{ open: boolean } & Breakpoints>(
    {
      transition: `all ${animation}`,
      marginRight: 24,
    },
    ({ isMobile, open }) => isMobile || !open
      ? { opacity: 1, margin: 0 }
      : { opacity: 0, margin: -24 }
  )
);

export const StyledTypography = styled(
  Typography
)`
  flex: 1;
`;

export default StyledButtonWrapper;
