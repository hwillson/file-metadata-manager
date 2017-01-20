import React from 'react';
import { _ } from 'meteor/underscore';
import { css, StyleSheet } from 'aphrodite';

import Loading from '../loading/Loading';
import CategoryValue from './CategoryValue';
import NewCategoryValueForm from './NewCategoryValueForm';

let styles;

const CategoryValues = ({ categoryValuesReady, categoryValues, categoryId }) => {
  let content;
  if (!categoryValuesReady) {
    content = <Loading />;
  } else if (categoryValuesReady && _.isEmpty(categoryValues)) {
    content = <p>No values found.</p>;
  } else {
    content = (
      <ul className={css(styles.ul)}>
        {categoryValues.map(categoryValue => (
          <CategoryValue
            key={categoryValue._id}
            id={categoryValue._id}
            value={categoryValue.value}
          />
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
  categoryValuesReady: React.PropTypes.bool.isRequired,
  categoryValues: React.PropTypes.array.isRequired,
  categoryId: React.PropTypes.string.isRequired,
};

CategoryValues.defaultProps = {
  categoryValuesReady: false,
  categoryValues: [],
};

styles = StyleSheet.create({
  ul: {
    listStyle: 'none',
    border: '1px solid #ddd',
    padding: 10,
  },
});

export default CategoryValues;
