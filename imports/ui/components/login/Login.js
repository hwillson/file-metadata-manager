import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/std:accounts-ui';

import Loading from '../loading/Loading';

class Login extends Component {
  componentWillReceiveProps(newProps) {
    if (newProps.usersReady && newProps.user) {
      browserHistory.push('/');
    }
  }

  render() {
    let content;
    if (!this.props.usersReady) {
      content = <Loading />;
    } else {
      content = <Accounts.ui.LoginForm />;
    }
    return content;
  }
}

Login.propTypes = {
  usersReady: React.PropTypes.bool,
};

Login.defaultProps = {
  usersReady: false,
  user: null,
};

export default Login;
