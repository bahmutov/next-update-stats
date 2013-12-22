var verify = require('check-types').verify;
var Mongo = require('poseidon-mongo');
var Driver = Mongo.Driver;
var Database = Mongo.Database;

module.exports = function(username, password) {
  verify.unemptyString(username, 'missing username');
  verify.unemptyString(password, 'missing password');

  var host = 'ds061308.mongolab.com';
  var port = 61308;
  var db = 'next-update-dev';

  Driver.configure('connection1', {
    hosts: [username + ':' + password + '@' + host + ':' + port],
    database: db,
    options: { w: 1 }
  });

  client = new Database('connection1');
  return client;
};
