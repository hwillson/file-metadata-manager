import { Mongo } from 'meteor/mongo';

import fieldSchema from './schema';

const fieldsCollection = new Mongo.Collection('fields');
fieldsCollection.attachSchema(fieldSchema);
fieldsCollection.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default fieldsCollection;
