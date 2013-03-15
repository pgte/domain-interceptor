var domain = require('domain');

var intercept =
module.exports =
require('./intercept_domain');

/// Added domain to event emitter
function added(_domain, ee) {
  if (arguments.length < 2) {
    ee = _domain;
    _domain = domain.active;
  }
  
  process.nextTick(function() {
    _domain.emit('added', ee);
  });
  
}

require('./intercept_emitter')(added);
require('./intercept_http')(added);