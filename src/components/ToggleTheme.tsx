import React from 'react';
import styled from 'styled-components';
import { HiMoon, HiSun } from 'react-icons/hi';

import { media, setBorder, setFlex } from '../styles/styles';
import { useManagementContext } from '../contexts/management.context';

const ToggleTheme: React.FC = () => {
  const { dark, toggleTheme } = useManagementContext();
  return (
    <Wrapper>
      {dark ? (
        <HiSun
          data-testid='sun'
          className={dark ? 'no-active' : 'active'}
          onClick={() => toggleTheme?.('light')}
        />
      ) : (
        <HiMoon
          data-testid='moon'
          className={dark ? 'active' : 'no-active'}
          onClick={() => toggleTheme?.('dark')}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-column: 3 / span 1;
  ${setFlex()};

  ${media.phone`
    grid-row: 1 / span 1;
  `}

  svg {
    cursor: pointer;
    font-size: 6rem;
    fill: ${(props) => props.theme.color1};
    padding: 1rem;
    ${setBorder({ style: 'none' })};
    background: ${(props) => props.theme.color3};
  }
`;

export default ToggleTheme;
