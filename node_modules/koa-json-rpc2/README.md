# koa-json-rpc2
[![NPM version](http://img.shields.io/npm/v/koa-json-rpc2.svg?style=flat)](https://npmjs.org/package/koa-json-rpc2)
[![NPM Downloads](https://img.shields.io/npm/dm/koa-json-rpc2.svg?style=flat)](https://npmjs.org/package/koa-json-rpc2)
[![Node.js Version](https://img.shields.io/node/v/koa-json-rpc2.svg?style=flat)](http://nodejs.org/download/)
[![Build Status](https://travis-ci.org/dark81/koa-json-rpc2.svg?branch=master)](https://travis-ci.org/dark81/koa-json-rpc2)

Yet another JSON-RPC2 middleware implementation for koa-js.

## Installation
```bash
npm install koa-json-rpc2
```

## Usage
```js
var koa = require('koa');
var app = koa();

var koaJsonRpc2 = require('koa-json-rpc2');

// Create rpc router instance
var jrpc2 = koaJsonRpc2();

// Register new rpc function
jrpc2.use('user', function* user() {
  return 'root'
});

// Register new rpc function
jrpc2.use('sum', function* sum(params) {
  return params.reduce(
    function (prev, curr) {
      return prev + curr;
    },
    0);
});

// Add context information that's useful throughout the lifetime of application 
app.context.some_string = 'context string';

jrpc2.use('ctx', function* ctx() {
  // Get access to context information inside rpc method
  return this.app.context.some_string;
});


// Exception handling

jrpc2.use('internal', function* internal() {
  // Return JSON-RPC2 Internal Error response as result of exception inside RPC method
  throw new Error();
});

jrpc2.use('checkParams', function* checkParams(params) {
  if (params && Object.prototype.hasOwnProperty.call(params, 'foo')) {
    return params.foo;
  }
  // Return JSON-RPC2 Invalid Parameters Error response 
  // as result of InvalidParamsError exception inside RPC method
  throw new koaJsonRpc2.InvalidParamsError('Param foo omitted');
});

// Register rpc router as koa middleware
app.use(jrpc2.app());

app.listen(3000);

```

## Debug
Set variable DEBUG to koa-json-rpc2 to enable debug output.
For instance:
```bash
DEBUG=koa-json-rpc2 npm server.js
```

## History
[HISTORY.md](HISTORY.md)

## Authors
Dmytro Ryzhykov <dark81@gmail.com>

## License
[The MIT License](LICENSE)
