import styled from '@emotion/styled';
import { variables } from '../style';

type FullProps = {
  full: boolean,
};

export const Heading = styled.h1<FullProps>(
  `
    margin: 0;
    padding: 0;
  `,
  ({ full }) => full
    ? {
      fontSize: variables.header.full.size * 0.5,
    }
    : {
      fontSize: variables.header.small.size * 0.7,
    }
);


export const Wrapper = styled.nav<FullProps>(
  `
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
    &, ${Heading} {
      transition: all 0.2s ease-out;
    }
  `,
  ({ full }) => full
    ? {
      height: variables.header.full.size,
      padding: `0 ${variables.header.full.size * 0.1}px`,
      paddingTop: variables.header.full.size * 0.4,
    }
    : {
      height: variables.header.small.size,
      padding: `0 ${variables.header.small.size * 0.1}px`,
      paddingTop: variables.header.small.size * 0.15,
    }
);
