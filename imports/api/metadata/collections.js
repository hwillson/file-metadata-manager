import { Mongo } from 'meteor/mongo';

import { FileFieldSchema, FileCategorySchema } from './schemas';

const FileFieldsCollection = new Mongo.Collection('file_fields');
FileFieldsCollection.attachSchema(FileFieldSchema);
FileFieldsCollection.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

const FileCategoriesCollection = new Mongo.Collection('file_categories');
FileCategoriesCollection.attachSchema(FileCategorySchema);
FileCategoriesCollection.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export { FileFieldsCollection, FileCategoriesCollection };
