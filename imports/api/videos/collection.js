import { Mongo } from 'meteor/mongo';

// import { videoSchema } from './schemas';

const videosCollection = new Mongo.Collection('videos');
// videosCollection.attachSchema(videoSchema);
videosCollection.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default videosCollection;
