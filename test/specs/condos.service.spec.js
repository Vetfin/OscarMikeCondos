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
                .respond([
                    { address: '123 Penn St Washington DC', lat: 22, lng: 77},
                    { address: '321 Lime St Washington DC', lat: -30, lng: 77}
                ]);
        }));

        test('condos service functions exist', function() {
            assert.isFunction(condos.getAllAddresses, 'getAllAddresses fn exists');
        });

    });
})();
