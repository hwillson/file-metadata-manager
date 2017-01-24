/* global confirm */
/* eslint-disable no-alert */

import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { css, StyleSheet } from 'aphrodite';

import { removeField, renameField } from '../../../api/fields/methods';

let styles;

class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      newFieldName: props.field.name,
    };
    this.enterEditMode = this.enterEditMode.bind(this);
    this.exitEditMode = this.exitEditMode.bind(this);
    this.setNewFieldName = this.setNewFieldName.bind(this);
    this.callRenameField = this.callRenameField.bind(this);
    this.callRemoveField = this.callRemoveField.bind(this);

    this.fieldNameInput = null;
  }

  componentDidUpdate() {
    if (this.fieldNameInput) {
      this.fieldNameInput.focus();
    }
  }

  setNewFieldName(event) {
    this.setState({
      newFieldName: event.target.value,
    });
  }

  enterEditMode(event) {
    event.preventDefault();
    this.setState({
      editMode: true,
    });
  }

  exitEditMode() {
    this.setState({
      editMode: false,
    });
  }

  callRenameField(event) {
    event.preventDefault();
    renameField.call({
      fieldId: this.props.field._id,
      newName: this.state.newFieldName,
    }, (error) => {
      if (!error) {
        this.exitEditMode();
      }
    });
  }

  callRemoveField(event) {
    event.preventDefault();
    if (confirm(
        'Are you sure you want to delete this field? It will be removed from '
        + 'all files/videos it has been associated with, along with all field '
        + 'values.')) {
      removeField.call({ fieldId: this.props.field._id });
    }
  }

  render() {
    let content;
    const field = this.props.field;
    if (this.state.editMode) {
      content = (
        <Form inline key={field._id} onSubmit={this.callRenameField}>
          <FormGroup controlId="renameFieldForm">
            <FormControl
              type="text"
              onChange={this.setNewFieldName}
              value={this.state.newFieldName}
              inputRef={(ref) => { this.fieldNameInput = ref; }}
            />
          </FormGroup>
          {' '}
          <Button
            bsStyle="default"
            className="btn-fill"
            onClick={this.exitEditMode}
          >
            Cancel
          </Button>
          {' '}
          <Button
            type="submit"
            bsStyle="info"
            className="btn-fill"
          >
            Save
          </Button>
        </Form>
      );
    } else {
      content = (
        <li className={css(styles.li)}>
          <a href="#delete" onClick={this.callRemoveField}>
            <i className="fa fa-minus-circle" />
          </a>
          <a href="#edit" onClick={this.enterEditMode}>
            <i className="fa fa-pencil" />
          </a>
          <span className={css(styles.name)}>
            {field.name}
          </span>
        </li>
      );
    }

    return (
      <div key={field._id}>
        {content}
      </div>
    );
  }
}

Field.propTypes = {
  field: React.PropTypes.object.isRequired,
};

styles = StyleSheet.create({
  li: {
    padding: 10,
    ':hover': {
      backgroundColor: '#EEE',
    },
  },
  name: {
    marginLeft: 5,
  },
});


export default Field;
