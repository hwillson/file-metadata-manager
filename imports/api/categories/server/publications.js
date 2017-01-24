/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import categoriesCollection from '../collection';

Meteor.publish('categories.all', function categoriesAll() {
  return categoriesCollection.find();
});
