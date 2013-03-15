var http = require('http');
var HttpClientRequest = http.ClientRequest;
var HttpResponse = http.IncomingMessage;
var oldHttpRequest = http.request;

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

  var oldHttpClientRequest = http.ClientRequest;
  http.ClientRequest =
  function ClientRequestPatched() {
    oldHttpClientRequest.apply(this, arguments);
    waitForResponse(req);
    addedCallback(this);
  };

  return oldHttpClientRequest;
};