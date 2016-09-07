(function() {
    'use strict';

    angular.module('vacondos')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['$state', 'auth'];

    function LogoutController($state, auth) {
        this.logOut = function logOut() {
            auth.logout();
            $state.go('home');
        };
    }
})();
