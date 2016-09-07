(function() {
    'use strict';

    var assert = chai.assert;

    suite('user service', function() {
        var $httpBackend, user;

        setup(module('vacondos'));

        setup(inject(function(_$httpBackend_, _user_) {
            $httpBackend = _$httpBackend_;
            user = _user_;

            $httpBackend
                .when('POST', 'https://arcane-spire-51321.herokuapp.com/users.json', {
                    user: {
                        first_name: 'John',
                        last_name: 'Doe',
                        email: 'john@yahoo.com',
                        password: '12345678'
                    }
                })
                .respond({
                    id: 1,
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'john@yahoo.com',
                    created_at: '2016',
                    password_digest: '123#@!'
                });

            $httpBackend
                .whenGET('/js/templates/home.template.html')
                .respond('<h1>Mock Home Template</h1>');
        }));

        test('user service functions exist', function() {
            assert.isFunction(user.createUser, 'createUser fn exists');
        });

        test('createUser successfully returns new user object', function(done) {
            var returnVal = user.createUser('John', 'Doe', 'john@yahoo.com', '12345678');

            assert.isObject(returnVal, 'createUser returns an object');
            assert.isFunction(returnVal.then, 'result has a then method');
            assert.isFunction(returnVal.catch, 'result has a catch method');

            returnVal
                .then(function(newUser) {
                    assert.strictEqual(newUser.data.first_name, 'John', 'newUser has first name');
                    assert.strictEqual(newUser.data.last_name, 'Doe', 'newUser has last name');
                    assert.strictEqual(newUser.data.email, 'john@yahoo.com', 'newUser has email');
                    assert.strictEqual(newUser.data.created_at, '2016', 'newUser has created by date');
                    assert.strictEqual(newUser.data.password_digest, '123#@!', 'newUser has encrypted password');
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    assert.isFail('should not be in catch for createUser');
                    done();
                });

            $httpBackend.flush();
        });

        test('cannot create user without valid email', function() {

        });

        test('cannot create user without valid password', function() {

        });

        test('cannot create user without a first name', function() {

        });

        test('cannot create user without a last name', function() {

        });
    
    });
})();
