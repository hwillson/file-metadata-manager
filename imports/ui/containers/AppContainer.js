import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import AppLayout from '../layouts/AppLayout';

const AppContainer = createContainer(() => {
  const usersHandle = Meteor.subscribe('users.all');
  return {
    usersReady: usersHandle.ready(),
    user: Meteor.user(),
  };
}, AppLayout);

export default AppContainer;