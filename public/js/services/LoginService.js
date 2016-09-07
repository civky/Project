angular.module('LoginService', []).factory('LoginService', ['$http', '$rootScope', function($http, $rootScope) {
    return {
        isLoggedin : function() {
            $http.get('/loggedin').success(function(user){
                // Authenticated
                if (user !== '0'){
                    $rootScope.isLoggedIn = true;
                    return true;
                }
                // Not authenticated
                else{
                    $rootScope.isLoggedIn = false;
                    return false
                }
            });
        },
        getLoggedUser : function() {
            $http.get('/loggedin').success(function(user){
                // Authenticated
                if (user !== '0'){
                    return user;
                }

            })
        }
    };
}]);