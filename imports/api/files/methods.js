import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import filesCollection from './collection';

const updateFile = new ValidatedMethod({
  name: 'files.update',
  validate: null,
  run({ file }) {
    const newFile = file;
    newFile.dateUpdated = new Date();
    filesCollection.update({
      uid: newFile.uid,
    }, {
      $set: newFile,
    }, {
      upsert: true,
    });
  },
});

const deleteFile = new ValidatedMethod({
  name: 'files.delete',
  validate: new SimpleSchema({
    fileId: { type: String },
    filePath: { type: String },
  }).validator(),
  run({ fileId, filePath }) {
    if (this.userId && fileId && filePath && !this.isSimulation) {
      filesCollection.remove({ uid: fileId });
      import fileSystem from '../fs_files/server/file_system';
      fileSystem.removeFile(filePath);
    }
  },
});

export { updateFile, deleteFile };
