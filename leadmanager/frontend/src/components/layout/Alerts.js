import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.activity) alert.error(`Activity: ${error.msg.activity.join()}`);
      if (error.msg.non_field_errors) alert.error(`Non field: ${error.msg.non_field_errors.join()}`);
      if (error.msg.username) alert.error( `Username: ${error.msg.username.join()}`);
      if (error.msg.password) alert.error( `Password: ${error.msg.password.join()}`);
      if (error.msg.email) alert.error( `Email: ${error.msg.email.join()}`);
    }

    if (message !== prevProps.message) {
      if (message.deleteLead) alert.success(message.deleteLead);
      if (message.addLead) alert.success(message.addLead);
      if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
    }
  }

  render() {
    return <></>;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
