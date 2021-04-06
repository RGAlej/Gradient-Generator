import { fireEvent, renderWithRouter, screen } from './utils/testing_library_utils';
import { RouteModel } from '../models/ManagementState.model';

import GradientBox from '../components/GradientBox';

describe('Box element', () => {
  test('check if all gradient box is correctly rendered', async () => {
    renderWithRouter(<GradientBox />, { route: RouteModel.GRADIENT });
    const gradientBox = screen.getByTestId('box');
    expect(gradientBox).toBeInTheDocument();

    // check color list
    const colorList = screen.getAllByTestId('color');
    expect(colorList).toHaveLength(2);

    const color1 = colorList[0] as HTMLInputElement;
    expect(color1).toHaveValue('#a1ffce');

    // check text area and default linear gradient
    const codeTextArea = screen.getByRole('textbox');
    expect(codeTextArea).toHaveTextContent('linear-gradient');
    expect(codeTextArea).toHaveTextContent('#A1FFCE');
  });

  test('check if change color works', async () => {
    renderWithRouter(<GradientBox />, { route: RouteModel.GRADIENT });
    const colorList = screen.getAllByTestId('color');
    const color1 = colorList[0] as HTMLInputElement;
    const codeTextArea = screen.getByRole('textbox');

    // check default values
    expect(color1).toHaveValue('#a1ffce');

    expect(color1).toMatchSnapshot();
    expect(codeTextArea).toMatchSnapshot();

    // change value of color1 input
    fireEvent.change(color1, { target: { value: '#ffffff' } });
    expect(color1).toHaveValue('#ffffff');

    // check if the code in text area was updated
    expect(codeTextArea).toHaveTextContent('linear-gradient');
    expect(codeTextArea).toHaveTextContent('#FFFFFF');

    expect(color1).toMatchSnapshot();
    expect(codeTextArea).toMatchSnapshot();
  });
});
