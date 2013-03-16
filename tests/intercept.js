var test = require('tap').test;
var interceptDomain = require('../');
var domain = require('domain');
var EE = require('events').EventEmitter;
var http = require('http');

test('intercepts domain creation', function(t) {
  t.plan(1);
  var d;

  interceptDomain.on('created', function(_d) {
    process.nextTick(function() {
      t.equal(d, _d);
    });
    
  });

  d = domain.create();
});

test('intercepts event emitter creation inside domain', function(t) {
  t.plan(1);
  var d = domain.create();
  var ee;
  
  d.on('added', function(_ee) {
    process.nextTick(function() {
      t.equal(_ee, ee);
    });
  });

  d.run(function() {
    ee = new EE();
  });

});

test('intercepts if emitter is explicitely added to domain', function(t) {
  t.plan(1);
  var d = domain.create();
  var ee;
  
  d.on('added', function(_ee) {
    process.nextTick(function() {
      t.equal(_ee, ee);
    });
  });

  ee = new EE();
  d.add(ee);
});

test('does not intercept if event emitter is outside domain', function(t) {
  t.plan(1);
  var d = domain.create();
  var ee;
  var fired = false;
  
  d.on('added', function(_ee) {
    t.equal(_ee, ee);
  });

  ee = new EE();
  process.nextTick(function() {
    t.notOk(fired, 'did not fire added event');
  });

});

test('intercepts HTTP client request', function(t) {
  
  t.plan(1);
  var d = domain.create();
  var client;
  var addeds = [];
  expected = [];
  
  d.on('added', function(_client) {
    addeds.push(_client);
    if (addeds.length >= 2) {
      t.deepEqual(addeds, expected);
    }
  });

  d.run(function() {
    client = http.get('http://search.twitter.com/search.json?q=nodejs',
      function(res) {
        res.resume();
        expected.push(res);
      });
    expected.push(client);
  });

});