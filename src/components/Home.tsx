import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { setFlex, setTransition } from '../styles/styles';
import { MainButton } from '../styles/buttons';
import { RouteModel } from '../models/ManagementState.model';

const Home: React.FC = () => {
  return (
      <Wrapper>
        <Link to={RouteModel.GRADIENT}>
          <MainButton>start</MainButton>
        </Link>
      </Wrapper>
  );
};

const Wrapper = styled.main`
  height: 100vh;
  width: 100vw;
  ${setFlex()};
  background: ${props => props.theme.color1};
  ${setTransition()};
`;

export default Home;