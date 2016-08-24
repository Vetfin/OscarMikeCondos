(function() {
    'use strict';

    angular.module('vacondos')
        .factory('maps', MapsService);

    function MapsService() {
        var example;

        return {
            getExample: getExample
        };

        function getExample() {
            example = [{
                          city : 'India',
                          desc : 'This is the best country in the world!',
                          lat : 23.200000,
                          long : 79.225487
                      },
                      {
                          city : 'New Delhi',
                          desc : 'The Heart of India!',
                          lat : 28.500000,
                          long : 77.250000
                      },
                      {
                          city : 'Mumbai',
                          desc : 'Bollywood city!',
                          lat : 19.000000,
                          long : 72.90000
                      },
                      {
                          city : 'Kolkata',
                          desc : 'Howrah Bridge!',
                          lat : 22.500000,
                          long : 88.400000
                      },
                      {
                          city : 'Chennai  ',
                          desc : 'Kathipara Bridge!',
                          lat : 13.000000,
                          long : 80.250000
                      }
                  ];
            return example; 
        }
    }
})();
