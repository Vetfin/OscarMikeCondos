(function() {
    'use strict';

    angular.module('vacondos')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state', 'condos'];

    function HomeController($state, condos) {
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

        this.goToResults = function searchSpecific() {
            condos
                .getAllCondos(that.searchParams)
                .then(function(data) {
                    console.log('in then for goToResults', data);
                    $state.go('search-results', {searchInputs: that.searchParams});
                });
        };

        this.goToAll = function searchAll() {
            condos
                .getAllAddresses()
                .then(function(data) {
                    console.log('in then for goToAll', data);
                    $state.go('search-results', {searchInputs: that.searchParams});
                });
        };

    }

})();
