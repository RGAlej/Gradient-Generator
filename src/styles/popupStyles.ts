import styled from 'styled-components';
import { media, setBorder, setTransition } from './styles';

export const Wrapper = styled.div`
  opacity: .85;
  position: absolute;
  top: 30%;
  left: 50%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, min-content);
  row-gap: 2.5rem;
  padding: 3rem;
  ${setBorder({ style: 'none' })};
  background: ${props => props.theme.color1};
  box-shadow: .1rem .1rem 1rem ${props => props.theme.color3};
  transform: translateX(-50%);

  ${media.phone`
    width: 80%;
  `}
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  column-gap: 1rem;
  justify-content: center;
  align-items: center;

  svg {
    cursor: pointer;
    height: 2.5rem;
    width: 2.5rem;
    fill: ${props => props.theme.color3};
  }
`;

export const Title = styled.h3`
  text-align: center;
  color: ${props => props.theme.color3};

  :first-letter {
    text-transform: uppercase;
  }
`;

export const Subtitle = styled.div`
  padding: 1rem;
  ${setBorder({ style: 'none' })};
  background: ${props => props.theme.color2};

  & > h4 {
    cursor: default;
    text-align: center;
    color: ${props => props.theme.color3};

    :first-letter {
      text-transform: uppercase;
    }
  }

  :hover {
    filter: brightness(1.2);
  }
`;

export const Input = styled.input.attrs({ type: 'number' })`
  outline: none;
  text-align: center;
  font-family: inherit;
  font-size: 1.5rem;
  letter-spacing: .15rem;
  place-self: center;
  color: ${props => props.theme.color2};
  width: 6rem;
  height: 3rem;
  ${setBorder({ color: 'transparent' })};

  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &:focus {
    ${setBorder()};
  }

  &::placeholder {
    text-align: center;
    color: ${props => props.theme.color3};
  }
`;

export const LinkButtonPopup = styled.a`
  cursor: pointer;
  outline: none;
  color: ${props => props.theme.color3};
  place-self: center;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-width: 15rem;
  padding: 1rem 2rem;
  ${setBorder({ style: 'none' })};
  background: ${props => props.theme.color2};
  ${setTransition()};

  & > h3 {
    font-size: 1.75rem;
    font-weight: 500;
    letter-spacing: .1rem;
    text-transform: uppercase;
  }

  & > svg {
    width: 2rem;
    height: 2rem;
    fill: ${props => props.theme.color3};
    ${setTransition()};
  }

  :hover {
    color: ${props => props.theme.color2};
    background: ${props => props.theme.color3};

    svg {
      fill: ${props => props.theme.color2};
    }
  }
`;