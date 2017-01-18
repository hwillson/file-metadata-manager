import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const CategorySchema = new SimpleSchema({
  name: {
    type: String,
  },
});

const CategoryValueSchema = new SimpleSchema({
  categoryId: {
    type: String,
  },
  value: {
    type: String,
  },
});

export { CategorySchema, CategoryValueSchema };
