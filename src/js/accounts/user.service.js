(function() {
    'use strict';

    angular.module('vacondos')
        .factory('user', UserService);

        // UserService.$inject = ['http']; TODO add $http call when ready

    function UserService() {
        return {
            createUser: createUser
        };

        //TODO Add $http post to create user account
        function createUser(nameFirst, nameLast, email, password) {
            console.log(nameFirst, nameLast, email, password);
            //TODO instantiate var currentUser above and assign the data that comes back
        }
    }

})();
