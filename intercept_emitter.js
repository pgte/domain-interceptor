var events = require('events');
var oldEventEmitter = events.EventEmitter;
var domain = require('domain');
var Domain = domain.Domain;

module.exports =
function interceptEmitter(addedCallback) {

  events.EventEmitter =
  function EventEmitterPatched() {
    oldEventEmitter.apply(this, arguments);
    if (! (this instanceof Domain) && domain.active) {
      addedCallback(domain.active, this);
    }
  };

  events.EventEmitter.prototype = oldEventEmitter.prototype;
};