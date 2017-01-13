/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { expect } from 'meteor/practicalmeteor:chai';

import TimeHelper from './time_helper';

describe('api.utilities.TimeHelper', function () {
  it('should return current year', function () {
    const year = TimeHelper.currentYear();
    expect(year).to.not.be.empty;
    expect(year.length).to.equal(4);
    expect(year.substring(0, 3)).to.equal('201');
  });
});
