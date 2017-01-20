import { ValidatedMethod } from 'meteor/mdg:validated-method';

import FieldsCollection from './collection';
import FieldSchema from './schema';

const createField = new ValidatedMethod({
  name: 'fields.createField',
  validate: FieldSchema.validator(),
  run({ name }) {
    return FieldsCollection.insert({ name });
  },
});

export default createField;
