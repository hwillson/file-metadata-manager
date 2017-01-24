import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ReactiveVar } from 'meteor/reactive-var';

import FilesPage from '../pages/FilesPage';
import fieldsCollection from '../../api/fields/collection';
import categoriesCollection from '../../api/categories/collection';
import generateMetadataSchema from '../../api/metadata/schema';
import metadataCollection from '../../api/metadata/collection';

const selectedUid = new ReactiveVar(null);

const FilesContainer = createContainer(() => {
  const fieldsHandle = Meteor.subscribe('fields.all');
  const categoriesHandle = Meteor.subscribe('categories.all');
  Meteor.subscribe('metadata.all');

  const fields = fieldsCollection.find().fetch();
  const categories = categoriesCollection.find().fetch();

  let metadataSchema = new SimpleSchema();
  if (fieldsHandle.ready() && categoriesHandle.ready()) {
    metadataSchema = generateMetadataSchema({
      fields,
      categories,
    });
  }

  let metadata;
  if (selectedUid.get()) {
    metadata = metadataCollection.findOne({ uid: selectedUid.get() });
  }

  return {
    metadataSchema,
    metadata,
    selectedUid,
  };
}, FilesPage);

export default FilesContainer;
