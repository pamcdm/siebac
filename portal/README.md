## SIEBAC Portal

[![Build Status](https://snap-ci.com/bymarkone/siebac/branch/master/build_image)](https://snap-ci.com/bymarkone/siebac/branch/master)

This is the SIEBAC portal, built with node.js and express. 

### Building

```shell
npm install
npm run build
node dist/app.js
```

The website will be available on http://localhost:3000

### Running the tests

To run the tests:

```npm test```

Npm tests will run with mocha

### Release

```
npm install
npm run release
```

This will produce a `release` folder, that is ready to be Dockerized.
To dockerize it:

```
docker build -t siebac .
```

And to run it

```
docker run --rm -it -p 80:3000 siebac
```
