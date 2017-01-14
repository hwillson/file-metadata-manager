import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Login from '../components/login/Login';

const LoginContainer = createContainer(() => {
  const usersHandle = Meteor.subscribe('users.all');
  return {
    usersReady: usersHandle.ready(),
    user: Meteor.user(),
  };
}, Login);

export default LoginContainer;
