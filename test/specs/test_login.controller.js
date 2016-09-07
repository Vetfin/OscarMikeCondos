(function() {
    'use strict';

    var assert = chai.assert;

    suite('login controller', function() {
        var loginController, $rootScope;
        var mockAuthService = {};

        setup(module('vacondos'));

        setup(module(function($provide) {
            $provide.value('auth', mockAuthService);
        }));

        setup(inject(function($controller, $q, $httpBackend, _$rootScope_) {
            $rootScope = _$rootScope_;

            $httpBackend
                .whenGET('/js/templates/login.template.html')
                .respond('<h1>Mock Login Template</h1>');

            $httpBackend
                .whenGET('/js/templates/home.template.html')
                .respond('<h1>Mock Home Template</h1>');

            mockAuthService.login = function() {
                mockAuthService.login.called++;
                var def = $q.defer();
                def.resolve({});
                return def.promise;
            };
            mockAuthService.login.called = 0;

            mockAuthService.isLoggedIn = function() {
                mockAuthService.isLoggedIn.called++;
                var def = $q.defer();
                def.resolve();
                return def.promise;
            };
            mockAuthService.isLoggedIn.called = 0;

            loginController = $controller('LoginController');
        }));

        test('login controller has expected data', function() {
            assert.isNull(loginController.message, 'login controller has message property');
            assert.isObject(loginController.userInfo, 'login controller has userInfo object');
            assert.isFunction(loginController.loggedIn, 'controller has method for determining login status');
            assert.isObject(loginController.loggedInUser, 'controller has loggedInUser object');
            assert.isFunction(loginController.authenticate, 'controller has authenticate function');
        });

        test('authenticate will log user in', function() {
            loginController.authenticate();

            assert
                .strictEqual(
                    mockAuthService.login.called, 1, 'the auth service login method was called'
                );

            $rootScope.$digest();
        });

        test('loggedIn will return logged in status of user', function() {
            loginController.loggedIn();

            assert
                .strictEqual(
                    mockAuthService.isLoggedIn.called, 1, 'the auth service isLoggedIn method was called'
                );

            $rootScope.$digest();
        });
    });
})();
