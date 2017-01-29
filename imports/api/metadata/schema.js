import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';

const generateMetadataSchema = ({ fields, categories }) => {
  const schemaConfig = {};
  if (!_.isEmpty(fields)) {
    fields.forEach((field) => {
      schemaConfig[field.schemaId] = {
        type: String,
        label: field.name,
        optional: true,
      };
    });
  }

  if (!_.isEmpty(categories)) {
    categories.forEach((category) => {
      if (category.values) {
        schemaConfig[category.schemaId] = {
          type: String,
          label: category.name,
          optional: true,
          allowedValues: category.values,
        };
      }
    });
  }

  return new SimpleSchema(schemaConfig);
};

export default generateMetadataSchema;
