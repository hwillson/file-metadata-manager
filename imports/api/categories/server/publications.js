/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import {
  CategoriesCollection,
  CategoryValuesCollection,
} from '../collections';

Meteor.publish('categories.all', function categoriesAll() {
  return CategoriesCollection.find();
});

Meteor.publish('categoryValues.all', function categoryValuesAll() {
  return CategoryValuesCollection.find();
});
