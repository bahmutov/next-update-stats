var express = require('express');
var routes = require('./routes');
var initDB = require('./db/init');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var http = require('http');
var path = require('path');
var Q = require('q');
Q.longStackSupport = true;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
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

app.get('/', routes.index);
app.get('/version', function (req, res) {
  res.send(require('./package.json').version);
});

var username = process.env.STATS_DB_USERNAME;
var password = process.env.STATS_DB_PASSWORD;
if (!username || !password) {
  console.error('missing db username or password');
  process.exit(-1);
}
initDB(username, password).then(startServer, function (err) {
  console.log('could not init DB');
  console.error(err.stack);
});

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

  app.use(express.errorHandler());
  http.createServer(app).listen(app.get('port'), function onStarted() {
    console.log('Express server listening on port ' + app.get('port'));
  });
}

