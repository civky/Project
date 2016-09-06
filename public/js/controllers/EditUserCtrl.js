angular.module('EditUserCtrl', []).controller('EditUserController', ['$scope', 'UserService', '$location', function($scope, UserService, $location) {

    $scope.tagline = 'This message comes from the controller';
    $scope.user = {
        username: "",
        password: "",
        email: "",
        permission: ""
    };

}]);