import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const FileSchema = new SimpleSchema({
  path: {
    type: String,
  },
});

export default FileSchema;
