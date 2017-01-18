import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import CategoriesPage from '../pages/CategoriesPage';
import { CategoriesCollection } from '../../api/categories/collections';

const CategoriesContainer = createContainer(() => {
  const categoriesHandle = Meteor.subscribe('categories.all');
  return {
    categoriesReady: categoriesHandle.ready(),
    categories: CategoriesCollection.find().fetch(),
  };
}, CategoriesPage);

export default CategoriesContainer;
