import { Mongo } from 'meteor/mongo';

import VideoSchema from './schema';

const VideosCollection = new Mongo.Collection('videos');
VideosCollection.attachSchema(VideoSchema);
VideosCollection.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default VideosCollection;
