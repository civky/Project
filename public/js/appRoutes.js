/**
 * does routing for angular.
 * tells angular which controller belongs to what view.
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
        });

    $locationProvider.html5Mode(true);

}]);