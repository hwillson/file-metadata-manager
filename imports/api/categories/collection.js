import { Mongo } from 'meteor/mongo';

import categorySchema from './schema';

const categoriesCollection = new Mongo.Collection('categories');
categoriesCollection.attachSchema(categorySchema);
categoriesCollection.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default categoriesCollection;
