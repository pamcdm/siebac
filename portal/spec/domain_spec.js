var View = require('view');
var expect = require('chai').expect;

describe('domain', function () {
  it('should pass', function () {
    expect(View.render).not.to.equal(undefined);
  });
});
