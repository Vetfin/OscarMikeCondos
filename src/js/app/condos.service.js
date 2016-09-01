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

        /**
         * Get search result data
         * @return {Array}      Search results for
         *                      condos or addresses
         */
        function getSearchResults() {
            return searchResults;
        }

        /**
         * Get all VA approved addresses
         * @return {Promise}    XMLHttpRequest obj that can
         * implement promise methods
         */
        function getAllAddresses() {
            return $http({
                method: 'get',
                url: 'https://arcane-spire-51321.herokuapp.com/addresses.json'
            })
            .then(function(results) {
                searchResults = results.data;
                return results;
            });
        }

        /**
         * Get currently for sale VA approved condo units
         * @param  {Obj} paramObj Search inputs
         * @return {Promise}      XMLHttpRequest object that can
         * implement promise methods
         */
        function getAllCondos(paramObj) {
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
