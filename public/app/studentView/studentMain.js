'use strict';

angular.module('myAppRename.student', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/student', {
            templateUrl: 'app/studentView/studentMain.html',
            controller: 'studentMainCtrl'
        });
        $routeProvider.when('/student/viewUser', {
            templateUrl: 'app/studentView/studentUserView.html',
            controller: 'student1Ctrl'
        });
        $routeProvider.when('/student/viewClass', {
            templateUrl: 'app/studentView/studentClassView.html',
            controller: 'student2Ctrl'
        });
        $routeProvider.when('/student/viewTasks', {
            templateUrl: 'app/studentView/studentTaskView.html',
            controller: 'student3Ctrl'
        });
    }])

    .controller('studentMainCtrl', ['$scope', function ($scope, $http) {
        $scope.title = 'studentMainCtrl';

    }])

    .controller('student1Ctrl', ['$scope', function ($scope) {
        $scope.title = 'student1Ctrl';
    }])

    .controller('student2Ctrl', ['$scope', function ($scope) {
        $scope.title = 'student2Ctrl';
    }])

    .controller('student3Ctrl', ['$scope', function ($scope) {
        $scope.title = 'student3Ctrl';
    }]);



