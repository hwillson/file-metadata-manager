import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { CategoriesCollection } from './collections';

const createCategory = new ValidatedMethod({
  name: 'categories.createCategory',
  validate: new SimpleSchema({
    name: { type: String },
  }).validator(),
  run({ name }) {
    return CategoriesCollection.insert({ name });
  },
});

export default createCategory;
