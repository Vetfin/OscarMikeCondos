(function() {
    'use strict';

    angular.module('vacondos')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['$state', 'auth'];

    function LogoutController($state, auth) {
        this.loggedIn = auth.isLoggedIn;

        this.logOut = function logOut() {
            auth.logout();
            $state.go('home');
        };
    }
})();
