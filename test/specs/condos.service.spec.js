(function() {
    'use strict';

    var assert = chai.assert;

    suite('condos service', function() {
        var condos, $httpBackend;

        setup(module('vacondos'));

        setup(inject(function(_condos_, _$httpBackend_) {
            condos = _condos_;
            $httpBackend = _$httpBackend_;

            $httpBackend
                .whenGET('https://arcane-spire-51321.herokuapp.com/addresses.json')
                .respond([{
                    address: '123 Penn St Washington DC',
                    latitude: 22,
                    longitude: 77
                }]);

            $httpBackend
                .whenGET('/js/templates/home.template.html')
                .respond('<h1>Mock Home Template</h1>');
        }));

        test('condos service functions exist', function() {
            assert.isFunction(condos.getAllAddresses, 'getAllAddresses fn exists');
            assert.isFunction(condos.getAllCondos, 'getAllCondos fn exists');
            assert.isFunction(condos.getSearchResults, 'getSearchResults fn exists');
        });

        test('getAllAddresses successfully returns all addresses', function(done) {
            var result = condos.getAllAddresses();

            assert.isObject(result, 'getAllAddresses returns an object');
            assert.isFunction(result.then, 'result has a then method');
            assert.isFunction(result.catch, 'result has a catch method');

            result
                .then(function(allAddresses) {
                    console.log(allAddresses);
                    assert
                        .isArray(allAddresses.data, 'the data property of allAddresses is an array');
                    assert
                        .strictEqual(
                            allAddresses.data[0].address,
                            '123 Penn St Washington DC',
                            'allAddresses has address'
                        );
                    assert.strictEqual(allAddresses.data[0].latitude, 22, 'allAddresses has latitude');
                    assert.isNumber(allAddresses.data[0].latitude);
                    assert.strictEqual(allAddresses.data[0].longitude, 77, 'allAddresses has longitude');
                    assert.isNumber(allAddresses.data[0].longitude);
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    assert.isFail('should not be in catch for getAllAddresses');
                    done();
                });

            $httpBackend.flush();
        });

    });
})();
