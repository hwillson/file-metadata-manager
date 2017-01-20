import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import FieldsCollection from './collection';
import FieldSchema from './schema';

const createField = new ValidatedMethod({
  name: 'fields.createField',
  validate: FieldSchema.validator(),
  run({ name }) {
    return FieldsCollection.insert({ name });
  },
});

const removeField = new ValidatedMethod({
  name: 'fields.removeField',
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),
  run({ id }) {
    FieldsCollection.remove({ _id: id });
  },
});

const renameField = new ValidatedMethod({
  name: 'fields.renameField',
  validate: new SimpleSchema({
    id: { type: String },
    name: { type: String },
  }).validator(),
  run({ id, name }) {
    FieldsCollection.update({ _id: id }, { $set: { name } });
  },
});

export { createField, removeField, renameField };
