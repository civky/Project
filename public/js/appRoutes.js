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

    $locationProvider.html5Mode(true);

}]);