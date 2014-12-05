'use strict';

angular.module('myAppRename.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'app/main/main.html',
    controller: 'mainCtrl'
  });
}])

.controller('mainCtrl', function($scope) {
      $scope.message = 'mainCtrl';
    });
