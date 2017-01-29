import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import TextField from 'uniforms-bootstrap3/TextField';
import LongTextField from 'uniforms-bootstrap3/LongTextField';

const videoIdSchema = new SimpleSchema({
  uid: {
    type: String,
    label: 'YouTube Video ID',
    uniforms: {
      component: TextField,
      inputRef: (ref) => {
        if (ref) {
          ref.focus();
        }
      },
    },
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
