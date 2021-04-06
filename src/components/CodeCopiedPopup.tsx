import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../styles/animations';
import { Wrapper } from '../styles/popupStyles';

const CodeCopiedPopup: React.FC = () => {
  return (
      <AlertWrapper>
        <Alert>copied to clipboard!</Alert>
      </AlertWrapper>
  );
};

const AlertWrapper = styled(Wrapper)`
  animation: ${fadeIn} .5s ease-in;
`;

const Alert = styled.h1`
  text-align: center;
  color: ${props => props.theme.color3};
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  place-self: center;

  &:first-letter {
    text-transform: uppercase;
  }
`;

export default CodeCopiedPopup;