import styled from '@emotion/styled';

import { styles } from '../../config/constants';
const { drawer: { width, maxWidth, animation } } = styles;

export const StyledWrapper = styled(
  'div',
  { label: 'AppWrapper' },
)`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

export const StyledContentWrapper = styled(
  'div',
  { label: 'ContentWrapper' },
)<{ open: boolean }>(
  `
    display: flex;
    flex-flow: column nowrap;
    position: relative;
    transition: transform ${animation};
    width: 100%;
    height: 100%;
    background: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  `,
  ({ open }) => open && `
    transform: translateX(${width}vw);
    @media (min-width: ${maxWidth * 100 / width}px) {
      transform: translateX(${maxWidth}px);
    }
  `,
);

export const StyledContent = styled(
  'div',
  { label: 'ScreenWrapper' },
)`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
`;
