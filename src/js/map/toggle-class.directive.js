(function() {
    'use strict';

    angular.module('vacondos')
        .directive('toggleClass', ToggleClass);

    function ToggleClass() {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attrs) {
            element.bind('click', function() {
                element.toggleClass(attrs.toggleClass);
            });
        }
    }
})();
