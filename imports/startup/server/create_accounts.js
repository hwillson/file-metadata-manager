import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const createAccount = (email, password, role) => {
  if (!Accounts.findUserByEmail(email)) {
    const userId = Accounts.createUser({ email, password });
    Meteor.users.update({ _id: userId }, { $set: { roles: [role] } });
  }
};

Meteor.startup(() => {
  // Create the initial staff user account if it doesn't already exist
  createAccount(
    Meteor.settings.private.staff.email,
    Meteor.settings.private.staff.password,
    'staff',
  );

  // Create the initial admin user account if it doesn't already exist
  createAccount(
    Meteor.settings.private.admin.email,
    Meteor.settings.private.admin.password,
    'admin',
  );
});
