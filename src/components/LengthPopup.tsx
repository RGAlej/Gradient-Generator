import React from 'react';
import styled from 'styled-components';
import { HiXCircle } from 'react-icons/hi';

import { Header, Input, Subtitle, Title, Wrapper } from '../styles/popupStyles';
import { setBorder, setFlex } from '../styles/styles';
import { useFunctionalContext } from '../contexts/functional.context';
import { NavDataIdType } from '../data/navigationData';

const LengthPopup: React.FC = () => {
  const { colors, handleNavActions, handlePercentValues } = useFunctionalContext();

  return (
      <Wrapper>
        <Header>
          <Title>what length do you want for each color?</Title>
          <HiXCircle onClick={() => handleNavActions!(NavDataIdType.LENGTH)}
                     data-testid="exit-btn" />
        </Header>
        <Subtitle>
          <h4>specify between what percentages must be</h4>
        </Subtitle>
        <Form>
          {colors.map((item, index) => {
            return (
                <ColorInput key={index}>
                  <Color bg={item.color}>
                    <p>{item.color.toUpperCase()}</p>
                  </Color>
                  <Input type="number"
                         value={item.value1 || ''}
                         onChange={(e) => handlePercentValues!(index, '1', e.target.value)} />
                  <Input type="number"
                         value={item.value2 || ''}
                         onChange={(e) => handlePercentValues!(index, '2', e.target.value)} />
                </ColorInput>
            );
          })}
        </Form>
      </Wrapper>
  );
};

const Form = styled.section`
  ${setFlex()};
  flex-wrap: wrap;
`;

const ColorInput = styled.div`
  display: grid;
  grid-template-columns: repeat(3, min-content);
  margin: .75rem;
  column-gap: .5rem;

  ${Input} {
    align-self: center;
  }
`;

const Color = styled.h4<{ bg: string }>`
  color: ${props => props.theme.color3};
  padding: .75rem;
  ${setBorder({ style: 'none' })};
  background: ${props => props.bg};

  p {
    padding: .25rem;
    ${setBorder({ style: 'none' })};
    background: ${props => props.theme.color2};
  }
`;

export default LengthPopup;