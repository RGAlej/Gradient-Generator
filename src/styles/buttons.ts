import styled, { css } from 'styled-components';

import { setBorder, setTransition } from './styles';

const DefaultButton = css`
  cursor: pointer;
  outline: none;
  text-transform: capitalize;
  color: ${props => props.theme.color2};
  ${setBorder({ style: 'none' })};
  background: ${props => props.theme.color3};
  ${setTransition()};

  :hover {
    color: ${props => props.theme.color3};
    background: ${props => props.theme.color2};
  }
`;

export const MainButton = styled.button`
  ${DefaultButton};
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: .1rem;
  min-width: 30rem;
  padding: 1rem;
`;

export const ButtonPopup = styled.button`
  ${DefaultButton};
  font-size: 2rem;
  font-weight: 500;
  min-width: min-content;
  padding: 1rem 2rem;
`;