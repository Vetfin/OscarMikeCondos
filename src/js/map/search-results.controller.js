(function() {
    'use strict';

    angular.module('vacondos')
        .controller('SearchResultsController', SearchResultsController);

    SearchResultsController.$inject = ['$stateParams', 'condos'];

    function SearchResultsController($stateParams, condos) {

        this.results = condos.getCondos();

        this.searchParams = $stateParams.searchInputs;
        console.log(this.searchParams);


        /** DC LatLng: 38.907192, -77.036871 **/

        this.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        };

    }

})();
