angular.module('AddUserCtrl', []).controller('AddUserController', ['$scope', 'UserService', '$location', function($scope, UserService, $location) {

    $scope.tagline = 'This message comes from the controller';

    $scope.username = "";
    $scope.password = "";
    $scope.email = "";
    $scope.permission = "";

    $scope.submit = function(){
        // create a user object to pass on to api.
        var newUser = {
            username: $scope.username,
            password: $scope.password,
            email: $scope.email,
            permission: $scope.permission
        };

        // call function newUser in our UserService
        UserService.newUser(newUser);

        // FIXME: Make the view change after the addition is "confirmed" (callback or something)
        // go to users view
        $location.path('users/')
    }

}]);