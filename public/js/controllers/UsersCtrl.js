angular.module('UsersCtrl', []).controller('UsersController',['$scope', 'UserService', function($scope, UserService) {
    $scope.info = 'This will allow CRUD of users';

    // FIXME: Make this call in another way so that we can access $scope.users.
    // gets all users from the API and stores it in $scope.users when loaded.
    UserService.getAll().then(function(response){
        $scope.users = response.data;
        console.log($scope.users);
    });

    $scope.deleteUser = function(userId, index){
        UserService.delete(userId);

        // FIXME: Make the splice after the deletion is "confirmed" (callback or something)
        // use splice to make sure the table updates immediately.
        $scope.users.splice(index, 1);
    };

    // TODO: Implement update users
}]);