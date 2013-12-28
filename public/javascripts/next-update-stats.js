(function (angular) {
  var app = angular.module('next-update-stats', []);
  app.controller('next-update-stats-controller', function ($http, $scope) {
    $scope.packageName = 'check-types';

    $scope.loadStats = function () {
      $http.get('/package/' + $scope.packageName)
      .then(function (data) {
        if (Array.isArray(data.data)) {
          $scope.updates = data.data.map(function (update) {
            update.success = +update.success || 0;
            update.failure = +update.failure || 0;
            var total = update.success + update.failure;
            update.probability = total === 0 ? 0 : update.success / total * 100;
            return update;
          });
        } else {
          $scope.updates = [];
        }
      });
    };

    $scope.loadStats();
  });
}(angular));
