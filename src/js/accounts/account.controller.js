(function() {
    'use strict';

    angular.module('vacondos')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['$state', 'user'];

    function AccountController($state, user) {
        console.log('in account ctrl');

        var that = this;

        this.message = null;

        this.userInfo = {};

        this.loggedInUser = user.currentUser;

        this.createAccount = function createAccount() {
            console.log('start creating new account');
            console.log('userInfo', that.userInfo);
            user.createUser(
                that.userInfo.nameFirst,
                that.userInfo.nameLast,
                that.userInfo.email,
                that.userInfo.password
            )
            .then(function(user) {
                console.log('new user', user.data);
                var name = user.data.first_name;
                that.message = 'Welcome ' + name + '!';
            })
            .catch(function(err) {
                console.error('unable to create account', err.status);
                that.message = 'Invalid user information';
            });

            that.userInfo = {};

            this.goToHome = function goToHome() {
                $state.go('home');
            };

            //TODO do not show create account after this
        };
    }

})();
