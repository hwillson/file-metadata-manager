import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  Checkbox,
} from 'react-bootstrap';
import { css } from 'aphrodite';

import { createField } from '../../../api/fields/methods';
import UtilityStyles from '../../styles/utility';

class NewFieldForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldName: '',
    };
    this.setFieldName = this.setFieldName.bind(this);
    this.callCreateField = this.callCreateField.bind(this);

    this.multiValueInput = null;
  }

  setFieldName(event) {
    this.setState({
      fieldName: event.target.value,
    });
  }

  callCreateField(event) {
    event.preventDefault();
    const fieldName = this.state.fieldName;
    if (fieldName) {
      createField.call({
        name: fieldName,
        multiValue: this.multiValueInput.checked,
      }, (error) => {
        if (!error) {
          this.multiValueInput.checked = false;
          this.setState({
            fieldName: '',
          });
        }
      });
    }
  }

  render() {
    return (
      <Form inline onSubmit={this.callCreateField}>
        <FormGroup controlId="newFieldForm">
          <FormControl
            type="text"
            placeholder="New field name"
            onChange={this.setFieldName}
            value={this.state.fieldName}
          />
          <Checkbox
            className={css(UtilityStyles.marginLeftRight10)}
            inputRef={(ref) => { this.multiValueInput = ref; }}
          >
            Allow multiple values
          </Checkbox>
        </FormGroup>
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
  }
}

export default NewFieldForm;
