import { Meteor } from 'meteor/meteor';
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

    if (!this.isSimulation) {
      import { synchDocWithCms } from '../hooks/hooks';
      const hook = Meteor.settings.private.hooks.update.files;
      if (hook === 'synchDocWithCms') {
        synchDocWithCms(file);
      }
    }
  },
});

const deleteFile = new ValidatedMethod({
  name: 'files.delete',
  validate: new SimpleSchema({
    fileId: { type: String },
    filePath: { type: String },
    type: { type: String, optional: true },
  }).validator(),
  run({ fileId, filePath, type }) {
    if (this.userId && fileId && filePath && !this.isSimulation) {
      if (type === 'directory') {
        const relativePath =
          filePath.replace(Meteor.settings.private.files.rootDirectory, '');
        const regex = new RegExp(`^${relativePath}`);
        filesCollection.remove({ path: { $regex: regex } });
      } else {
        filesCollection.remove({ uid: fileId });
      }
      import fileSystem from '../fs_files/server/file_system';
      fileSystem.removeFile(filePath);

      if (!this.isSimulation) {
        import { removeDocFromCms } from '../hooks/hooks';
        const hook = Meteor.settings.private.hooks.delete.files;
        if (hook === 'removeDocFromCms') {
          removeDocFromCms(fileId);
        }
      }
    }
  },
});

export { updateFile, deleteFile };
