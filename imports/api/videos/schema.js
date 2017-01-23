import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const VideoSchema = new SimpleSchema({
  todo: {
    type: String,
  },
});

export default VideoSchema;
