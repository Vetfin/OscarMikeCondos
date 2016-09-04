(function() {
    'use strict';

    angular.module('vacondos')
        .factory('login', LoginService);

    function LoginService() {
        var currentUser = null;

        return {
            login: login
        };

        function login(email, password) {
            console.log('login', email, password); //TODO add $http here
            currentUser = {}; //TODO assign returned user object here
        }
    }
})();
