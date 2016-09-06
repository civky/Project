/**
 * does routing for angular.
 * tells angular which controller belongs to what view and on what route.
 */
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

    // users page that will use the UsersController
        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'UsersController'
        })

    // add user view
        .when('/users/addUser', {
            templateUrl: 'views/addUser.html',
            controller: 'AddUserController'
        })
        .when('/users/edit/:id', {
            templateUrl: 'views/editUser.html',
            controller: 'EditUserController'
        });

    $locationProvider.html5Mode(true);

}]);