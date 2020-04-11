import React, {
  useState,
  useMemo,
  useEffect,
} from 'react';

import { Search } from '../Search';

import {
  Wrapper,
  Heading,
} from './style';

export const Header: React.FC<{ parent: React.RefObject<HTMLDivElement> }> = ({
  parent
}) => {
  const [scrollDistance, setScrollDistance] = useState(0);
  const isFull = useMemo(
    () => scrollDistance < 150,
    [scrollDistance],
  )
  useEffect(
    () => {
      if (parent.current) {
        const { current } = parent;
        const handler = () => {
          setScrollDistance(current.scrollTop);
        };
        current.addEventListener('scroll', handler);
        return () => current.removeEventListener('scroll', handler);
      }
    },
    [parent]
  )
  return (
    <Wrapper full={isFull}>
      <Heading full={isFull}>Contacts</Heading>
    </Wrapper>
  );
}

export default Header;
