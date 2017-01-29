import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import VideosPage from '../pages/VideosPage';
import videosCollection from '../../api/videos/collection';

const VideosContainer = createContainer(({ metadataSchema }) => {
  const videosHandle = Meteor.subscribe('videos.all');
  return {
    videosReady: videosHandle.ready(),
    videos: videosCollection.find().fetch(),
    metadataSchema,
  };
}, VideosPage);

export default VideosContainer;
