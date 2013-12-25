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
        console.error('package name ' + name + ' is too long');
        res.send(400);
        return;
      }

      updatesCollection.find({
        name: name
      }).toArray(function (err, results) {
        if (err) {
          console.error('search name', name);
          console.error(err.stack);
          res.send(500);
          return;
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
      try {
        validate(untrusted);
      } catch (err) {
        console.error('user input', untrusted);
        console.error(err);
        res.send(400);
        return;
      }

      updatesCollection.findOne(untrusted, function (err, found) {
        if (err) {
          throw err;
        }
        if (!found) {
          res.send(404);
          return;
        }
        try {
          validate(found);
        }
        catch (err) {
          console.error('user input', untrusted);
          console.error('found', found);
          console.error(err);
          res.send(500);
          return;
        }
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
