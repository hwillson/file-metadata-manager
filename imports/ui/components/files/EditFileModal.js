import React from 'react';
import { Modal, Button, Tabs, Tab } from 'react-bootstrap';
import { css } from 'aphrodite';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
import AutoField from 'uniforms-bootstrap3/AutoField';
import { _ } from 'meteor/underscore';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import UtilityStyles from '../../styles/utility';
import saveFile from '../../../api/files/methods';
import fileSchema from '../../../api/files/schema';

const EditFileModal = ({
  showModal,
  closeModal,
  metadataSchema,
  file,
  fsFile,
}) => {
  let formRef;

  const callSaveFile = (fileData) => {
    if (fileData) {
      const updatedFile = _.extend({ uid: fsFile.uid }, fileData);
      saveFile.call({ file: _.omit(updatedFile, '_id') }, (error) => {
        if (!error) {
          closeModal();
        }
      });
    }
  };

  const fileUid = (fsFile) ? fsFile.uid : null;
  const fileName = (fsFile) ? fsFile.name : '';
  return (
    <Modal show={showModal} onHide={closeModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className={css(UtilityStyles.marginRight10)}>
            <i className="fa fa-file-text-o" />
          </span>
          Edit File
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AutoForm
          schema={new SimpleSchema([fileSchema, metadataSchema])}
          showInlineError
          ref={(ref) => { formRef = ref; }}
          onSubmit={(fileData) => { callSaveFile(fileData); }}
          submitField={() => null}
          errorsField={() => null}
          model={file}
        >
          <Tabs id="edit-file-tabs">
            <Tab eventKey={1} title="Overview">
              <div className={css(UtilityStyles.marginTop20)}>
                <AutoField name="uid" value={fileUid} type="hidden" />
                <AutoField name="filename" value={fileName} />
                <AutoField name="title" />
              </div>
            </Tab>
            <Tab eventKey={2} title="Classification">
              <div className={css(UtilityStyles.marginTop20)}>
                {metadataSchema._schemaKeys.map(key =>
                  <AutoField key={key} name={key} />,
                )}
              </div>
            </Tab>
          </Tabs>
        </AutoForm>
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

EditFileModal.propTypes = {
  showModal: React.PropTypes.bool.isRequired,
  closeModal: React.PropTypes.func.isRequired,
  metadataSchema: React.PropTypes.object.isRequired,
  file: React.PropTypes.object.isRequired,
  fsFile: React.PropTypes.object,
};

EditFileModal.defaultProps = {
  showModal: false,
  fsFile: null,
};

export default EditFileModal;
