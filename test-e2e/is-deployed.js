var http = require('request-promise-json');
var url = 'http://next-update.herokuapp.com/version';

http.get(url).then(function (version) {
  console.log('deployed version %s', version);
}).done();
