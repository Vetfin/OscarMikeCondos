(function() {
    'use strict';

    angular.module('vacondos')
        .controller('FavoritesController', FavoritesController);

    FavoritesController.$inject = ['auth'];

    function FavoritesController(auth) {

        this.loggedInUser = auth.getLoggedInUser();

        this.userFavorites = this.loggedInUser.favorites;
        console.log(this.userFavorites);

    }
})();
