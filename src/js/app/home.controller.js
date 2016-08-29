(function() {
    'use strict';

    angular.module('vacondos')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$resource', 'condos'];

    function HomeController($resource, condos) {

        this.condos = condos.get();
        console.log(this.condos);
    }

})();
