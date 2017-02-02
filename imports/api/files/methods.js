import { ValidatedMethod } from 'meteor/mdg:validated-method';

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

export default updateFile;
