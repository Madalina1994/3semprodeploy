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
            templateUrl: 'app/studentView/studentCompletedTaskView.html',
            controller: 'student3Ctrl'
        });
    }])

    .controller('studentMainCtrl', ['$scope', function ($scope, $http) {
        $scope.title = 'studentMainCtrl';

    }])

    .controller('student1Ctrl', ['$scope', function ($scope) {
        $scope.title = 'student1Ctrl';
    }])

    .controller('student2Ctrl', ['$scope', 'StudentsFactory', 'ClassFactory', function ($scope, StudentsFactory, ClassFactory) {
        $scope.title = 'Your class';

        $scope.getStudentByUserName= function() {
            StudentsFactory.getStudentByUserName($scope.student)
                .success(function (data, status, headers, config) {
                    $scope.wholeStudent = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }

        $scope.getClassById= function() {
            ClassFactory.getClassById($scope.classId)
                .success(function (data, status, headers, config) {
                    $scope.class = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
    }])

    .controller('student3Ctrl', ['$scope', 'CompletedTaskFactory', function ($scope, CompletedTaskFactory) {
        $scope.title = 'Your completed tasks';

        $scope.getAllCompletedTasksForASpecificStudent= function() {
            CompletedTaskFactory.getAllCompletedTasksForASpecificStudent($scope.studentId)
                .success(function (data, status, headers, config) {
                    $scope.completedTasks = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
    }]);



