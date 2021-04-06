import { ManagementStateModel } from '../models/ManagementState.model';
import { ActionModel, ManagementActionModel } from '../models/ManagementAction.model';

const reducer = (state: ManagementStateModel, action: ManagementActionModel): ManagementStateModel => {
  const { type, payload } = action;
  switch (type) {
    case (ActionModel.TOGGLE_THEME):
      return { ...state, theme: payload.theme, dark: payload.dark };
  }
};

export default reducer;