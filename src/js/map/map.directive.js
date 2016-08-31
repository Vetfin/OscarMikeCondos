(function() {
    'use strict';

    angular.module('vacondos')
        .directive('map', Map);

    function Map() {
        return {
            restrict: 'E',
            template: '',
            scope: {
                condos: '='
            },
            link: link
        };

        function link(scope, element) {
            /** Create new google map **/
            var mapOptions = {
              zoom: 13,
              center: { lat: 38.907192, lng: -77.036871 }
            };

            var newMap = new google.maps.Map(element[0], mapOptions);

            /** Instantiate infoWindow object **/
            var infoWindow = new google.maps.InfoWindow();

            /** Once array has been updates, then create markers **/
            scope.$watchCollection('condos', function(condos) {
                condos.forEach(createMarker);
            });

            function createMarker(condo){
                var marker = new google.maps.Marker({
                    map: newMap,
                    position: new google.maps.LatLng(condo.latitude, condo.longitude),
                    title: (condo.id).toString()
                });

                marker.content = '<div class="infoWindowContent">' + condo.address + '</div>';

                google.maps.event.addListener(marker, 'click', function(){
                    infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                    infoWindow.open(newMap, marker);
                });
            }

        }
    }

})();
