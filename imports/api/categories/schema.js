import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const categorySchema = new SimpleSchema({
  name: {
    type: String,
  },
  schemaId: {
    type: String,
  },
  values: {
    type: [String],
    optional: true,
  },
});

export default categorySchema;
