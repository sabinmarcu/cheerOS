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
const { drawer: { width, maxWidth, animation } } = styles;

export const StyledDrawer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: ${width}vw;
  max-width: ${maxWidth}px;
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
);

export const ListItemLink: React.FC<{ to: string }> =
  ({ children, to }) => (
    <li>
      <ListItem
        component={(props) => <Link to={to} {...props} />}
      >
        {children}
      </ListItem>
    </li>
  )
;
