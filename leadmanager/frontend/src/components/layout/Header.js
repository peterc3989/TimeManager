import { useDispatch, useSelector } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { logout } from '../../actions/auth';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    
    marginLeft: '20%',
    marginRight: '20%',
    color:'white',
  },
  title: {
    
    flexGrow: 1,
  },
  button: {
    marginLeft:'3%',
    fontSize: '15px',
    color: 'white',
    textTransform: 'none',
  },
  
}));

export default function Header() {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = auth;
  const authLinks = (
    <>
      <Typography variant="h6">{user ? `${user.username}` : ''}</Typography>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={() => dispatch(logout())}
      >
        Logout
      </Button>
    </>
  );
  const guestLinks = (
    <>
      
      <Button className={classes.button} href="/#/register" color="secondary">
        Register
      </Button>
      <Button className={classes.button} href="/#/login" color="secondary">
        Login
      </Button>
    </>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar color="secondary" className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            Time Manager
          </Typography>
          {isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
}
