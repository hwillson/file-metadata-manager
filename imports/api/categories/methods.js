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

export { createCategory, createCategoryValue, removeCategoryValue };
