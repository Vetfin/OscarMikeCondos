(function() {
    'use strict';

    angular.module('vacondos')
        .controller('FavoritesController', FavoritesController);

    FavoritesController.$inject = ['auth'];

    function FavoritesController(auth) {
        this.loggedInUser = auth.getLoggedInUser();

        //TODO uncomment this to get favorites Array
        //should be empty if user has not favorited anything yet
        // this.favorites = this.loggedInUser.favorites;
    }
})();
