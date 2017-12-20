import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export const createAccount = (email, password, role) => {
  if (!Accounts.findUserByEmail(email)) {
    const userId = Accounts.createUser({ email, password });
    Meteor.users.update({ _id: userId }, { $set: { roles: [role] } });
  }
};
