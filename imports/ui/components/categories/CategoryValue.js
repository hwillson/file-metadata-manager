import React from 'react';

import { removeCategoryValue } from '../../../api/categories/methods';

const CategoryValue = ({ id, value }) => (
  <li className="category-value" key={id}>
    <a href="#remove" onClick={() => { removeCategoryValue.call({ id }); }}>
      <i className="fa fa-minus-circle" />
    </a>
    {value}
  </li>
);

CategoryValue.propTypes = {
  id: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
};

export default CategoryValue;
