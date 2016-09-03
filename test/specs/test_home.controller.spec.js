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

            mockCondosService.getAllBuildings = function() {
                var def = $q.defer();
                def.resolve([]);
                return def.promise;
            };

            mockCondosService.getAllCondos = function() {
                var def = $q.defer();
                def.resolve([]);
                return def.promise;
            };

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
    });
})();
