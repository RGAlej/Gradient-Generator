import React from 'react';
import styled from 'styled-components';
import { HiXCircle } from 'react-icons/hi';

import { ButtonPopup } from '../styles/buttons';
import { Header, Subtitle, Title, Wrapper } from '../styles/popupStyles';
import { fadeRight } from '../styles/animations';
import { useFunctionalContext } from '../contexts/functional.context';

const LimitColorsPopup: React.FC = () => {
  const { colors, setLimitColors } = useFunctionalContext();
  return (
      <ThisWrapper>
        <Header>
          <Title>{colors.length} colors are no enough?</Title>
          <HiXCircle onClick={() => setLimitColors!(false)}
                     data-testid="exit-btn" />
        </Header>
        <Subtitle>
          <h4>you can remove colors with double click or dragging it!!</h4>
        </Subtitle>
        <Button onClick={() => setLimitColors!(false)}>Got it!</Button>
      </ThisWrapper>
  );
};

const ThisWrapper = styled(Wrapper)`
  animation: ${fadeRight} .5s ease-in;
`;

const Button = styled(ButtonPopup)`
  grid-row: 3 / -1;
  place-self: center;
`;

export default LimitColorsPopup;