/**
 * does routing for angular.
 * tells angular which controller belongs to what view and on what route.
 */
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {


    // Function with promise to check if user is logged in. Attach it to all views that needs permission to be viewed.
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
        // Initialize a new promise
        var deferred = $q.defer();

        // Make an AJAX call to check if the user is logged in
        $http.get('/loggedin').success(function(user){
            // Authenticated
            if (user !== '0'){
                deferred.resolve();
                $rootScope.isLoggedIn = true;
            }
            // Not authenticated
            else{
                $rootScope.message = 'You need to log in.';
                $rootScope.isLoggedIn = false;
                deferred.reject();
                $location.url('/login');
            }
        });
        return deferred.promise;
    };


    $routeProvider
    // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController',
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })

    // users page that will use the UsersController
        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'UsersController',
        })

    // add user view
        .when('/users/add', {
            templateUrl: 'views/addUser.html',
            controller: 'AddUserController',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .when('/users/edit/:id', {
            templateUrl: 'views/editUser.html',
            controller: 'EditUserController',
            resolve: {
                loggedin: checkLoggedin
            }
        });

    $locationProvider.html5Mode(true);


    // TODO: Make this work. Now it doesn't do anything.
    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.interceptors.push(function($q, $location, $rootScope) {
        return {
            response: function(response) {
                $rootScope.isLoggedIn = true;
                return response;
            },
            responseError: function(response) {
                if (response.status === 401){
                    $location.url('/login');
                    $rootScope.isLoggedIn = false;
                }

                return $q.reject(response);
            }
        };
    });



}]);