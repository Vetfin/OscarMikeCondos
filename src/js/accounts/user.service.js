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

        //TODO Add $http post to create user account
        function createUser(nameFirst, nameLast, userEmail, userPassword) {
            console.log(nameFirst, nameLast, userEmail, userPassword);
            //TODO Add $q.reject for if statement
            return $http({
                url: 'https://tiy-blog-api.herokuapp.com/api/users',
                method: 'post',
                dataType: 'json',
                params: {
                    first_name: nameFirst,
                    last_name: nameLast,
                    email: userEmail
                    // password_digest: userPassword
                }
            })
            .then(function functionName(user) {
                currentUser = user.data;
                return user;
            });

        }
    }

})();
