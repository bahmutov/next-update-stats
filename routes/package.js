var check = require('check-types');
var verify = check.verify;
var validate = require('./validate-update');

module.exports = function (updatesCollection) {
  return {
    // finds total number of packages in DB
    totalPackages: function (req, res) {
      updatesCollection.count(function (err, count) {
        if (err) {
          res.send(500);
          return;
        }
        res.send({
          totalPackages: count
        });
      })
    },

    totalUpdates: function (req, res) {
      var groupTotals = {
        $group: {
          _id: '',
          success: { $sum: '$success' },
          failure: { $sum: '$failure' }
        }
      };
      updatesCollection.aggregate([groupTotals],
        function (err, data) {
        if (err) {
          console.error('Could not get total number of updates');
          console.error(err);
          res.send(500);
          return;
        }
        res.send({
          success: data[0].success,
          failure: data[0].failure
        });
      });
    },

    // info about single package - finds its all updates
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

    // finds specific from-to-package update information
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
