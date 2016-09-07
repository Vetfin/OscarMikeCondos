(function() {
    'use strict';

    var EMAIL_REGEX = /[^@\s]+@.+\..+/;

    angular.module('vacondos')
        .factory('auth', AuthorizationService);

    AuthorizationService.$inject = ['$http', '$q'];

    function AuthorizationService($http, $q) {
        var loggedInUser = null;
        var userId = null;
        var userToken = null;

        return {
            login: login,
            logout: logout,
            getLoggedInUser: getLoggedInUser,
            isLoggedIn: isLoggedIn,
            getUserToken: getUserToken
        };

        function login(loginEmail, loginPassword) {
            if (typeof( loginEmail ) !== 'string' ||
                !EMAIL_REGEX.test(loginEmail)) {
                return loginError('Please enter a valid email address.');
            } else if (
                typeof( loginPassword ) !== 'string' ||
                loginPassword.length < 8) {
                return loginError('Please enter a valid password.');
            }

            return $http({
                url: 'https://arcane-spire-51321.herokuapp.com/users/login.json',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'json'
                },
                data: {
                    user: {
                        'email': loginEmail,
                        'password': loginPassword
                    }
                }
            })
            .then(function(user) {
                loggedInUser = user.data;
                userId = user.data.id;
                userToken = user.data.token;
                localStorage
                    .setItem('loggedInUser', angular.toJson({
                        email: loginEmail,
                        user_id: userId,
                        user_token: userToken
                    }));
                return loggedInUser;
            });
        }

        function getLoggedInUser() {
            return loggedInUser;
        }

        function isLoggedIn() {
            return !!userId;
        }

        function getUserToken() {
            return userToken;
        }

        function logout() {
            console.log('in logout');
            loggedInUser = null;
            userId = null;
            userToken = null;
            localStorage.removeItem('loggedInUser');
        }

        function loginError(message) {
            return $q.reject(new Error(message));
        }
    }
})();
