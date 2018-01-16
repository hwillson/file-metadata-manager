import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import { Base64 } from 'meteor/base64';

function basicAuthHeader() {
  const { user, pass } = Meteor.settings.private.cms.auth;
  const authString = `${user}:${pass}`;
  return `Basic ${Base64.encode(authString)}`;
}

export const removeDocFromCms = (uid) => {
  if (uid) {
    HTTP.get(
      Meteor.settings.private.cms.apiUrl,
      {
        headers: {
          authorization: basicAuthHeader(),
        },
        query: `action=remove_document&uid=${uid}`,
      },
    );
  }
};

export const synchDocWithCms = (file) => {
  if (file && file.topics && file.topics.length > 0) {
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
      promoImageUrl: file.promoImageUrl || null,
      featured: file.featured || null,
      featuredSummary: file.featuredSummary || null,
      allowPublicAccess: file.allowPublicAccess || 'No',
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
  } else {
    removeDocFromCms(file.uid);
  }
};

export const synchVideoWithCms = (video) => {
  if (video && video.topics && video.topics.length > 0) {
    const doc = {
      uid: video.uid,
      title: video.title || null,
      contentFormat: video.contentFormat || null,
      description: video.description || null,
      year: video.year || null,
      eventType: video.eventType || null,
      event: video.event || null,
      source: video.source || null,
      topics: video.topics || null,
      featured: video.featured || null,
      featuredSummary: video.featuredSummary || null,
    };

    if (video.companiesOrganizations) {
      doc.companiesOrganizations = video.companiesOrganizations.join('; ');
    }

    if (video.authors) {
      doc.authors = video.authors.join('; ');
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
  } else {
    removeDocFromCms(video.uid);
  }
};
