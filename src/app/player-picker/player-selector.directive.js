(function() {
    'use strict';

    angular.module('caveBattles.player-selector', [
        'caveBattles.player-selector.controller'
    ])
        .directive('playerSelector', PlayerSelectorDirective);

    function PlayerSelectorDirective() {
        return {
            restrict: 'E',
            scope: {
                playerInfo: '='
            },
            templateUrl: 'app/player-picker/player-selector.tpl.html',
            controller: 'PlayerSelectorController',
            controllerAs: 'vm',
            bindToController: true
        };
    }

})();