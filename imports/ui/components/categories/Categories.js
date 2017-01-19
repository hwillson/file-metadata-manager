import React from 'react';
import { Table, Tr, Td } from 'reactable';
import { _ } from 'meteor/underscore';
import { css, StyleSheet } from 'aphrodite';

import Loading from '../loading/Loading';
import CategoryValuesContainer from '../../containers/CategoryValuesContainer';
import CategoryActions from './CategoryActions';

const Styles = StyleSheet.create({
  actionColumn: {
    width: '20%',
  },
});

const renderRows = (categories) => {
  const content = [];
  categories.forEach((category) => {
    content.push((
      <Tr key={category._id}>
        <Td column="Category">
          {category.name}
        </Td>
        <Td column="Values">
          <CategoryValuesContainer categoryId={category._id} />
        </Td>
        <Td column="Category Action" className={css(Styles.actionColumn)}>
          <CategoryActions categoryId={category._id} />
        </Td>
      </Tr>
    ));
  });
  return content;
};

const Categories = ({ categoriesReady, categories }) => {
  let content;
  if (!categoriesReady) {
    content = <Loading />;
  } else if (categoriesReady && _.isEmpty(categories)) {
    content = 'No categories found.';
  } else {
    content = (
      <Table className="table">
        {renderRows(categories)}
      </Table>
    );
  }

  return (
    <div className="categories">
      {content}
    </div>
  );
};

Categories.propTypes = {
  categoriesReady: React.PropTypes.bool.isRequired,
  categories: React.PropTypes.array.isRequired,
};

Categories.defaultProps = {
  categoriesReady: false,
  categories: [],
};

export default Categories;
