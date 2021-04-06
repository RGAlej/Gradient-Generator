export enum ActionModel {
  CHANGE_COLOR,
  ADD_COLOR,
  REMOVE_COLOR,
  ANGLE,
  POSITION,
  LENGTH,
  LINEAR,
  RADIAL
}

export interface FunctionalActionModel {
  type: ActionModel;
  payload?: string | number | { value: string, index: number };
  angle?: number;
  // linear_length is used in a linear gradient
  linear_length?: { index: number; position: string; value: string };
  // position and radial_length are used in position popup to customize a radial gradient
  position?: { x: string; y: string };
  radial_length?: { x: string; y: string };
}