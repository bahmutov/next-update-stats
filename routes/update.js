module.exports = function (updatesCollection) {
  return {
    update: function (req, res) {
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
