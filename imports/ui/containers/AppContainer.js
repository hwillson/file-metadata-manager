import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { createContainer } from 'meteor/react-meteor-data';

import AppLayout from '../layouts/AppLayout';
import fieldsCollection from '../../api/fields/collection';
import categoriesCollection from '../../api/categories/collection';
import generateMetadataSchema from '../../api/metadata/schema';

const AppContainer = createContainer(() => {
  const usersHandle = Meteor.subscribe('users.all');
  const fieldsHandle = Meteor.subscribe('fields.all');
  const categoriesHandle = Meteor.subscribe('categories.all');

  const fields = fieldsCollection.find().fetch();
  const categories = categoriesCollection.find().fetch();

  let metadataSchema = new SimpleSchema();
  if (fieldsHandle.ready() && categoriesHandle.ready()) {
    metadataSchema = generateMetadataSchema({
      fields,
      categories,
    });
  }

  return {
    usersReady: usersHandle.ready(),
    user: Meteor.user(),
    fieldsReady: fieldsHandle.ready(),
    fields,
    categoriesReady: categoriesHandle.ready(),
    categories,
    metadataSchema,
  };
}, AppLayout);

export default AppContainer;
