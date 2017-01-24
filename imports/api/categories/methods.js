import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import camelCase from 'camelcase';

import categoriesCollection from './collection';

const createCategory = new ValidatedMethod({
  name: 'categories.create',
  validate: new SimpleSchema({
    name: { type: String },
  }).validator(),
  run({ name }) {
    const schemaId = camelCase(name.replace(/\W/g, ''));
    return categoriesCollection.insert({ name, schemaId });
  },
});

const removeCategory = new ValidatedMethod({
  name: 'categories.remove',
  validate: new SimpleSchema({
    categoryId: { type: String },
  }).validator(),
  run({ categoryId }) {
    categoriesCollection.remove({ _id: categoryId });
  },
});

const renameCategory = new ValidatedMethod({
  name: 'categories.rename',
  validate: new SimpleSchema({
    categoryId: { type: String },
    newName: { type: String },
  }).validator(),
  run({ categoryId, newName }) {
    const newSchemaId = camelCase(newName.replace(/\W/g, ''));
    categoriesCollection.update({
      _id: categoryId,
    }, { $set: { name: newName, schemaId: newSchemaId } });
  },
});

const addCategoryValue = new ValidatedMethod({
  name: 'categories.addValue',
  validate: new SimpleSchema({
    categoryId: { type: String },
    value: { type: String },
  }).validator(),
  run({ categoryId, value }) {
    return categoriesCollection.update({
      _id: categoryId,
    }, { $push: { values: value } });
  },
});

const removeCategoryValue = new ValidatedMethod({
  name: 'categories.removeValue',
  validate: new SimpleSchema({
    categoryId: { type: String },
    value: { type: String },
  }).validator(),
  run({ categoryId, value }) {
    return categoriesCollection.update({
      _id: categoryId,
    }, { $pull: { values: value } });
  },
});

export {
  createCategory,
  removeCategory,
  renameCategory,
  addCategoryValue,
  removeCategoryValue,
};
