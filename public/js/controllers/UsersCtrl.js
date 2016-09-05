angular.module('UsersCtrl', []).controller('UsersController',['$scope', 'UserService', function($scope, UserService) {
    $scope.info = 'This will allow CRUD of users';

    // TODO: Make this call in another way so that we can access $scope.users.
    UserService.getAll().then(function(response){
        $scope.users = response.data;
    });

    // TODO: Implement CRUD

}]);