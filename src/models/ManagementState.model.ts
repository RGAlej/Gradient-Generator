import { DefaultThemeInterface } from '../styles/themes';

export enum RouteModel {
  HOME = '/',
  GRADIENT = '/gradient-generator'
}

export interface ManagementStateModel {
  dark: boolean;
  theme: DefaultThemeInterface;
  width?: number;
  toggleTheme?: (type: 'dark' | 'light') => void;
}
