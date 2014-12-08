'use strict';

angular.module('myAppRename.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'app/main/main.html',
    controller: 'mainCtrl'
  });
}])

.controller('mainCtrl', ['$scope','TeachersFactory',  '$http', function($scope, TeachersFactory, $http) {
      $scope.message = 'mainCtrl';



        $scope.submitUser=function() {
            TeachersFactory.addTeacher($scope.person)
                //$http({
                //    method: 'POST',
                //    url: '/oneTeacher'
                //})
                //.post('/oneTeacher', $scope.person)

                .success(function (data, status, headers, config) {
                    $scope.person = data;
                })
                .error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        };
    }]);
