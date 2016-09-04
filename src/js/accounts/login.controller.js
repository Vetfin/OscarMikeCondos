(function() {
    'use strict';

    angular.module('vacondos')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['loginService'];

    function LoginController(loginService) {
        console.log('in login');
        var that = this;

        this.userInfo = {};

        this.authenticate = function authenticate() {
            console.log('start auth');
            loginService.login(that.userInfo.email, that.userInfo.password);
            //TODO add .then and .catch when $http included in service

        };
    }

})();
