var http = require('http');
var inherits = require('util').inherits;
var HttpClientRequest = http.ClientRequest;
var HttpResponse = http.IncomingMessage;
var oldHttpRequest = http.request;
var oldHttpClientRequest = http.ClientRequest;

if (! oldHttpClientRequest.__baseClass) oldHttpClientRequest.__baseClass = oldHttpClientRequest;
  
module.exports =
function InterceptHttp(addedCallback) {

  function onResponse(res) {
    addedCallback(res);
  }

  function waitForResponse(req) {
    /// CHECK if we really need this. Nice for removing duplicated emits.
    req.removeListener('response', onResponse);
    req.once('response', onResponse);
  }

  http.request =
  function requestPatched() {
    var req = oldHttpRequest.apply(http, arguments);
    waitForResponse(req);
    addedCallback(req);
    return req;
  };


  var newClientRequest =
  http.ClientRequest =
  function ClientRequestPatched() {
    oldHttpClientRequest.apply(this, arguments);
    waitForResponse(req);
    addedCallback(this);
  };

  inherits(newClientRequest, oldHttpClientRequest);

  newClientRequest.__baseClass = oldHttpClientRequest;
};