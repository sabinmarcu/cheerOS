import React from 'react';
import styled from '@emotion/styled';

import {
  Toolbar,
  ListItem,
} from '@material-ui/core';
import {
  Link,
} from 'react-router-dom';

import { styles } from '../../../config/constants';
import { withBreakpoints, Breakpoints } from '@cheeros/hooks/useBreakpoints';

const { drawer: { width, maxWidth, animation } } = styles;

export const StyledDrawer = withBreakpoints(
  styled.div<{ open: boolean } & Breakpoints>(
    `
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${width}vw;
      max-width: ${maxWidth}px;
      background: white;
      display: flex;
      flex-flow: column nowrap;
      align-items: stretch;
      justify-content: flex-start;
      z-index: 0;
    `,
    ({ isMobile }) => isMobile && `
      position: fixed;
      width: 100vw;
      height: 100vh;
      max-width: initial;
      z-index: 100;
      transition: left ${animation};
    `,
    ({ open, isMobile }) => isMobile &&
      (open
        ? { left: 0 }
        : { left: '-100vw' }
      )
  )
);

export const Bottom = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column-reverse;
`;

export const StyledToolbar = styled(
    Toolbar,
  )<{ open: boolean }>(
  `
    transition: opacity ${animation};
    && {
      justify-content: space-between;
    }
  `,
  ({ open }) => open
    ? { opacity: 1 }
    : { opacity: 0 }
  ,
);

export const StyledLink = styled(Link)`
  &, &:visited, &:link, &:active {
    color: initial;
  }
`;

export const ListItemLink: React.FC<{ to: string }> =
  ({ children, to }) => (
    <li>
      <ListItem
        button
        component={(props) => <StyledLink to={to} {...props} />}
      >
        {children}
      </ListItem>
    </li>
  )
;
