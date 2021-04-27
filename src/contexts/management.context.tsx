import React, { useContext, useEffect, useReducer, useState } from 'react';

import { ManagementStateModel } from '../models/ManagementState.model';
import { ActionModel } from '../models/ManagementAction.model';
import { darkTheme, lightTheme } from '../styles/themes';

import reducer from '../reducers/management.reducer';

const initialState: ManagementStateModel = {
  dark: false,
  theme: lightTheme,
};

const ManagementContext = React.createContext<ManagementStateModel>(
  initialState
);

interface Props {
  children: JSX.Element;
}

const ManagementContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [width, setWidth] = useState<number>(window.innerWidth);

  const toggleTheme = (type: 'dark' | 'light') => {
    if (type === 'dark') {
      return dispatch({
        type: ActionModel.TOGGLE_THEME,
        payload: { theme: darkTheme, dark: true },
      });
    } else if (type === 'light') {
      return dispatch({
        type: ActionModel.TOGGLE_THEME,
        payload: { theme: lightTheme, dark: false },
      });
    }
  };

  useEffect(() => {
    // detect device dark theme on load
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      toggleTheme('dark');
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <ManagementContext.Provider
      value={{
        ...state,
        width,
        toggleTheme,
      }}>
      {children}
    </ManagementContext.Provider>
  );
};

export const useManagementContext = () => {
  return useContext(ManagementContext);
};

export { ManagementContext, ManagementContextProvider };
