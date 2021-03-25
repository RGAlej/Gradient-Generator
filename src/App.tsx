import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/GlobalStyles';

// Todo: configure light and dark theme
// Todo: configure routes
const App = () => {
  return (
      <ThemeProvider theme={'theme'}>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route path={'/'}>
              <h1>home</h1>
            </Route>
            <Route path={'/gradient-generator'}>
              <h1>gradient generator</h1>
            </Route>
            <Route path='*'>
              <h1>other</h1>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
  );
};

export default App;
