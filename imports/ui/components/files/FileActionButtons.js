/* global confirm */
/* eslint-disable no-alert */

import React from 'react';
import { Button } from 'react-bootstrap';

import { deleteFile } from '../../../api/files/methods';

const FileActionButtons = ({ fsFile, refreshDirectory }) => {
  let content = null;

  const callRemoveFile = () => {
    if (confirm(
        'Are you sure you want to remove this file? The file on the filesystem '
        + 'and all database stored metadata will be removed. ')) {
      deleteFile.call({
        fileId: fsFile.uid,
        filePath: fsFile.path,
      }, (error) => {
        if (!error) {
          refreshDirectory();
        }
      });
    }
  };

  if (fsFile.type === 'file') {
    content = (
      <div className="file-action-buttons">
        {/* <Button
          bsStyle="default"
          className={`btn-fill ${css(UtilityStyles.marginRight5)}`}
          onClick={() => {
            console.log('todo');
          }}
          bsSize="xsmall"
        >
          <i className="fa fa-external-link" />
          Open File
        </Button> */}
        <Button
          bsStyle="danger"
          className="btn-fill"
          onClick={() => { callRemoveFile(); }}
          bsSize="xsmall"
        >
          <i className="fa fa-minus-circle" />
          Remove
        </Button>
      </div>
    );
  }
  return content;
};

FileActionButtons.propTypes = {
  fsFile: React.PropTypes.object.isRequired,
  refreshDirectory: React.PropTypes.func.isRequired,
};

export default FileActionButtons;
