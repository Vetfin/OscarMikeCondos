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
            console.log('in create user');
            // var thisPassword;
            // if (!userPassword) {
            //     thisPassword = null;
            // }
            // console.log('thisPassword', thisPassword);
            //TODO Add $q.reject for if statement
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
    }

})();
