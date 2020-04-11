import styled from '@emotion/styled';
import { Wrapper as ContactWrapper } from './Contact/style';

export const Wrapper = styled.section`
  display: flex;
  flex-flow: column nowrap;
  &, ${ContactWrapper} {
    width: 100%;
  }
`;

export default Wrapper;
