import { RouteModel } from '../models/ManagementState.model';
import { renderWithRouter, screen } from './utils/testing_library_utils';

import Home from '../components/Home';
import userEvent from '@testing-library/user-event';

test('render home and check start button', () => {
  renderWithRouter(<Home />, { route: RouteModel.HOME });

  const startBtn = screen.getByRole('link', { name: 'start' });
  expect(startBtn).toBeInTheDocument();

  userEvent.click(startBtn);
  expect(window.location.pathname).toBe(RouteModel.GRADIENT);
});