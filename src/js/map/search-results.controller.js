(function() {
    'use strict';

    angular.module('vacondos')
        .controller('SearchResultsController', SearchResultsController);

    SearchResultsController.$inject = ['condos'];

    function SearchResultsController(condos) {
        var that = this;


        this.searchZip = null;

        this.condos = [];
        
        condos
            .getAllCondos()
            .then(function(allCondos) {
                that.condos = allCondos;
                // that.makeCondoMarkers(allCondos);
                console.log('condos', that.condos);
            });

        /** DC LatLng: 38.907192, -77.036871 **/

        // this.openInfoWindow = function(e, selectedMarker){
        //     e.preventDefault();
        //     google.maps.event.trigger(selectedMarker, 'click');
        // };

    }

})();
