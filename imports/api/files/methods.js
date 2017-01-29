import { ValidatedMethod } from 'meteor/mdg:validated-method';

import filesCollection from './collection';

const updateFile = new ValidatedMethod({
  name: 'files.update',
  validate: null,
  run({ file }) {
    filesCollection.update({
      uid: file.uid,
    }, {
      $set: file,
    }, {
      upsert: true,
    });
  },
});

export default updateFile;
