<p align="center">
  <a href="https://www.dragoon.org">
    <img alt="Dragoon" src="./dragoon.png" width="100" />
  </a>
</p>
<h1 align="center">
  Dragoon
</h1>

## Getting Started 

Please execute the following commands:

```bash
$ git clone git@github.com:OliverSieweke/dragoon.git
$ npm install
$ npm run start
```

## Documentation

You can find the project's documentation [here](http://htmlpreview.github.io/?https://github
.com/OliverSieweke/dragoon/blob/master/docs/index.html). (Depending on your browser configurations, you may encounter 
issues viewing the 
documentation properly through the github html preview - in that case you may prefer to directly open the `/docs/index` file on your local machine)

The project's documentation uses [JSDoc](http://usejsdoc.org/index.html) syntax and is generated with [documentation.js](https://documentation.js.org/).
You can use the following commands in the project:

- Tho rebuild the documentation (then available in the `/docs` directory):
```bash
$ npm run docs:build
```

- To serve the documentation locally on port 4001:
```bash
$ npm run docs:serve
```

- To check the documentation syntax:
```bash
$ npm run docs:lint
```
