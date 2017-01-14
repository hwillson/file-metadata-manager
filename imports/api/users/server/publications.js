/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

Meteor.publish('users.all', function usersAll() {
  return Meteor.users.find();
});
