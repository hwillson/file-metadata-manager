/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import filesCollection from '../collection';

Meteor.publish('files.all', function filesAll() {
  return filesCollection.find();
});
