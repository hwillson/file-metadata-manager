import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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
  validate: new SimpleSchema({
    filePath: { type: String },
    fileData: { type: String },
  }).validator(),
  run({ filePath, fileData }) {
    if (!this.isSimulation && this.userId) {
      fileSystem.saveFile(filePath, fileData);
    }
  },
});

const createDirectory = new ValidatedMethod({
  name: 'files.createDirectory',
  validate: new SimpleSchema({
    currentDirectory: { type: String },
    directoryName: { type: String },
  }).validator(),
  run({ currentDirectory, directoryName }) {
    if (!this.isSimulation && this.userId) {
      fileSystem.createDirectory(currentDirectory, directoryName);
    }
  },
});

export { currentDirectoryListing, uploadFile, createDirectory };
