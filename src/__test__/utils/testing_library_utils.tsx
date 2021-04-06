import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactElement } from 'react';
import { RouteModel } from '../../models/ManagementState.model';
import { FunctionalContextProvider } from '../../contexts/functional.context';
import { ManagementContextProvider } from '../../contexts/management.context';

export const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Gradient Generator by Alej', route as RouteModel);

  // this allow Jest testing dark theme to false
  window.matchMedia = window.matchMedia || function () {
    return {
      matches: false,
      addEventListener: function () {},
      removeEventListener: function () {}
    };
  };

  // jest throw an error with document.execCommand function
  document.execCommand = document.execCommand || jest.fn();

  return render(
      <FunctionalContextProvider>
        <ManagementContextProvider>
          {ui}
        </ManagementContextProvider>
      </FunctionalContextProvider>, { wrapper: BrowserRouter });
};

export * from '@testing-library/react';
