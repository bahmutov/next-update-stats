var check = require('check-types');
var verify = check.verify;

module.exports = function (updatesCollection) {
  return {
    update: function (req, res) {
      verify.object(req.body, 'expected JSON update info object');

      var format = {
        name: check.unemptyString,
        from: check.unemptyString,
        to: check.unemptyString
      };
      if (!check.every(req.body, format)) {
        throw new Error('invalid update info ' + JSON.stringify(req.body, null, 2));
      }
      console.log('update info', req.body);

      var query = {
        name: 'lodash',
        from: '1.0.0',
        to: '2.0.0'
      };
      var update = {
        $inc: {}
      };
      if (true) {
        update.$inc.success = 1;
      } else {
        update.$inc.failure = 1;
      }
      var options = {
        new: true,
        upsert: true
      };
      console.log('updating');
      updatesCollection.findAndModify(query, null, update, options)
      .then(function (stats) {
        res.send(stats[0]);
      })
      .fail(function (err) {
        throw err;
      });
    }
  };
}
