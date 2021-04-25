import { screen , fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ColorList from '../components/ColorList';
import { renderWithRouter } from './utils/testing_library_utils';
import { RouteModel } from '../models/ManagementState.model';

describe('check colors', () => {
  test('if exist two colors inside the Color List and both have the functionality', () => {
    renderWithRouter(<ColorList />, { route: RouteModel.GRADIENT });
    const colorList = screen.getAllByTestId('color');
    expect(colorList).toHaveLength(2);
  
    // check remove functionality doesn't work with only two colors
    const color1 = colorList[0];
    userEvent.dblClick(color1);
    expect(colorList).toHaveLength(2);
  });
})
