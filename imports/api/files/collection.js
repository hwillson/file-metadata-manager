import { Mongo } from 'meteor/mongo';

import FileSchema from './schema';

const FilesCollection = new Mongo.Collection('files');
FilesCollection.attachSchema(FileSchema);
FilesCollection.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default FilesCollection;
