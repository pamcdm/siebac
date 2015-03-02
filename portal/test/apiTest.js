var request = require('supertest'),
    app = require('../dist/app'),
    assert = require('assert');

describe('GET root public resources', function(){
  var url = 'localhost:3000';
  it('respond with the index html file', function(done){
    request(url)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});
