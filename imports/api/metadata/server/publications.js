/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import metadataCollection from '../collection';

Meteor.publish('metadata.all', function fieldsAll() {
  return metadataCollection.find();
});
