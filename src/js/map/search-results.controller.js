(function() {
    'use strict';

    angular.module('vacondos')
        .controller('SearchResultsController', SearchResultsController);

    SearchResultsController.$inject = ['$stateParams', '$state', 'condos', 'auth'];

    function SearchResultsController($stateParams, $state, condos, auth) {
        var that = this;

        this.message = null;

        this.buildings = condos.getBuildingResults();

        /** Assign retrieved data here to use in map directive **/
        this.results = condos.getSearchResults();

        if (!this.results) {
            that.message = 'No searches currently, go to home';
        }

        /** Save search inputs from home **/
        this.searchParams = $stateParams.searchInputs;
        console.log('search params from home', this.searchParams);

        this.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        };

        this.userToken = auth.getUserToken();

        this.saveFavorite = function saveFavorite(condoId) {
            condos.saveFavoriteCondo(condoId, that.userToken)
                .then(function(data) {
                    console.log(data);
                })    
                .catch(function(err) {
                    if (err.status >= 400 && err.status < 500) {
                        console.error(
                            'Hmm, your action failed, try again please',
                            err.status
                        );
                    } else if (err.status >= 500 && err.status < 600) {
                        console.error(
                            'Oops! Something went wrong on our side. Hold wait one then try again'
                        );
                    }
                });

        };
    }

})();
/** DC LatLng: 38.907192, -77.036871 **/
