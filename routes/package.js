var check = require('check-types');
var verify = check.verify;
var validate = require('./validate-update');

module.exports = function (updatesCollection) {
  return {
    info: function (req, res) {
      console.log('params', req.params);
      var name = req.params.name;
      verify.unemptyString(name, 'missing package name');
      if (name.length > 30) {
        throw new Error('package name ' + name + ' is too long');
      }
      updatesCollection.find({
        name: name
      }).toArray(function (err, results) {
        if (err) {
          throw err;
        }
        res.send(results);
      });
    },

    probability: function (req, res) {
      console.log('params', req.params);
      var untrusted = {
        name: req.params.name,
        from: req.params.from,
        to: req.params.to
      };
      verify.object(untrusted, 'expected JSON update info object');
      validate(untrusted);

      updatesCollection.findOne(untrusted, function (err, found) {
        if (err) {
          throw err;
        }
        validate(found);
        res.send({
          name: found.name,
          from: found.from,
          to: found.to,
          success: found.success || 0,
          failure: found.failure || 0
        });
      });
    }
  };
};
