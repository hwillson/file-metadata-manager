import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import camelCase from 'camelcase';

import categoriesCollection from './collection';
import filesCollection from '../files/collection';
import videosCollection from '../videos/collection';

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
    const category = categoriesCollection.findOne({ _id: categoryId });
    filesCollection.update(
      { [category.schemaId]: { $exists: true } },
      { $unset: { [category.schemaId]: '' } },
      { multi: true },
    );
    videosCollection.update(
      { [category.schemaId]: { $exists: true } },
      { $unset: { [category.schemaId]: '' } },
      { multi: true },
    );
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
    const category = categoriesCollection.findOne({ _id: categoryId });
    filesCollection.update(
      { [category.schemaId]: { $exists: true } },
      { $rename: { [category.schemaId]: newSchemaId } },
      { multi: true },
    );
    videosCollection.update(
      { [category.schemaId]: { $exists: true } },
      { $rename: { [category.schemaId]: newSchemaId } },
      { multi: true },
    );
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
    filesCollection.update(
      { event: value }, { $unset: { event: '' } }, { multi: true },
    );
    videosCollection.update(
      { event: value }, { $unset: { event: '' } }, { multi: true },
    );
    return categoriesCollection.update({
      _id: categoryId,
    }, { $pull: { values: value } });
  },
});

const updateCategoryMultiSelectSetting = new ValidatedMethod({
  name: 'categories.updateMultiSelectSetting',
  validate: new SimpleSchema({
    categoryId: { type: String },
    multiselect: { type: Boolean },
  }).validator(),
  run({ categoryId, multiselect }) {
    return categoriesCollection.update({
      _id: categoryId,
    }, { $set: { multiselect } });
  },
});

export {
  createCategory,
  removeCategory,
  renameCategory,
  addCategoryValue,
  removeCategoryValue,
  updateCategoryMultiSelectSetting,
};
