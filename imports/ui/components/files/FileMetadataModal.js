import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { css } from 'aphrodite';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
import { _ } from 'meteor/underscore';

import UtilityStyles from '../../styles/utility';
// import { saveFileField } from '../../../api/metadata/methods';

const FileMetadataModal = ({
  showModal,
  closeModal,
  fsFile,
  fields,
  categories,
  categoryValues,
  metadataSchema,
}) => {
  let formRef;

  const saveMetadata = (data) => {

    // If a file record doesn't exist in the database, create it first


    _.keys(data).forEach((key) => {
      if (key.indexOf('field_') === 0) {
        const fieldId = key.split('_')[1];
        const value = data[key];

console.log(fieldId);
console.log(value);
      }
    });
  };

  let fileName = (fsFile) ? fsFile.name : '';
  return (
    <Modal show={showModal} onHide={closeModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className={css(UtilityStyles.marginRight10)}>
            <i className="fa fa-file-text-o" />
          </span>
          Metadata: <strong>{fileName}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AutoForm
          schema={metadataSchema}
          showInlineError
          ref={(ref) => { formRef = ref; }}
          onSubmit={(data) => { saveMetadata(data); }}
          submitField={() => null}
          errorsField={() => null}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-fill" onClick={closeModal}>Cancel</Button>
        <Button
          bsStyle="info"
          className="btn-fill"
          onClick={() => formRef.submit()}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

FileMetadataModal.propTypes = {
  showModal: React.PropTypes.bool.isRequired,
  closeModal: React.PropTypes.func.isRequired,
  fsFile: React.PropTypes.object,
  fields: React.PropTypes.array.isRequired,
  categories: React.PropTypes.array.isRequired,
  categoryValues: React.PropTypes.array.isRequired,
  metadataSchema: React.PropTypes.object.isRequired,
};

FileMetadataModal.defaultProps = {
  showModal: false,
  fsFile: null,
};

export default FileMetadataModal;
