angular.module('UserService', []).factory('UserService', ['$http', function($http) {

    return {
        // call to get all users
        getAll : function() {
            return $http.get('/api/users/all').then(function(response){
                return response;
            })
        },

/*
        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(nerdData) {
            return $http.post('/api/users', nerdData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/nerds/' + id);
        }
*/
    }

}]);