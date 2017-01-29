import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { _ } from 'meteor/underscore';

import { videoIdSchema } from './schemas';
import videosCollection from './collection';

const createVideoRecord = new ValidatedMethod({
  name: 'videos.create',
  validate: videoIdSchema.validator(),
  run({ uid }) {
    if (this.userId && !this.isSimulation) {
      if (videosCollection.findOne({ uid })) {
        throw new Meteor.Error(`A video with ID ${uid} alread exists.`);
      } else {
        import youtube from '../youtube/server/youtube';
        const videoData = _.extend({ uid }, youtube.fetchDetails(uid));
        if (videoData.title) {
          youtube.fetchSubtitles(uid).then((subtitleContent) => {
            videoData.content = subtitleContent;
            videosCollection.insert(videoData);
          });
        } else {
          throw new Meteor.Error(`YouTube video ID "${uid}" does not exist.`);
        }
      }
    }
  },
});

const updateVideo = new ValidatedMethod({
  name: 'videos.update',
  validate: null,
  run({ videoId, videoData }) {
    if (videoId && videoData) {
      videosCollection.update({ _id: videoId }, { $set: videoData });
    }
  },
});

export { createVideoRecord, updateVideo };
