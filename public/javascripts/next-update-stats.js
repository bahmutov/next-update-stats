(function (angular) {
  var verify = check.verify;

  var app = angular.module('next-update-stats', []);

  app.run(function () {
    var values = ['packages', 'updates'];
    values.forEach(function (name) {
      var n = JSON.parse(localStorage.getItem(name)) || 0;
      document.getElementById(name).innerHTML = n;
    });
  });

  app.filter('percent', function () {
    return function (val) {
      return typeof val === 'number' ? val.toFixed(0) + '%' : '';
    };
  });

  app.controller('next-update-stats-controller', function ($http, $scope, $timeout) {
    $scope.packageName = 'lodash';
    $scope.packageNotFoundMessage = null;

    function processUpdates(packageName, data) {
      verify.unemptyString(packageName, 'missing package name');
      verify.object(data, 'undefined data for ' + packageName);
      verify.array(data.data, 'expected array of updates for package ' + packageName);
      $scope.packageName = packageName;

      var updates = data.data.map(function (update) {
        update.success = +update.success || 0;
        update.failure = +update.failure || 0;
        var total = update.success + update.failure;
        update.probability = total === 0 ? 0 : update.success / total * 100;
        return update;
      });
      $scope.updates = updates;

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

      function compareSemvers(a, b) {
        var aparts = a.split('.');
        var bparts = b.split('.');
        if (aparts.length !== 3 || bparts.length !== 3) {
          console.log('could not parse semver', a, 'or', b, 'for package', $scope.packageName);
          return -1;
        }
        for(var k = 0; k < 3; k += 1) {
          if (+aparts[k] < +bparts[k]) {
            return -1;
          }
          if (+aparts[k] > +bparts[k]) {
            return 1;
          }
        }
        return 0;
      }

      $scope.header = [null].concat(toVersions);
      $scope.info = [];
      var sortedFrom = Object.keys(fromVersions).sort(compareSemvers);
      sortedFrom.forEach(function (from) {
        var row = [];
        row.length = toVersions.length + 1;
        row[0] = from;
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
    }

    $scope.loadStats = function () {
      $scope.updates = [];
      $scope.packageNotFoundMessage = null;

      verify.unemptyString($scope.packageName, 'expected package name string');
      if ($scope.packageName.length > 20) {
        throw new Error('invalid package name string ' + $scope.packageName);
      }

      $scope.packageName = $scope.packageName.toLowerCase();
      $http.get('/package/' + $scope.packageName)
      .then(function (data) {
        if (!data.data || !data.data.length) {
          $scope.packageNotFoundMessage = "Cannot find info for package " + $scope.packageName;
        } else {
          processUpdates($scope.packageName, data);
        }
      });
    };


    function fetchTotals() {
      $http.get('/total/packages')
      .then(function (data) {
        verify.positiveNumber(data.data.totalPackages, 'invalid total packages ' + data.data.totalPackages);
        var totalPackages = data.data.totalPackages;
        localStorage.setItem('packages', JSON.stringify(totalPackages));
        var packagesAnimation = new countUp('packages', totalPackages, 0, 100);
        packagesAnimation.start();
      });

      $http.get('/total/updates')
      .then(function (data) {
        // console.log('total updates', data);
        verify.number(+data.data.success, 'invalid number of successful updates ' + data.data);
        verify.number(+data.data.failure, 'invalid number of failed updates ' + data.data);
        var totalUpdates = +data.data.success + +data.data.failure;
        localStorage.setItem('updates', JSON.stringify(totalUpdates));
        var updatesAnimation = new countUp('updates', totalUpdates, 0, 100);
        updatesAnimation.start();
      });
    }
    $scope.loadStats();
    $timeout(fetchTotals, 1000);
  });
}(angular));
