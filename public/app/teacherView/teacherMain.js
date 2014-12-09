'use strict';

angular.module('myAppRename.teacher', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider, $locationProvider) {
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

        $routeProvider.when('/teacher/viewSemesters/:classId', {
            templateUrl: 'app/teacherView/teacherSemestersView.html',
            controller: 'Admin5Ctrl'
        })

        $routeProvider.when('/teacher/viewPeriods/:semesterId', {
            templateUrl: 'app/teacherView/teacherPeriodsView.html',
            controller: 'Admin6Ctrl'
        })

        $routeProvider.when('/teacher/viewTasks/:periodId', {
            templateUrl: 'app/teacherView/teacherTasksView.html',
            controller: 'Admin7Ctrl'
        })

        $routeProvider.when('/teacher/viewCompletedTasks/:taskId', {
            templateUrl: 'app/teacherView/teacherCompletedTasksView.html',
            controller: 'Admin8Ctrl'
        })

        $routeProvider.when('/teacher/viewScores/:periodId', {
            templateUrl: 'app/teacherView/teacherAllScores.html',
            controller: 'Admin9Ctrl'
        })
    }])


    .controller('AdminCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.title = 'AdminCtrl';
    }])

    .controller('Admin1Ctrl', ['$scope', 'TeachersFactory', '$http', function ($scope, TeachersFactory, $http) {
        $scope.title = 'Admin1Ctrl';

        $scope.submitUser = function () {
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
    }])

    .controller('Admin5Ctrl', ['$scope', '$routeParams', 'SemesterFactory', 'ClassFactory', function ($scope, $routeParams, SemesterFactory, ClassFactory) {
        /*        var classId = $routeParams.classId;

         $scope.getClass = function (classId) {
         ClassFactory.getClassById(classId)
         .success(function (data, status, headers, config) {
         $scope.classa = data;
         }).
         error(function (data, status, headers, config) {
         $scope.error = data;
         });
         }*/

        $scope.title = 'View all semesters in class';

        $scope.getSemestersByClassId = function (classId) {
            SemesterFactory.getAllSemestersByClassId(classId)
                .success(function (data, status, headers, config) {
                    $scope.semesters = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
        $scope.getSemestersByClassId($routeParams.classId);
    }])

    .controller('Admin6Ctrl', ['$scope', '$routeParams', 'PeriodFactory', function ($scope, $routeParams, PeriodFactory) {
        $scope.title = 'View all periods in semester';
        $scope.getPeriodsBySemesterId = function (semesterId) {
            PeriodFactory.getAllPeriodsBySemesterId(semesterId)
                .success(function (data, status, headers, config) {
                    $scope.periods = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
        $scope.getPeriodsBySemesterId($routeParams.semesterId);
    }])

    .controller('Admin7Ctrl', ['$scope', '$routeParams', 'TaskFactory', function ($scope, $routeParams, TaskFactory) {
        $scope.title = 'View all tasks in period';
        $scope.getTasksByPeriodId = function (periodId) {
            TaskFactory.getTasksByPeriod(periodId)
                .success(function (data, status, headers, config) {
                    $scope.tasks = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
        $scope.getTasksByPeriodId($routeParams.periodId);
    }])

    .controller('Admin8Ctrl', ['$scope', '$routeParams', 'CompletedTaskFactory', function ($scope, $routeParams, CompletedTaskFactory) {
        $scope.title = 'View all completed tasks in tasks';
        $scope.getCompletedTasksByTaskId = function (taskId) {
            CompletedTaskFactory.getAllCompletedTasksForASpecificTask(taskId)
                .success(function (data, status, headers, config) {
                    $scope.completedTasks = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
        $scope.getCompletedTasksByTaskId($routeParams.taskId);
    }])

    .controller('Admin9Ctrl', ['$scope', '$routeParams', 'TaskFactory', 'PeriodFactory', 'SemesterFactory', 'StudentsFactory', function ($scope, $routeParams, TaskFactory, PeriodFactory, SemesterFactory, StudentsFactory) {
        $scope.title = 'View all scores from this period and change them';
        $scope.getTasksByPeriodId = function (periodId) {
            TaskFactory.getTasksByPeriod(periodId)
                .success(function (data, status, headers, config) {
                    $scope.tasks = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
        $scope.getTasksByPeriodId($routeParams.periodId);

        $scope.getPeriod = function (periodId) {
            PeriodFactory.getPeriodById(periodId)
                .success(function (data, status, header, config) {
                    $scope.period = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }

        $scope.getPeriod($routeParams.periodId);

        console.log('Before semester id');
        var semesterId = $scope.period.semesterId;
        console.log('semesterId: '+ semesterId);

        $scope.getSemester = function (semesterId) {
            SemesterFactory.getSemesterById(semesterId)
                .success(function (data, status, header, config) {
                    $scope.semester = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                })
        }
        $scope.getSemester(semesterId);

        var classId = $scope.semester.classId;

        $scope.getStudent = function (classId) {
            StudentsFactory.getAllStudentsByClassId(classId)
                .success(function (data, status, header, config) {
                    $scope.students = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                })
        }
        $scope.getStudents(classId);
    }]);

