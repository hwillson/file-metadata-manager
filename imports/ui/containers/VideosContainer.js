import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import VideosPage from '../pages/VideosPage';
import videosCollection from '../../api/videos/collection';

const VideosContainer = createContainer(() => {
  const videosHandle = Meteor.subscribe('videos.all');
  return {
    videosReady: videosHandle.ready(),
    videos: videosCollection.find().fetch(),
  };
}, VideosPage);

export default VideosContainer;
