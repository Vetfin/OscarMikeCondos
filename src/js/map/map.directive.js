(function() {
    'use strict';

    angular.module('vacondos')
        .directive('map', Map);

    function Map() {
        return {
            restrict: 'E',
            template: '',
            scope: {

            },
            link: link
        };

        function link(scope, element) {
            var mapOptions = {
              zoom: 13,
              center: { lat: 38.907192, lng: -77.036871}
            };

            new google.maps.Map(element[0], mapOptions);
        }
    }

})();
