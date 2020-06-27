import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import { indigo, green } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: green
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/cart' component={Cart} />
        </Switch>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
