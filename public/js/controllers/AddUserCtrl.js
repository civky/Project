angular.module('AddUserCtrl', []).controller('AddUserController', ['$scope', 'UserService', '$location', function($scope, UserService, $location) {

    $scope.tagline = 'This message comes from the controller';
    $scope.user = {
        username: "",
        password: "",
        email: "",
        permission: ""
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