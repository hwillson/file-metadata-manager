import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import VideosPage from '../pages/VideosPage';
import VideosCollection from '../../api/videos/collection';

const VideosContainer = createContainer(() => {
  const videosHandle = Meteor.subscribe('videos.all');
  return {
    videosReady: videosHandle.ready(),
    videos: VideosCollection.find().fetch(),
  };
}, VideosPage);

export default VideosContainer;
