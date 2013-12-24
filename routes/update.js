var check = require('check-types');
var verify = check.verify;
var validate = require('./validate-update');

module.exports = function (updatesCollection) {
  return {
    update: function (req, res) {
      verify.object(req.body, 'expected JSON update info object');
      validate(req.body);

      console.log('update info', req.body);

      var query = {
        name: 'lodash',
        from: '1.0.0',
        to: '2.0.0'
      };
      var update = {
        $inc: {}
      };
      if (!!update.success) {
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
          res.send(stats[0]);
        })
        .fail(function (err) {
          throw err;
        });
    }
  };
}
