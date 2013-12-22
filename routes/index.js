
/*
 * GET home page.
 */
var pkg = require('../package.json');
exports.index = function(req, res){
  res.render('index', {
    title: pkg.name,
    name: pkg.name,
    version: pkg.version,
    description: pkg.description
  });
};
