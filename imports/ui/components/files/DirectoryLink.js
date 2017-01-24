import React from 'react';
import { css } from 'aphrodite';

import UtilityStyles from '../../styles/utility';

const DirectoryLink = ({ file, currentDirectory, setCurrentDirectory }) => (
  <div key={file.name}>
    <span className={css(UtilityStyles.marginRight5)}>
      <i className="fa fa-folder-o" />
    </span>
    <a
      href={`/files${currentDirectory}/${file.name}`}
      onClick={setCurrentDirectory}
    >
      {file.name}
    </a>
  </div>
);

DirectoryLink.propTypes = {
  file: React.PropTypes.object.isRequired,
  currentDirectory: React.PropTypes.string.isRequired,
  setCurrentDirectory: React.PropTypes.func.isRequired,
};

export default DirectoryLink;
