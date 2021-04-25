import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

import { FunctionalStateModel } from '../models/FunctionalState.model';
import { ActionModel } from '../models/FunctionalAction.model';
import { NavDataIdType } from '../data/navigationData';
import { setColor } from '../styles/styles';

import reducer from '../reducers/functional.reducer';

const initialState: FunctionalStateModel = {
  colors: [{ color: '#A1FFCE' }, { color: '#FAFFD1' }],
  prefix: 'linear-gradient',
  deg: 60,
  position: { x: '50', y: '50' },
  radial_length: { x: '50', y: '50' },
};

const FunctionalContext = React.createContext<FunctionalStateModel>(
  initialState
);

interface Props {
  children: JSX.Element;
}

const FunctionalContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [code, setCode] = useState<string>('');
  const [gradient, setGradient] = useState<string>('');

  const [isShowHint, setIsShowHint] = useState<boolean>(false);
  const [limitColors, setLimitColors] = useState<boolean>(false);
  const [alertCodeCopied, setAlertCodeCopied] = useState(false);
  const [isShowAngle, setIsShowAngle] = useState<boolean>(false);
  const [isShowPosition, setIsShowPosition] = useState<boolean>(false);
  const [isShowLength, setIsShowLength] = useState<boolean>(false);
  const [showTrash, setShowTrash] = useState<boolean>(false);
  const codeToCopy = useRef<HTMLTextAreaElement>(null);

  const changeColor = (value: string, index: number) => {
    return dispatch({
      type: ActionModel.CHANGE_COLOR,
      payload: { value, index },
    });
  };

  const dragStartHandler = (event:React.DragEvent<HTMLInputElement>, index: number) => {
    if (state.colors.length > 2 && event.dataTransfer !== undefined) {
      setShowTrash(true);
      event.dataTransfer!.setData('text/plain', index.toString());
      event.dataTransfer!.effectAllowed = 'move';
    }
  };

  const dragOverHandler = (event: React.DragEvent<SVGElement>) => {
    event.preventDefault();
    const element = event.target as HTMLElement;
    if (!element.classList.contains('dragging'))
      element.classList.add('dragging');
  };

  const dragLeaveHandler = (event: React.DragEvent<SVGElement>) => {
    event.preventDefault();
    const element = event.target as HTMLElement;
    if (element.classList.contains('dragging'))
      element.classList.remove('dragging');
  };

  const dragEndHandler = () => {
    setShowTrash(false);
  };

  const dropHandler = (event: React.DragEvent<SVGElement>) => {
    const index = event.dataTransfer.getData('text');
    const element = event.target as HTMLElement;
    if (element.classList.contains('dragging'))
      element.classList.remove('dragging');
    removeColor(+index);
  };

  const touchMoveHandler = (event: React.TouchEvent<HTMLElement>, index: number) => {
    const element = event.target as HTMLElement;
    element.classList.add('removing');
    setTimeout(() => removeColor(index), 1000);
  }

  const removeColor = (index: number) => {
    setShowTrash(false);
    return dispatch({ type: ActionModel.REMOVE_COLOR, payload: index });
  };

  const changeAngle = (angle: number) => {
    return dispatch({ type: ActionModel.ANGLE, angle: angle });
  };

  const handlePercentValues = (
    index: number,
    position: string,
    value: string
  ) => {
    return dispatch({
      type: ActionModel.LENGTH,
      linear_length: { index, position, value },
    });
  };

  const changePosition = (
    p_x: string,
    p_y: string,
    l_x: string,
    l_y: string
  ) => {
    return dispatch({
      type: ActionModel.POSITION,
      position: { x: p_x, y: p_y },
      radial_length: { x: l_x, y: l_y },
    });
  };

  const closePopups = () => {
    if (isShowPosition) setIsShowPosition(false);
    if (isShowLength) setIsShowLength(false);
    if (isShowAngle) setIsShowAngle(false);
    if (limitColors) setLimitColors(false);
    if (isShowHint) setIsShowHint(false);
  };

  const handleNavActions = (type: NavDataIdType) => {
    closePopups();
    switch (type) {
      case NavDataIdType.HINT:
        return setIsShowHint(!isShowHint);
      case NavDataIdType.ADD:
        if (state.colors.length < 8 && state.colors.length % 2 !== 0) {
          return dispatch({
            type: ActionModel.ADD_COLOR,
            payload: setColor.roseColor,
          });
        } else if (state.colors.length < 8 && state.colors.length % 2 === 0) {
          return dispatch({
            type: ActionModel.ADD_COLOR,
            payload: setColor.orchidColor,
          });
        } else {
          return setLimitColors(true);
        }
      case NavDataIdType.COPY:
        const clipboard = navigator.clipboard;
        if (clipboard) {
          navigator.clipboard.writeText(gradient);
        } else {
          // for mobiles devices
          codeToCopy.current!.setSelectionRange(0, 99999);
          document.execCommand('copy');
        }
        return setAlertCodeCopied(true);
      case NavDataIdType.LENGTH:
        return setIsShowLength(!isShowLength);
      case NavDataIdType.POSITION:
        return setIsShowPosition(!isShowPosition);
      case NavDataIdType.ANGLE:
        return setIsShowAngle(!isShowAngle);
      case NavDataIdType.LINEAR:
        if (isShowPosition) setIsShowPosition(false);
        return dispatch({ type: ActionModel.LINEAR });
      case NavDataIdType.RADIAL:
        if (isShowAngle) setIsShowAngle(false);
        return dispatch({ type: ActionModel.RADIAL });
    }
  };

  // open and clear the 'code copied' popup
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlertCodeCopied(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [alertCodeCopied]);

  // listen every changes in the colors and modify the code of the gradient
  // TODO: improve this functionality to allow a single percentage
  useEffect(() => {
    const codeArr: string[] = []; // to store values of color object in an array to go through it
    state.colors.forEach((item) => {
      if (item.value1 && item.value2) {
        codeArr.push(`${item.color} ${item.value1}% ${item.value2}%`);
      } else if (item.value1) {
        codeArr.push(`${item.color} ${item.value1}%`);
      } else if (item.value2) {
        codeArr.push(`${item.color} ${item.value2}%`);
      }
    });
    if (codeArr.length > 1) {
      setCode(codeArr.join(', '));
    } else {
      setCode(`${state.colors.map((item) => item.color).join(', ')}`);
    }
  }, [state.colors]);

  // listen to the changes in prefix, degrees, position and code to modify the gradient code
  useEffect(() => {
    if (state.prefix.includes('linear')) {
      setGradient(`${state.prefix}(${state.deg}deg, ${code.toUpperCase()});`);
    } else if (state.prefix.includes('radial')) {
      setGradient(
        `${state.prefix}(${state.radial_length.x}% ${
          state.radial_length.y
        }% at ${state.position.x}% ${
          state.position.y
        }%, ${code.toUpperCase()});`
      );
    }
  }, [
    state.prefix,
    state.deg,
    state.position,
    state.radial_length.x,
    state.radial_length.y,
    code,
  ]);

  return (
    <FunctionalContext.Provider
      value={{
        ...state,
        gradient,
        limitColors,
        alertCodeCopied,
        isShowAngle,
        isShowHint,
        isShowPosition,
        isShowLength,
        codeToCopy,
        showTrash,
        dragStartHandler,
        dragOverHandler,
        dragLeaveHandler,
        dragEndHandler,
        dropHandler,
        touchMoveHandler,
        setLimitColors,
        changeColor,
        removeColor,
        changeAngle,
        changePosition,
        handlePercentValues,
        handleNavActions,
      }}>
      {children}
    </FunctionalContext.Provider>
  );
};

export const useFunctionalContext = () => {
  return useContext(FunctionalContext);
};

export { FunctionalContext, FunctionalContextProvider };
