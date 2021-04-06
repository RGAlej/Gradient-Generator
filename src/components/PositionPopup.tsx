import React from 'react';
import styled, { css } from 'styled-components';
import { HiXCircle } from 'react-icons/hi';

import { NavDataIdType } from '../data/navigationData';
import { Header, Title, Wrapper } from '../styles/popupStyles';
import { useFunctionalContext } from '../contexts/functional.context';
import { setBorder } from '../styles/styles';

const PositionPopup: React.FC = () => {
  const { handleNavActions, position, radial_length, changePosition } = useFunctionalContext();

  return (
      <Wrapper>
        <Header>
          <Title>what is the position which you want for your gradient?</Title>
          <HiXCircle onClick={() => handleNavActions!(NavDataIdType.POSITION)}
                     data-testid="exit-btn" />
        </Header>
        <Wrapper2>
          <SubtitleLocal>length</SubtitleLocal>
          <label htmlFor="length-x">axis x</label>
          <label htmlFor="length-y">axis y</label>
          <InputRange id="length-x"
                      value={radial_length.x}
                      onChange={(e) => changePosition!(position.x, position.y, e.target.value, radial_length.y)} />
          <InputRange id="length-y"
                      value={radial_length.y}
                      onChange={(e) => changePosition!(position.x, position.y, radial_length.x, e.target.value)} />
          <Divider />
          <SubtitleLocal>position</SubtitleLocal>
          <label htmlFor="position-x">axis x</label>
          <label htmlFor="position-y">axis y</label>
          <InputRange id="position-x"
                      value={position.x}
                      onChange={(e) => changePosition!(e.target.value, position.y, radial_length.x, radial_length.y)} />
          <InputRange id="position-y"
                      value={position.y}
                      onChange={(e) => changePosition!(position.x, e.target.value, radial_length.x, radial_length.y)} />
        </Wrapper2>
      </Wrapper>
  );
};

const Wrapper2 = styled.div`
  grid-column: 1 / span 2;
  grid-row: 2 / span 3;
  place-self: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: min-content repeat(2, 1fr) repeat(2, min-content) repeat(2, 1fr);
  grid-gap: .5rem 2rem;

  h3,
  label {
    text-align: center;
    justify-self: center;
    color: ${props => props.theme.color2};

  }

  label {
    font-size: 1.25rem;
    text-transform: uppercase;
  }

  input {
    align-self: center;
  }
`;

const SubtitleLocal = styled.h3`
  text-align: center;
  text-transform: capitalize;
  color: ${props => props.theme.color2};
  grid-column: 1 / -1;
  justify-self: center;
  margin-top: 1.5rem;
  margin-bottom: .5rem;
`;

const Divider = styled.div`
  grid-column: 1 / span 2;
  justify-self: center;
  width: 50%;
  height: .25rem;
  margin-top: 1.5rem;
  background: ${props => props.theme.color2};
`;

const SliderTrack = css`
  outline: none;
  cursor: pointer;
  background: ${props => props.theme.color3};
  ${props => setBorder({ color: props.theme.color3 })};
  height: .5rem;
`;

const SliderThumb = css`
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  height: 3rem;
  width: 1.5rem;
  margin-top: -1.5rem;
  ${props => setBorder({ color: props.theme.color3 })};
  background: ${props => props.theme.color1};
`;

const InputRange = styled.input.attrs({ type: 'range', min: '0', max: '100', step: '1' })`
  -webkit-appearance: none;
  outline: none;
  margin: .75rem 0;

  ::-webkit-slider-runnable-track {
    ${SliderTrack}
  }

  ::-moz-range-track {
    ${SliderTrack}
  }

  ::-webkit-slider-thumb {
    ${SliderThumb}
  }

  ::-moz-range-thumb {
    ${SliderThumb}
  }

  :focus::-webkit-slider-thumb {
    background: ${props => props.theme.color2};
  }
`;

export default PositionPopup;