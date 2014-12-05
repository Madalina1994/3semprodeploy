'use strict';

angular.module('myAppRename.teacher', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/teacher', {
            templateUrl: 'app/teacherView/teacherMain.html',
            controller: 'AdminCtrl'
        });

        $routeProvider.when('/teacher/createUser', {
            templateUrl: 'app/teacherView//createUserView.html',
            controller: 'Admin1Ctrl'
        });

        $routeProvider.when('/teacher/createClass', {
            templateUrl: 'app/teacherView/createClassView.html',
            controller: 'Admin2Ctrl'
        });

        $routeProvider.when('/teacher/viewUsers', {
            templateUrl: 'app/teacherView/teacherUserView.html',
            controller: 'Admin3Ctrl'
        });

        $routeProvider.when('/teacher/viewClasses', {
            templateUrl: 'app/teacherView/teacherClassesView.html',
            controller: 'Admin4Ctrl'
        });
    }])

    .controller('AdminCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.title = 'AdminCtrl';
    }])

    .controller('Admin1Ctrl', ['$scope', function ($scope) {
        $scope.title = 'Admin1Ctrl';
    }])

    .controller('Admin2Ctrl', ['$scope', 'ClassFactory', function ($scope, ClassFactory) {
        $scope.title = 'New Class';

        $scope.saveClass = function () {
            ClassFactory.addOneClass($scope.newClass)
                .success(function (data, status, headers, config) {
                    $scope.newClass = {};
                })
                .error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
    }])

    .controller('Admin3Ctrl', ['$scope', function ($scope) {
        $scope.title = 'Admin3Ctrl';
    }])

    .controller('Admin4Ctrl', ['$scope', 'ClassFactory', function ($scope, ClassFactory) {
        $scope.title = 'View all classes';
        ClassFactory.getClasses()
                .success(function (data, status, headers, config) {
                    $scope.classes = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
    }]);
