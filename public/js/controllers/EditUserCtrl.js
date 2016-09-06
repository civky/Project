angular.module('EditUserCtrl', []).controller('EditUserController', ['$scope', 'UserService', '$location', '$routeParams', function($scope, UserService, $location, $routeParams) {

    $scope.tagline = 'This message comes from the controller with id: ' + $routeParams.id;
    $scope.user = {
    };

    var userId = $routeParams.id;
    UserService.getUser(userId).success(function(data){
        $scope.user = data;
        console.log($scope.user);
    });

    $scope.submitEdit = function(){
        UserService.editUser($scope.user).success(function(data){
            $location.path('users/');
        });
    }

}]);