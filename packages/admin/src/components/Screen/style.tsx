import styled from '@emotion/styled';
import Drawer from '@material-ui/core/Drawer';

const drawerWidth = 30;
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

export const StyledDrawer = styled(
  'div',
  { label: 'Drawer' },
)`
  position: absolute;
  top: 0;
  bottom: 0;
  & {
    width: ${drawerWidth}vw;
  }
`;

export const StyledContentWrapper = styled(
  'div',
  { label: 'ContentWrapper' },
)(
  `
    display: flex;
    flex-flow: column nowrap;
    position: relative;
  `,
  // ({ open }) => open && `
  //   transform: translateX(${drawerWidth}vw);
  // `,
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
