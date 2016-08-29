(function() {
    'use strict';

    angular.module('vacondos', ['ui.router', 'ngResource'])
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
            .state('about-us', {
                url: '/about-us',
                templateUrl: '/js/templates/about-us.template.html',
                controller: 'AboutUsController',
                controllerAs: 'aboutUsCtrl'
            })
            .state('create-account', {
                url: '/create-account',
                templateUrl: '/js/templates/create-account.template.html',
                controller: 'CreateAccountController',
                controllerAs: 'createAccountCtrl'
            })
            .state('my-account', {
                url: '/my-account',
                templateUrl: '/js/templates/my-account.template.html',
                controller: 'MyAccountController',
                controllerAs: 'myAccountCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/js/templates/login.template.url',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: '/js/templates/contact.template.url',
                controller: 'ContactController',
                controllerAs: 'contactCtrl'
            })
            .state('terms', {
                url: '/terms',
                templateUrl: '/js/templates/terms.template.url',
                controller: 'TermsController',
                controllerAs: 'termsCtrl'
            });
    }

})();
