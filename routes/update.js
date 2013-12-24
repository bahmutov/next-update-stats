var check = require('check-types');
var verify = check.verify;
var validate = require('./validate-update');

module.exports = function (updatesCollection) {
  return {
    update: function (req, res) {
      var untrusted = req.body;
      verify.object(untrusted, 'expected JSON update info object');
      validate(untrusted);

      console.log('update info', untrusted);

      var query = {
        name: untrusted.name,
        from: untrusted.from,
        to: untrusted.to
      };
      var update = {
        $inc: {}
      };
      if (!!untrusted.success) {
        update.$inc.success = 1;
      } else {
        update.$inc.failure = 1;
      }
      var options = {
        new: true,
        upsert: true
      };

      updatesCollection.findAndModify(query, null, update, options)
        .then(function (stats) {
          console.log('stats', stats);
          res.send(stats[0]);
        })
        .fail(function (err) {
          console.error(err.stack);
          throw err;
        });
    }
  };
}
