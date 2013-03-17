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
  oldDomain.apply(this, arguments);
  ee.emit('created', this);
};

Domain.prototype = oldDomain.prototype;

domain.create =
domain.createDomain =
function createDomain(cb) {
  return new Domain(cb);
};

var oldAdd = Domain.prototype.add;
Domain.prototype.add =
function add(ee) {
  oldAdd.apply(this, arguments);
  this.emit('added', ee);
};