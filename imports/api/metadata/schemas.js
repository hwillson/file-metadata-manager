import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';

const generateMetadataSchema = ({ fields, categories, categoryValues }) => {
  const schemaConfig = {};
  if (!_.isEmpty(fields)) {
    fields.forEach((field) => {
      schemaConfig[`field_${field._id}`] = {
        type: String,
        label: field.name,
        optional: true,
      };
    });
  }

  if (!_.isEmpty(categories) && !_.isEmpty(categoryValues)) {
    const valuesByCategory = {};
    categoryValues.forEach((value) => {
      if (valuesByCategory[value.categoryId]) {
        valuesByCategory[value.categoryId].push({
          label: value.value,
          value: value._id,
        });
      } else {
        valuesByCategory[value.categoryId] = [{
          label: '',
          value: '',
        }];
      }
    });

    categories.forEach((category) => {
      schemaConfig[`category_${category._id}`] = {
        type: String,
        label: category.name,
        optional: true,
        uniforms: {
          options: valuesByCategory[category._id],
        },
      };
    });
  }

  return new SimpleSchema(schemaConfig);
};

const FileFieldSchema = new SimpleSchema({
  fileId: {
    type: String,
  },
  fieldId: {
    type: String,
  },
  value: {
    type: String,
  },
});

const FileCategorySchema = new SimpleSchema({
  fileId: {
    type: String,
  },
  categoryId: {
    type: String,
  },
  categoryValueId: {
    type: String,
  },
});

export { generateMetadataSchema, FileFieldSchema, FileCategorySchema };
