(function (angular) {
  var verify = check.verify;
  var app = angular.module('next-update-stats', []);
  app.controller('next-update-stats-controller', function ($http, $scope) {
    $scope.packageName = 'lodash';

    $scope.loadStats = function () {
      $scope.updates = [];
      verify.unemptyString($scope.packageName, 'expected package name string');
      if ($scope.packageName.length > 20) {
        throw new Error('invalid package name string ' + $scope.packageName);
      }

      $http.get('/package/' + $scope.packageName)
      .then(function (data) {
        verify.array(data.data, 'expected array of updates for package ' + $scope.packageName);

        var updates = data.data.map(function (update) {
          update.success = +update.success || 0;
          update.failure = +update.failure || 0;
          var total = update.success + update.failure;
          update.probability = total === 0 ? 0 : update.success / total * 100;
          return update;
        });

        var fromVersions = _.groupBy(updates, 'from');
        Object.keys(fromVersions).forEach(function (from) {
          var to = fromVersions[from];
          verify.array(to, 'missing info from version ' + from);
          to = _.sortBy(to, 'to');
          fromVersions[from] = to;
        });

        var toVersions = _(updates).groupBy('to').keys().sortBy().value();
        verify.array(toVersions, 'expected to versions to be an array, got ' +
          JSON.stringify(toVersions, null, 2));

        $scope.header = [null].concat(toVersions);
        $scope.info = [];
        Object.keys(fromVersions).forEach(function (from) {
          var row = [];
          row.push(from);
          $scope.info.push(row);
          var updates = fromVersions[from];
          updates.forEach(function (update) {
            var i = _.indexOf(toVersions, update.to);
            if (i >= 0) {
              if (row[i + 1]) {
                throw new Error('duplicate updates for ' + $scope.packageName);
              }
              row[i + 1] = update;
            }
          });
        });

        $scope.updates = updates;
      });
    };

    $scope.loadStats();
  });
}(angular));
