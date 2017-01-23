import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import FilesPage from '../pages/FilesPage';
import FieldsCollection from '../../api/fields/collection';
import {
  CategoriesCollection,
  CategoryValuesCollection,
} from '../../api/categories/collections';

const FilesContainer = createContainer(() => {
  Meteor.subscribe('fields.all');
  Meteor.subscribe('categories.all');
  Meteor.subscribe('categoryValues.all');
  return {
    fields: FieldsCollection.find().fetch(),
    categories: CategoriesCollection.find().fetch(),
    categoryValues: CategoryValuesCollection.find().fetch(),
  };
}, FilesPage);

export default FilesContainer;
