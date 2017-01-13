import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import AppLayout from '../layouts/AppLayout';

const AppContainer = createContainer(() => {

  // subscribe to users collection with proper subscription handle, then only forward
  // to login if subscription is ready but not logged in ...

  return {
    user: Meteor.user(),
  };
}, AppLayout);

export default AppContainer;
