(function() {
    'use strict';

    var assert = chai.assert;

    suite('logout controller', function() {
        var logoutController;
        var mockAuthService = {};

        setup(module('vacondos'));

        setup(module(function($provide) {
            $provide.value('auth', mockAuthService);
        }));

        setup(inject(function($controller, $httpBackend) {
            $httpBackend
                .whenGET('/js/templates/home.template.html')
                .respond('<h1>Mock Home Template</h1>');

            $httpBackend
                .whenGET('/js/templates/login.template.html')
                .respond('<h1>Mock Login Template</h1>');

            mockAuthService.logout = function() {
                mockAuthService.logout.called++;
            };
            mockAuthService.logout.called = 0;

            logoutController = $controller('LogoutController');
        }));

        test('logout function successfully calls logout in auth service', function() {
            logoutController.logOut();

            assert
                .strictEqual(
                    mockAuthService.logout.called, 1, 'auth service logout method called'
                );
        });
    });
})();
