(function() {
    'use strict';

    angular.module('vacondos')
        .controller('SearchResultsController', SearchResultsController);

    SearchResultsController.$inject = ['$state', 'condos'];

    function SearchResultsController($state, condos) {
        var that = this;

        this.searchParams = {
            min_price: 0,
            max_price: null,
            min_bed: 0,
            max_bed: null,
            min_bath: 0,
            max_bath: null,
            zip: null
        };

        this.condos = [];

        this.getForSaleCondos = function getForSaleCondos() {
            condos
                .getCondosForSale(that.searchParams)
                .then(function(condosForSale) {
                    that.condos = condosForSale;
                    $state.go('search-results');
                    console.log('returned condos for sale', that.condos);
                });
        };

        this.getAllBuildings = function getAllBuildings() {
            condos
                .getAllCondos()
                .then(function(allApprovedBuildings) {
                    that.condos = allApprovedBuildings;
                    $state.go('search-results');
                    console.log('returned all buildings', that.condos);
                });
        };

        /** DC LatLng: 38.907192, -77.036871 **/

        this.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        };

    }

})();
