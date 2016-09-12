angular.module('AddUserCtrl', []).controller('AddUserController', ['$scope', 'UserService', '$location', function($scope, UserService, $location) {

    $scope.tagline = 'Agregar un nuevo usuario';
    $scope.user = {
        username: "",
        password: "",
        email: "",
        admin: ""
    };

    $scope.submit = function(){
        // create a user object to pass on to api.
        var newUser = $scope.user;

        // call function newUser in our UserService
        UserService.newUser(newUser).success(function(data){
            $location.path('users/');
        });
    }

}]);