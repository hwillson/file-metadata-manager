import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import CategoryValues from '../components/categories/CategoryValues';
import { CategoryValuesCollection } from '../../api/categories/collections';

const CategoryValuesContainer = createContainer(({ categoryId }) => {
  const categoryValuesHandle = Meteor.subscribe('categoryValues.all');
  return {
    categoryValuesReady: categoryValuesHandle.ready(),
    categoryValues: CategoryValuesCollection.find({ categoryId }).fetch(),
    categoryId,
  };
}, CategoryValues);

export default CategoryValuesContainer;
