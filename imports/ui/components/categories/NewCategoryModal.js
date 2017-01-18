import React from 'react';
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import { css } from 'aphrodite';

import UtilityStyles from '../../styles/utility';
import createCategory from '../../../api/categories/methods';

let categoryInput;

const saveCategory = (closeModal) => {
  const categoryName = categoryInput.value;
  if (categoryName) {
    createCategory.call({ name: categoryName });
    closeModal();
  }
};

const NewCategoryModal = ({ showModal, closeModal }) => (
  <Modal show={showModal} onHide={closeModal} animation={false}>
    <Modal.Header closeButton>
      <Modal.Title>
        <span className={css(UtilityStyles.marginRight10)}>
          <i className="fa fa-list-alt" />
        </span>
        Create a New Category
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form>
        <FormGroup
          controlId="newDirectoryForm"
        >
          <ControlLabel>New Category Name</ControlLabel>
          <FormControl
            type="text"
            inputRef={(ref) => { categoryInput = ref; }}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button className="btn-fill" onClick={closeModal}>Cancel</Button>
      <Button
        bsStyle="info"
        className="btn-fill"
        onClick={() => { saveCategory(closeModal); }}
      >
        Create
      </Button>
    </Modal.Footer>
  </Modal>
);

NewCategoryModal.propTypes = {
  showModal: React.PropTypes.bool.isRequired,
  closeModal: React.PropTypes.func.isRequired,
};

NewCategoryModal.defaultProps = {
  showModal: false,
};

export default NewCategoryModal;
