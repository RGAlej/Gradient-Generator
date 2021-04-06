import { NavDataIdType } from '../data/navigationData';
import React, { Dispatch, SetStateAction } from 'react';

interface ColorModel {
  color: string;
  value1?: string; // values are used for the percentages of each colors
  value2?: string;
}

interface initialFunctionalState {
  colors: ColorModel[];
  prefix: 'linear-gradient' | 'radial-gradient';
  deg: number;
  position: { x: string; y: string };
  radial_length: { x: string; y: string };
}

interface basicFunctionality {
  gradient?: string;
  handleNavActions?: (type: NavDataIdType) => void;
  changeColor?: (value: string, index: number) => void;
  removeColor?: (index: number) => void;
}

interface booleansToDisplayPopups {
  limitColors?: boolean;
  setLimitColors?: Dispatch<SetStateAction<boolean>>;
  alertCodeCopied?: boolean;
  isShowAngle?: boolean;
  isShowHint?: boolean;
  isShowPosition?: boolean;
  isShowLength?: boolean;
}

interface functionsOfFunctionalState {
  codeToCopy?: React.RefObject<HTMLTextAreaElement>;
  changeAngle?: (angle: number) => void;
  changePosition?: (p_x: string, p_y: string, l_x: string, l_y: string) => void;
  handlePercentValues?: (index: number, position: string, value: string) => void;
}

export interface FunctionalStateModel extends initialFunctionalState, basicFunctionality, booleansToDisplayPopups, functionsOfFunctionalState {}