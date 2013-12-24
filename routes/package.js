var check = require('check-types');
var verify = check.verify;
var validate = require('./validate-update');

module.exports = function (updatesCollection) {
  return {
    info: function (req, res) {
      console.log('params', req.params);
      var name = req.params.name;
      verify.unemptyString(name, 'missing package name');
      res.send({
        name: name
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

      res.send({
        name: untrusted.name,
        from: untrusted.from,
        to: untrusted.to
      });
    }
  };
};
