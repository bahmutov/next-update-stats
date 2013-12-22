module.exports = function (updatesCollection) {
  return {
    update: function (req, res) {
      console.log('updating');
      res.send('ok');
    }
  };
}
