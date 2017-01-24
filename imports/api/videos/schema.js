import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const videoSchema = new SimpleSchema({
  uid: {
    type: String,
  },
});

export default videoSchema;
