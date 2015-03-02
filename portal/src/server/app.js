var express = require('express')
var app = express()

app.get('/api', function (req, res) {
  res.send('Hello World!')
});

app.use(express.static(__dirname + '/public'));

var start = function() {
  app.listen(3000);
  console.log('starting server...');
}();

exports.app = app;
