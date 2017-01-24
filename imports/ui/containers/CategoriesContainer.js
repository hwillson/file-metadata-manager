import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import CategoriesPage from '../pages/CategoriesPage';
import categoriesCollection from '../../api/categories/collection';

const CategoriesContainer = createContainer(() => {
  const categoriesHandle = Meteor.subscribe('categories.all');
  return {
    categoriesReady: categoriesHandle.ready(),
    categories: categoriesCollection.find().fetch(),
  };
}, CategoriesPage);

export default CategoriesContainer;
