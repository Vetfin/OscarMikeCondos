(function() {
    'use strict';

    angular.module('vacondos')
        .controller('SearchResultsController', SearchResultsController);

    SearchResultsController.$inject = ['condos'];

    function SearchResultsController(condos) {
        var that = this;
        var infoWindow = new google.maps.InfoWindow();

        this.searchZip = null;

        this.allCondos = condos.getAllCondos()
            .then(function(allCondos) {
                that.condos = allCondos;
                that.makeCondoMarkers(allCondos);
                console.log('condos', that.condos);
            });

        /** DC LatLng: 38.907192, -77.036871 **/
        var mapOptions = {
          zoom: 13,
          center: { lat: 38.907192, lng: -77.036871}
        };

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        this.markers = [];

        this.makeCondoMarkers = function makeCondoMarkers(condoList) {
            var i;
            for (i = 0; i < condoList.length; i++){
              that.createMarker(condoList[i]);
            }
        };

        this.createMarker = function createMarker(condo){
            var marker = new google.maps.Marker({
                map: that.map,
                position: new google.maps.LatLng(condo.latitude, condo.longitude),
                title: (condo.id).toString()
            });
            marker.content = '<div class="infoWindowContent">' + condo.address + '</div>';

            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open(that.map, marker);
          });

          that.markers.push(marker);

        };

        this.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        };

    }

})();
