(function() {
    'use strict';

    angular.module('vacondos')
        .factory('condos', CondosService);

    CondosService.$inject = ['$http'];

    function CondosService($http) {
        var searchResults = [];

        return {
            getAllAddresses: getAllAddresses,
            getAllCondos: getAllCondos,
            getSearchResults: getSearchResults
        };

        function getSearchResults() {
            return searchResults;
        }

        function getAllAddresses() {
            return $http({
                url: 'https://arcane-spire-51321.herokuapp.com/addresses.json'
            })
            .then(function(results) {
                searchResults = results.data;
                return results;
            });
        }

        function getAllCondos(paramObj) {
            console.log(paramObj);
            return $http({
                url: 'https://arcane-spire-51321.herokuapp.com/condos/search.json',
                method: 'get',
                dataType: 'json',
                params: {
                    min_price: paramObj.min_price,
                    max_price: paramObj.max_price,
                    min_bed: paramObj.min_bed,
                    max_bed: paramObj.max_bed,
                    min_bath: paramObj.min_bath,
                    max_bath: paramObj.max_bath,
                    zip: paramObj.zip
                }
            })
            .then(function(results) {
                searchResults = results.data;
                return results;
            });
        }

    }

})();
