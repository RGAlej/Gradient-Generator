import React from 'react';
import styled from 'styled-components';
import { HiHome } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';

import { RouteModel } from '../models/ManagementState.model';

import Navigation from './Navigation';
import ToggleTheme from './ToggleTheme';
import { setTransition, sizes } from '../styles/styles';
import { useManagementContext } from '../contexts/management.context';
import { darkTheme } from '../styles/themes';

/* <Link to={RouteModel.HOME}>
  <Title>gradient generator</Title>
</Link>

<Link to={RouteModel.HOME}>
  <HiHome />
</Link> 
*/

/* width! >= sizes.phone * 16 || window.location.pathname === RouteModel.HOME;  */

const Navbar: React.FC = () => {
  const { width } = useManagementContext();
  return (
    <Wrapper>
      <WrapperCenter>
        {window.location.pathname === RouteModel.HOME &&
          width! >= sizes.phone * 16 && (
            <Title>
              <Link to={RouteModel.HOME}>gradient generator</Link>
            </Title>
          )}
        {window.location.pathname === RouteModel.HOME &&
          width! < sizes.phone * 16 && (
            <Link to={RouteModel.HOME}>
              <HiHome data-testid='home-icon' />
            </Link>
          )}
        {window.location.pathname !== RouteModel.HOME && (
          <Link to={RouteModel.HOME}>
            <HiHome data-testid='home-icon' />
          </Link>
        )}
        {useLocation().pathname === RouteModel.GRADIENT && <Navigation />}
        <ToggleTheme />
      </WrapperCenter>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  height: 10vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  box-shadow: 0.1rem 0.1rem 1rem ${(props) => props.theme.color3};
  background: ${(props) => props.theme.color1};
  filter: ${(props) =>
    props.theme === darkTheme ? 'brightness(1.2)' : 'brightness(.8)'};
  ${setTransition()};
`;

const WrapperCenter = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr 0.1fr;
  grid-template-rows: 1fr;
  align-items: center;
  height: 100%;
  width: 90%;

  & > a {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
    width: min-content;

    & > svg {
      font-size: 4rem;
      fill: ${(props) => props.theme.color3};
    }
  }
`;

const Title = styled.h1`
  grid-column: 1 / span 2;
  cursor: pointer;
  text-transform: capitalize;
  letter-spacing: 0.2rem;
  word-spacing: 1rem;
  font-size: 4rem;
  font-weight: 900;
  a {
    color: ${(props) => props.theme.color3};
  }
`;

export default Navbar;
