/* global confirm */
/* eslint-disable no-alert */

import React from 'react';
import { Button } from 'react-bootstrap';
import { css } from 'aphrodite';

import UtilityStyles from '../../styles/utility';
import { removeCategory } from '../../../api/categories/methods';

const CategoryActions = ({ categoryId }) => {
  const deleteCategory = () => {
    if (confirm(
        'Are you sure you want to delete this category? The category and '
        + 'all category values will be permanently removed.')) {
      removeCategory.call({ id: categoryId });
    }
  };

  return (
    <div className="category-actions">
      <Button
        bsStyle="info"
        className={`btn-fill ${css(UtilityStyles.marginRight10)}`}
      >
        <i className="fa fa-eraser" /> Rename
      </Button>
      <Button
        bsStyle="danger"
        className="btn-fill"
        onClick={deleteCategory}
      >
        <i className="fa fa-minus-circle" /> Delete
      </Button>
    </div>
  );
};

CategoryActions.propTypes = {
  categoryId: React.PropTypes.string.isRequired,
};

export default CategoryActions;
