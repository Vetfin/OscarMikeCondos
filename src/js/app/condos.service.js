(function() {
    'use strict';

    angular.module('vacondos')
        .factory('condos', CondosService);

    CondosService.$inject = ['$http', '$q'];

    function CondosService($http, $q) {
        var searchResults = null;
        var buildingResults = [];

        getAllBuildings();

        return {
            getAllBuildings: getAllBuildings,
            getAllCondos: getAllCondos,
            getSearchResults: getSearchResults,
            getBuildingResults: getBuildingResults,
            saveFavoriteCondo: saveFavoriteCondo
        };

        /**
         * Get search result data
         * @return {Array}      Search results for
         *                      condos or addresses
         */
        function getSearchResults() {
            return searchResults;
        }

        function getBuildingResults() {
            return buildingResults;
        }
        /**
         * Get all VA approved buildings
         * @return {Promise}    XMLHttpRequest obj that can
         * implement promise methods
         */
        function getAllBuildings() {
            return $http({
                method: 'get',
                url: 'https://arcane-spire-51321.herokuapp.com/buildings.json'
            })
            .then(function(results) {
                buildingResults = results.data;
                console.log('building results', buildingResults);
                return results;
            })
            .catch(function(err) {
                if (err.status >= 400 && err.status < 500) {
                    console.error(
                        'Hmm, your search failed, check your request please',
                        err.status
                    );
                } else if (err.status >= 500 && err.status < 600) {
                    console.error(
                        'Oops! Something went wrong on our side. Hold wait one then try again'
                    );
                }
            });
        }

        /**
         * Get currently for sale VA approved condo units
         * @param  {Object} paramObj Search inputs
         * @return {Promise}      XMLHttpRequest object that can
         * implement promise methods
         */
        function getAllCondos(paramObj) {
            if (!paramObj) {
                return $q.reject(new Error('You must use our search page to return condo listings'));
            }
            console.log('in condos service fn', paramObj);

            if (
                (typeof(paramObj.min_price) !== 'number') ||
                (typeof(paramObj.min_bed) !== 'number' )||
                (typeof(paramObj.min_bath) !== 'number') ||
                !((typeof(paramObj.zip) === 'number') || paramObj.zip === null) ||
                !(typeof(paramObj.max_price) === 'number' || paramObj.max_price === null)||
                !(typeof(paramObj.max_bed) === 'number' || paramObj.max_bed === null) ||
                !(typeof(paramObj.max_bath) === 'number' || paramObj.max_bath === null)
            ) {
                return $q.reject(new Error('Inputs are invalid.'));
            }

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

        function saveFavoriteCondo(condoId, currentUserToken) {
            return $http({
                url: 'https://arcane-spire-51321.herokuapp.com/condos/' + condoId + '/favorite.json',
                method: 'post',
                headers: {
                    token: currentUserToken
                }
            });
        }

    }

})();
