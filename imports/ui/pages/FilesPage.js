import React from 'react';

import Files from '../components/files/Files';

const FilesPage = ({ metadataSchema, file, selectedUid }) => (
  <div className="files-page">
    <Files
      metadataSchema={metadataSchema}
      file={file}
      selectedUid={selectedUid}
    />
  </div>
);

FilesPage.propTypes = {
  metadataSchema: React.PropTypes.object.isRequired,
  file: React.PropTypes.object,
  selectedUid: React.PropTypes.object.isRequired,
};

FilesPage.defaultProps = {
  file: {},
};

export default FilesPage;
