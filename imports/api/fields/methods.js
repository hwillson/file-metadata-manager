import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import camelCase from 'camelcase';

import fieldsCollection from './collection';

const createField = new ValidatedMethod({
  name: 'fields.create',
  validate: new SimpleSchema({
    name: { type: String },
  }).validator(),
  run({ name }) {
    const schemaId = camelCase(name.replace(/\W/g, ''));
    return fieldsCollection.insert({ name, schemaId });
  },
});

const removeField = new ValidatedMethod({
  name: 'fields.remove',
  validate: new SimpleSchema({
    fieldId: { type: String },
  }).validator(),
  run({ fieldId }) {
    fieldsCollection.remove({ _id: fieldId });
  },
});

const renameField = new ValidatedMethod({
  name: 'fields.rename',
  validate: new SimpleSchema({
    fieldId: { type: String },
    newName: { type: String },
  }).validator(),
  run({ fieldId, newName }) {
    const newSchemaId = camelCase(newName.replace(/\W/g, ''));
    fieldsCollection.update({
      _id: fieldId,
    }, { $set: { name: newName, schemaId: newSchemaId } });
  },
});

export { createField, removeField, renameField };
