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
                if (!condos.data) {
                    condos.forEach(createMarker);
                    console.log(condos);
                } else {
                    condos.data.forEach(createMarker);
                    console.log(condos);
                }

            });

            /**
             * Create map marker w/ info window for each location with lat/lng
             * and adds info window content
             * @param  {Object} location Location data (condo or building)
             * @return {void}
             */
            function createMarker(location){
                console.log('in createMarker');
                var marker = new google.maps.Marker({
                    map: newMap,
                    position: new google.maps.LatLng(location.latitude, location.longitude),
                    title: 'Condo For Sale'
                    // (location.unit).toString()
                });

                if (!location.building_id) {
                    marker.content =
                        '<div class="infoWindowContent">\
                            <a class="marker-address">' + location.address + '</a>\
                        </div>';
                } else {
                    // var park;
                    //
                    // if (location.parking === true) {
                    //     park = 'Yes';
                    // } else {
                    //     park = 'No';
                    // }

                    marker.content =
                        '<div class="infoWindowContent">\
                            <h3><a class="marker-address">' + location.formatted_address + '</a></h3>\
                            <h4>Unit #: ' + location.unit + '</h4>\
                            <ul>\
                                <li>Price: ' + location.price + '</li>\
                                <li>Sq Ft: ' + location.sq_ft + '</li>\
                                <li>Beds: ' + location.beds + '</li>\
                                <li>Baths: ' + location.baths + '</li>\
                            </ul>\
                        </div>';
                }

                google.maps.event.addListener(marker, 'click', function(){
                    infoWindow.setContent('<h4>' + marker.title + '</h4>' + marker.content);
                    infoWindow.open(newMap, marker);
                });
            }

        }
    }

})();
