'use strict';

// Declare app level module which depends on views, and components
angular.module('myAppRename', [
  'ngRoute',
  'myAppRename.controllers',
  'myAppRename.directives',
  'myAppRename.services',
  'myAppRename.factories',
  'myAppRename.filters',
'myAppRename.main',
    'myAppRename.student',
    'myAppRename.teacher'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/main'});
}])
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    });



