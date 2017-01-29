import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import LongTextField from 'uniforms-bootstrap3/LongTextField';
// import DateField from 'uniforms-bootstrap3/DateField';

const videoIdSchema = new SimpleSchema({
  uid: {
    type: String,
    label: 'YouTube Video ID',
  },
});

const videoSchema = new SimpleSchema({
  uid: {
    type: String,
    label: 'YouTube Video ID',
    uniforms: {
      disabled: true,
    },
  },
  publishedDate: {
    type: Date,
    uniforms: {
      disabled: true,
    },
  },
  title: {
    type: String,
  },
  description: {
    type: String,
    optional: true,
  },
  content: {
    type: String,
    uniforms: {
      component: LongTextField,
      inputClassName: 'video-content',
    },
  },
});

export { videoIdSchema, videoSchema };
