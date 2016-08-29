(function() {
    'use strict';

    angular.module('vacondos')
        .factory('condos', CondosService);

    CondosService.$inject = ['$http'];

    function CondosService($http) {
        return {
            getAllCondos: getAllCondos
        };

        function getAllCondos() {
            return $http({
                url: 'https://arcane-spire-51321.herokuapp.com/condos.json'
            })
            .then(function(response) {
                return response.data;
            });
        }
    }

})();
