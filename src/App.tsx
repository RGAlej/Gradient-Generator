import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/GlobalStyles';
import { useManagementContext } from './contexts/management.context';
import { useFunctionalContext } from './contexts/functional.context';

import Header from './components/Header';
import Home from './components/Home';
import GradientBox from './components/GradientBox';
import AnglePopup from './components/AnglePopup';
import CodeCopiedPopup from './components/CodeCopiedPopup';
import HintPopup from './components/HintPopup';
import LimitColorsPopup from './components/LimitColorsPopup';
import LengthPopup from './components/LengthPopup';
import PositionPopup from './components/PositionPopup';

const App = () => {
  const {
    limitColors,
    alertCodeCopied,
    isShowAngle,
    isShowPosition,
    isShowLength,
    isShowHint,
  } = useFunctionalContext();
  const { theme } = useManagementContext();

  return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route path={'/gradient-generator'}>
              <Header />
              <GradientBox />
              {isShowHint && <HintPopup />}
              {limitColors && <LimitColorsPopup />}
              {alertCodeCopied && <CodeCopiedPopup />}
              {isShowLength && <LengthPopup />}
              {isShowPosition && <PositionPopup />}
              {isShowAngle && <AnglePopup />}
            </Route>
            <Route path={'/'}>
              <Header />
              <Home />
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
