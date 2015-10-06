var express = require('express');
var routes = require('./routes');
var initDB = require('./db/init');
var morgan = require('morgan');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var initCrashReporter = require('crash-reporter-middleware');

var http = require('http');
var path = require('path');
var Q = require('q');
Q.longStackSupport = true;

var app = express();
var port = process.env.PORT || 3000;

function initServer(crashReporter) {
  // all environments
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  if (app.get('env') === 'development') {
    app.locals.pretty = true;
  }
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(express.static(path.join(__dirname, 'public')));

  if (check.fn(crashReporter)) {
    console.log('using crash reporter');
    app.use(crashReporter);
  } else {
    console.log('running without crash reporter');
  }

  app.get('/api/crash', require('crasher'));
  app.get('/', routes.index);
  app.get('/version', function (req, res) {
    res.send(require('./package.json').version);
  });
}

function startServer(db) {
  console.log('starting server');
  var updatesCollection = db.collection('updates');
  var update = require('./routes/update')(updatesCollection);
  app.post('/update', update.update);

  var package = require('./routes/package')(updatesCollection);
  app.get('/package/:name/:from/:to', package.probability);
  app.get('/package/:name', package.info);
  app.get('/total/packages', package.totalPackages);
  app.get('/total/updates', package.totalUpdates);

  app.use(errorHandler());
  http.createServer(app).listen(port, function onStarted() {
    console.log('Express server listening on port %d', port);
  });
}

function connectToDb() {
  var username = process.env.STATS_DB_USERNAME;
  var password = process.env.STATS_DB_PASSWORD;
  if (!username || !password) {
    console.error('missing db username or password');
    process.exit(-1);
  }

  return initDB(username, password);
}

function onError(err) {
  console.log('could not init DB or start server');
  console.error(err.stack);
}

function getEnv(key) {
  return process.env[key];
}

initCrashReporter(getEnv, app)
  .then(initServer)
  .then(connectToDb)
  .then(startServer, onError)
  .done();


