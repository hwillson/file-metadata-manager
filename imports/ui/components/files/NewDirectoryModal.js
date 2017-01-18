import React from 'react';
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';
import { css } from 'aphrodite';

import UtilityStyles from '../../styles/utility';

const NewDirectoryModal = ({ showModal, closeModal }) => (
  <Modal show={showModal} onHide={closeModal} animation={false}>
    <Modal.Header closeButton>
      <Modal.Title>
        <span className={css(UtilityStyles.marginRight10)}>
          <i className="fa fa-folder-open-o" />
        </span>
        Create a New Directory
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form>
        <FormGroup controlId="newDirectoryForm">
          <ControlLabel>New Directory Name</ControlLabel>
          <FormControl type="text" />
          <FormControl.Feedback />
          <HelpBlock>New directory will be created in: [TODO]</HelpBlock>
        </FormGroup>
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button className="btn-fill" onClick={closeModal}>Cancel</Button>
      <Button bsStyle="info" className="btn-fill">Create</Button>
    </Modal.Footer>
  </Modal>
);

NewDirectoryModal.propTypes = {
  showModal: React.PropTypes.bool.isRequired,
  closeModal: React.PropTypes.func.isRequired,
};

NewDirectoryModal.defaultProps = {
  showModal: false,
};

export default NewDirectoryModal;
