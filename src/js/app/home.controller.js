(function() {
    'use strict';

    angular.module('vacondos')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state', '$location', 'condos'];

    function HomeController($state, $location, condos) {
        var that = this;

        /** Error message area **/
        this.message = '';

        /** Home path should be server **/
        this.path = $location.host();

        /** Search inputs from homepage **/
        this.searchParams = {
            min_price: 0,
            max_price: null,
            min_bed: 0,
            max_bed: null,
            min_bath: 0,
            max_bath: null,
            zip: null
        };

        /**
         * Search for specific condos with params
         * and go to search-results view
         * @return {void}
         */
        this.goToResults = function seeVaApprovedCondosForSale() {
            condos
                .getAllCondos(that.searchParams)
                .then(function(data) {
                    console.log('in then for goToResults', data);
                    $state.go('search-results', {searchInputs: that.searchParams});
                })
                .catch(function(err) {
                    console.error(err.status);
                    if (err.status >= 400 && err.status < 500) {
                        that.message = 'Unable to retrieve condos, check your inputs';
                    } else if (err.status >= 500 && err.status < 600) {
                        that.message = 'Oops! Something went wrong on our side. Hold wait one then try again';
                    }
                });
        };

        /**
         * Search for all VA approved buildings
         * and go to search-results view
         * @return {void}
         */
        this.goToAll = function seeAllVaApprovedBuildings() {
            $state.go('all-buildings');        
        };

    }

})();
