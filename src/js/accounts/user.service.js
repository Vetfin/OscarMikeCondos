(function() {
    'use strict';

    var EMAIL_REGEX = /[^@\s]+@.+\..+/;

    angular.module('vacondos')
        .factory('user', UserService);

    UserService.$inject = ['$http', '$q'];

    function UserService($http, $q) {
        var currentUser;

        return {
            createUser: createUser
        };

        function createUser(nameFirst, nameLast, userEmail, userPassword) {
            if (typeof(nameFirst) !== 'string' || !nameFirst.length) {
                return createUserError('Please enter a valid first name.');
            } else if (typeof(nameLast) !=='string' || !nameLast.length) {
                return createUserError('Please enter a valid last name.');
            } else if (typeof(userEmail) !== 'string' || !EMAIL_REGEX.test(userEmail)) {
                return createUserError('Please enter a valid email.');
            } else if (typeof(userPassword) !== 'string' || userPassword.length < 8) {
                return createUserError('Please enter a valid password.');
            }

            return $http({
                url: 'https://arcane-spire-51321.herokuapp.com/users.json',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'json'
                },
                data: angular.toJson({
                    'user': {
                        'first_name': nameFirst,
                        'last_name': nameLast,
                        'email': userEmail,
                        'password': userPassword
                    }
                })
            })
            .then(function functionName(user) {
                currentUser = user.data;
                return user;
            });

        }

        function createUserError(message) {
            return $q.reject(new Error(message));
        }
    }

})();
