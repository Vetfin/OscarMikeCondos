(function() {
    'use strict';

    angular.module('vacondos')
        .factory('condos', CondosService);

    function CondosService($resource) {
        return $resource('https://arcane-spire-51321.herokuapp.com/condos');
    }
})();
