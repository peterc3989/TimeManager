import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Header from './layout/Header';
import Dashboard from './leads/Dashboard';
import Alerts from './layout/Alerts';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';

import store from '../store';
import { loadUser } from '../actions/auth';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const theme = createMuiTheme({
  palette: {
    primary:{
      main: '#e66465',
    },
    secondary: {
      // This is green.A700 as hex.
      
      main:'#9198e5',
    },
    
  },
});

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: 'top center',
};

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  const classes = useStyles();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <>
              <Header />
              <Alerts />
              <div className={classes.container}>
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </>
          </Router>
        </AlertProvider>
      </ThemeProvider>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
