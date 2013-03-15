'use strict';

var domain = require('domain');
var EventEmitter = require('events').EventEmitter;

var ee =
module.exports =
new EventEmitter();

var oldDomain = domain.Domain;

var Domain =
domain.Domain =
function DomainPatched() {
  var self = this;
  oldDomain.apply(this, arguments);
  process.nextTick(function() {
    ee.emit('created', self);
  });
};

Domain.prototype = oldDomain.prototype;

domain.create =
domain.createDomain =
function createDomain(cb) {
  return new Domain(cb);
};