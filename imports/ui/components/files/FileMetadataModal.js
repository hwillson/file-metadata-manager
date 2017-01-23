import React from 'react';
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import { css } from 'aphrodite';
import { _ } from 'meteor/underscore';

import UtilityStyles from '../../styles/utility';

const FileMetadataModal = ({
  showModal,
  closeModal,
  fields,
  categories,
  categoryValues,
}) => {
  let fieldContent;
  if (_.isEmpty(fields)) {
    fieldContent = <p>No fields found.</p>;
  } else {
    fieldContent = fields.map(field => (
      <FormGroup key={field._id}>
        <ControlLabel>{field.name}</ControlLabel>
        <FormControl type="text" />
      </FormGroup>
    ));
  }

  let categoryContent;
  if (_.isEmpty(categories)) {
    categoryContent = <p>No categories found.</p>;
  } else {
    categoryContent = categories.map((category) => {
      const options = categoryValues.map((value) => {
        let option;
        if (value.categoryId === category._id) {
          option = (
            <option key={value._id} value={value._id}>{value.value}</option>
          );
        }
        return option;
      });
      return (
        <FormGroup key={category._id}>
          <ControlLabel>{category.name}</ControlLabel>
          <FormControl componentClass="select">
            <option key="" value="" />
            {options}
          </FormControl>
        </FormGroup>
      );
    });
  }

  return (
    <Modal show={showModal} onHide={closeModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className={css(UtilityStyles.marginRight10)}>
            <i className="fa fa-file-text-o" />
          </span>
          Metadata: <strong>some file name.pdf</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          {fieldContent}
          {categoryContent}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-fill" onClick={closeModal}>Cancel</Button>
        <Button bsStyle="info" className="btn-fill">Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

FileMetadataModal.propTypes = {
  showModal: React.PropTypes.bool.isRequired,
  closeModal: React.PropTypes.func.isRequired,
  fields: React.PropTypes.array.isRequired,
  categories: React.PropTypes.array.isRequired,
  categoryValues: React.PropTypes.array.isRequired,
};

FileMetadataModal.defaultProps = {
  showModal: false,
};

export default FileMetadataModal;
