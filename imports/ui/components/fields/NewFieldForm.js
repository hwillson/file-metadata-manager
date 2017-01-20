import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

import createField from '../../../api/fields/methods';

class NewFieldForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldName: '',
    };
    this.setFieldName = this.setFieldName.bind(this);
    this.callCreateField = this.callCreateField.bind(this);
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
      createField.call({ name: fieldName }, (error) => {
        if (!error) {
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
