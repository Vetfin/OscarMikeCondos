(function() {
    'use strict';

    angular.module('vacondos')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', '$stateParams', 'auth'];

    function LoginController($state, $stateParams, auth) {
        var that = this;

        this.message = null;

        this.redirectMessage = $stateParams.message;

        this.loggedInUser = {};

        this.loggedIn = function loggedIn() {
            return auth.isLoggedIn();
        };

        this.userInfo = {};

        this.authenticate = function authenticate() {
            console.log('start auth');
            auth.login(that.userInfo.email, that.userInfo.password)
                .then(function(currentUser) {
                    that.loggedInUser = currentUser;
                    console.log('loggedInUser', that.loggedInUser);
                    $state.go('home');
                })
                .catch(function(response) {
                    console.error('unable to login', response.status);
                    if (response.status >= 400 && response.status < 500) {
                        that.message = 'Unable to login, please check your email and password!';
                    } else if (response.status >= 500 && response.status < 600) {
                        that.message = 'Oops, something went wrong...try again';
                    }
                });
        };
    }

})();
