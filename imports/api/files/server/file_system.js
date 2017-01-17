import { Meteor } from 'meteor/meteor';
import fs from 'fs';

const FileSystem = {
  rootDirectory: Meteor.settings.private.files.rootDirectory,

  getFiles(currentDirectory) {
    return new Promise((resolve, reject) => {
      const directoryListing = [];
      const fullDirectory =
        `${this.rootDirectory}/${this.cleanDirectory(currentDirectory)}`;
      fs.readdir(fullDirectory, (error, files) => {
        if (error) {
          reject(error);
        } else {
          files.forEach((file) => {
            const stats = fs.statSync(`${fullDirectory}/${file}`);
            directoryListing.push({
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

export default FileSystem;
