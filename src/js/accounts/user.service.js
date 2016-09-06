(function() {
    'use strict';

    angular.module('vacondos')
        .factory('user', UserService);

    UserService.$inject = ['$http'];

    function UserService($http) {
        var currentUser;

        return {
            createUser: createUser
        };

        function createUser(nameFirst, nameLast, userEmail, userPassword) {
            console.log(nameFirst, nameLast, userEmail, userPassword);
            //TODO Add $q.reject for if statement
            return $http({
                url: 'https://arcane-spire-51321.herokuapp.com/users',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'json'
                },
                data: angular.toJson({
                    'first_name': nameFirst,
                    'last_name': nameLast,
                    'email': userEmail
                    // password_digest: userPassword
                })
            })
            .then(function functionName(user) {
                currentUser = user.data;
                return user;
            });

        }
    }

})();
