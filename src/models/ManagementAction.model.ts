import { DefaultThemeInterface } from '../styles/themes';

export enum ActionModel {
  TOGGLE_THEME
}

export interface ManagementActionModel {
  type: ActionModel;
  payload: { theme: DefaultThemeInterface; dark: boolean };
}