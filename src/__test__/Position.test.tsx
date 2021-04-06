import { fireEvent, renderWithRouter, screen } from './utils/testing_library_utils';
import { RouteModel } from '../models/ManagementState.model';
import PositionPopup from '../components/PositionPopup';

test('position popup basic display', async () => {
  renderWithRouter(<PositionPopup />, { route: RouteModel.GRADIENT });

  const title = screen.getByRole('heading', {
    level: 3,
    name: 'what is the position which you want for your gradient?'
  });
  expect(title).toBeInTheDocument();

  const lengthSubtitle = screen.getByRole('heading', { level: 3, name: 'length' });
  const positionSubtitle = screen.getByRole('heading', { level: 3, name: 'position' });
  expect(lengthSubtitle).toBeInTheDocument();
  expect(positionSubtitle).toBeInTheDocument();

  const allSliders = screen.getAllByRole('slider');
  expect(allSliders).toHaveLength(4);

  const slidersY = screen.getAllByLabelText('axis y');
  const slidersX = screen.getAllByLabelText('axis x');
  expect(slidersY).toHaveLength(2);
  expect(slidersX).toHaveLength(2);

  const sliderLengthY = slidersY[0];
  const sliderPositionY = slidersY[1];
  const sliderLengthX = slidersX[0];
  const sliderPositionX = slidersX[1];

  expect(sliderLengthY).toHaveValue('50');
  expect(sliderLengthX).toHaveValue('50');
  expect(sliderPositionY).toHaveValue('50');
  expect(sliderPositionX).toHaveValue('50');

  fireEvent.change(sliderPositionY, { target: { value: 33 } });
  expect(sliderPositionY).toHaveValue('33');

  fireEvent.change(sliderLengthY, { target: { value: 99 } });
  expect(sliderLengthY).toHaveValue('99');
});