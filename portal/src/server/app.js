var express = require('express');
var app = express();

app.get('/api', function (req, res) {
  res.send('Hello World!');
});

app.use(
  express.static(
    __dirname + '/public',
    {
      maxAge: 864000000,
      etag: true,
      lastModified: true
    }
  )
);

app.listen(3000);
console.log('starting server...');

exports.app = app;
