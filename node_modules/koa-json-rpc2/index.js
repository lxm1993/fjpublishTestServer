/* eslint func-names: ["warn", "as-needed"] */

var parse = require('co-body');
var debug = require('debug')('koa-json-rpc2');
var JsonRpcError = require('json-rpc-error');
var JsonRpcResponse = require('json-rpc-response');

function InvalidParamsError(message) {
  var caption;
  var stack;
  Error.call(this);
  this.name = 'InvalidParamsError';
  this.message = message;
  stack = (new Error()).stack.split('\n');
  if (message) {
    caption = this.name + ': ' + message; // eslint-disable-line
  }
  else {
    caption = this.name;
  }
  stack.splice(0, 2, caption);
  this.stack = stack.join('\n');
}
InvalidParamsError.prototype = Object.create(Error.prototype);
InvalidParamsError.prototype.constructor = InvalidParamsError;
InvalidParamsError.prototype.toString = function toString() {
  return this.stack;
};

function koaJsonRpc2() {
  var registry = Object.create(null);
  return {
    use: function (name, func) {
      if (registry[name]) {
        debug('Overwrite already registered function \'%s\'', name);
      }
      else {
        debug('Register function \'%s\'', name);
      }
      registry[name] = func;
    },
    app: function () {
      return function* rpcApp() {
        var body;
        var result;
        try {
          body = yield parse.json(this);
        }
        catch (err) {
          debug('Failed to parse body as JSON %O', err);
          this.body = new JsonRpcResponse(
            null,
            new JsonRpcError.ParseError());
          return;
        }
        if (body.jsonrpc !== '2.0'
          || !Object.prototype.hasOwnProperty.call(body, 'method')
          || !Object.prototype.hasOwnProperty.call(body, 'id')) {
          debug('JSON is not correct JSON-RPC2 request: %O', body);
          this.body = new JsonRpcResponse(
            body.id || null,
            new JsonRpcError.InvalidRequest());
          return;
        }
        if (!registry[body.method]) {
          debug('Method not found \'%s\'', body.method);
          this.body = new JsonRpcResponse(
            body.id,
            new JsonRpcError.MethodNotFound());
          return;
        }
        debug('Request: %o', body);
        try {
          result = yield registry[body.method].call(this, body.params);
        }
        catch (e) {
          debug('In method "%s" error: "%s"', body.method, e);
          if (e instanceof InvalidParamsError) {
            this.body = new JsonRpcResponse(
              body.id,
              new JsonRpcError.InvalidParams(e.message));
            return;
          }
          this.body = new JsonRpcResponse(
            body.id,
            new JsonRpcError.InternalError(e.message));
          return;
        }
        this.body = new JsonRpcResponse(
          body.id,
          null,
          result);
        debug('Response: %o', this.body);
      };
    },
  };
}

module.exports = koaJsonRpc2;
module.exports.InvalidParamsError = InvalidParamsError;
