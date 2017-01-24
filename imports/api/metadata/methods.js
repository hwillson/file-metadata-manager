import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { FileFieldsCollection, FileCategoriesCollection } from './collections';
import { FileFieldSchema, FileCategorySchema } from './schemas';


const saveMetadata = new ValidatedMethod({
  name: 'metadata.save',
  validate: null,
  run({ fileId, metadata }) {
    if (!fileId) {
// TODO ...
    }


  },
});

export default saveMetadata;

// const saveFileField = new ValidatedMethod({
//   name: 'fileFields.save',
//   validate: FileFieldSchema.validator(),
//   run({ fileFieldId, fileId, fieldId, value }) {
//     FileFieldsCollection.update({
//       _id: fileFieldId,
//     }, {
//       $set: {
//         fileId,
//         fieldId,
//         value,
//       },
//     }, {
//       upsert: true,
//     });
//   },
// });

// export { saveFileField };
