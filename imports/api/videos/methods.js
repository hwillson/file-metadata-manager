import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { _ } from 'meteor/underscore';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { videoIdSchema } from './schemas';
import videosCollection from './collection';

const createVideoRecord = new ValidatedMethod({
  name: 'videos.create',
  validate: videoIdSchema.validator(),
  async run({ uid }) {
    let done = false;
    if (this.userId && !this.isSimulation) {
      if (videosCollection.findOne({ uid })) {
        throw new Meteor.Error(`A video with ID ${uid} alread exists.`);
      } else {
        import youtube from '../youtube/server/youtube';
        const videoData = _.extend({ uid }, youtube.fetchDetails(uid));
        if (videoData.title) {
          let subtitleContent;
          try {
            subtitleContent = await youtube.fetchSubtitles(uid);
          } catch (error) {
            // Auto generated subtitles can't be created
            subtitleContent = videoData.title;
          }
          videoData.content = subtitleContent;
          videoData.dateUpdated = new Date();
          videosCollection.insert(videoData);
          done = true;
        } else {
          throw new Meteor.Error(`YouTube video ID "${uid}" does not exist.`);
        }
      }
    }
    return done;
  },
});

const updateVideo = new ValidatedMethod({
  name: 'videos.update',
  validate: null,
  run({ videoId, videoData }) {
    if (videoId && videoData) {
      const newVideoData = videoData;
      newVideoData.dateUpdated = new Date();
      videosCollection.update({ _id: videoId }, { $set: newVideoData });

      if (!this.isSimulation) {
        import { synchVideoWithCms } from '../hooks/hooks';
        const hook = Meteor.settings.private.hooks.update.videos;
        if (hook === 'synchVideoWithCms') {
          synchVideoWithCms(videoData);
        }
      }
    }
  },
});

const deleteVideo = new ValidatedMethod({
  name: 'videos.delete',
  validate: new SimpleSchema({
    videoId: { type: String },
    uid: { type: String },
  }).validator(),
  run({ videoId, uid }) {
    if (videoId && uid) {
      videosCollection.remove({ _id: videoId });

      if (!this.isSimulation) {
        import { removeDocFromCms } from '../hooks/hooks';
        const hook = Meteor.settings.private.hooks.delete.videos;
        if (hook === 'removeDocFromCms') {
          removeDocFromCms(uid);
        }
      }
    }
  },
});

export { createVideoRecord, updateVideo, deleteVideo };
