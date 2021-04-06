import React from 'react';
import styled from 'styled-components';
import { setBorder, setFlex } from '../styles/styles';
import { useFunctionalContext } from '../contexts/functional.context';

const ColorList: React.FC = () => {
  const { colors, removeColor, changeColor } = useFunctionalContext();

  return (
      <Colors>
        {colors.map((color, index) => (
            <InputColor type="color"
                        key={index}
                        defaultValue={color.color}
                        onDoubleClick={() => removeColor!(index)}
                        onTouchMove={() => removeColor!(index)}
                        onChange={(e) => changeColor!(e.target.value, index)}
                        data-testid="color" />
        ))}
      </Colors>
  );
};

const Colors = styled.div`
  grid-row: 2 / span 1;
  ${setFlex({ x: 'space-evenly' })};
  flex-wrap: wrap;
  width: 75%;
  padding: 2rem;
`;

const InputColor = styled.input`
  cursor: pointer;
  background-color: transparent;
  outline: none;
  width: 4rem;
  height: 4rem;
  margin: 1rem 2rem;
  ${setBorder({ style: 'none' })};

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    box-shadow: .1rem .1rem .5rem ${props => props.theme.color3};
  }
`;

export default ColorList;