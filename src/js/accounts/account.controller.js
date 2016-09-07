(function() {
    'use strict';

    angular.module('vacondos')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['$state', 'user', 'auth'];

    function AccountController($state, user, auth) {
        console.log('in account ctrl');

        var that = this;

        this.message = null;

        this.userInfo = {};

        this.currentUser = auth.getLoggedInUser();

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

                if (err.status >= 400 && err.status < 500) {
                    that.message = 'Invalid user information, try again';
                } else if (err.status >= 500 && err.status < 600) {
                    that.message = 'Oops, something\'s wrong on our end.\
                     Don\'t worry, the seabees are on it.';
                } else {
                    that.message = err.status + 'Something went wrong, we\'re on it';
                }

            });

            that.userInfo = {};

            this.goToHome = function goToHome() {
                $state.go('home');
            };

            //TODO do not show create account after this
        };
    }

})();
