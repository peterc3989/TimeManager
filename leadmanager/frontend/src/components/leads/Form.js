import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLead } from '../../actions/leads';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Timer from './Timer'

export class Form extends Component {
  state = {
    activity: '',
  };

  static propTypes = {
    addLead: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { activity } = this.state;
    const lead = { activity };
    this.props.addLead(lead);
    this.setState({
      activity: '',
    });
  };

  render() {
    const { name, activity } = this.state;
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
            
            <Timer></Timer>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addLead })(Form);
