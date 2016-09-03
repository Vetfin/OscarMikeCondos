(function() {
    'use strict';

    angular.module('vacondos')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state', '$location', 'condos'];

    function HomeController($state, $location, condos) {
        var that = this;

        this.message = '';

        this.path = $location.host();
        console.log(this.path);

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

        this.goToAll = function searchAll() {
            condos
                .getAllBuildings()
                .then(function(data) {
                    console.log('in then for goToAll', data);
                    $state.go('search-results', {searchInputs: that.searchParams});
                })
                .catch(function(err) {
                    console.error(err.status);
                    if (err.status >= 400 && err.status < 500) {
                        that.message = 'Unable to retrieve buildings, check your inputs';
                    } else if (err.status >= 500 && err.status < 600) {
                        that.message = 'Oops! Something went wrong on our side. Hold wait one then try again';
                    }
                });
        };

    }

})();
