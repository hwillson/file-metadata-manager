import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { css } from 'aphrodite';

import UtilityStyles from '../../styles/utility';

const NewVideoModal = ({ showModal, closeModal }) => (
  <Modal show={showModal} onHide={closeModal} animation={false}>
    <Modal.Header closeButton>
      <Modal.Title>
        <span className={css(UtilityStyles.marginRight10)}>
          <i className="fa fa-file-video-o" />
        </span>
        New Video
      </Modal.Title>
    </Modal.Header>
    <form>
      <Modal.Body>
        TODO
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-fill" onClick={closeModal}>Cancel</Button>
        <Button type="submit" bsStyle="info" className="btn-fill">
          Save
        </Button>
      </Modal.Footer>
    </form>
  </Modal>
);

NewVideoModal.propTypes = {
  showModal: React.PropTypes.bool.isRequired,
  closeModal: React.PropTypes.func.isRequired,
};

NewVideoModal.defaultProps = {
  showModal: false,
};

export default NewVideoModal;
