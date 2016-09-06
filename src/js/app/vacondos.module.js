(function() {
    'use strict';

    angular.module('vacondos', ['ui.router'])
        .config(vacondosConfig);

    vacondosConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function vacondosConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/js/templates/home.template.html',
                controller: 'HomeController',
                controllerAs: 'homeCtrl'
            })
            .state('search-results', {
                url: '/search-results',
                templateUrl: '/js/templates/search-results.template.html',
                controller: 'SearchResultsController',
                controllerAs: 'resultsCtrl',
                params: {
                    searchInputs: null
                }
            })
            .state('condo-info', {
                url: '/condo/:address',
                templateUrl: '/js/templates/condo-info.template.html',
                controller: 'CondoInfoController',
                controllerAs: 'condoInfoCtrl',
                params: {
                    condoId: null,
                    address: null
                }
            })
            .state('about-us', {
                url: '/about-us',
                templateUrl: '/js/templates/about-us.template.html'
            })
            .state('create-account', {
                url: '/create-account',
                templateUrl: '/js/templates/create-account.template.html',
                controller: 'AccountController',
                controllerAs: 'accountCtrl'
            })
            .state('my-account', {
                url: '/my-account',
                templateUrl: '/js/templates/my-account.template.html',
                controller: 'AccountController',
                controllerAs: 'accountCtrl'
            })
            .state('favorites', {
                url: '/my-account/favorites',
                templateUrl: '/js/templates/favorites.template.html',
                controller: 'FavoritesController',
                controllerAs: 'favCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/js/templates/login.template.html',
                controller: 'AuthorizationController',
                controllerAs: 'authCtrl'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: '/js/templates/contact.template.html'
            })
            .state('terms', {
                url: '/terms',
                templateUrl: '/js/templates/terms.template.html'
            })
            .state('va-info', {
                url: '/terms',
                templateUrl: '/js/templates/va-info.template.html'
            });
    }

})();
