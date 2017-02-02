import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { HTTP } from 'meteor/http';
import getYoutubeSubtitles from '@joegesualdo/get-youtube-subtitles-node';

const youtube = {
  fetchDetails(videoId) {
    let details;
    if (videoId) {
      const apiUrl = Meteor.settings.private.videos.youtube.api.url;
      const response = HTTP.get(apiUrl, {
        params: {
          key: Meteor.settings.private.videos.youtube.api.key,
          id: videoId,
          part: 'snippet',
        },
      });
      if (response) {
        const content = JSON.parse(response.content);
        const items = content.items;
        if (!_.isEmpty(items)) {
          const snippet = items[0].snippet;
          details = {
            title: snippet.title,
            description: snippet.description,
            datePublished: new Date(snippet.publishedAt),
          };
        }
      }
    }
    return details;
  },

  fetchSubtitles(videoId) {
    return new Promise((resolve, reject) => {
      getYoutubeSubtitles(videoId, { type: 'auto' }).then((subtitles) => {
        let combinedSubtitles = '';
        if (!_.isEmpty(subtitles)) {
          subtitles.forEach((subtitle) => {
            combinedSubtitles += `${subtitle.part} `;
          });
        }
        resolve(combinedSubtitles);
      }).catch((error) => {
        reject(error);
      });
    });
  },
};

export default youtube;
