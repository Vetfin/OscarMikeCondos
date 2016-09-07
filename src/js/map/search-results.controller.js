(function() {
    'use strict';

    angular.module('vacondos')
        .controller('SearchResultsController', SearchResultsController);

    SearchResultsController.$inject = ['$stateParams', '$state', 'condos'];

    function SearchResultsController($stateParams, $state, condos) {
        var that = this;

        this.message = null;

        this.buildings = condos.getBuildingResults();

        /** Assign retrieved data here to use in map directive **/
        this.results = condos.getSearchResults();

        if (this.results.length === 0 || !this.results) {
            that.message = 'No searches currently, go to home';
        }

        /** Save search inputs from home **/
        this.searchParams = $stateParams.searchInputs;
        console.log('search params from home', this.searchParams);

        this.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        };

        this.saveFavorite = function saveFavorite(id) {
            condos.saveFavoriteCondo(id);
        };
    }

})();
/** DC LatLng: 38.907192, -77.036871 **/
