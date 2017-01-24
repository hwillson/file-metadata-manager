import React from 'react';
import { css } from 'aphrodite';

import UtilityStyles from '../../styles/utility';

const FileLink = ({ fsFile, openFileMetadataModal }) => (
  <div key={fsFile.name}>
    <span className={css(UtilityStyles.marginRight5)}>
      <i className="fa fa-file-text-o" />
    </span>
    <a
      href="#file"
      onClick={(event) => { openFileMetadataModal(event, fsFile); }}
    >
      {fsFile.name}
    </a>
  </div>
);

FileLink.propTypes = {
  fsFile: React.PropTypes.object.isRequired,
  openFileMetadataModal: React.PropTypes.func.isRequired,
};

export default FileLink;
