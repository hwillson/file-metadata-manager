import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import {
  CategoriesCollection,
  CategoryValuesCollection,
} from './collections';
import { CategorySchema, CategoryValueSchema } from './schemas';

const createCategory = new ValidatedMethod({
  name: 'categories.createCategory',
  validate: CategorySchema.validator(),
  run({ name }) {
    return CategoriesCollection.insert({ name });
  },
});

const removeCategory = new ValidatedMethod({
  name: 'categories.removeCategory',
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),
  run({ id }) {
    CategoryValuesCollection.remove({ categoryId: id });
    CategoriesCollection.remove({ _id: id });
  },
});

const renameCategory = new ValidatedMethod({
  name: 'categories.renameCategory',
  validate: new SimpleSchema({
    id: { type: String },
    newName: { type: String },
  }).validator(),
  run({ id, newName }) {
    CategoriesCollection.update({ _id: id }, { $set: { name: newName } });
  },
});

const createCategoryValue = new ValidatedMethod({
  name: 'categoryValues.createCategoryValue',
  validate: CategoryValueSchema.validator(),
  run({ categoryId, value }) {
    return CategoryValuesCollection.insert({ categoryId, value });
  },
});

const removeCategoryValue = new ValidatedMethod({
  name: 'categoryValues.removeCategoryValue',
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),
  run({ id }) {
    CategoryValuesCollection.remove({ _id: id });
  },
});

export {
  createCategory,
  removeCategory,
  renameCategory,
  createCategoryValue,
  removeCategoryValue,
};
