/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import videosCollection from '../collection';

Meteor.publish('videos.all', function videosAll() {
  return videosCollection.find();
});
