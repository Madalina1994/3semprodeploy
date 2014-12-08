'use strict';

/* Factories */

angular.module('myAppRename.factories', [])

    .factory('InfoFactory', function () {
        var info = "Hello World from a Factory";
        var getInfo = function getInfo() {
            return info;
        }
        return {
            getInfo: getInfo
        }
    })

    .factory('authInterceptor', function ($rootScope, $q, $window) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    // handle the case where the user is not authenticated
                }
                return $q.reject(rejection);
            }
        };
    })

    .factory('ClassFactory', function ($http) {
        var url = "/adminApi";
        var api = {};
        api.addOneClass = function (newClass) {
            return $http.post(url + "/" + "oneClass", newClass);
        }
        api.getClasses = function () {                               //check path
            return $http.get(url + "/" + "allClasses");
        }
        api.getClassById = function (id) {                              //check path
            return $http.get('/userApi' + "/" + "Class/"+id);
        }
        return api;
    })

    .factory('CompletedTaskFactory', function ($http) {
        var url = "/adminApi";
        var api = {};

        api.addCompletedTask = function (newCompletedTask) {
            return $http.post(url + "/" + "completedTask", newCompletedTask);
        }
        api.getAllCompletedTasksForASpecificTask = function (taskId) {
            return $http.get(url + "/" + "allCompletedTasksForASpecificTask" + "/" + taskId);
        }
        api.getAllCompletedTasksForASpecificStudent = function (studentId) {
            return $http.get(url + "/" + "allCompletedTasksForASpecificStudent" + "/" + studentId);
        }
        api.getCompletedTaskById = function (id) {                                          //check route
            return $http.get(url + "/" + "completedTaskById" + "/" + id);
        }
        return api;
    })

    .factory('PeriodFactory', function ($http) {
        var url = "/adminApi";
        var api = {};
        api.addPeriod = function (newPeriod) {
            return $http.post(url + "/" + "period", newPeriod);
        }
        api.getAllPeriodsBySemesterId = function (semesterId) {
            return $http.get(url + "/" + "periodsBySemester" + "/" + semesterId);
        }
        api.getPeriodById = function (periodId) {                  //check route
            return $http.get(url + "/" + "periodById" + "/" + periodId);
        }
        return api;
    })

    .factory('SemesterFactory', function ($http) {
        var url = "/adminApi";
        var api = {};
        api.addOneSemester = function (newSemester) {
            return $http.post(url + "/" + "semester", newSemester);
        }
        api.getAllSemestersByClassId = function (classId) {               //check route
            return $http.get(url + "/" + 'allSemestersByClass' + '/' + classId);
        }
        api.getSemesterById = function (semesterId) {                     //check route
            return $http.get(url + "/" + semesterId);
        }
        return api;
    })

    .factory('StudentsFactory', function ($http) {
        var url = "/adminApi";
        var api = {};
        api.addStudent = function (newStudent) {
            return $http.post(url + "/" + "oneStudent", newStudent);
        }
        api.getAllStudentsByClassId = function (classId) {               //check route
            return $http.get(url + "/" + "students/" + classId);
        }
        api.getStudentByUserName = function (studentName) {               //check route
            return $http.get('/userApi' + "/" + "studentByUserName" + "/" + studentName);
        }
        return api;
    })

    .factory('TaskFactory', function ($http) {
        var url = "/adminApi";
        var api = {};
        api.addTask = function (newTask) {
            return $http.post(url + "/" + "task", newTask);
        }
        api.getTasksByPeriod = function (periodId) {
            return $http.get(url + "/" + "tasksByPeriod" + "/" + periodId);
        }
        api.getTasksById = function (taskId) {                 //check route
            return $http.get(url + "/" + "tasksById" + "/" + taskId);
        }
        return api;
    })

    .factory('TeachersFactory', function ($http) {
        var url = "/adminApi";
        var api = {};
        api.addTeacher = function (newTeacher) {
            return $http.post("/" + "oneTeacher", newTeacher);
        }
        api.getTeacherByUserName = function (userName) {              //check route
            return $http.get(url + "/" + "teacher/" + userName);
        }
        api.getAllTeachersByClassId = function (classId) {            //check route
            return $http.get(url + "/" + "teacher/" + classId);
        }
        api.getAllTeachers = function () {                            //check route
            return $http.get(url + "/" + "teacher");
        }
        return api;
    });
