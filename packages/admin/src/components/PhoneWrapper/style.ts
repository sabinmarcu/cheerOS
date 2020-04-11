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

type SizeParam = {
  size: { width: number, height: number }
}
export const PhonePickerWrapper = styled.article<SizeParam>(
    `
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  ({ size }) => ({ width: size.width }),
);

export const Phone = styled.article<SizeParam>(
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
