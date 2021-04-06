import { FunctionalStateModel } from '../models/FunctionalState.model';
import { ActionModel, FunctionalActionModel } from '../models/FunctionalAction.model';

const reducer = (state: FunctionalStateModel, action: FunctionalActionModel): FunctionalStateModel => {
  const {
    type,
    payload,
    angle,
    position,
    radial_length,
    linear_length
  } = action;

  switch (type) {
    case ActionModel.CHANGE_COLOR:
      if (typeof payload === 'object') {
        state.colors[payload.index].color = payload.value;
        return {
          ...state,
          colors: [...state.colors]
        };
      }
      return { ...state };
    case ActionModel.ADD_COLOR:
      if (typeof payload === 'string') {
        return {
          ...state,
          colors: [...state.colors, { color: payload! }]
        };
      }
      return { ...state };
    case ActionModel.REMOVE_COLOR:
      if (typeof payload === 'number' && state.colors.length > 2) {
        const newColors = state.colors.filter((_, index) => index !== action.payload);
        return {
          ...state,
          colors: [...newColors]
        };
      }
      return { ...state };
    case ActionModel.LENGTH:
      if (linear_length!.position === '1') { // this control statement identifies if the value is the first or the second percentage of each color
        state.colors[linear_length!.index].value1 = linear_length!.value;
      } else if (linear_length!.position === '2') {
        state.colors[linear_length!.index].value2 = linear_length!.value;
      }
      return { ...state, colors: [...state.colors] };
    case ActionModel.ANGLE: // only in linear gradients
      return { ...state, deg: angle! };
    case ActionModel.POSITION: // only in radial gradients
      return {
        ...state,
        position: { x: position!.x, y: position!.y },
        radial_length: { x: radial_length!.x, y: radial_length!.y }
      };
    case ActionModel.LINEAR:
      return { ...state, prefix: 'linear-gradient' };
    case ActionModel.RADIAL:
      return { ...state, prefix: 'radial-gradient' };
  }
};

export default reducer;