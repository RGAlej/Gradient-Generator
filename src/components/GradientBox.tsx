import React from 'react';
import styled from 'styled-components';

import { media, setBorder } from '../styles/styles';
import { useFunctionalContext } from '../contexts/functional.context';
import ColorList from './ColorList';

const GradientBox: React.FC = () => {
  const {
    gradient,
    codeToCopy
  } = useFunctionalContext();

  return (
      <Wrapper>
        <Bg style={{ background: gradient!.slice(0, -1) }} // to avoid the creation of a lot of classes for each gradient I use inline style
            data-testid="box" />
        <ColorList />
        <textarea
            ref={codeToCopy}
            value={gradient}
            readOnly
        />
      </Wrapper>
  );
};

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr repeat(2, min-content);
  place-items: center;
  height: 90vh;
  background: ${props => props.theme.color1};

  textarea {
    outline: none;
    font-family: inherit;
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    color: ${props => props.theme.color3};
    width: 90%;
    padding-top: 4rem;
    padding-bottom: 10rem;
    border: none;
    background: transparent;
    resize: none;

    ::selection {
      background: transparent;
    }
  }
`;

const Bg = styled.article`
  grid-row: 1 / span 1;
  height: 90%;
  width: 60%;
  ${setBorder({ style: 'none' })};
  box-shadow: .1rem .1rem .5rem ${props => props.theme.color3};

  ${media.phone`
    height: 60%;
    width: 85%;
  `}
`;

export default GradientBox;