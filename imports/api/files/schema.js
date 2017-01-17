import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const FileSchema = new SimpleSchema({
  filePath: {
    type: String,
  },
  title: {
    type: String,
  },
  companyOrganization: {
    type: String,
  },
  authors: {
    type: [String],
  },
  coAuthors: {
    type: [String],
  },
  event: {
    type: String,
  },
  date: {
    type: Date,
  },
  fileFormat: {
    type: String,
  },
  dataFormat: {
    type: String,
  },
  source: {
    type: String,
  },
  keyTopic: {
    type: String,
  },
  channels: {
    type: [String],
  },
  industryVerticals: {
    type: [String],
  },
});

export default FileSchema;
