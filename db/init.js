var verify = require('check-types').verify;
var Q = require('q');

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

module.exports = function(username, password) {
  verify.unemptyString(username, 'missing username');
  verify.unemptyString(password, 'missing password');
  var defer = Q.defer();

  var host = 'ds061308.mongolab.com';
  var port = 61308;
  var name = 'next-update-dev';

  var uri = 'mongodb://' + username + ':' + password + '@' + host + ':' + port + '/' + name;

  MongoClient.connect(uri, {w:1}, function onConnected(err, db) {
    if (err) {
      defer.reject(err);
      return;
    }

    defer.resolve(db);
  });
  return defer.promise;

  // closing the connection?
};
