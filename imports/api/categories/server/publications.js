/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { CategoriesCollection } from '../collections';

Meteor.publish('categories.all', function categoriesAll() {
  return CategoriesCollection.find();
});
