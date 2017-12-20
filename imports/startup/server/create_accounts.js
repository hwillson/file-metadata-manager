import { Meteor } from 'meteor/meteor';

import { createAccount } from '../../api/users/server/create_account';

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
