import React from 'react';
import { _ } from 'meteor/underscore';
import { css, StyleSheet } from 'aphrodite';

import CategoryValue from './CategoryValue';
import NewCategoryValueForm from './NewCategoryValueForm';

let styles;

const CategoryValues = ({ categoryId, values }) => {
  let content;
  if (_.isEmpty(values)) {
    content = <p>No values found.</p>;
  } else {
    content = (
      <ul className={css(styles.ul)}>
        {values.map(value => (
          <CategoryValue key={value} categoryId={categoryId} value={value} />
        ))}
      </ul>
    );
  }

  return (
    <div className="category-values">
      {content}
      <NewCategoryValueForm categoryId={categoryId} />
    </div>
  );
};

CategoryValues.propTypes = {
  categoryId: React.PropTypes.string.isRequired,
  values: React.PropTypes.array,
};

CategoryValues.defaultProps = {
  values: [],
};

styles = StyleSheet.create({
  ul: {
    listStyle: 'none',
    border: '1px solid #ddd',
    padding: 10,
  },
});

export default CategoryValues;
