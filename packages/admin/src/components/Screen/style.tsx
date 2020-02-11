import styled from '@emotion/styled';

export const AppWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  html, body, & {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

export const ScreenWrapper = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
`;
