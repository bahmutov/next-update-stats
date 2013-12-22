
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var update = require('./routes/update');
var initDB = require('./db/init');

var http = require('http');
var path = require('path');
var Q = require('Q');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/update', update.update);

var username = process.env.STATS_DB_USERNAME;
var password = process.env.STATS_DB_PASSWORD;
var client = initDB(username, password);

client.collection('updates').then(function (updates) {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
}).done();

process.on('exit', function () {
  console.log('closing DB connection');
  client.close();
});

