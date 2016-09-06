angular.module('UsersCtrl', []).controller('UsersController',['$scope', 'UserService','$location', function($scope, UserService, $location) {
    $scope.info = 'This will allow CRUD of users';

    // FIXME: Make this call in another way so that we can access $scope.users.
    // gets all users from the API and stores it in $scope.users when loaded.
    UserService.getAll().success(function(data){
        $scope.users = data;
    });

    $scope.deleteUser = function(userId, index){
        UserService.delete(userId).success(function(data){
            $scope.users = data;
        });
    };
    $scope.editUser = function(userId){
        $location.path('users/edit/'+userId);
    };

    // TODO: Implement update users
}]);