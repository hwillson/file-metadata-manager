/* global confirm */
/* eslint-disable no-alert */

import React from 'react';

import { removeCategoryValue } from '../../../api/categories/methods';

const callRemoveCategoryValue = (categoryId, value) => {
  if (confirm(
      'Are you sure you want to delete this category value? It will be '
      + 'permanently removed from any content that has been tagged with it.')) {
    removeCategoryValue.call({ categoryId, value });
  }
};

const CategoryValue = ({ categoryId, value }) => (
  <li className="category-value">
    <a
      href="#remove"
      onClick={(event) => {
        event.preventDefault();
        callRemoveCategoryValue(categoryId, value);
      }}
    >
      <i className="fa fa-minus-circle" />
    </a>
    {value}
  </li>
);

CategoryValue.propTypes = {
  categoryId: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
};

export default CategoryValue;
