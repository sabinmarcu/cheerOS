import styled from '@emotion/styled';

import {
  Typography,
} from '@material-ui/core';

import { styles } from '../../../config/constants';
const { drawer: { animation } } = styles;

export const StyledButtonWrapper = styled.div<{ open: boolean }>(
  {
    transition: `all ${animation}`,
    marginRight: 24,
  },
  ({ open }) => !open
    ? { opacity: 1, margin: 0 }
    : { opacity: 0, margin: -24 }
);

export const StyledTypography = styled(
  Typography
)`
  flex: 1;
`;

export default StyledButtonWrapper;
