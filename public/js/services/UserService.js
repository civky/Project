angular.module('UserService', []).factory('UserService', ['$http', '$location', function($http, $location) {
    var savedUser = {};
    return {
        // call to get all users
        getAll : function() {
            return $http.get('/api/users/all');
        },

        // call api to add a new user with userdata
        newUser : function(userData) {
            return $http.post('/api/user', userData);
        },

        // call to DELETE a user
        delete : function(id) {
            return $http.delete('/api/users/' + id);
        },

        // call to GET one user from id
        getUser : function (id) {
            return $http.get('api/users/' + id);
        },
        // call to PUT one user
        editUser : function (userData) {
            return $http.put('api/users/' + userData.id, userData);
        }
    }

}]);