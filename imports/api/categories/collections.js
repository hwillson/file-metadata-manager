import { Mongo } from 'meteor/mongo';

import { CategorySchema, CategoryValueSchema } from './schemas';

const CategoriesCollection = new Mongo.Collection('lkup_categories');
CategoriesCollection.attachSchema(CategorySchema);
CategoriesCollection.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

const CategoryValuesCollection = new Mongo.Collection('lkup_category_values');
CategoryValuesCollection.attachSchema(CategoryValueSchema);
CategoryValuesCollection.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export { CategoriesCollection, CategoryValuesCollection };
