import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import metadataCollection from './collection';

const saveMetadata = new ValidatedMethod({
  name: 'metadata.save',
  validate: new SimpleSchema({
    uid: { type: String },
    metadata: { type: Object, blackbox: true },
  }).validator(),
  run({ uid, metadata }) {
    metadataCollection.update({ uid }, { $set: metadata }, { upsert: true });
  },
});

export default saveMetadata;
