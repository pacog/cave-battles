(function() {
    'use strict';
    angular.module('caveBattles.player-selector.controller', [
        'caveBattles.player-types'
    ])
        .controller('PlayerSelectorController', PlayerSelectorController);

    function PlayerSelectorController(PLAYER_TYPES) {
        var vm = this;

        vm.playerTypes = PLAYER_TYPES;
        vm.selectPlayerType = selectPlayerType;

        function selectPlayerType(newType) {
            vm.playerInfo.type = newType;
        }
    }

})();