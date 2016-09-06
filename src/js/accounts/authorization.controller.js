(function() {
    'use strict';

    angular.module('vacondos')
        .controller('AuthorizationController', AuthorizationController);

    AuthorizationController.$inject = ['auth'];

    function AuthorizationController(auth) {
        console.log('in login');
        var that = this;

        this.userInfo = {};

        this.authenticate = function authenticate() {
            console.log('start auth');
            auth.login(that.userInfo.email, that.userInfo.password);
            //TODO add .then and .catch when $http included in service

        };
    }

})();
