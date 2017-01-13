import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // Create the initial admin user account if it doesn't already exist
  const adminEmail = Meteor.settings.private.admin.email;
  if (!Accounts.findUserByEmail(adminEmail)) {
    Accounts.createUser({
      email: adminEmail,
      password: Meteor.settings.private.admin.password,
    });
  }
});
