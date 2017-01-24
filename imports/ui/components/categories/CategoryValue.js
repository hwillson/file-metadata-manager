import React from 'react';

import { removeCategoryValue } from '../../../api/categories/methods';

const CategoryValue = ({ categoryId, value }) => (
  <li className="category-value">
    <a
      href="#remove"
      onClick={() => { removeCategoryValue.call({ categoryId, value }); }}
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
