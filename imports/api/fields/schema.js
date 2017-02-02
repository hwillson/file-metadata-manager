import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const fieldSchema = new SimpleSchema({
  name: {
    type: String,
  },
  schemaId: {
    type: String,
  },
  multiValue: {
    type: Boolean,
    defaultValue: false,
  },
  numeric: {
    type: Boolean,
    defaultValue: false,
  },
});

export default fieldSchema;
