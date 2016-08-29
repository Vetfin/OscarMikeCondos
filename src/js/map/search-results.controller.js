(function() {
    'use strict';

    angular.module('vacondos')
        .controller('SearchResultsController', SearchResultsController);

    SearchResultsController.$inject = ['maps', 'condos'];

    function SearchResultsController(maps, condos) {
        var that = this;

        this.cities = maps.getExample();

        this.allCondos = condos.getAllCondos()
            .then(function(allCondos) {
                that.condos = allCondos;
                console.log('condos', that.condos);
            });


        /** DC LatLng: 38.907192, -77.036871 **/
        var mapOptions = {
          zoom: 13,
          center: { lat: 38.907192, lng: -77.036871}
        };

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        this.markers = [];

        var infoWindow = new google.maps.InfoWindow();

        var createMarker = function (info){
            var marker = new google.maps.Marker({
                map: that.map,
                position: new google.maps.LatLng(info.lat, info.long),
                title: info.city
            });
            marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open(that.map, marker);
          });

          that.markers.push(marker);

        };

        var i;
        for (i = 0; i < this.cities.length; i++){
          createMarker(this.cities[i]);
        }

        this.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        };

    }

})();
