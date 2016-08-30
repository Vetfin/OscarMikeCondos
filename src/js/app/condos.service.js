(function() {
    'use strict';

    angular.module('vacondos')
        .factory('condos', CondosService);

    CondosService.$inject = ['$http'];

    function CondosService($http) {
        return {
            getAllCondos: getAllCondos,
            getCondosForSale: getCondosForSale
        };

        function getAllCondos() {
            return $http({
                url: 'https://arcane-spire-51321.herokuapp.com/condos.json',
                method: 'get'
            })
            .then(function(response) {
                return response.data;
            });
        }

        function getCondosForSale(paramObj) {
            return $http({
                url: 'https://arcane-spire-51321.herokuapp.com/condos.json',
                method: 'get',
                dataType: 'json',
                data: {
                    min_price: paramObj.min_price,
                    max_price: paramObj.max_price,
                    min_bed: paramObj.min_bed,
                    max_bed: paramObj.max_bed,
                    min_bath: paramObj.min_bath,
                    max_bath: paramObj.max_bath,
                    zip: paramObj.zip
                }
            })
            .then(function(response) {
                return response.data;
            });
        }

    }

})();
