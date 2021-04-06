import React from 'react';
import { HiXCircle } from 'react-icons/hi';
import { VscGithubInverted } from 'react-icons/vsc';

import { NavDataIdType } from '../data/navigationData';
import { Header, LinkButtonPopup, Subtitle, Title, Wrapper } from '../styles/popupStyles';
import { useFunctionalContext } from '../contexts/functional.context';

const HintPopup: React.FC = () => {
  const { handleNavActions } = useFunctionalContext();
  return (
      <Wrapper>
        <Header>
          <Title>Gradient Generator by AlejRG</Title>
          <HiXCircle onClick={() => handleNavActions!(NavDataIdType.HINT)}
                     data-testid="exit-btn" />
        </Header>
        <Subtitle>
          <h4>you can make your own gradients</h4>
        </Subtitle>
        <Subtitle>
          <h4>check out the navbar an its actions</h4>
        </Subtitle>
        <Subtitle>
          <h4>to remove a color, double click or drag it!</h4>
        </Subtitle>
        <LinkButtonPopup href="https://github.com/RGAlej/gradient-generator">
          <h3>go to</h3>
          <VscGithubInverted />
        </LinkButtonPopup>
      </Wrapper>
  );
};

export default HintPopup;