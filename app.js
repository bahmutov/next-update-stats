
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var initDB = require('./db/init');

var http = require('http');
var path = require('path');
var Q = require('q');
Q.longStackSupport = true;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.configure('development', function () { app.locals.pretty = true; });
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/version', function (req, res) {
  res.send(require('./package.json').version);
});

var username = process.env.STATS_DB_USERNAME;
var password = process.env.STATS_DB_PASSWORD;
initDB(username, password).then(startServer, function (err) {
  console.error(err.stack);
});

function startServer(db) {
  var updatesCollection = db.collection('updates');
  var update = require('./routes/update')(updatesCollection);
  app.post('/update', update.update);

  var package = require('./routes/package')(updatesCollection);
  app.get('/package/:name/:from/:to', package.probability);
  app.get('/package/:name', package.info);
  app.get('/total/packages', package.totalPackages);
  app.get('/total/updates', package.totalUpdates);

  app.use(express.errorHandler());
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
}

process.on('exit', function () {
  console.log('closing DB connection');
  client.close();
});

