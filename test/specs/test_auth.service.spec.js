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
                .when('POST', 'https://arcane-spire-51321.herokuapp.com/users/login.json', {
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
                    favorites: [],
                    password_digest: '123#@!',
                    token: '123'
                });

            $httpBackend
                .whenGET('/js/templates/login.template.html')
                .respond('<h1>Mock Login Template</h1>');

            $httpBackend
                .whenGET('/js/templates/home.template.html')
                .respond('<h1>Mock Home Template</h1>');
        }));

        test('auth service functions exist', function() {
            assert.isFunction(auth.login, 'login fn exists');
            assert.isFunction(auth.getLoggedInUser, 'getLoggedInUser fn exists');
            assert.isFunction(auth.isLoggedIn, 'isLoggedIn fn exists');
            assert.isFunction(auth.logout, 'logout fn exists');
            assert.isFunction(auth.getUserToken, 'getUserToken fn exists');
        });

        test('login successfully returns user object', function(done) {
            var returnVal = auth.login('jane@bing.com', '12345678');
            /** login returns a promise **/
            assert.isObject(returnVal, 'login returns an object');
            assert.isFunction(returnVal.then, 'result has a then method');
            assert.isFunction(returnVal.catch, 'result has a catch method');

            returnVal
                .then(function(user) {
                    assert.strictEqual(user.first_name, 'Jane', 'user has first name');
                    assert.strictEqual(user.last_name, 'Doe', 'user has last name');
                    assert.strictEqual(user.email, 'jane@bing.com', 'user has email');
                    assert.strictEqual(user.first_name, 'Jane', 'user has first name');
                    assert.isArray(user.favorites, 'user has favorites array');
                    assert.strictEqual(user.password_digest, '123#@!', 'user has password_digest');
                    assert.strictEqual(user.token, '123', 'user has token');
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    assert.isFail('should not be in catch for login');
                    done();
                });

            $httpBackend.flush();
        });

    });
})();
