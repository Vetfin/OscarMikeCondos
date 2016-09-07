(function() {
    'use strict';

    angular.module('vacondos')
        .controller('BuildingsController', BuildingsController);

    BuildingsController.$inject = ['condos'];

    function BuildingsController(condos) {
        this.buildings = condos.getBuildingResults();
        console.log('in buildings ctrl', this.buildings);
    }
})();
