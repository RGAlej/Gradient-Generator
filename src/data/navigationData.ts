import { IconType } from 'react-icons';
import {
  HiChartBar,
  HiChartPie,
  HiClipboardCopy,
  HiDotsHorizontal,
  HiInformationCircle,
  HiLocationMarker,
  HiPlusCircle,
  HiSupport
} from 'react-icons/hi';

export enum NavDataIdType {
  RADIAL = 'RADIAL',
  LINEAR = 'LINEAR',
  ANGLE = 'ANGLE',
  POSITION = 'POSITION',
  LENGTH = 'LENGTH',
  COPY = 'COPY',
  ADD = 'ADD',
  HINT = 'HINT'
}

export interface NavDataInterface {
  id: NavDataIdType;
  icon: IconType;
  name: string;
}

export const navData: NavDataInterface[] = [
  {
    id: NavDataIdType.RADIAL,
    icon: HiSupport,
    name: 'convert to radial'
  },
  {
    id: NavDataIdType.LINEAR,
    icon: HiDotsHorizontal,
    name: 'convert to linear'
  },
  {
    id: NavDataIdType.POSITION,
    icon: HiLocationMarker,
    name: 'change position'
  },
  {
    id: NavDataIdType.ANGLE,
    icon: HiChartPie,
    name: 'modify angle'
  },
  {
    id: NavDataIdType.LENGTH,
    icon: HiChartBar,
    name: 'modify length of each color'
  },
  {
    id: NavDataIdType.COPY,
    icon: HiClipboardCopy,
    name: 'copy code'
  },
  {
    id: NavDataIdType.ADD,
    icon: HiPlusCircle,
    name: 'add color'
  },
  {
    id: NavDataIdType.HINT,
    icon: HiInformationCircle,
    name: 'hint'
  },
];