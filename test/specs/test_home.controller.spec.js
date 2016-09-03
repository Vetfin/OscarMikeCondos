(function() {
    'use strict';

    var assert = chai.assert;

    suite('home controller', function() {
        var homeController, $rootScope;
        var mockCondosService = {};

        setup(module('vacondos'));

        setup(module(function($provide) {
            $provide.value('condos', mockCondosService);
        }));

        setup(inject(function($controller, $q, $httpBackend, _$rootScope_) {
            $rootScope = _$rootScope_;

            $httpBackend
                .whenGET('/js/templates/home.template.html')
                .respond('<h1>Mock Home Template</h1>');

            $httpBackend
                .whenGET('/js/templates/search-results.template.html')
                .respond('<h1>Mock Search Results Template</h1>');

            mockCondosService.getAllBuildings = function() {
                mockCondosService.getAllBuildings.called++;
                var def = $q.defer();
                def.resolve([]);
                return def.promise;
            };
            mockCondosService.getAllBuildings.called = 0;

            mockCondosService.getAllCondos = function() {
                mockCondosService.getAllCondos.called++;
                var def = $q.defer();
                def.resolve([]);
                return def.promise;
            };
            mockCondosService.getAllCondos.called = 0;

            homeController = $controller('HomeController');
        }));

        test('home controller has expected data', function() {
            assert.strictEqual(homeController.path, 'server', 'home path is correct');
            assert.isString(homeController.message, 'controller has message string');
            assert.isObject(homeController.searchParams, 'controller has searchParams object');
            assert
                .isFunction(
                    homeController.goToResults,
                    'controller has method for going to search results for specific condos'
                );
            assert.isFunction(homeController.goToAll, 'controller has method for going to results for all buildings');
            $rootScope.$digest();
        });

        test('goToResults will search for condos', function() {
            homeController.goToResults();

            assert
                .strictEqual(
                        mockCondosService.getAllCondos.called,
                        1,
                        'the condos service getAllCondos method was called'
                );

            $rootScope.$digest();
        });

        test('goToAll will search for all buildings', function() {
            homeController.goToAll();

            assert
                .strictEqual(
                        mockCondosService.getAllBuildings.called,
                        1,
                        'the condos service getAllBuildings method was called'
                );

            $rootScope.$digest();
        });

        test('searchParams object has correct properties', function() {
            var params = homeController.searchParams;

            assert.property(params, 'min_price', 'searchParams has min_price');
            assert.property(params, 'max_price', 'searchParams has max_price');
            assert.property(params, 'min_bed', 'searchParams has min_bed');
            assert.property(params, 'max_bed', 'searchParams has max_bed');
            assert.property(params, 'min_bath', 'searchParams has min_bath');
            assert.property(params, 'max_bath', 'searchParams has max_bath');
            assert.property(params, 'zip', 'searchParams has zip');
        });

        test('searchParams has valid inputs', function() {
            var params = homeController.searchParams;

            assert.isNumber(params.min_price, 'min_price is a number');
            assert.isDefined(params.max_price, 'max_price is not undefined');
            assert.isNumber(params.min_bed, 'min_bed is a number');
            assert.isDefined(params.max_bed, 'max_bed is not undefined');
            assert.isNumber(params.min_bath, 'min_bath is a number');
            assert.isDefined(params.max_bath, 'max_bath is not undefined');
            assert.isDefined(params.zip, 'zip is not undefined');
        });

    });
})();
