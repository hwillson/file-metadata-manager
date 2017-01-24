import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { css } from 'aphrodite';
import AutoForm from 'uniforms-bootstrap3/AutoForm';

import UtilityStyles from '../../styles/utility';
import saveMetadata from '../../../api/metadata/methods';

const FileMetadataModal = ({
  showModal,
  closeModal,
  metadataSchema,
  metadata,
  file,
}) => {
  let formRef;

  const callSaveMetadata = (newMetadata) => {
    saveMetadata.call({ uid: file.uid, metadata: newMetadata }, (error) => {
      if (!error) {
        closeModal();
      }
    });
  };

  const fileName = (file) ? file.name : '';
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
          onSubmit={(newMetadata) => { callSaveMetadata(newMetadata); }}
          submitField={() => null}
          errorsField={() => null}
          model={metadata}
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
  metadataSchema: React.PropTypes.object.isRequired,
  metadata: React.PropTypes.object.isRequired,
  file: React.PropTypes.object,
};

FileMetadataModal.defaultProps = {
  showModal: false,
  file: null,
};

export default FileMetadataModal;
