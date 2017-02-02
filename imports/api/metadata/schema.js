import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';

const generateMetadataSchema = ({ fields, categories }) => {
  const fieldSchemaConfig = {};
  if (!_.isEmpty(fields)) {
    fields.forEach((field) => {
      const type = (field.numeric ? Number : String);
      fieldSchemaConfig[field.schemaId] = {
        type: (field.multiValue ? [type] : type),
        label: field.name,
        optional: true,
      };
    });
  }
  const fieldSchema = new SimpleSchema(fieldSchemaConfig);

  const categorySchemaConfig = {};
  if (!_.isEmpty(categories)) {
    categories.forEach((category) => {
      if (category.values) {
        categorySchemaConfig[category.schemaId] = {
          type: String,
          label: category.name,
          optional: true,
          allowedValues: category.values,
        };
      }
    });
  }
  const categorySchema = new SimpleSchema(categorySchemaConfig);

  return { fieldSchema, categorySchema };
};

export default generateMetadataSchema;
