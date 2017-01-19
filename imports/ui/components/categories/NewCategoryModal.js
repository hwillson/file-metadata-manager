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
import { createCategory } from '../../../api/categories/methods';

const NewCategoryModal = ({ showModal, closeModal }) => {
  let categoryInput;

  const saveCategory = (event) => {
    event.preventDefault();
    const categoryName = categoryInput.value;
    if (categoryName) {
      createCategory.call({ name: categoryName });
      closeModal();
    }
  };

  return (
    <Modal show={showModal} onHide={closeModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className={css(UtilityStyles.marginRight10)}>
            <i className="fa fa-list-alt" />
          </span>
          Create a New Category
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={saveCategory}>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-fill" onClick={closeModal}>Cancel</Button>
          <Button
            type="submit"
            bsStyle="info"
            className="btn-fill"
          >
            Create
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

NewCategoryModal.propTypes = {
  showModal: React.PropTypes.bool.isRequired,
  closeModal: React.PropTypes.func.isRequired,
};

NewCategoryModal.defaultProps = {
  showModal: false,
};

export default NewCategoryModal;
