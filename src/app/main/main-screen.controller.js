(function() {
    'use strict';

    angular.module('caveBattles.main-screen.controller', [
        'caveBattles.battle-handler',
        'caveBattles.battle-view',
        'battleCaves.battle-config'
    ])
        .controller('MainScreenController', MainScreenController);

    function MainScreenController(BattleHandler, BattleConfig) {
        var vm = this;
        vm.battleStarted = false;
        vm.startBattle = startBattle;
        init();

        function init() {
            BattleConfig.getAllMaps().then(function(allMaps) {
                vm.maps = allMaps;
            });
        }

        function startBattle(map) {
            vm.battleStarted = true;
            BattleHandler.init(map);
        }
    }

})();
