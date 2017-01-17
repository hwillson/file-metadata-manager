import { Mongo } from 'meteor/mongo';

import FileSchema from './schema';

const FilesCollection = new Mongo.Collection();
FilesCollection.attachSchema(FileSchema);

export default FilesCollection;
