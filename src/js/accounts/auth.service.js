(function() {
    'use strict';

    var EMAIL_REGEX = /[^@\s]+@.+\..+/;

    angular.module('vacondos')
        .factory('auth', AuthorizationService);

    AuthorizationService.$inject = ['$http', '$q'];

    function AuthorizationService($http, $q) {
        var loggedInUser = null;
        var userId = null;

        return {
            login: login,
            logout: logout,
            getLoggedInUser: getLoggedInUser,
            isLoggedIn: isLoggedIn
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
                url: 'https://arcane-spire-51321.herokuapp.com/sessions.json',
                method: 'post',
                header: {
                    'Content-Type': 'application/json',
                    'Accept': 'json'
                },
                data: angular.toJson({
                    user: {
                        'email': loginEmail,
                        'password': loginPassword
                    }
                })
            })
            .then(function(user) {
                loggedInUser = user.data;
                userId = user.data.id;
                localStorage
                    .setItem('loggedInUser', angular.toJson({
                        email: loginEmail,
                        user_id: userId
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

        function logout() {
            loggedInUser = null;
            userId = null;
            localStorage.removeItem('loggedInUser');
            console.log('logged out');
            //TODO Check CORS error with call below
            // $http({
            //     url: 'https://arcane-spire-51321.herokuapp.com/sessions/' + userId,
            //     method: 'delete'
            // })
            // .then(function() {
            //     console.log('in logout');
            //     loggedInUser = null;
            //     userId = null;
            //     localStorage.removeItem('loggedInUser');
            // })
            // .catch(function(err) {
            //     console.error('Unable to end session', err.status);
            // });

        }

        function loginError(message) {
            return $q.reject(new Error(message));
        }
    }
})();
