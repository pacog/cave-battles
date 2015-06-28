(function() {
    'use strict';
    angular.module('caveBattles.player-selector.controller', [
        'caveBattles.player-types',
        'caveBattles.ai'
    ])
        .controller('PlayerSelectorController', PlayerSelectorController);

    function PlayerSelectorController(PLAYER_TYPES, AI) {
        var vm = this;

        vm.playerTypes = PLAYER_TYPES;
        vm.selectPlayerType = selectPlayerType;
        vm.selectAIType = selectAIType;

        init();

        function init() {
            vm.availableAIs = AI.getAIs();
            vm.playerInfo.typeOfAI = vm.availableAIs[0];
        }

        function selectPlayerType(newType) {
            vm.playerInfo.type = newType;
        }

        function selectAIType(newAI) {
            vm.playerInfo.typeOfAI = newAI;
        }
    }

})();