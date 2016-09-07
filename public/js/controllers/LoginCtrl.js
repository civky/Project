angular.module('LoginCtrl', []).controller('LoginController',['$scope', '$rootScope' , '$http',function($scope, $rootScope, $http) {
    $scope.tagline = 'This message comes from the login controller';
    $scope.user = {
        email: "",
        password: ""
    };

    $scope.login = function() {
        $http.post('login/', $scope.user).success(function(data){
            console.log(data);
            $rootScope.isLoggedIn = true;
        })
            .error(function(data){
                console.log(data);
            })
    };
    $scope.signup = function(){
        $http.post('signup/', $scope.user).success(function(data){
            console.log(data);
            $rootScope.isLoggedIn = true;
        })
    }

}]);