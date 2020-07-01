import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/auth';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.5,
    boxSizing: 'border-box',
    fontSize: '16px',
    marginLeft: '20%',
    marginRight: '20%',
    borderWidth: '1',
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

export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  const onChange = (e) => {
    if (e.target.name === 'username') setUsername(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="card card-body mt-5">
      <h2>Login</h2>
      <form className={classes.form} onSubmit={onSubmit}>
        <div className={classes.formItem}>
          <label className={classes.formLabel} htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className={classes.formInput}
            name="username"
            onChange={onChange}
            value={username}
          />
        </div>

        <div className={classes.formItem}>
          <label className={classes.formLabel} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={classes.formInput}
            name="password"
            onChange={onChange}
            value={password}
          />
        </div>

        <div className={classes.formItem}>
          <Button className={classes.button} type="submit" variant="contained" color="secondary">
            Login
          </Button>
        </div>
        <p>
          Don't have an account?
          <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
