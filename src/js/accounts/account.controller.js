(function() {
    'use strict';

    angular.module('vacondos')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['user'];

    function AccountController(user) {
        console.log('in account ctrl');

        var that = this;

        this.userInfo = {};

        this.createAccount = function createAccount() {
            console.log('start creating new account');

            user.createUser(
                that.userInfo.nameFirst,
                that.userInfo.nameLast,
                that.userInfo.email,
                that.userInfo.password
            );
            //TODO add then and catch after $http is added
            //TODO erase inputs after successfully signing up
            //TODO do not show create account after this
        };
    }

})();
