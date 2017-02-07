import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

let fileSystem;
if (Meteor.isServer) {
  fileSystem = require('./server/file_system').default;
}

const currentDirectoryListing = new ValidatedMethod({
  name: 'fsFiles.currentDirectoryListing',
  validate: null,
  async run({ currentDirectory }) {
    let directoryListing = [];
    if (!this.isSimulation) {
      try {
        directoryListing = await fileSystem.getFiles(currentDirectory);
      } catch (error) {
        throw new Meteor.Error(`Directory "${currentDirectory}" doesn't exist!`);
      }
    }
    return directoryListing;
  },
});

const uploadFile = new ValidatedMethod({
  name: 'files.upload',
  validate: null,
  run({ filePath, fileData }) {
    if (!this.isSimulation && this.userId) {
      fileSystem.saveFile(filePath, fileData);
      // TODO - security, validation
    }
  },
});

export { currentDirectoryListing, uploadFile };
