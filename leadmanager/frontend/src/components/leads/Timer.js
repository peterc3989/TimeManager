import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddBoxIcon from '@material-ui/icons/AddBox';
import moment from 'moment';
import { getLeads, deleteLead } from '../../actions/leads';


export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [pause, setPause] = useState(true);

  useEffect(() => {
    let interval = null;
    if (!pause) {
      interval = setInterval(() => {
        if (minutes === 59 && seconds === 59) {
          setSeconds(0);
          setMinutes(0);
          setHours(hours + 1);
        } else if (seconds === 59) {
          setSeconds(0);
          setMinutes(minutes + 1);
          setHours(0);
        } else setSeconds(seconds + 1);
      }, 1000);
    } else if (pause && seconds && minutes && hours !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [pause, seconds, minutes, hours]);

  const startTimer = () => {
    setPause(false);
  };

  const pauseTimer = () => {
    setPause(true);
    setSeconds(0);
    setHours(0);
    setMinutes(0);
  };

  return (
    <div>
      <p>
        {hours} : {minutes} : {seconds}
      </p>
      <IconButton onClick={startTimer} color="secondary" aria-label="delete">
        <AddBoxIcon style={{ fontSize: 40 }} />
      </IconButton>
      <Button onClick={pauseTimer}>Pause</Button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
