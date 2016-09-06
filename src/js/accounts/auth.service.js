(function() {
    'use strict';

    angular.module('vacondos')
        .factory('auth', AuthorizationService);

    function AuthorizationService() {
        var currentUser = null;

        return {
            login: login,
            logout: logout
        };

        function login(email, password) {
            console.log('login', email, password);
            //TODO add $http here
            currentUser = {}; //TODO assign returned user object here
        }

        function logout() {
            console.log('logout');
            //TODO remove any current user, local storage or api key info
        }
    }
})();
