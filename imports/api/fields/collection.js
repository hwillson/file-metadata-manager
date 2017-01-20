import { Mongo } from 'meteor/mongo';

import FieldSchema from './schema';

const FieldsCollection = new Mongo.Collection('lkup_fields');
FieldsCollection.attachSchema(FieldSchema);
FieldsCollection.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default FieldsCollection;
