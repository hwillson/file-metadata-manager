import React, { Component } from 'react';
import { Form, Checkbox } from 'react-bootstrap';

import {
  updateCategoryMultiSelectSetting,
} from '../../../api/categories/methods';

class MultiSelectCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
    };
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleCheckbox(event) {
    this.setState({
      checked: event.target.checked,
    });
    updateCategoryMultiSelectSetting.call({
      categoryId: this.props.categoryId,
      multiselect: event.target.checked,
    });
  }

  render() {
    return (
      <Form>
        <Checkbox
          checked={this.state.checked}
          onChange={this.handleCheckbox}
        >
          Multiselect
        </Checkbox>
      </Form>
    );
  }
}

MultiSelectCheckbox.propTypes = {
  categoryId: React.PropTypes.string.isRequired,
  checked: React.PropTypes.bool.isRequired,
};

export default MultiSelectCheckbox;
