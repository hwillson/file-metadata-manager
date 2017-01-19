import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

import { createCategoryValue } from '../../../api/categories/methods';

class NewCategoryValueForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryValue: '',
    };
    this.setCategoryValue = this.setCategoryValue.bind(this);
    this.addValue = this.addValue.bind(this);
  }

  setCategoryValue(event) {
    this.setState({
      categoryValue: event.target.value,
    });
  }

  addValue(event) {
    event.preventDefault();
    const categoryValue = this.state.categoryValue;
    if (categoryValue) {
      createCategoryValue.call({
        categoryId: this.props.categoryId,
        value: categoryValue,
      }, (error) => {
        if (!error) {
          this.setState({
            categoryValue: '',
          });
        }
      });
    }
  }

  render() {
    return (
      <Form inline key={this.props.categoryId} onSubmit={this.addValue}>
        <FormGroup controlId={`newCategoryValueForm_${this.props.categoryId}`}>
          <FormControl
            type="text"
            placeholder="New category value"
            onChange={this.setCategoryValue}
            value={this.state.categoryValue}
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

NewCategoryValueForm.propTypes = {
  categoryId: React.PropTypes.string.isRequired,
};

export default NewCategoryValueForm;
