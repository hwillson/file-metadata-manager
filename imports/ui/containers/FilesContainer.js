import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';

import FilesPage from '../pages/FilesPage';
import filesCollection from '../../api/files/collection';

const selectedUid = new ReactiveVar(null);

const FilesContainer = createContainer(({
  metadataSchema,
}) => {
  let file;
  const selectedFileId = selectedUid.get();
  if (selectedFileId) {
    const fileHandle = Meteor.subscribe('files.single', selectedFileId);
    if (fileHandle.ready()) {
      file = filesCollection.findOne({ uid: selectedFileId });
    }
  }

  return {
    metadataSchema,
    file,
    selectedUid,
  };
}, FilesPage);

export default FilesContainer;
