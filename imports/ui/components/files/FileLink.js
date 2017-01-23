import React from 'react';
import { css } from 'aphrodite';

import UtilityStyles from '../../styles/utility';

const FileLink = ({ file, openFileMetadataModal }) => (
  <div key={file.name}>
    <span className={css(UtilityStyles.marginRight5)}>
      <i className="fa fa-file-text-o" />
    </span>
    <a
      href="#file"
      onClick={openFileMetadataModal}
    >
      {file.name}
    </a>
  </div>
);

FileLink.propTypes = {
  file: React.PropTypes.object.isRequired,
  openFileMetadataModal: React.PropTypes.func.isRequired,
};

export default FileLink;
