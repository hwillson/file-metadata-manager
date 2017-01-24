import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

let FileSystem;
if (Meteor.isServer) {
  FileSystem = require('./server/file_system').default;
}

const currentDirectoryListing = new ValidatedMethod({
  name: 'fsFiles.currentDirectoryListing',
  validate: null,
  async run({ currentDirectory }) {
    let directoryListing = [];
    if (!this.isSimulation) {
      try {
        directoryListing = await FileSystem.getFiles(currentDirectory);
      } catch (error) {
        throw new Meteor.Error(`Directory "${currentDirectory}" doesn't exist!`);
      }
    }
    return directoryListing;
  },
});

export default currentDirectoryListing;
