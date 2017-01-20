/* global confirm */
/* eslint-disable no-alert */

import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

import {
  renameCategory,
  removeCategory,
} from '../../../api/categories/methods';

let styles;

class CategoryName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      newCategoryName: props.categoryName,
    };
    this.enterEditMode = this.enterEditMode.bind(this);
    this.exitEditMode = this.exitEditMode.bind(this);
    this.setNewCategoryName = this.setNewCategoryName.bind(this);
    this.callRenameCategory = this.callRenameCategory.bind(this);
    this.callRemoveCategory = this.callRemoveCategory.bind(this);

    this.categoryNameInput = null;
  }

  componentDidUpdate() {
    if (this.categoryNameInput) {
      this.categoryNameInput.focus();
    }
  }

  setNewCategoryName(event) {
    this.setState({
      newCategoryName: event.target.value,
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

  callRenameCategory(event) {
    event.preventDefault();
    renameCategory.call({
      id: this.props.categoryId,
      newName: this.state.newCategoryName,
    }, (error) => {
      if (!error) {
        this.exitEditMode();
      }
    });
  }

  callRemoveCategory(event) {
    event.preventDefault();
    if (confirm(
        'Are you sure you want to delete this category? This category and '
        + 'all of its category values will be permanently removed.')) {
      removeCategory.call({ id: this.props.categoryId });
    }
  }

  render() {
    let content;
    if (this.state.editMode) {
      content = (
        <Form inline key={this.props.categoryId} onSubmit={this.callRenameCategory}>
          <FormGroup controlId={`categoryRenameForm_${this.props.categoryId}`}>
            <FormControl
              type="text"
              onChange={this.setNewCategoryName}
              value={this.state.newCategoryName}
              inputRef={(ref) => { this.categoryNameInput = ref; }}
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
        <div>
          <a href="#delete" onClick={this.callRemoveCategory}>
            <i className="fa fa-minus-circle" />
          </a>
          <a href="#edit" onClick={this.enterEditMode}>
            <i className="fa fa-pencil" />
          </a>
          <span className={css(styles.categoryName)}>
            {this.props.categoryName}
          </span>
        </div>
      );
    }

    return (
      <div key={this.props.categoryId}>
        {content}
      </div>
    );
  }
}

CategoryName.propTypes = {
  categoryId: React.PropTypes.string.isRequired,
  categoryName: React.PropTypes.string.isRequired,
};

styles = StyleSheet.create({
  categoryName: {
    fontSize: 22,
    marginLeft: 5,
  },
});

export default CategoryName;
