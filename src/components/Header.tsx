import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import { RouteModel } from '../models/ManagementState.model';

import Navigation from './Navigation';
import ToggleTheme from './ToggleTheme';
import { setTransition, sizes } from '../styles/styles';
import { useManagementContext } from '../contexts/management.context';
import { darkTheme } from '../styles/themes';

const Navbar: React.FC = () => {
  const { width } = useManagementContext();
  return (
      <Wrapper>
        <WrapperCenter>
          {(width! >= sizes.phone * 16 || window.location.pathname === RouteModel.HOME) && (
              <Link to={RouteModel.HOME}>
                <Title>gradient generator</Title>
              </Link>
          )}
          {(useLocation().pathname === RouteModel.GRADIENT) && <Navigation />}
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
  box-shadow: .1rem .1rem 1rem ${props => props.theme.color3};
  background: ${props => props.theme.color1};
  filter: ${props => props.theme === darkTheme ? 'brightness(1.2)' : 'brightness(.8)'};
  ${setTransition()};
`;

const WrapperCenter = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content .1fr;
  grid-template-rows: 1fr;
  align-items: center;
  height: 100%;
  width: 90%;
`;

const Title = styled.h1`
  cursor: pointer;
  text-transform: capitalize;
  letter-spacing: .2rem;
  word-spacing: 1rem;
  font-size: 4rem;
  font-weight: 900;
  color: ${props => props.theme.color3};
`;

export default Navbar;