# Domain Interceptor [![Build Status](https://secure.travis-ci.org/pgte/domain-interceptor.png)](http://travis-ci.org/pgte/domain-interceptor)

Turns domains into a relevant event emitters.

OBSERVABILITY OBSERVABILITY OBSERVABILITY!!! (in a Steve Balmer busted out sqweaky voice).

## Install

```bash
$ npm install domain-interceptor
```

## Use

```javascript
var i = require('domain-interceptor');

i.on('created', function(d) {
  console.log('this domain was created somewhere:', d);
  
  d.on('added', function(ee) {
    console.log('someone added an event emitter to this domain!', ee);
  });
});
```

For now, works with bare bones event emitters and http client requests.

## Licence

MIT