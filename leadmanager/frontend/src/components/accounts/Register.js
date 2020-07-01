import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  form: {
    display:'flex',
    flexDirection: 'column',
    lineHeight: 1.5,
    boxSizing: 'border-box',
    fontSize: '16px',
    marginLeft:'20%',
    marginRight:'20%',
    borderWidth:'1',
    borderColor: '#e66465',
    border: 'solid',
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  formItem: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 2,
  },
  formInput: {
    alignSelf: 'flex-start',

    padding: '0.8em',
    fontSize: '0.9em',
    fontFamily: '"Source Sans Pro", sans-serif',

    outline: 'none',
    border: '1px solid #dddddd',
    borderRadius: '4px',
    background: '#f9f9f9',
  },
  formLabel: {
    fontWeight: 600,
    padding: '10px 0',
    alignSelf: 'flex-start',
  },
  button: {
    marginLeft:'3%',
    fontSize: '15px',
    color: 'white',
    textTransform: 'none',
  },
});

export default function Register() {
  const classes = useStyles();
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState('');
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(createMessage({ passwordNotMatch: 'Passwords do not match' }));
    } else {
      const newUser = {
        username,
        password,
        email,
      };
      dispatch(register(newUser));
    }
  };

  const onChange = (e) => {
    if (e.target.name === "username") setUsername(e.target.value);
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
    if (e.target.name === "password2") setPassword2(e.target.value);
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h2 className="text-center">Register</h2>
      <form onSubmit={onSubmit} className={classes.form}>
        <div className={classes.formItem}>
          <label className={classes.formLabel}>Username </label>
          <input
            type="text"
            name="username"
            className={classes.formInput}
            onChange={onChange}
            value={username}
          />
        </div>
        <div className={classes.formItem}>
          <label className={classes.formLabel}>Email </label>
          <input
            type="email"
            name="email"
            className={classes.formInput}
            onChange={onChange}
            value={email}
          />
        </div>
        <div className={classes.formItem}>
          <label className={classes.formLabel}>Password</label>
          <input
            type="password"
            name="password"
            className={classes.formInput}
            onChange={onChange}
            value={password}
          />
        </div>
        <div className={classes.formItem}>
          <label className={classes.formLabel}>Confirm Password </label>
          <input
            type="password"
            name="password2"
            className={classes.formInput}
            onChange={onChange}
            value={password2}
          />
        </div>
        <Button className={classes.button} type="submit" variant="contained" color="secondary">
          Register
        </Button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
