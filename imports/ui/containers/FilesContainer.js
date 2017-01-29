import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';

import FilesPage from '../pages/FilesPage';
import metadataCollection from '../../api/metadata/collection';

const selectedUid = new ReactiveVar(null);

const FilesContainer = createContainer(({
  metadataSchema,
}) => {
  Meteor.subscribe('metadata.all');
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
