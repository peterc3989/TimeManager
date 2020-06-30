import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import moment from 'moment';
import { addLead } from '../../actions/leads';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const Wrapper = styled.div`
  margin: 4%;
  font-size: 25px;
`;

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [pause, setPause] = useState(true);
  const [activity, setActivity] = useState('');
  const dispatch = useDispatch();

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
      }, 10);
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
    dispatch(addLead({ activity, hours, minutes }));
    setActivity('');
  };
  const onChange = (e) => {
    setActivity(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <TextField
          name="activity"
          onChange={onChange}
          value={activity}
          id="outlined-basic"
          label="Activity"
          variant="outlined"
          text="primary"
        />
        <div style={{ color: '#e66465' }}>
          {hours} : {minutes} : {seconds}
        </div>
        <div>
          <IconButton onClick={startTimer} color="secondary" aria-label="delete">
            <PlayArrowIcon style={{ fontSize: 40 }} />
          </IconButton>
          <IconButton type="submit" onClick={pauseTimer} color="secondary" aria-label="delete">
            <PauseIcon style={{ fontSize: 40 }} />
          </IconButton>
        </div>
      </form>
    </Wrapper>
  );
}

/*static propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};*/
