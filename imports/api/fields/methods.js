import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import camelCase from 'camelcase';

import fieldsCollection from './collection';
import filesCollection from '../files/collection';
import videosCollection from '../videos/collection';

const createField = new ValidatedMethod({
  name: 'fields.create',
  validate: new SimpleSchema({
    name: { type: String },
    multiValue: { type: Boolean },
    numeric: { type: Boolean },
  }).validator(),
  run({ name, multiValue, numeric }) {
    const schemaId = camelCase(name.replace(/\W/g, ''));
    return fieldsCollection.insert({ name, multiValue, numeric, schemaId });
  },
});

const removeField = new ValidatedMethod({
  name: 'fields.remove',
  validate: new SimpleSchema({
    fieldId: { type: String },
  }).validator(),
  run({ fieldId }) {
    if (this.userId) {
      const field = fieldsCollection.findOne({ _id: fieldId });
      filesCollection.update({}, {
        $unset: { [field.schemaId]: '' },
      }, { multi: true });
      videosCollection.update({}, {
        $unset: { [field.schemaId]: '' },
      }, { multi: true });
      fieldsCollection.remove({ _id: fieldId });
    }
  },
});

const renameField = new ValidatedMethod({
  name: 'fields.rename',
  validate: new SimpleSchema({
    fieldId: { type: String },
    newName: { type: String },
    multiValue: { type: Boolean },
    numeric: { type: Boolean },
  }).validator(),
  run({ fieldId, newName, multiValue, numeric }) {
    const field = fieldsCollection.findOne({ _id: fieldId });
    const newSchemaId = camelCase(newName.replace(/\W/g, ''));

    fieldsCollection.update({
      _id: fieldId,
    }, {
      $set: {
        name: newName, schemaId: newSchemaId, multiValue, numeric,
      },
    });

    filesCollection.update({}, {
      $rename: {
        [field.schemaId]: newSchemaId,
      },
    }, { multi: true });
    videosCollection.update({}, {
      $rename: {
        [field.schemaId]: newSchemaId,
      },
    }, { multi: true });
  },
});

export { createField, removeField, renameField };
