/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import FieldsCollection from '../collection';

Meteor.publish('fields.all', function fieldsAll() {
  return FieldsCollection.find();
});
