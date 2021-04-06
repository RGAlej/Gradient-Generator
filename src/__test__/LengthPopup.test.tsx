import { renderWithRouter, screen } from './utils/testing_library_utils';
import { RouteModel } from '../models/ManagementState.model';
import LengthPopup from '../components/LengthPopup';

test('length popup basic display', async () => {
  renderWithRouter(<LengthPopup />, { route: RouteModel.GRADIENT });

  const title = screen.getByRole('heading', { level: 3, name: 'what length do you want for each color?' });
  expect(title).toBeInTheDocument();

  const subtitle = screen.getByRole('heading', { level: 4, name: 'specify between what percentages must be' });
  expect(subtitle).toBeInTheDocument();

  const inputs = screen.getAllByRole('spinbutton');
  expect(inputs).toHaveLength(4);
});