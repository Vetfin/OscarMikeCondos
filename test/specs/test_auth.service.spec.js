(function() {
    'use strict';

    var assert = chai.assert;

    suite('auth service', function() {
        var $rootScope, $httpBackend, auth;

        setup(module('vacondos'));

        setup(inject(function(_$rootScope_, _$httpBackend_, _auth_) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            auth = _auth_;

            $httpBackend
                .when('POST', 'https://arcane-spire-51321.herokuapp.com/sessions.json', {
                    user: {
                        email: 'jane@bing.com',
                        password: '12345678'
                    }
                })
                .respond({
                    id: 1,
                    first_name: 'Jane',
                    last_name: 'Doe',
                    email: 'jane@bing.com',
                    password_digest: '123#@!'
                });

            $httpBackend
                .whenGET('/js/templates/login.template.html')
                .respond('<h1>Mock Login Template</h1>');
        }));

        test('auth service functions exist', function() {
            assert.isFunction(auth.login, 'login fn exists');
            assert.isFunction(auth.getLoggedInUser, 'getLoggedInUser fn exists');
            assert.isFunction(auth.isLoggedIn, 'isLoggedIn fn exists');
            assert.isFunction(auth.logout, 'logout fn exists');
        });

    });
})();
