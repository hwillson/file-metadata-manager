/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { expect } from 'meteor/practicalmeteor:chai';

import FileSystem from './file_system';

describe('api.files.server.FileSystem', function () {
  describe('#cleanDirectory', function () {
    it("should strip '..'s", function () {
      expect(FileSystem.cleanDirectory()).to.equal('');
      expect(FileSystem.cleanDirectory(null)).to.equal('');
      expect(FileSystem.cleanDirectory('..')).to.equal('');
      expect(FileSystem.cleanDirectory('../../..')).to.equal('//');
      expect(FileSystem.cleanDirectory('/../../asdf')).to.equal('///asdf');
      expect(FileSystem.cleanDirectory('/../asdf/../..')).to.equal('//asdf//');
      expect(
        FileSystem.cleanDirectory('../asdf/../qwer/../as///'),
      ).to.equal('/asdf//qwer//as///');
    });
  });
});
