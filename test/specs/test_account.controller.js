(function() {
    'use strict';

    var assert = chai.assert;

    suite('account controller', function() {
        var accountController, $rootScope;
        var mockAuthService = {};
        var mockUserService = {};

        setup(module('vacondos'));

        setup(module(function($provide) {
            $provide.value('auth', mockAuthService);
            $provide.value('user', mockUserService);
        }));

        setup(inject(function($controller, $httpBackend, $q, _$rootScope_) {
            $rootScope = _$rootScope_;

            $httpBackend
                .whenGET('/js/templates/home.template.html')
                .respond('<h1>Mock Home Template</h1>');

            $httpBackend
                .whenGET('/js/templates/create-user.template.html')
                .respond('<h1>Mock Create User Template</h1>');

            $httpBackend
                .whenGET('/js/templates/login.template.html')
                .respond('<h1>Mock Login Template</h1>');

            mockUserService.createUser = function() {
                mockUserService.createUser.called++;
                var def = $q.defer();
                def.resolve({});
                return def.promise;
            };
            mockUserService.createUser.called = 0;

            mockAuthService.getLoggedInUser = function() {
                mockAuthService.getLoggedInUser.called++;
                return {};
            };
            mockAuthService.getLoggedInUser.called = 0;

            accountController = $controller('AccountController');
        }));

        test('account controller has expected data', function() {
            assert.isNull(accountController.message, 'ctrl has message property');
            assert.isObject(accountController.userInfo, 'ctrl has userInfo object');
            assert.isObject(accountController.currentUser, 'ctrl has currentUser object');
        });

        test('findloggedInUser fn successfully gets currently logged in user', function() {
            var returnedUser = accountController.currentUser;

            assert.isObject(returnedUser,'the auth service getLoggedInUser method was called');

            $rootScope.$digest();
        });

        // test('createAccount fn successfully creates new user', function() {
        //     accountController.createAccount(nameFirst,nameLast, email, password);
        //
        //     assert
        //         .strictEqual(
        //             mockUserService.createUser.called,
        //             1,
        //             'the user service createUser method was called'
        //         );
        //
        //     $rootScope.$digest();
        // });
    });
})();
