angular.module('LoginCtrl', []).controller('LoginController',['$scope', '$rootScope' , '$http',function($scope, $rootScope, $http) {
    $rootScope.isLoggedIn = false;
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
        console.log("hello", $scope.user.email);
        $http.post('signup/', $scope.user).success(function(data){
            console.log(data);
            $rootScope.isLoggedIn = true;
        })
    }

}]);