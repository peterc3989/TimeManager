import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLead } from '../../actions/leads';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddBoxIcon from '@material-ui/icons/AddBox';

export class Form extends Component {
  state = {
    activity: '',
    minutes: 2,
    hours: 2,
  };

  static propTypes = {
    addLead: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { activity,minutes,hours } = this.state;
    const lead = { activity,minutes,hours };
    this.props.addLead(lead);
    this.setState({
      activity: '',
    });
  };

  render() {
    const { activity,minutes,hours } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Activity</label>
            <input
              className="form-control"
              type="text"
              name="activity"
              onChange={this.onChange}
              value={activity}
            />
          </div>
          <div className="form-group">
            <IconButton color="secondary" type="submit" aria-label="delete">
              <AddBoxIcon style={{ fontSize: 40 }} />
            </IconButton>
            
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addLead })(Form);
