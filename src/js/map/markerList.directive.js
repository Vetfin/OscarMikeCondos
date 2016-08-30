(function() {
    'use strict';

    angular.module('vacondos')
        .directive('markerList', MarkerList);

    function MarkerList() {
        return {
            restrict: 'AE',
            templateUrl: 'templates/marker-list.template.html',
            scope: true
        };
    }

})();
