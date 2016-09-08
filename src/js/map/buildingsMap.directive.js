(function() {
    'use strict';

    angular.module('vacondos')
        .directive('buildingsMap', BuildingsMap);

    function BuildingsMap() {
        return {
            restrict: 'E',
            template: '',
            scope: {
                buildings: '='
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
            scope.$watchCollection('buildings', function(buildings) {
                if (!buildings.data) {
                    buildings.forEach(createMarker);
                    console.log(buildings);
                } else {
                    buildings.data.forEach(createMarker);
                    console.log(buildings);
                }

            });

            /**
             * Create map marker w/ info window for each location with lat/lng
             * and adds info window content
             * @param  {Object} location Location data (building)
             * @return {void}
             */
            function createMarker(location){
                console.log('in createMarker');
                var marker = new google.maps.Marker({
                    map: newMap,
                    position: new google.maps.LatLng(location.latitude, location.longitude),
                    title: (location.id).toString()
                });

                if (!location.building_id) {
                    marker.content =
                        '<div class="infoWindowContent">\
                            <a class="marker-address">' + location.address + '</a>\
                        </div>';
                } else {
                    // var park;

                    // if (location.parking === true) {
                    //     park = 'Yes';
                    // } else {
                    //     park = 'No';
                    // }

                    marker.content =
                        '<div class="infoWindowContent">\
                            <a class="marker-address">' + location.formatted_address + '</a>\
                            <ul>\
                                <li>Price: ' + location.price + '</li>\
                                <li>Sq Ft: ' + location.sq_ft + '</li>\
                                <li>Beds: ' + location.beds + '</li>\
                                <li>Baths: ' + location.baths + '</li>\
                            </ul>\
                        </div>';
                }

                google.maps.event.addListener(marker, 'click', function(){
                    infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                    infoWindow.open(newMap, marker);
                });
            }

        }
    }

})();
