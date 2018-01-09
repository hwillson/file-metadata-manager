import React from 'react';
import { Table, Tr, Td } from 'reactable';
import { _ } from 'meteor/underscore';

import Loading from '../loading/Loading';
import CategoryName from './CategoryName';
import CategoryValues from './CategoryValues';
import MultiSelectCheckbox from './MultiSelectCheckbox';

const renderRows = (categories) => {
  const content = [];
  categories.forEach((category) => {
    content.push((
      <Tr key={category._id}>
        <Td column="Category">
          <CategoryName
            categoryId={category._id}
            categoryName={category.name}
          />
        </Td>
        <Td column="Options">
          <MultiSelectCheckbox
            categoryId={category._id}
            checked={category.multiselect || false}
          />
        </Td>
        <Td column="Values">
          <CategoryValues categoryId={category._id} values={category.values} />
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

export default Categories;
