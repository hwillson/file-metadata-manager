import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const FieldSchema = new SimpleSchema({
  name: {
    type: String,
  },
});

export default FieldSchema;
