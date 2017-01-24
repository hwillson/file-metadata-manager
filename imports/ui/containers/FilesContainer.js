import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import FilesPage from '../pages/FilesPage';
import FieldsCollection from '../../api/fields/collection';
import {
  CategoriesCollection,
  CategoryValuesCollection,
} from '../../api/categories/collections';
import { generateMetadataSchema } from '../../api/metadata/schemas';

const FilesContainer = createContainer(() => {
  const fieldsHandle = Meteor.subscribe('fields.all');
  const categoriesHandle = Meteor.subscribe('categories.all');
  const categoryValuesHandle = Meteor.subscribe('categoryValues.all');

  const fields = FieldsCollection.find().fetch();
  const categories = CategoriesCollection.find().fetch();
  const categoryValues = CategoryValuesCollection.find().fetch();

  let metadataSchema = new SimpleSchema();
  if (fieldsHandle.ready()
      && categoriesHandle.ready()
      && categoryValuesHandle.ready()) {
    metadataSchema = generateMetadataSchema({
      fields,
      categories,
      categoryValues,
    });
  }

  return {
    fields,
    categories,
    categoryValues,
    metadataSchema,
  };
}, FilesPage);

export default FilesContainer;
