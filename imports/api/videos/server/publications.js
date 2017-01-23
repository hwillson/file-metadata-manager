/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import VideosCollection from '../collection';

Meteor.publish('videos.all', function videosAll() {
  return VideosCollection.find();
});
