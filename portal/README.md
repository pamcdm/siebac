## SIEBAC Portal

[![Build Status](https://snap-ci.com/bymarkone/siebac/branch/master/build_image)](https://snap-ci.com/bymarkone/siebac/branch/master)

This is the SIEBAC portal, built with node.js and express. 

### Building

```shell
npm install
(cd src/site && ../../node_modules/.bin/bower install)
npm run build
node dist/app.js
```

The website will be available on http://localhost:3000

### Running the tests

To run the tests:

```npm test```

Npm tests will run with mocha
