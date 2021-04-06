import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HiXCircle } from 'react-icons/hi';

import { useFunctionalContext } from '../contexts/functional.context';
import { NavDataIdType } from '../data/navigationData';
import { Header, Input, Subtitle, Title, Wrapper } from '../styles/popupStyles';
import AngleInput from './AngleInput';

const AnglePopup: React.FC = () => {
  const { changeAngle, handleNavActions } = useFunctionalContext();
  const [angleValue, setAngleValue] = useState<number>(90);

  useEffect(() => {
    if (angleValue >= 360) {
      setAngleValue(angleValue - 360);
    }
    changeAngle!(angleValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [angleValue]);

  return (
      <Wrapper>
        <Header>
          <Title>what is the angle which you want for your gradient?</Title>
          <HiXCircle onClick={() => handleNavActions!(NavDataIdType.ANGLE)}
                     data-testid="exit-btn" />
        </Header>
        <Subtitle>
          <h4>an angle of 90 degrees is an horizontal gradient!</h4>
        </Subtitle>
        <LocalWrapper>
          <Input onFocus={(e) => {e.target.value = '';}}
                 value={angleValue}
                 onChange={(e) => setAngleValue(+e.target.value)} />
          <AngleInput />
        </LocalWrapper>
      </Wrapper>
  )
      ;
};

const LocalWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr;
  row-gap: 2rem;
`;

export default AnglePopup;