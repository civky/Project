/**
 * controller for public/index.html and public/views/home.html
 */

angular.module('MainCtrl', []).controller('MainController', function($scope) {

    $scope.tagline = 'This message comes from the controller';

});