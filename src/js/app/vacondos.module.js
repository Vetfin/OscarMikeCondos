(function() {
    'use strict';

    angular.module('vacondos', ['ui.router'])
        .config(appConfig);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

})();
