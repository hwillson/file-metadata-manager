import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import { Base64 } from 'meteor/base64';

function basicAuthHeader() {
  const { user, pass } = Meteor.settings.private.cms.auth;
  const authString = `${user}:${pass}`;
  return `Basic ${Base64.encode(authString)}`;
}

export const synchDocWithCms = new ValidatedMethod({
  name: 'hooks.synchDocWithCms',
  validate: null,
  run({ action, file }) {
    if (this.userId && action && file && !this.isSimulation) {
      if (action === 'update') {
        const doc = {
          uid: file.uid,
          title: file.title || null,
          filename: file.filename,
          path: file.path,
          contentFormat: file.contentFormat || null,
          description: file.description || null,
          year: file.year || null,
          eventType: file.eventType || null,
          event: file.event || null,
          source: file.source || null,
          topics: file.topics || null,
        };

        if (file.companiesOrganizations) {
          doc.companiesOrganizations = file.companiesOrganizations.join('; ');
        }

        if (file.authors) {
          doc.authors = file.authors.join('; ');
        }

        HTTP.post(
          Meteor.settings.private.cms.apiUrl,
          {
            headers: {
              authorization: basicAuthHeader(),
            },
            query: 'action=create_update_document',
            params: {
              arfDocument: JSON.stringify(doc),
            },
          },
        );
      } else if (action === 'remove') {
        HTTP.get(
          Meteor.settings.private.cms.apiUrl,
          {
            headers: {
              authorization: basicAuthHeader(),
            },
            query: `action=remove_document&uid=${file.uid}`,
          },
        );
      }
    }
  },
});

export const synchFeaturedWithCms = new ValidatedMethod({
  name: 'hooks.synchFeaturedWithCms',
  validate: null,
  run({ action, file }) {
    if (this.userId && action && file && !this.isSimulation) {
      if (action === 'add') {
        HTTP.get(
          Meteor.settings.private.cms.apiUrl,
          {
            headers: {
              authorization: basicAuthHeader(),
            },
            query: 'action=add_document_tag',
            params: {
              uid: file.uid,
              tag: 'featured',
            },
          },
        );
      } else if (action === 'remove') {
        HTTP.get(
          Meteor.settings.private.cms.apiUrl,
          {
            headers: {
              authorization: basicAuthHeader(),
            },
            query: 'action=remove_document_tag',
            params: {
              uid: file.uid,
              tag: 'featured',
            },
          },
        );
      }
    }
  },
});
