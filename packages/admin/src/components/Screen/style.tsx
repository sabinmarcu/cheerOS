import styled from '@emotion/styled';

import { styles } from '../../config/constants';
import { withBreakpoints, Breakpoints } from '@cheeros/hooks/useBreakpoints';

const { drawer: { width, maxWidth, animation } } = styles;

export const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

export const StyledContentWrapper = withBreakpoints(
  styled.div<{ open: boolean } & Breakpoints>(
    `
      display: flex;
      flex-flow: column nowrap;
      position: relative;
      transition: transform ${animation};
      width: 100%;
      height: 100%;
      background: white;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      z-index: 2;
    `,
    ({ open, isMobile }) => !isMobile && open && `
      transform: translateX(${width}vw);
      @media (min-width: ${maxWidth * 100 / width}px) {
        transform: translateX(${maxWidth}px);
      }
    `,
  )
);

export const StyledContent = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
