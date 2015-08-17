var View = require('view.jsx');
var expect = require('chai').expect;

describe('domain', function () {
  it('should pass', function () {
    expect(View.render).not.to.equal(undefined);
  });
});
