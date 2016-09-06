(function() {
    'use strict';

    angular.module('vacondos')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'auth'];

    function LoginController($state, auth) {
        console.log('in login');
        var that = this;

        this.message = null;

        this.loggedIn = function loggedIn() {
            return auth.isLoggedIn();
        };

        this.userInfo = {};

        this.authenticate = function authenticate() {
            console.log('start auth');
            auth.login(that.userInfo.email, that.userInfo.password)
                .then(function(currentUser) {
                    console.log('logged in user', currentUser);
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
