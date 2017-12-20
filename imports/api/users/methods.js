import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const createUser = new ValidatedMethod({
  name: 'users.create',
  validate: new SimpleSchema({
    email: { type: String },
    password: { type: String },
    role: { type: String, optional: true },
  }).validator(),
  run({ email, password, role = 'staff' }) {
    if (this.userId && !this.isSimulation) {
      import { createAccount } from './server/create_account';
      createAccount(email, password, role);
    }
  },
});
