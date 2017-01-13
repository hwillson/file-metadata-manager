import { Accounts } from 'meteor/std:accounts-ui';

Accounts.config({
  sendVerificationEmail: false,
  forbidClientAccountCreation: true,
});

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
});
