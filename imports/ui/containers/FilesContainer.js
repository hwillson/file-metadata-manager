import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';

import FilesPage from '../pages/FilesPage';
import filesCollection from '../../api/files/collection';

const selectedUid = new ReactiveVar(null);

const FilesContainer = createContainer(({
  metadataSchema,
}) => {
  Meteor.subscribe('files.all');
  let file;
  if (selectedUid.get()) {
    file = filesCollection.findOne({ uid: selectedUid.get() });
  }

  return {
    metadataSchema,
    file,
    selectedUid,
  };
}, FilesPage);

export default FilesContainer;
