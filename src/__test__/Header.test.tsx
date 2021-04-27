import userEvent from '@testing-library/user-event';
import { renderWithRouter, screen } from './utils/testing_library_utils';
import { RouteModel } from '../models/ManagementState.model';

import Header from '../components/Header';

describe('Header Element', () => {
  test('check light theme and toggle theme to dark theme', async () => {
    renderWithRouter(<Header />, { route: RouteModel.GRADIENT });

    // width larger than phone width
    const title = screen.getByRole('link', { name: 'gradient generator' });
    expect(title).toBeInTheDocument();

    const moon = screen.getByTestId('moon');
    // check light theme
    expect(moon).toBeInTheDocument();

    // check toggle to dark theme
    userEvent.click(moon);

    const sun = await screen.findByTestId('sun');
    expect(sun).toBeInTheDocument();
    expect(moon).not.toBeInTheDocument();
  });

  test('check navigation', async () => {
    renderWithRouter(<Header />, { route: RouteModel.GRADIENT });

    // check list length
    const list = screen.getByRole('list');
    const navigation = screen.getAllByRole('listitem');
    expect(list).toBeInTheDocument();
    expect(navigation).toHaveLength(6);

    // as the default value of prefix is 'linear-gradient'
    userEvent.hover(navigation[0]);
    const radialTooltip = await screen.findByRole('complementary');
    expect(radialTooltip).toHaveTextContent('convert to radial');

    userEvent.hover(navigation[1]);
    const angleTooltip = await screen.findByRole('complementary');
    expect(angleTooltip).toHaveTextContent('modify angle');

    userEvent.click(navigation[0]);
    // I go back to looking for navigation once it has already changed
    const navigationChanged = screen.getAllByRole('listitem');
    userEvent.hover(navigationChanged[0]);
    const linearTooltip = await screen.findByRole('complementary');
    expect(linearTooltip).toHaveTextContent('convert to linear');
  });
});
