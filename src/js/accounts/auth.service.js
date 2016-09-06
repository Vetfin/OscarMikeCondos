(function() {
    'use strict';

    angular.module('vacondos')
        .factory('auth', AuthorizationService);

    AuthorizationService.$inject = ['$http'];

    function AuthorizationService($http) {
        var loggedInUser = null;
        var userId = null;

        return {
            login: login,
            logout: logout
        };

        function login(loginEmail, loginPassword) {
            return $http({
                url: 'https://arcane-spire-51321.herokuapp.com/sessions.json',
                method: 'post',
                header: {
                    'Content-Type': 'application/json',
                    'Accept': 'json'
                },
                data: angular.toJson({
                    'email': loginEmail,
                    'password': loginPassword
                })
            })
            .then(function(user) {
                loggedInUser = user.data;
                userId = user.data.id;
                console.log('loggedin user', loggedInUser);
                localStorage
                    .setItem('loggedInUser', angular.toJson({
                        email: loginEmail,
                        user_id: userId
                    }));
                return loggedInUser;
            });
        }

        function logout() {
            console.log('logout');
            //TODO remove any current user, local storage or api key info
        }
    }
})();
