/**
 * controller for public/index.html and public/views/home.html
 */

angular.module('MainCtrl', []).controller('MainController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.tagline = 'This message comes from the main controller';
    $scope.logout = function(){
        $http.post('/logout').success(function(data){
            $location.path('/')
        });
    };

}]);