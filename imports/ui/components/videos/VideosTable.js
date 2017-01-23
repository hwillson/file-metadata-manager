import React from 'react';
import { _ } from 'meteor/underscore';

import Loading from '../loading/Loading';

const VideosTable = ({ videosReady, videos }) => {
  let content;
  if (!videosReady) {
    content = <Loading />;
  } else if (videosReady && _.isEmpty(videos)) {
    content = <p>No videos found.</p>;
  } else {
    // TODO ...
  }
  return (
    <div className="videos-table">
      {content}
    </div>
  );
};

VideosTable.propTypes = {
  videosReady: React.PropTypes.bool.isRequired,
  videos: React.PropTypes.array.isRequired,
};

export default VideosTable;
