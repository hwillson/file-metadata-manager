import React from 'react';

import Files from '../components/files/Files';

const FilesPage = ({ metadataSchema, metadata, selectedUid }) => (
  <div className="files-page">
    <Files
      metadataSchema={metadataSchema}
      metadata={metadata}
      selectedUid={selectedUid}
    />
  </div>
);

FilesPage.propTypes = {
  metadataSchema: React.PropTypes.object.isRequired,
  metadata: React.PropTypes.object,
  selectedUid: React.PropTypes.object.isRequired,
};

FilesPage.defaultProps = {
  metadata: {},
};

export default FilesPage;
