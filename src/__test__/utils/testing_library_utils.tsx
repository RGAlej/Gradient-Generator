import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactElement } from 'react';

export const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Gradient Generator by Alej', route);

  return render(ui, { wrapper: BrowserRouter });
};
