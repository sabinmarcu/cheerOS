import styled from '@emotion/styled';
import { phoneSize } from '../../config/constants';

export const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
`;

export const PhonePickerWrapper = styled.article`
  max-width: 500px;
  margin: 0 auto;
`;

export const Phone = styled.article<{
  size: { width: number, height: number }
}>(
  phoneSize,
  `
    box-shadow: 0 0 5px 2px  rgba(0, 0, 0, 0.2);
    position: relative;
    transform: translate3D(0, 0, 0);
    overflow: hidden;
    overflow-y: auto;
  `,
  ({ size }) => size,
);
