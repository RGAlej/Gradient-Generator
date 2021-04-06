import React from 'react';
import styled from 'styled-components';
import { HiMoon, HiSun } from 'react-icons/hi';
import { BiToggleLeft, BiToggleRight } from 'react-icons/bi';

import { media, setFlex } from '../styles/styles';
import { useManagementContext } from '../contexts/management.context';

const ToggleTheme: React.FC = () => {
  const { dark, toggleTheme } = useManagementContext();
  return (
      <Wrapper>
        <HiSun data-testid="sun"
               className={dark ? 'no-active' : 'active'}
               onClick={() => toggleTheme?.('light')} />
        {dark ? (
            <BiToggleRight data-testid="toggle-right"
                           onClick={() => toggleTheme?.('light')} />
        ) : (
            <BiToggleLeft data-testid="toggle-left"
                          onClick={() => toggleTheme?.('dark')} />
        )}
        <HiMoon data-testid="moon"
                className={dark ? 'active' : 'no-active'}
                onClick={() => toggleTheme?.('dark')} />
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
    font-size: 2rem;
    padding-right: .5rem;
    fill: ${props => props.theme.color3};
  }

  .active {
    font-size: 3rem;
  }

  .no-active {
    font-size: 1.75rem;
    filter: brightness(.8);
  }
`;

export default ToggleTheme;