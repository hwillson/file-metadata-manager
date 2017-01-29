import { Meteor } from 'meteor/meteor';
import fs from 'fs';
import createHash from 'sha.js';

const sha = createHash('sha256');

const fileSystem = {
  rootDirectory: Meteor.settings.private.files.rootDirectory,

  getFiles(currentDirectory) {
    return new Promise((resolve, reject) => {
      const directoryListing = [];
      const cleanDirectory = this.cleanDirectory(currentDirectory);
      const fullDirectory = `${this.rootDirectory}/${cleanDirectory}`;
      fs.readdir(fullDirectory, (error, files) => {
        if (error) {
          reject(error);
        } else {
          files.forEach((file) => {
            const stats = fs.statSync(`${fullDirectory}/${file}`);
            directoryListing.push({
              uid: sha.update(`${cleanDirectory}/${file}`).digest('hex'),
              name: file,
              type: (stats.isDirectory() ? 'directory' : 'file'),
              lastModifiedTimestamp: stats.mtime,
            });
          });
          resolve(directoryListing);
        }
      });
    });
  },

  cleanDirectory(directory) {
    let cleanDirectory = '';
    if (directory) {
      cleanDirectory = directory.replace(/\.\./g, '');
    }
    return cleanDirectory;
  },
};

export default fileSystem;
