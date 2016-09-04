(function() {
    'use strict';

    angular.module('vacondos')
        .controller('SearchResultsController', SearchResultsController);

    SearchResultsController.$inject = ['$stateParams', 'condos'];

    function SearchResultsController($stateParams, condos) {
        /** Assign retrieved data here to use in map directive **/
        this.results = condos.getSearchResults();

        /** Save search inputs from home **/
        this.searchParams = $stateParams.searchInputs;
        console.log('search params from home', this.searchParams);

        this.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        };

    }

})();
/** DC LatLng: 38.907192, -77.036871 **/
