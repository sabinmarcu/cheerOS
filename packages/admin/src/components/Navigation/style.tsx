import styled from '@emotion/styled';

import { styles } from '../../config/constants';
const { drawer: { animation } } = styles;

export const StyledButtonWrapper = styled(
  'div',
  { label: 'ButtonWrapper '}
)<{ open: boolean }>(
  {
    transition: `all ${animation}`,
    marginRight: 24,
  },
  ({ open }) => !open
    ? { opacity: 1, margin: 0 }
    : { opacity: 0, margin: -24 }
);

export default StyledButtonWrapper;
