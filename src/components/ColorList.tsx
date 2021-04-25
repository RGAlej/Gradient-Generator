import React from 'react';
import styled from 'styled-components';
import { setBorder, setFlex } from '../styles/styles';
import { useFunctionalContext } from '../contexts/functional.context';

const ColorList: React.FC = () => {
  const {
    colors,
    removeColor,
    changeColor,
    dragStartHandler,
    dragEndHandler
  } = useFunctionalContext();

  return (
    <Colors>
      {colors.map((color, index) => (
        <InputColor
          key={index}
          type='color'
          defaultValue={color.color}
          draggable={colors.length > 2}
          onDoubleClick={() => removeColor!(index)}
          onChange={(e) => changeColor!(e.target.value, index)}
          onDragStart={(e) => dragStartHandler!(e, index)}
          onDragEnd={dragEndHandler}
          data-testid='color'
        />
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
    box-shadow: 0.1rem 0.1rem 0.5rem ${(props) => props.theme.color3};
  }
`;

export default ColorList;
