import React from 'react';
import styled, { css } from 'styled-components';

import { setBorder } from '../styles/styles';
import { useFunctionalContext } from '../contexts/functional.context';
import { HypotenuseProps } from '../models/Props.model';

const AngleInput: React.FC = () => {
  const { deg } = useFunctionalContext();

  return (
      <Wrapper>
        <Base />
        <Circle />
        <Hypotenuse deg={deg} />
      </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: 15rem;
`;

const lineStyles = css`
  height: .2rem;
  width: 20%;
  background: ${props => props.theme.color3};
`;

const Base = styled.div`
  ${lineStyles};
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Hypotenuse = styled.div<HypotenuseProps>`
  ${lineStyles};
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: bottom left;
  transform: rotate(-${props => props.deg}deg);
`;

const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 1.25rem;
  width: 1.25rem;
  ${setBorder({ style: 'none', radius: '50%' })};
  transform: translate(-50%, -50%);
  background: ${props => props.theme.color2};
  z-index: 2;
`;

export default AngleInput;