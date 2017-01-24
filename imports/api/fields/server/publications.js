/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import fieldsCollection from '../collection';

Meteor.publish('fields.all', function fieldsAll() {
  return fieldsCollection.find();
});
