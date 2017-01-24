import { Mongo } from 'meteor/mongo';

const metadataCollection = new Mongo.Collection('metadata');
metadataCollection.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default metadataCollection;
